import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RiMenu3Line,
  RiCloseLine,
  RiShoppingBag2Line,
  RiSearchLine,
  RiUser3Line,
  RiHeartLine,
  RiTruckLine,
} from "react-icons/ri";
import { gsap } from "gsap";
import images from "../constants/images";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from "axios";

const Navbar = () => {
  const { t } = useTranslation();
  const buttonRef = useRef(null);
  const Mode = useSelector((state) => state.lightdark.mode);

  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // State for user menu dropdown
  const [user, setUser] = useState(null); // State to track the logged-in user
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", Mode === "dark");
  }, [Mode]);
  // Function to update the user state from localStorage
  const updateUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Initialize user state on component mount
    updateUserFromLocalStorage();

    // Add event listener for localStorage changes
    const handleStorageChange = () => {
      updateUserFromLocalStorage();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Move fetchCartCount to useCallback to prevent recreating on every render
  const fetchCartCount = useCallback(async () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    if (userId) {
      try {
        const panierResponse = await axios.get(
          "http://localhost:8000/api/paniers"
        );
        const userPanier = panierResponse.data.find(
          (panier) => panier.user_id === userId
        );

        if (userPanier) {
          const lignePanierResponse = await axios.get(
            `http://localhost:8000/api/ligne-panier/${userPanier.id}`
          );

          // Count the number of unique products in the cart
          const uniqueProductCount = lignePanierResponse.data.length;

          setCartItemCount(uniqueProductCount);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartItemCount(0);
      }
    } else {
      setCartItemCount(0);
    }
  }, []);

  // Update the useEffect to listen for cart updates
  useEffect(() => {
    fetchCartCount();

    // Listen for cart updates
    window.addEventListener("cartUpdated", fetchCartCount);
    // Listen for storage changes (login/logout)
    window.addEventListener("storage", fetchCartCount);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartCount);
      window.removeEventListener("storage", fetchCartCount);
    };
  }, [fetchCartCount]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
    setUserMenuOpen(false);
    setCartItemCount(0); // Reset cart count on logout

    // Trigger storage event to notify other components
    window.dispatchEvent(new Event("storage"));

    navigate("/");
  };

  const navLinks = [
    { to: "/", text: t("nav.1") }, // Home
    { to: "/shop", text: t("nav.2") }, // Shop
    { to: "/categories", text: t("nav.3") }, // Category
    { to: "/faq", text: t("nav.4") }, // FAQ
  ];

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      backgroundColor: "#000",
      color: "#fff",
      scale: 0.9,
      rotationX: 3,
      skewX: 5,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      backgroundColor: "#fff",
      color: "#333",
      scale: 1,
      rotation: 0,
      skewX: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <nav className="fixed z-50 w-full flex justify-between items-center px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img
            src={images.logo}
            alt="Store logo"
            className="h-8 w-auto cursor-pointer"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center space-x-8">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        <button className="hidden md:flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          <LanguageSwitcher />
        </button>
        <button
          onClick={() => navigate("/favourites")}
          className="hidden md:flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <RiHeartLine className="h-5 w-5" />
        </button>
        <button
          onClick={() => navigate("/livraison")}
          className="hidden md:flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <RiTruckLine className="h-5 w-5" />
        </button>
        <button
          className="relative p-2 group"
          onClick={() => navigate("/panier")}
        >
          <RiShoppingBag2Line className="h-5 w-5 text-gray-600 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white transition-colors duration-200" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center group-hover:bg-primary/90 transition-colors duration-200">
            {cartItemCount}
          </span>
        </button>

        {/* User Icon with Dropdown */}
        <div className="relative">
          {user ? (
            <div>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <RiUser3Line className="h-5 w-5" />
                <span className="ml-2">{user.first_name}</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden">
                  <Link
                    to="/edit-profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/Points"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Loyalty Points
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <RiMenu3Line className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {toggleMenu && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 lg:hidden">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setToggleMenu(false)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <RiCloseLine className="h-6 w-6" />
            </button>
          </div>
          <ul className="flex flex-col items-center space-y-8 pt-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setToggleMenu(false)}
                  className="text-xl text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
