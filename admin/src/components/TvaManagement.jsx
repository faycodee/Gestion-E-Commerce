import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const TvaManagement = () => {
  const [nom, setNom] = useState("");
  const [periodeTva, setPeriodeTva] = useState("");
  const [taux, setTaux] = useState("");
  const navigate = useNavigate(); // Initialisation de useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/tvas", {
        nom,
        periode_TVA: periodeTva,
        taux,
      });
      alert("✅ TVA ajoutée avec succès !");
      setNom("");
      setPeriodeTva("");
      setTaux("");
      navigate("/tvas"); // Redirection vers /tva/list
    } catch (err) {
      console.error("Erreur lors de l'ajout de la TVA :", err);
      alert("❌ Une erreur s'est produite.");
    }
  };

  const handleCancel = () => {
    navigate("/tvas"); // Redirection vers /tva/list
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestion des TVA</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Période TVA</label>
          <input
            type="text"
            value={periodeTva}
            onChange={(e) => setPeriodeTva(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Taux (%)</label>
          <input
            type="number"
            step="0.01"
            value={taux}
            onChange={(e) => setTaux(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ajouter
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default TvaManagement;