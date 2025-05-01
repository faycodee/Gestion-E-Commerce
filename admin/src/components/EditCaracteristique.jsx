import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCaracteristique = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // For navigation after successful update
  const [caracteristique, setCaracteristique] = useState({
    couleur: "",
    taille: "",
    produit_id: "",
  });

  // Fetch the caracteristique data when the component mounts
  useEffect(() => {
    fetchCaracteristique();
  }, []);

  const fetchCaracteristique = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/caracteristiques/${id}`);
      setCaracteristique(response.data); // Set the fetched data to state
    } catch (error) {
      console.error("Erreur lors de la récupération de la caractéristique :", error);
      alert("❌ Impossible de charger la caractéristique. Veuillez réessayer plus tard.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setCaracteristique({ ...caracteristique, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/caracteristiques/${id}`, caracteristique);
      alert("✅ Caractéristique mise à jour avec succès !");
      navigate("/caracteristiques"); // Redirect to the list page
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la caractéristique :", error);
      alert("❌ Une erreur s'est produite lors de la mise à jour.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Modifier la caractéristique</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Couleur</label>
          <input
            type="text"
            name="couleur"
            value={caracteristique.couleur}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Taille</label>
          <input
            type="text"
            name="taille"
            value={caracteristique.taille}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Produit ID</label>
          <input
            type="number"
            name="produit_id"
            value={caracteristique.produit_id}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Editer
        </button>
      </form>
    </div>
  );
};

export default EditCaracteristique;