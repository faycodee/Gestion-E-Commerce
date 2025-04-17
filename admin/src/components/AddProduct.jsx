import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap"; // Import GSAP

const AddProduct = () => {
  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix_HT: "",
    quantity: "",
    image: null,
    category_id: "",
    tva_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [tvas, setTvas] = useState([]);
  const navigate = useNavigate();

  const formRef = useRef(null); // Ref pour le formulaire

  // Animation GSAP
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  // Fetch categories & TVA on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get("http://127.0.0.1:8000/api/categories");
        const tvaRes = await axios.get("http://127.0.0.1:8000/api/tvas");
        setCategories(catRes.data);
        setTvas(tvaRes.data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories/TVA:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image" && value) {
        formData.append("image", value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/produits", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`✅ ${response.data.message}`);

      // Reset form
      setForm({
        nom: "",
        description: "",
        prix_HT: "",
        quantity: "",
        image: null,
        category_id: "",
        tva_id: "",
      });
      document.getElementById("image").value = "";

      // Rediriger vers /products après ajout
      navigate("/products");
    } catch (err) {
      if (err.response) {
        console.error("Erreur Laravel:", err.response.data);
        alert("❌ Erreur: " + (err.response.data.message || "Vérifiez les champs."));
      } else {
        alert("❌ Erreur réseau.");
      }
    }
  };

  return (
    <div
      ref={formRef} // Ref pour l'animation
      className="p-6 max-w-xl mx-auto bg-white rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un produit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nom"
          placeholder="Nom du produit"
          value={form.nom}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="number"
          name="prix_HT"
          placeholder="Prix HT"
          value={form.prix_HT}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantité"
          value={form.quantity}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Catégorie dynamique */}
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">-- Choisir une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>

        {/* TVA dynamique */}
        <select
          name="tva_id"
          value={form.tva_id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition"
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
          className="w-full p-2 border rounded bg-gray-50 focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Ajouter le produit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
