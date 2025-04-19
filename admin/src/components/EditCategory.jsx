import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";

const EditCategory = () => {
  const { id } = useParams(); // Récupérer l'ID de la catégorie
  const navigate = useNavigate();
  const formRef = useRef(null); // Ref pour l'animation GSAP
  const [form, setForm] = useState({
    nom: "",
    description: "",
    image: null,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Animation GSAP pour le formulaire
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Récupérer les données de la catégorie
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/categories/${id}`);
      setForm({
        nom: res.data.nom,
        description: res.data.description,
        image: null, // L'image sera mise à jour uniquement si elle est modifiée
      });
    } catch (err) {
      console.error("Erreur lors de la récupération de la catégorie :", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] }); // Gérer le fichier pour l'image
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom", form.nom); // إزالة المسافات الزائدة
    formData.append("description", form.description);
    if (form.image) {
      formData.append("image", form.image);
    }

    // عرض البيانات في وحدة التحكم قبل الإرسال
    console.log("Données envoyées au serveur:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      await axios.put(`http://localhost:8000/api/categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("✅ La catégorie a été modifiée avec succès !");
      setTimeout(() => {
        navigate("/categories"); // Rediriger vers /categories après succès
      }, 1000);
    } catch (err) {
      console.error("Erreur lors de la modification de la catégorie :", err);
      if (err.response && err.response.data) {
        console.log("Détails de l'erreur :", err.response.data);
        setMessage(`❌ Erreur: ${err.response.data.message || "Validation échouée."}`);
      } else {
        setMessage("❌ Une erreur s'est produite lors de la modification de la catégorie.");
      }
    }
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <form
      ref={formRef} // Ref pour l'animation
      onSubmit={handleSubmit}
      className="space-y-4 p-6 max-w-xl mx-auto bg-white rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Modifier la Catégorie</h2>
      {message && <p className="text-center text-green-600">{message}</p>}
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={form.nom}
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition"
      />
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Modifier
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default EditCategory;