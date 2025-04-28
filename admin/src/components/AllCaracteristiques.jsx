import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid"; // Import icons

const CaracteristiquesList = () => {
  const [caracteristiques, setCaracteristiques] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editCouleur, setEditCouleur] = useState("");
  const [editTaille, setEditTaille] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCaracteristiques();
  }, []);

  const fetchCaracteristiques = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/caracteristiques");
      setCaracteristiques(response.data);
    } catch (error) {
      console.error("Error fetching caractéristiques:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this caractéristique?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/caracteristiques/${id}`);
      setCaracteristiques(caracteristiques.filter((item) => item.id !== id));
      alert("Caractéristique deleted successfully!");
    } catch (error) {
      console.error("Error deleting caractéristique:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditCouleur(item.couleur);
    setEditTaille(item.taille);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm("Are you sure you want to update this caractéristique?");
    if (!confirmUpdate) return;

    try {
      await axios.put(`http://localhost:8000/api/caracteristiques/${editId}`, {
        couleur: editCouleur,
        taille: editTaille,
      });
      alert("Caractéristique updated successfully!");
      setEditId(null);
      fetchCaracteristiques();
    } catch (error) {
      console.error("Error updating caractéristique:", error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = caracteristiques.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(caracteristiques.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">All Caractéristiques</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Couleur</th>
            <th className="px-4 py-2 border">Taille</th>
            <th className="px-4 py-2 border">Produit</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 border">{item.id}</td>
              <td className="px-4 py-2 border">
                {editId === item.id ? (
                  <input
                    type="text"
                    value={editCouleur}
                    onChange={(e) => setEditCouleur(e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  item.couleur
                )}
              </td>
              <td className="px-4 py-2 border">
                {editId === item.id ? (
                  <input
                    type="text"
                    value={editTaille}
                    onChange={(e) => setEditTaille(e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  item.taille
                )}
              </td>
              <td className="px-4 py-2 border">{item.produit_nom}</td>
              <td className="px-4 py-2 border flex items-center gap-2">
                {editId === item.id ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-all duration-300"
                    >
                      <CheckIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-all duration-300"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-all duration-300"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CaracteristiquesList;