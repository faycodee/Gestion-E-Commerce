import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // لإعادة التوجيه
import axios from "axios";
import { gsap } from "gsap";

const AddCategory = () => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate(); // استخدم useNavigate لإعادة التوجيه

  useEffect(() => {
    // Animation GSAP
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("image", image);

    axios
      .post("http://localhost:8000/api/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMessage("Catégorie ajoutée avec succès !");
        setNom("");
        setDescription("");
        setImage(null);

        // إعادة التوجيه إلى /categories بعد الإضافة
        setTimeout(() => {
          navigate("/categories");
        }, 1000); // انتظر ثانية واحدة قبل إعادة التوجيه
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la catégorie :", error);
        setMessage("Erreur lors de l'ajout de la catégorie.");
      });
  };

  const handleCancel = () => {
    navigate("/categories"); // إعادة التوجيه إلى /categories عند الضغط على Cancel
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Category
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;