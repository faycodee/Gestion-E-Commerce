import React, { useState } from "react";
import axios from "axios";

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
    formData.append("nom", form.nom);
    formData.append("description", form.description);
    formData.append("prix_HT", form.prix_HT);
    formData.append("quantity", form.quantity);
    formData.append("category_id", form.category_id);
    formData.append("tva_id", form.tva_id);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/produits", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Produit ajouté avec succès");
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
    } catch (err) {
      if (err.response) {
        console.error("Erreur Laravel:", err.response.data);
        alert("❌ Erreur: " + (err.response.data.message || "Vérifiez les champs."));
      } 
    }
    
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nom"
          placeholder="Product Name"
          value={form.nom}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="prix_HT"
          placeholder="Price (HT)"
          value={form.prix_HT}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        {/* Category ID */}
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Category --</option>
          <option value="1">Catégorie 1</option>
          <option value="2">Catégorie 2</option>
        </select>

        {/* TVA ID */}
        <select
          name="tva_id"
          value={form.tva_id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select TVA --</option>
          <option value="1">TVA 20%</option>
          <option value="2">TVA 7%</option>
        </select>

        {/* Image */}
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-50"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
