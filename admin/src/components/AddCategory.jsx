import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";

const AddCategory = () => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Animation GSAP
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage({ text: "", type: "" });

    try {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        "http://localhost:8000/api/categories",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage({
        text: "✅ Catégorie ajoutée avec succès !",
        type: "success",
      });

      // Réinitialiser le formulaire
      setNom("");
      setDescription("");
      setImage(null);

      // Redirection après 2 secondes
      setTimeout(() => {
        navigate("/categories");
      }, 2000);
    } catch (error) {
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        setErrors(validationErrors);
        setMessage({
          text: "❌ Veuillez corriger les erreurs ci-dessous.",
          type: "error",
        });
      } else {
        setMessage({
          text: "❌ Une erreur est survenue lors de l'ajout de la catégorie.",
          type: "error",
        });
      }
    }
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Ajouter une nouvelle catégorie</h1>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom de la catégorie
          </label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${
              errors.nom ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.nom && (
            <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${
              errors.image ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Ajouter la catégorie
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition duration-200"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;