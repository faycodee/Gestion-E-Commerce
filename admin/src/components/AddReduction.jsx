import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddReduction = () => {
  const [nom, setNom] = useState("");
  const [pourcentageReduction, setPourcentageReduction] = useState("");
  const [actif, setActif] = useState(false);
  const [periodeReduction, setPeriodeReduction] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/reductions", {
        nom,
        pourcentage_reduction: pourcentageReduction,
        actif,
        periode_reduction: periodeReduction,
      });
      alert("✅ Réduction ajoutée avec succès !");
      navigate("/reductions/list"); // Redirection après ajout
    } catch (err) {
      console.error("Erreur lors de l'ajout de la réduction :", err);
      alert("❌ Une erreur s'est produite.");
    }
  };

  const handleCancel = () => {
    navigate("/reductions/list"); // Redirection vers la liste des réductions
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Ajouter une Réduction</h2>
      <form onSubmit={handleSubmit}>
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
          <label className="block text-sm font-medium mb-1">Pourcentage</label>
          <div className="flex items-center">
            <input
              type="number"
              value={pourcentageReduction}
              onChange={(e) => setPourcentageReduction(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <span className="ml-2 text-gray-600 font-medium">%</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Actif</label>
          <input
            type="checkbox"
            checked={actif}
            onChange={(e) => setActif(e.target.checked)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Période</label>
          <input
            type="date"
            value={periodeReduction}
            onChange={(e) => setPeriodeReduction(e.target.value)}
            className="w-full p-2 border rounded"
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

export default AddReduction;