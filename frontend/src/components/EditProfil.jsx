import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import {
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
} from "react-icons/ri";
import axios from "axios";

const EditProfil = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    name: "",
    email: "",
    tele: "",
    adresse: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          setError("Please login to access this page");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        const token = localStorage.getItem("auth_token");
        if (!token) {
          setError("Authentication token not found");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/users/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.data) {
          setFormData({
            first_name: response.data.first_name || "",
            name: response.data.name || "",
            email: response.data.email || "",
            tele: response.data.tele || "",
            adresse: response.data.adresse || "",
          });
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to fetch user data";
        setError(errorMessage);
        if (err.response?.status === 401) {
          setTimeout(() => navigate("/login"), 2000);
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("auth_token");

      if (!user || !token) {
        throw new Error("Authentication required");
      }

      const response = await axios.put(
        `http://localhost:8000/api/users/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Profile updated successfully!");

      // Update local storage with new data while preserving other user data
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Optional: Show success message and redirect
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "An error occurred while updating profile";
      setError(errorMessage);

      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        setTimeout(() => navigate("/login"), 2000);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center min-h-screen bg-background dark:bg-darkBackground"
    >
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-4xl m-4">
        {/* Left Side - Form */}
        <div className="p-8 md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Edit Profile
          </h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <RiUserLine className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="relative">
              <RiUserLine className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Last Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="relative">
              <RiMailLine className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="relative">
              <RiPhoneLine className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                name="tele"
                placeholder="Phone Number"
                value={formData.tele || ""}
                onChange={handleChange}
                className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="relative">
              <RiMapPinLine className="absolute left-3 top-3 text-gray-400" />
              <textarea
                name="adresse"
                placeholder="Address"
                value={formData.adresse || ""}
                onChange={handleChange}
                className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                rows="3"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 p-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 p-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Info */}
        <div className="p-8 md:w-1/3 bg-primary text-white flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
          <p className="text-center mb-6">
            Keep your profile information up to date to ensure smooth delivery
            and communication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfil;
