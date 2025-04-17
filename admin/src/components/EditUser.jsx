import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", first_name: "", email: "", role: "user" });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/users/${id}`).then((res) => {
      setForm(res.data);
    }).catch((err) => {
      console.error(err);
    });
  }, [id]);
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://127.0.0.1:8000/api/users/${id}`, form);
    alert("✅ User updated");
    navigate("/customers");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold">Edit User</h2>
      <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} className="border p-2 w-full" />
      <input name="name" placeholder="Last Name" value={form.name} onChange={handleChange} className="border p-2 w-full" />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 w-full" />
      <select name="role" value={form.role} onChange={handleChange} className="border p-2 w-full">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <div className="flex gap-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
        <button type="button" onClick={() => navigate("/customers")} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default EditUser;
