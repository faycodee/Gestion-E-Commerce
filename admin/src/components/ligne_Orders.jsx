import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const LigneOrders = () => {
  const { commande_id } = useParams(); // Get commande_id from URL
  const [ligneCommandes, setLigneCommandes] = useState([]);
  const [formData, setFormData] = useState({
    commande_id: "",
    produit_id: "",
    quantite: "",
    prix_unitaire: "",
  });
  const [editingLigneId, setEditingLigneId] = useState(null);

  // Fetch all ligne commandes
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/ligne-commandes?commande_id=${commande_id}`
      )
      .then((response) => {
        setLigneCommandes(response.data);
      });
  }, [commande_id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or update a ligne commande
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLigneId) {
      axios.put(`${editingLigneId}`, formData).then(() => {
        setLigneCommandes((prev) =>
          prev.map((ligne) =>
            ligne.id === editingLigneId ? { ...ligne, ...formData } : ligne
          )
        );
        setEditingLigneId(null);
        setFormData({
          commande_id: "",
          produit_id: "",
          quantite: "",
          prix_unitaire: "",
        });
      });
    } else {
      axios
        .post("http://localhost:8000/api/ligne-commandes/", formData)
        .then((response) => {
          setLigneCommandes([...ligneCommandes, response.data]);
          setFormData({
            commande_id: "",
            produit_id: "",
            quantite: "",
            prix_unitaire: "",
          });
        });
    }
  };

  // Delete a ligne commande
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/ligne-commandes//${id}`)
      .then(() => {
        setLigneCommandes(ligneCommandes.filter((ligne) => ligne.id !== id));
      });
  };

  // Edit a ligne commande
  const handleEdit = (ligne) => {
    setEditingLigneId(ligne.id);
    setFormData({
      commande_id: ligne.commande_id,
      produit_id: ligne.produit_id,
      quantite: ligne.quantite,
      prix_unitaire: ligne.prix_unitaire,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Ligne Orders for Commande ID: {commande_id}
      </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="number"
          name="commande_id"
          placeholder="Commande ID"
          value={formData.commande_id}
          onChange={handleInputChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="produit_id"
          placeholder="Produit ID"
          value={formData.produit_id}
          onChange={handleInputChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="quantite"
          placeholder="Quantité"
          value={formData.quantite}
          onChange={handleInputChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="prix_unitaire"
          placeholder="Prix Unitaire"
          value={formData.prix_unitaire}
          onChange={handleInputChange}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editingLigneId ? "Update" : "Create"}
        </button>
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Commande ID</th>
            <th className="border p-2">Produit ID</th>
            <th className="border p-2">Quantité</th>
            <th className="border p-2">Prix Unitaire</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ligneCommandes.filter((el)=>el.commande_id ==commande_id).map((ligne) => (
            <tr key={ligne.id}>
              <td className="border p-2">{ligne.id}</td>
              <td className="border p-2">{ligne.commande_id}</td>
              <td className="border p-2">{ligne.produit_id}</td>
              <td className="border p-2">{ligne.quantite}</td>
              <td className="border p-2">{ligne.prix_unitaire}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(ligne)}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ligne.id)}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LigneOrders;
