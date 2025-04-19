import React, { useState, useEffect } from "react";
import axios from "axios";

const AddTva = () => {
  const [tvas, setTvas] = useState([]);
  const [nom, setNom] = useState("");
  const [periodeTva, setPeriodeTva] = useState("");
  const [taux, setTaux] = useState("");
  const [editId, setEditId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Modifier une TVA existante
        await axios.put(`http://127.0.0.1:8000/api/tvas/${editId}`, {
          nom,
          periode_TVA: periodeTva,
          taux,
        });
        alert("✅ TVA modifiée avec succès !");
      } else {
        // Ajouter une nouvelle TVA
        await axios.post("http://127.0.0.1:8000/api/tvas", {
          nom,
          periode_TVA: periodeTva,
          taux,
        });
        alert("✅ TVA ajoutée avec succès !");
      }
      setNom("");
      setPeriodeTva("");
      setTaux("");
      setEditId(null);
      fetchTvas();
    } catch (err) {
      console.error("Erreur lors de l'ajout ou de la modification de la TVA :", err);
      alert("❌ Une erreur s'est produite.");
    }
  };

  const handleEdit = (tva) => {
    setNom(tva.nom);
    setPeriodeTva(tva.periode_TVA);
    setTaux(tva.taux);
    setEditId(tva.id);
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
      <h2 className="text-2xl font-bold mb-4">Gestion des TVA</h2>

      {/* Formulaire d'ajout/modification */}
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      {/* Liste des TVA */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Liste des TVA</h3>
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
                  <button
                    onClick={() => handleEdit(tva)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(tva.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Supprimer
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

export default AddTva;