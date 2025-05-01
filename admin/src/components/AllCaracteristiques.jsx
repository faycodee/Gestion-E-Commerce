import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const AllCaracteristiques = () => {
  const [caracteristiques, setCaracteristiques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [caracteristiquesPerPage] = useState(15);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCaracteristiques();
  }, []);

  const fetchCaracteristiques = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/caracteristiques");
      setCaracteristiques(Array.isArray(response.data.data) ? response.data.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des caractéristiques :", error);
      setCaracteristiques([]);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette caractéristique ?")) {
      try {
        await axios.delete(`http://localhost:8000/api/caracteristiques/${id}`);
        alert("✅ Caractéristique supprimée avec succès !");
        fetchCaracteristiques();
      } catch (error) {
        console.error("Erreur lors de la suppression de la caractéristique :", error);
        alert("❌ Une erreur s'est produite lors de la suppression.");
      }
    }
  };

  // Pagination logic
  const indexOfLastCaracteristique = currentPage * caracteristiquesPerPage;
  const indexOfFirstCaracteristique = indexOfLastCaracteristique - caracteristiquesPerPage;
  const currentCaracteristiques = caracteristiques.slice(indexOfFirstCaracteristique, indexOfLastCaracteristique);
  const totalPages = Math.ceil(caracteristiques.length / caracteristiquesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <p className="text-center text-gray-500">Chargement des caractéristiques...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Toutes les caractéristiques</h1>
      <div className="bg-white shadow rounded-lg p-4">
        <table ref={tableRef} className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Couleur</th>
              <th className="py-2 px-4">Taille</th>
              <th className="py-2 px-4">Produit</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCaracteristiques.map((caracteristique) => (
              <tr key={caracteristique.id} className="border-b">
                <td className="py-2 px-4">{caracteristique.id}</td>
                <td className="py-2 px-4">{caracteristique.couleur}</td>
                <td className="py-2 px-4">{caracteristique.taille}</td>
                <td className="py-2 px-4">
                  {caracteristique.produit_nom || "Produit non disponible"}
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/caracteristiques/edit/${caracteristique.id}`)}
                    className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(caracteristique.id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {caracteristiques.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Aucune caractéristique trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {caracteristiques.length > 0 && (
          <div className="flex items-center justify-between mt-4 px-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <div className="flex space-x-1">
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => goToPage(number)}
                    className={`px-3 py-1 rounded ${
                      currentPage === number
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCaracteristiques;