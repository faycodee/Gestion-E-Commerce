import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditLivraison = () => {
  const { id } = useParams(); // Get the livraison ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    frais_expedition: "",
    nom_transporteur: "",
    date_envoi: "",
    URL_suivi: "",
    poid: "",
    estime_arrive: "",
    status: "pending",
    commande_id: "",
  });

  useEffect(() => {
    // Fetch the livraison details by ID
    axios
      .get(`http://localhost:8000/api/livraisons/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching livraison:", error);
        alert("Erreur lors de la récupération des données de la livraison.");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/livraisons/${id}`, formData)
      .then(() => {
        alert("Livraison mise à jour avec succès !");
        navigate("/livraisons"); // Navigate back to the list
      })
      .catch((error) => {
        console.error("Error updating livraison:", error);
        alert("Erreur lors de la mise à jour de la livraison.");
      });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Modifier Livraison</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Frais d'expédition</label>
            <input
              type="number"
              name="frais_expedition"
              value={formData.frais_expedition}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nom du Transporteur</label>
            <input
              type="text"
              name="nom_transporteur"
              value={formData.nom_transporteur}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date d'envoi</label>
            <input
              type="date"
              name="date_envoi"
              value={formData.date_envoi}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">URL de suivi</label>
            <input
              type="text"
              name="URL_suivi"
              value={formData.URL_suivi}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Poids</label>
            <input
              type="number"
              name="poid"
              value={formData.poid}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Estimation d'arrivée</label>
            <input
              type="date"
              name="estime_arrive"
              value={formData.estime_arrive}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Commande ID</label>
            <input
              type="number"
              name="commande_id"
              value={formData.commande_id}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLivraison;