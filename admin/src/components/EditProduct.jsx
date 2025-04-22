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
        ...res.data,
        image: null, // Reset image to null for file input
      });
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

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image" && value) {
        formData.append("image", value); // Append image file
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axios.post(`http://127.0.0.1:8000/api/produits/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Produit modifié avec succès !");
      navigate("/products");
    } catch (err) {
      console.error("Erreur lors de la modification :", err);
      alert("❌ Une erreur s'est produite lors de la modification du produit.");
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
      <h2 className="text-2xl font-bold mb-6 text-center">Modifier le Produit</h2>
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

      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition"
      />

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
