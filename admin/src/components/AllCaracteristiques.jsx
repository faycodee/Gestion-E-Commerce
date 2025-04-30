import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"; // Importer les icônes

const AllCaracteristiques = () => {
  const [caracteristiques, setCaracteristiques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [caracteristiquesPerPage] = useState(5);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Appel API pour récupérer les caractéristiques
    axios
      .get("http://localhost:8000/api/caracteristiques")
      .then((response) => {
        setCaracteristiques(response.data);
        setLoading(false);

        // Animation GSAP
        gsap.fromTo(
          tableRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des caractéristiques :", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette caractéristique ?")) {
      axios
        .delete(`http://localhost:8000/api/caracteristiques/${id}`)
        .then(() => {
          setCaracteristiques(
            caracteristiques.filter((caracteristique) => caracteristique.id !== id)
          );
          alert("Caractéristique supprimée avec succès !");
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de la caractéristique :", error);
        });
    }
  };

  // Calculer les caractéristiques à afficher pour la page actuelle
  const indexOfLastCaracteristique = currentPage * caracteristiquesPerPage;
  const indexOfFirstCaracteristique = indexOfLastCaracteristique - caracteristiquesPerPage;
  const currentCaracteristiques = caracteristiques.slice(
    indexOfFirstCaracteristique,
    indexOfLastCaracteristique
  );

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p className="text-center text-gray-500">Chargement des caractéristiques...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Toutes les caractéristiques</h1>
      <table
        ref={tableRef}
        className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg"
      >
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCaracteristiques.map((caracteristique) => (
            <tr
              key={caracteristique.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="border border-gray-300 px-4 py-2">{caracteristique.nom}</td>
              <td className="border border-gray-300 px-4 py-2">
                {caracteristique.description || "Pas de description disponible"}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <button
                  onClick={() => navigate(`/caracteristiques/edit/${caracteristique.id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(caracteristique.id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(caracteristiques.length / caracteristiquesPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AllCaracteristiques;