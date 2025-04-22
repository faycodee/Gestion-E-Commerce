import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ShoppingBagIcon, // Importation de l'icône ShoppingBag
} from "@heroicons/react/24/solid"; // Importation des icônes Heroicons
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AllProducts = () => {
  const [produits, setProduits] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche
  const [categories, setCategories] = useState([]); // État pour les catégories
  const [selectedCategory, setSelectedCategory] = useState(""); // Filtre par catégorie
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [productsPerPage] = useState(8); // Nombre de produits par page
  const navigate = useNavigate(); // Initialisation de useNavigate

  useEffect(() => {
    fetchProduits();
    fetchCategories();
  }, []);

  const fetchProduits = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/produits");
      setProduits(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des produits :", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des catégories :", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/produits/${id}`);
        alert("✅ Produit supprimé avec succès !");
        fetchProduits();
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        alert("❌ Une erreur s'est produite lors de la suppression du produit.");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`); // Redirige vers la page d'édition
  };

  // Filtrer les produits
  const filteredProduits = produits.filter((p) => {
    const matchesSearch = p.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? p.category_id === parseInt(selectedCategory)
      : true;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProduits.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProduits.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
        Tous les Produits
      </h2>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un produit par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>
      </div>

      {/* Grille des produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4"
          >
           <img
  src={`http://127.0.0.1:8000/storage/${p.image}`}
  alt={p.nom}
  className="w-full h-40 object-cover rounded mb-4"
/>

            <h3 className="text-lg font-semibold mb-2">{p.nom}</h3>
            <p className="text-gray-600 text-sm mb-4">{p.description}</p>
            <p className="text-blue-600 font-bold text-lg mb-2">{p.prix_HT} DH</p>
            <p
              className={`text-sm font-semibold mb-4 ${
                p.quantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {p.quantity > 0 ? "En Stock" : "Rupture de Stock"}
            </p>
            <div className="flex justify-between items-center">
              {/* Bouton Voir */}
              <button
                onClick={() => alert(`Voir le produit ${p.nom}`)}
                className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full"
              >
                <EyeIcon className="h-5 w-5" />
              </button>

              {/* Bouton Modifier */}
              <button
                onClick={() => handleEdit(p.id)} // Appelle handleEdit pour rediriger
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
              >
                <PencilIcon className="h-5 w-5" />
              </button>

              {/* Bouton Supprimer */}
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        {currentProducts.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            Aucun produit trouvé.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
        >
          ⬅️ Précédent
        </button>
        <span className="text-gray-600">
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
        >
          Suivant ➡️
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
