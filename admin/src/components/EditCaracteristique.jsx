import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const EditCaracteristique = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [produits, setProduits] = useState([]);
  const [formData, setFormData] = useState({
    couleur: "",
    taille: "",
    produit_id: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products for dropdown
        const produitsResponse = await axios.get("http://localhost:8000/api/produits");
        
        // Handle the produits data properly based on actual response structure
        let produitsData;
        if (Array.isArray(produitsResponse.data)) {
          produitsData = produitsResponse.data;
        } else if (produitsResponse.data && Array.isArray(produitsResponse.data.data)) {
          produitsData = produitsResponse.data.data;
        } else {
          produitsData = [];
          console.warn("Produits data is not in the expected format:", produitsResponse.data);
        }
        
        setProduits(produitsData);

        // Fetch the caracteristique to edit
        const caracteristiqueResponse = await axios.get(`http://localhost:8000/api/caracteristiques/${id}`);
        
        // Handle the caracteristique data properly based on actual response structure
        let caracteristique;
        if (caracteristiqueResponse.data && caracteristiqueResponse.data.data) {
          caracteristique = caracteristiqueResponse.data.data;
        } else if (caracteristiqueResponse.data) {
          caracteristique = caracteristiqueResponse.data;
        } else {
          throw new Error("Caractéristique introuvable.");
        }

        setFormData({
          couleur: caracteristique.couleur || "",
          taille: caracteristique.taille || "",
          produit_id: caracteristique.produit_id || ""
        });

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setError("Impossible de charger les données. Veuillez réessayer plus tard.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`http://localhost:8000/api/caracteristiques/${id}`, formData);
      alert("✅ Caractéristique mise à jour avec succès !");
      navigate("/caracteristiques");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la caractéristique :", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join("\n");
        alert(`❌ Erreur: ${errorMessages}`);
      } else {
        alert("❌ Une erreur s'est produite lors de la mise à jour.");
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Chargement des données...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate("/caracteristiques")}
          className="mr-4 p-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Modifier la caractéristique</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Couleur
            </label>
            <input
              type="text"
              name="couleur"
              value={formData.couleur}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Taille
            </label>
            <input
              type="text"
              name="taille"
              value={formData.taille}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Produit
            </label>
            <select
              name="produit_id"
              value={formData.produit_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner un produit</option>
              {produits.map((produit) => (
                <option key={produit.id} value={produit.id}>
                  {produit.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/caracteristiques")}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCaracteristique;