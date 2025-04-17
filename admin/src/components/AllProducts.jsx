import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AllProducts = () => {
  const [produits, setProduits] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const produitsPerPage = 5;
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const fetchProduits = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/produits");
    setProduits(res.data);
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://127.0.0.1:8000/api/produits/${id}`);
      fetchProduits();
    }
  };

  const handleEdit = (id) => {
    // نحافظ على رقم الصفحة الحالي وندوز معاه
    navigate(`/edit-product/${id}?page=${currentPage}`);
  };

  // 🔁 Pagination
  const indexOfLastProduct = currentPage * produitsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - produitsPerPage;
  const currentProduits = produits.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(produits.length / produitsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">🛍️ Tous les Produits</h2>

      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Nom</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Prix (HT)</th>
              <th className="p-3 border">Quantité</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProduits.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 text-center">
                <td className="p-3 border">{p.id}</td>
                <td className="p-3 border">
                  <img
                    src={p.image || "https://via.placeholder.com/50"}
                    alt={p.nom}
                    className="w-12 h-12 object-cover rounded mx-auto"
                  />
                </td>
                <td className="p-3 border">{p.nom}</td>
                <td className="p-3 border">{p.description}</td>
                <td className="p-3 border">{p.prix_HT} DH</td>
                <td className="p-3 border">{p.quantity}</td>
                <td className="p-3 border space-x-2">
                  <button
                    onClick={() => handleEdit(p.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔄 Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
        >
          ⬅️ Précédent
        </button>
        <span className="text-gray-600">Page {currentPage} / {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
        >
          Suivant ➡️
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
