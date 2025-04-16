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

  useEffect(() => {
    axios.get(`/api/produits/${id}`).then((res) => {
        
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/produits/${id}`, form);
    alert("Product updated!");
    navigate("/all-products");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input type="text" name="nom" placeholder="Name" value={form.nom} onChange={handleChange} className="border p-2 w-full" />
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full" />
      <input type="number" name="prix_HT" placeholder="Price" value={form.prix_HT} onChange={handleChange} className="border p-2 w-full" />
      <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} className="border p-2 w-full" />
      <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Product</button>
    </form>
  );
};

export default EditProduct;
