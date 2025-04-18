import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa"; // Import social icons
import { RiLockPasswordLine, RiMailLine, RiUserLine } from "react-icons/ri"; // Import input field icons
import axios from "axios";

const Signup = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        first_name: firstName,
        name,
        email,
        password,
        password_confirmation: passwordConfirmation, // Include password confirmation
      });

      // Save the token in localStorage
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to the login page or dashboard
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center min-h-screen bg-background dark:bg-darkBackground"
    >
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="p-8 md:w-1/2 bg-primary text-white flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
          <p className="mb-6 text-center">
            To keep connected with us, please login with your personal info.
          </p>
          <Link
            to="/login"
            className="px-6 py-2 border border-white rounded-md hover:bg-white hover:text-primary transition"
          >
            Sign In
          </Link>
        </div>

        {/* Right Side */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Sign Up
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex space-x-4 mb-6">
            <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              <FaGoogle className="text-red-500" />
            </button>
            <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              <FaFacebookF className="text-blue-600" />
            </button>
            <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              <FaLinkedinIn className="text-blue-500" />
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            or use your email for registration:
          </p>
          <form onSubmit={handleSignup}>
            <div className="relative mb-4">
              <RiUserLine className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="relative mb-4">
              <RiUserLine className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Last Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="relative mb-4">
              <RiMailLine className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="relative mb-4">
              <RiLockPasswordLine className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="relative mb-4">
              <RiLockPasswordLine className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 p-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
