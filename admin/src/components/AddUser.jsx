import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [form, setForm] = useState({
    name: "",
    first_name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // تأكد من أنك ترسل البيانات إلى الـ API بشكل صحيح بدون id
      const response = await axios.post("http://127.0.0.1:8000/api/users", form);

      if (response.status === 201) {
        alert("✅ User added!");
        // إعادة تعيين النموذج بعد إضافة المستخدم
        setForm({ name: "", first_name: "", email: "", password: "", role: "" });
      }
    } catch (err) {
      console.error("Error adding user:", err);
      alert("❌ Error adding user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold">Add User</h2>
      <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} className="border p-2 w-full" />
      <input name="name" placeholder="Last Name" value={form.name} onChange={handleChange} className="border p-2 w-full" />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 w-full" />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="border p-2 w-full" />
      <select name="role" value={form.role} onChange={handleChange} className="border p-2 w-full">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
};

export default AddUser;
