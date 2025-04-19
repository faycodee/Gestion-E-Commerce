import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
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

  // Fetch all orders
  useEffect(() => {
    axios.get("http://localhost:8000/api/commandes").then((response) => {
      setOrders(response.data);
    });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or update an order
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
        });
    } else {
      axios
        .post("http://localhost:8000/api/commandes", formData)
        .then((response) => {
          setOrders([...orders, response.data]);
          setFormData({
            user_id: "",
            commentaire: "",
            date_achat: "",
            statut: "",
          });
        });
    }
  };

  // Delete an order
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/commandes/${id}`).then(() => {
      setOrders(orders.filter((order) => order.id !== id));
    });
  };

  // Edit an order
  const handleEdit = (order) => {
    setEditingOrderId(order.id);
    setFormData({
      user_id: order.user_id,
      commentaire: order.commentaire,
      date_achat: order.date_achat,
      statut: order.statut,
    });
  };

  // Show products of an order
  const handleShowProducts = (commandeId) => {
    navigate(`/orders/${commandeId}`);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="number"
          name="user_id"
          placeholder="User ID"
          value={formData.user_id}
          onChange={handleInputChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="commentaire"
          placeholder="Commentaire"
          value={formData.commentaire}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          name="date_achat"
          value={formData.date_achat}
          onChange={handleInputChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="statut"
          placeholder="Statut"
          value={formData.statut}
          onChange={handleInputChange}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editingOrderId ? "Update" : "Create"}
        </button>
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">User ID</th>
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
              <td className="border p-2">{order.commentaire}</td>
              <td className="border p-2">{order.date_achat}</td>
              <td className="border p-2">{order.statut}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(order)}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="bg-red-500 text-white p-1 mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleShowProducts(order.id)}
                  className="bg-green-500 text-white p-1"
                >
                  Show Products
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`p-2 ${
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
