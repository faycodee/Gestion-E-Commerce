import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix_HT: "",
    quantity: "",
    image: "",
  });

  const page = new URLSearchParams(window.location.search).get('page') || 1;

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/produits/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://127.0.0.1:8000/api/produits/${id}`, form);
    alert("Product updated!");
    navigate(`/all-products?page=${page}`);
  };

  const handleCancel = () => {
    navigate(`/all-products?page=${page}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Modifier le Produit</h2>
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={form.nom}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="prix_HT"
        placeholder="Prix HT"
        value={form.prix_HT}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantité"
        value={form.quantity}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="image"
        placeholder="URL de l'image"
        value={form.image}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Modifier
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Annuler 
        </button>
      </div>
    </form>
  );
};

export default EditProduct;
