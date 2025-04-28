import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { gsap } from "gsap";

const AddCaracteristique = () => {
  const [couleur, setCouleur] = useState("");
  const [taille, setTaille] = useState("");
  const [produitId, setProduitId] = useState("");
  const [produits, setProduits] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchProduits();

    // GSAP animation for form
    gsap.fromTo(
      ".form-container",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const fetchProduits = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/produits");
      setProduits(response.data);
    } catch (error) {
      console.error("Error fetching produits:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/caracteristiques", {
        couleur,
        taille,
        produit_id: produitId,
      });
      alert("Caractéristique added successfully!");
      navigate("/caracteristiques"); // Navigate to /caracteristiques after adding
    } catch (error) {
      console.error("Error adding caractéristique:", error);
    }
  };

  const handleCancel = () => {
    navigate("/caracteristiques"); // Navigate to /caracteristiques on cancel
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow form-container">
      <h1 className="text-2xl font-bold mb-4">Add Caractéristique</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Couleur</label>
          <input
            type="text"
            value={couleur}
            onChange={(e) => setCouleur(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Taille</label>
          <input
            type="text"
            value={taille}
            onChange={(e) => setTaille(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Produit</label>
          <select
            value={produitId}
            onChange={(e) => setProduitId(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a produit</option>
            {produits.map((produit) => (
              <option key={produit.id} value={produit.id}>
                {produit.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
          >
            Add Caractéristique
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCaracteristique;