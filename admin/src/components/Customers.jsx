import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState(""); // État pour le filtre
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [usersPerPage] = useState(5); // Nombre d'utilisateurs par page
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Animation GSAP pour les lignes du tableau
    gsap.fromTo(
      ".user-row",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );
  }, [users]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user", err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleAddUser = () => {
    navigate("/add-user");
  };

  // Filtrer les utilisateurs par rôle
  const filteredUsers = filterRole
    ? users.filter((user) => user.role === filterRole)
    : users;

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <button
          onClick={handleAddUser}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      {/* Filtre par rôle */}
      <div className="mb-4">
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr className="text-left bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Téléphone</th>
              <th className="px-4 py-2">Adresse</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="user-row border-b border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.first_name}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.tele || "N/A"}</td>
                <td className="px-4 py-2">{user.adresse || "N/A"}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
        >
          ⬅️ Précédent
        </button>
        <span className="text-gray-600">
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
        >
          Suivant ➡️
        </button>
      </div>
    </div>
  );
};

export default Customers;
