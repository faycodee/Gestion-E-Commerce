import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate
import axios from "axios";
import { gsap } from "gsap";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5); // Nombre de catégories par page
  const tableRef = useRef(null);
  const navigate = useNavigate(); // تعريف navigate

  useEffect(() => {
    // Appel API pour récupérer les catégories
    axios
      .get("http://localhost:8000/api/categories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);

        // Animation GSAP
        gsap.fromTo(
          tableRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      axios
        .delete(`http://localhost:8000/api/categories/${id}`)
        .then(() => {
          setCategories(categories.filter((category) => category.id !== id));
          alert("Catégorie supprimée avec succès !");
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de la catégorie :", error);
        });
    }
  };

  // Calculer les catégories à afficher pour la page actuelle
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p className="text-center text-gray-500">Chargement des catégories...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Toutes les catégories</h1>
      <table
        ref={tableRef}
        className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg"
      >
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category) => (
            <tr
              key={category.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="border border-gray-300 px-4 py-2">
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.nom}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">{category.nom}</td>
              <td className="border border-gray-300 px-4 py-2">
                {category.description || "Pas de description disponible"}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => navigate(`/categories/edit/${category.id}`)} // استخدام navigate
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(categories.length / categoriesPerPage) }, (_, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default AllCategories;