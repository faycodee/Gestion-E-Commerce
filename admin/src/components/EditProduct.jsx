import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap"; // Import GSAP

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null); // Ref for GSAP animation
  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix_HT: "",
    quantity: "",
    image: null, // Updated to handle file uploads
    category_id: "",
    tva_id: "",
  });
  const [categories, setCategories] = useState([]); // List of categories
  const [tvas, setTvas] = useState([]); // List of TVA
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    // GSAP animation for the form
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Fetch product, categories, and TVA data
    fetchProduct();
    fetchCategoriesAndTvas();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/produits/${id}`);
      setForm({
        nom: res.data.nom,
        description: res.data.description,
        prix_HT: res.data.prix_HT,
        quantity: res.data.quantity,
        category_id: res.data.category_id,
        tva_id: res.data.tva_id,
        image: null, // Reset image input
      });
      setCurrentImage(res.data.image); // Store the current image path
    } catch (err) {
      console.error("Erreur lors du chargement du produit :", err);
    }
  };

  const fetchCategoriesAndTvas = async () => {
    try {
      const [catRes, tvaRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/categories"),
        axios.get("http://127.0.0.1:8000/api/tvas"),
      ]);
      setCategories(catRes.data);
      setTvas(tvaRes.data);
    } catch (err) {
      console.error("Erreur lors du chargement des catégories/TVA :", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] }); // Handle file input
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !form.nom ||
      !form.description ||
      !form.prix_HT ||
      !form.quantity ||
      !form.category_id ||
      !form.tva_id
    ) {
      alert("❌ Tous les champs obligatoires doivent être remplis.");
      return;
    }

    try {
      const formData = new FormData();

      // Append all form fields
      formData.append("nom", form.nom);
      formData.append("description", form.description);
      formData.append("prix_HT", form.prix_HT);
      formData.append("quantity", form.quantity);
      formData.append("category_id", form.category_id);
      formData.append("tva_id", form.tva_id);

      // Only append image if a new one is selected
      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      // Add _method field for Laravel to handle PUT request
      formData.append("_method", "PUT");

      const response = await axios.post(
        `http://127.0.0.1:8000/api/produits/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      alert("✅ Produit modifié avec succès !");
      navigate("/products");
    } catch (err) {
      console.error("Error:", err);
      alert(
        "❌ Erreur: " +
          (err.response?.data?.message || "Une erreur est survenue")
      );
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <form
      ref={formRef} // Ref for GSAP animation
      onSubmit={handleSubmit}
      className="space-y-4 p-6 max-w-xl mx-auto bg-white rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Modifier le Produit
      </h2>
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={form.nom}
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="number"
        name="prix_HT"
        placeholder="Prix HT"
        value={form.prix_HT}
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantité"
        value={form.quantity}
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition"
      />

      {/* Dynamic Category */}
      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="">-- Choisir une catégorie --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nom}
          </option>
        ))}
      </select>

      {/* Dynamic TVA */}
      <select
        name="tva_id"
        value={form.tva_id}
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="">-- Choisir une TVA --</option>
        {tvas.map((tva) => (
          <option key={tva.id} value={tva.id}>
            {tva.nom} ({tva.taux}%)
          </option>
        ))}
      </select>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image actuelle
        </label>
        {currentImage && (
          <div className="mt-2 mb-4">
            <img
              src={`http://127.0.0.1:8000/storage/${currentImage}`}
              alt="Image actuelle"
              className="w-32 h-32 object-cover rounded-md shadow-md"
            />
          </div>
        )}
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Modifier
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default EditProduct;
