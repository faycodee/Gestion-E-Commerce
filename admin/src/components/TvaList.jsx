import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const TvaList = () => {
  const [tvas, setTvas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [nom, setNom] = useState("");
  const [periodeTva, setPeriodeTva] = useState("");
  const [taux, setTaux] = useState("");

  useEffect(() => {
    fetchTvas();
  }, []);

  const fetchTvas = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tvas");
      setTvas(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des TVA :", err);
    }
  };

  const handleEdit = (tva) => {
    setEditId(tva.id);
    setNom(tva.nom);
    setPeriodeTva(tva.periode_TVA);
    setTaux(tva.taux);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/tvas/${editId}`, {
        nom,
        periode_TVA: periodeTva,
        taux,
      });
      alert("✅ TVA mise à jour avec succès !");
      setEditId(null);
      setNom("");
      setPeriodeTva("");
      setTaux("");
      fetchTvas();
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la TVA :", err);
      alert("❌ Une erreur s'est produite.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette TVA ?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/tvas/${id}`);
        alert("✅ TVA supprimée avec succès !");
        fetchTvas();
      } catch (err) {
        console.error("Erreur lors de la suppression de la TVA :", err);
        alert("❌ Une erreur s'est produite lors de la suppression.");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des TVA</h2>

      {/* Formulaire d'édition */}
      {editId && (
        <form onSubmit={handleUpdate} className="mb-6 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-4">Modifier la TVA</h3>
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
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edite
          </button>
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setNom("");
              setPeriodeTva("");
              setTaux("");
            }}
            className="ml-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Annuler
          </button>
        </form>
      )}

      {/* Liste des TVA */}
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Nom</th>
              <th className="py-2 px-4">Période</th>
              <th className="py-2 px-4">Taux (%)</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tvas.map((tva) => (
              <tr key={tva.id} className="border-b">
                <td className="py-2 px-4">{tva.nom}</td>
                <td className="py-2 px-4">{tva.periode_TVA}</td>
                <td className="py-2 px-4">{tva.taux}</td>
                <td className="py-2 px-4 flex gap-2">
                  {/* Bouton Modifier */}
                  <button
                    onClick={() => handleEdit(tva)}
                    className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  {/* Bouton Supprimer */}
                  <button
                    onClick={() => handleDelete(tva.id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {tvas.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Aucune TVA trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TvaList;