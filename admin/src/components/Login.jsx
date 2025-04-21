import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import {
  FaGoogle,
  FaFacebookF,
  FaLinkedinIn,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { RiMailLine } from "react-icons/ri";
import axios from "axios";

const Login = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      setSuccessMessage("Connexion réussie !");
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Une erreur est survenue lors de la connexion."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full m-4">
        {/* Section droite - Formulaire */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Connexion</h2>

          <div className="flex space-x-4 mb-6">
            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <FaGoogle className="text-red-500 text-xl" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <FaFacebookF className="text-blue-600 text-xl" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <FaLinkedinIn className="text-blue-500 text-xl" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Formulaire de connexion */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <RiMailLine className="absolute right-3 top-3 text-gray-400 text-xl" />
              <input
                type="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <Link
              to="/forgot-password"
              className="block text-sm text-primary hover:underline text-left"
            >
              Mot de passe oublié ?
            </Link>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 text-white rounded-lg transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90"
              }`}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>
        </div>

        {/* Section gauche - Bienvenue */}
        <div className="p-8 md:w-1/2 bg-primary text-white flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold mb-6">Bienvenue !</h2>
          <p className="mb-8 text-lg">
            Connectez-vous pour accéder à votre compte et commencer votre
            aventure avec nous.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
