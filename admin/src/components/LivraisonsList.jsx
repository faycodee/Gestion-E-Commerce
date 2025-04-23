import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const LivraisonsList = () => {
  const [livraisons, setLivraisons] = useState([]);
  const [filteredLivraisons, setFilteredLivraisons] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // For filtering by status
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const itemsPerPage = 10; // Number of items per page
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLivraisons();
  }, []);

  useEffect(() => {
    // Filter livraisons by status
    const filtered = statusFilter
      ? livraisons.filter((livraison) => livraison.status === statusFilter)
      : livraisons;
    setFilteredLivraisons(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [statusFilter, livraisons]);

  const fetchLivraisons = () => {
    axios
      .get("http://localhost:8000/api/livraisons")
      .then((response) => {
        setLivraisons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching livraisons:", error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette livraison ?")) {
      axios
        .delete(`http://localhost:8000/api/livraisons/${id}`)
        .then(() => {
          alert("Livraison supprimée avec succès !");
          fetchLivraisons(); // Refresh the list after deletion
        })
        .catch((error) => {
          console.error("Error deleting livraison:", error);
          alert("Erreur lors de la suppression de la livraison.");
        });
    }
  };

  useEffect(() => {
    // Animate table rows with GSAP
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current.querySelectorAll("tr"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
      );
    }
  }, [filteredLivraisons]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLivraisons.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredLivraisons.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Liste des Livraisons
      </h1>

      {/* Filter by Status */}
      <div className="mb-6 flex justify-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-1/3 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table
          ref={tableRef}
          className="min-w-full bg-white border rounded-lg shadow-lg overflow-hidden"
        >
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Frais Expédition</th>
              <th className="px-4 py-2 border">Nom Transporteur</th>
              <th className="px-4 py-2 border">Date Envoi</th>
              <th className="px-4 py-2 border">URL Suivi</th>
              <th className="px-4 py-2 border">Poids</th>
              <th className="px-4 py-2 border">Estimation Arrivée</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Commande ID</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((livraison) => (
              <tr key={livraison.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{livraison.id}</td>
                <td className="px-4 py-2 border">{livraison.frais_expedition}</td>
                <td className="px-4 py-2 border">{livraison.nom_transporteur}</td>
                <td className="px-4 py-2 border">{livraison.date_envoi}</td>
                <td className="px-4 py-2 border">
                  <a
                    href={livraison.URL_suivi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:text-purple-700"
                  >
                    <EyeIcon className="w-6 h-6 inline-block" />
                  </a>
                </td>
                <td className="px-4 py-2 border">{livraison.poid}</td>
                <td className="px-4 py-2 border">{livraison.estime_arrive}</td>
                <td className="px-4 py-2 border">{livraison.status}</td>
                <td className="px-4 py-2 border">{livraison.commande_id}</td>
                <td className="px-4 py-2 border flex gap-2 justify-center">
                  <button
                    onClick={() => navigate(`/livraisons/edit/${livraison.id}`)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <PencilIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleDelete(livraison.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LivraisonsList;