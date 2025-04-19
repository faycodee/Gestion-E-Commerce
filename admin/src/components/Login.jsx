import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa"; // Import social icons
import { RiLockPasswordLine, RiMailLine } from "react-icons/ri"; // Import input field icons
import axios from "axios"; // Import Axios

const Login = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password, // Use 'password' as expected by the backend
      });

      // Save the token and user in localStorage
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Trigger a custom event to notify other components
      window.dispatchEvent(new Event("storage"));

      // Redirect to the home page
      window.location.href = "/";

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
        <div className="p-8 md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Sign In
          </h2>
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
            or use your email account:
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
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
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Your Password?
            </Link>
            <button
              type="submit"
              className="w-full mt-4 p-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="p-8 md:w-1/2 bg-primary text-white flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Hello, Friend!</h2>
          <p className="mb-6 text-center">
            Login with your personal details to use all of our features.
          </p>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
