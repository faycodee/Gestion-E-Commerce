import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [form, setForm] = useState({
    first_name: "",
    name: "",
    email: "",
    password: "",
    role: "",
    tele: "",
    adresse: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form); // تحقق من البيانات المرسلة

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users", form);

      if (response.status === 201) {
        alert("✅ User added successfully!");
        setForm({
          first_name: "",
          name: "",
          email: "",
          password: "",
          role: "",
          tele: "",
          adresse: "",
        });
        navigate("/customers");
      }
    } catch (err) {
      console.error("Error adding user:", err.response?.data || err.message);
      alert("❌ Error adding user");
    }
  };

  const handleCancel = () => {
    navigate("/customers");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold">Add User</h2>
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
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
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
        <option value="">Select Role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
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

export default AddUser;
