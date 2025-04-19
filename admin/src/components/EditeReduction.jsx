import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditeReduction = () => {
  const { id } = useParams();
  const [nom, setNom] = useState("");
  const [pourcentageReduction, setPourcentageReduction] = useState("");
  const [actif, setActif] = useState(false);
  const [periodeReduction, setPeriodeReduction] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReduction();
  }, []);

  const fetchReduction = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/reductions/${id}`);
      const reduction = res.data;
      setNom(reduction.nom);
      setPourcentageReduction(reduction.pourcentage_reduction);
      setActif(reduction.actif);
      setPeriodeReduction(reduction.periode_reduction);
    } catch (err) {
      console.error("Erreur lors du chargement de la réduction :", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/reductions/${id}`, {
        nom,
        pourcentage_reduction: pourcentageReduction,
        actif,
        periode_reduction: periodeReduction,
      });
      alert("✅ Réduction mise à jour avec succès !");
      navigate("/reductions/list"); // Redirection après édition réussie
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la réduction :", err);
      alert("❌ Une erreur s'est produite.");
    }
  };

  const handleCancel = () => {
    navigate("/reductions/list"); // Redirection vers la liste des réductions
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Modifier une Réduction</h2>
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
          <input
            type="text"
            value={pourcentageReduction}
            onChange={(e) => setPourcentageReduction(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
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
            Modifier
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

export default EditeReduction;