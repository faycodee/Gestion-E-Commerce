import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    first_name: "",
    email: "",
    role: "",
    tele: "", // Téléphone
    adresse: "", // Adresse
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/users/${id}`);
      setForm({
        name: res.data.name || "",
        first_name: res.data.first_name || "",
        email: res.data.email || "",
        role: res.data.role || "",
        tele: res.data.tele || "", // Vérifiez que ce champ est renvoyé par l'API
        adresse: res.data.adresse || "", // Vérifiez que ce champ est renvoyé par l'API
      });
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form); // Vérifiez les données envoyées
    try {
      await axios.put(`http://127.0.0.1:8000/api/users/${id}`, form);
      alert("✅ User updated successfully!");
      navigate("/customers");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("❌ Error updating user");
    }
  };

  const handleCancel = () => {
    navigate("/customers");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold">Edit User</h2>
      <input
        name="first_name"
        placeholder="First Name"
        value={form.first_name}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="name"
        placeholder="Last Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="tele"
        placeholder="Téléphone"
        value={form.tele}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <textarea
        name="adresse"
        placeholder="Adresse"
        value={form.adresse}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUser;
