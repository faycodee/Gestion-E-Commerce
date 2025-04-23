import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid"; // استيراد الأيقونات

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]); // To store user details
  const [formData, setFormData] = useState({
    user_id: "",
    commentaire: "",
    date_achat: "",
    statut: "",
  });
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    // Fetch orders
    axios.get("http://localhost:8000/api/commandes").then((response) => {
      setOrders(response.data);
    });

    // Fetch users
    axios.get("http://localhost:8000/api/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  useEffect(() => {
    if (editingOrderId && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [editingOrderId]);

  const getUserDetails = (userId, field) => {
    const user = users.find((user) => user.id === userId);
    return user ? user[field] || "N/A" : "N/A";
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingOrderId) {
      axios
        .put(`http://localhost:8000/api/commandes/${editingOrderId}`, formData)
        .then(() => {
          setOrders((prev) =>
            prev.map((order) =>
              order.id === editingOrderId ? { ...order, ...formData } : order
            )
          );
          setEditingOrderId(null);
          setFormData({
            user_id: "",
            commentaire: "",
            date_achat: "",
            statut: "",
          });
          alert("✅ La commande a été modifiée avec succès !");
        })
        .catch((err) => {
          console.error("Erreur lors de la modification :", err);
          alert("❌ Une erreur s'est produite lors de la modification.");
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
      axios
        .delete(`http://localhost:8000/api/commandes/${id}`)
        .then(() => {
          setOrders(orders.filter((order) => order.id !== id));
          alert("✅ La commande a été supprimée avec succès !");
        })
        .catch((err) => {
          console.error("Erreur lors de la suppression :", err);
          alert("❌ Une erreur s'est produite lors de la suppression.");
        });
    }
  };

  const handleEdit = (order) => {
    setEditingOrderId(order.id);
    setFormData({
      user_id: order.user_id,
      commentaire: order.commentaire,
      date_achat: order.date_achat,
      statut: order.statut,
    });
  };

  const handleShowProducts = (commandeId) => {
    navigate(`/orders/${commandeId}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {editingOrderId && (
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="bg-gray-100 p-4 mb-6 rounded-lg shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Modifier la commande</h2>
          <div className="flex flex-wrap gap-3">
            <input
              type="number"
              name="user_id"
              placeholder="User ID"
              value={formData.user_id}
              onChange={handleInputChange}
              className="border p-2 flex-1 min-w-[150px]"
              required
            />
            <input
              type="text"
              name="commentaire"
              placeholder="Commentaire"
              value={formData.commentaire}
              onChange={handleInputChange}
              className="border p-2 flex-1 min-w-[150px]"
            />
            <input
              type="date"
              name="date_achat"
              value={formData.date_achat}
              onChange={handleInputChange}
              className="border p-2 flex-1 min-w-[150px]"
              required
            />
            <input
              type="text"
              name="statut"
              placeholder="Statut"
              value={formData.statut}
              onChange={handleInputChange}
              className="border p-2 flex-1 min-w-[150px]"
              required
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2"
            >
              ✅ Update
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingOrderId(null);
                setFormData({
                  user_id: "",
                  commentaire: "",
                  date_achat: "",
                  statut: "",
                });
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      )}

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Téléphone</th>
            <th className="border p-2">Adresse</th>
            <th className="border p-2">Commentaire</th>
            <th className="border p-2">Date Achat</th>
            <th className="border p-2">Statut</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.user_id}</td>
              <td className="border p-2">{getUserDetails(order.user_id, "tele")}</td>
              <td className="border p-2">{getUserDetails(order.user_id, "adresse")}</td>
              <td className="border p-2">{order.commentaire}</td>
              <td className="border p-2">{order.date_achat}</td>
              <td className="border p-2">{order.statut}</td>
              <td className="border p-2 flex justify-center gap-4">
                {/* Show Products Button */}
                <button
                  onClick={() => handleShowProducts(order.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-10 h-10 flex items-center justify-center"
                  title="Afficher les produits"
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(order)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center"
                  title="Modifier"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(order.id)}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center"
                  title="Supprimer"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`p-2 px-4 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Orders;