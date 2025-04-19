import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const AllReduction = () => {
  const [reductions, setReductions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReductions(currentPage);
  }, [currentPage]);

  const fetchReductions = async (page) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/reductions?page=${page}`);
      setReductions(res.data.data); // Données paginées
      setTotalPages(res.data.last_page); // Nombre total de pages
    } catch (err) {
      console.error("Erreur lors du chargement des réductions :", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réduction ?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/reductions/${id}`);
        alert("✅ Réduction supprimée avec succès !");
        fetchReductions(currentPage);
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        alert("❌ Une erreur s'est produite.");
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Nom</th>
              <th className="py-2 px-4">Pourcentage</th>
              <th className="py-2 px-4">Actif</th>
              <th className="py-2 px-4">Période</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reductions.map((reduction) => (
              <tr key={reduction.id} className="border-b">
                <td className="py-2 px-4">{reduction.nom}</td>
                <td className="py-2 px-4">{reduction.pourcentage_reduction}</td>
                <td className="py-2 px-4">{reduction.actif ? "Oui" : "Non"}</td>
                <td className="py-2 px-4">{reduction.periode_reduction}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/reductions/edit/${reduction.id}`)}
                    className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(reduction.id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {reductions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Aucune réduction trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default AllReduction;