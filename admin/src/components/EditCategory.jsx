import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";

const EditCategory = () => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageActuelle, setImageActuelle] = useState("");
  const [message, setMessage] = useState("");
  const formulaireRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Récupérer les données de la catégorie existante
    axios
      .get(`http://localhost:8000/api/categories/${id}`)
      .then((response) => {
        const categorie = response.data;
        setNom(categorie.nom);
        setDescription(categorie.description);
        setImageActuelle(categorie.image);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement de la catégorie :", error);
        setMessage("Erreur lors du chargement des données de la catégorie.");
      });

    // Animation GSAP
    gsap.fromTo(
      formulaireRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    formData.append("_method", "PUT"); // Laravel nécessite cela pour les requêtes PUT avec FormData

    axios
      .post(`http://localhost:8000/api/categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMessage("✅ Catégorie mise à jour avec succès !");
        setTimeout(() => {
          navigate("/categories");
        }, 1000);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la catégorie :", error);
        setMessage("❌ Erreur lors de la mise à jour de la catégorie.");
      });
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Modifier la Catégorie
      </h1>
      {message && (
        <p className="mb-4 text-center text-green-600 font-medium">{message}</p>
      )}
      <form
        ref={formulaireRef}
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom de la catégorie
          </label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          {imageActuelle && (
            <img
              src={imageActuelle}
              alt="Catégorie actuelle"
              className="w-32 h-32 object-cover mb-4 rounded-md shadow-md"
            />
          )}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Modifier
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md shadow-md hover:bg-gray-400 transition duration-300"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;