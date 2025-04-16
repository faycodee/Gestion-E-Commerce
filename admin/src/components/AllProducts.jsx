import React, { useEffect, useState } from "react";
import axios from "axios";

const AllProducts = () => {
  const [produits, setProduits] = useState([]);

  const fetchProduits = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/produits");
    setProduits(res.data);
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://127.0.0.1:8000/api/produits/${id}`);
      fetchProduits();
    }
  };

  const handleEdit = (id) => {
    // Redirect to edit page (you can use react-router-dom)
    window.location.href = `/edit-product/${id}`;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border text-sm shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Price (HT)</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((p) => (
              <tr key={p.id} className="text-center hover:bg-gray-50">
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">
                  <img
                    src={p.image}
                    alt={p.nom}
                    className="w-12 h-12 object-cover rounded mx-auto"
                  />
                </td>
                <td className="p-2 border">{p.nom}</td>
                <td className="p-2 border">{p.description}</td>
                <td className="p-2 border">{p.prix_HT} DH</td>
                <td className="p-2 border">{p.quantity}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(p.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
