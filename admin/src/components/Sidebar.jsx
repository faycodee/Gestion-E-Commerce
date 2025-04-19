import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  ChevronDown,
  Home,
  ShoppingCart,
  Package,
  Users,
  MessageSquare,
  User,
  Settings,
  LogOut,
  List,
  Percent,
  Tag, // Importation de l'icône Tag pour les Réductions
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [showProducts, setShowProducts] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showTva, setShowTva] = useState(false);
  const [showReductions, setShowReductions] = useState(false); // State for Réductions dropdown

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-white shadow h-screen p-4 flex flex-col justify-between">
      <div className="space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/") ? "bg-gray-100 font-semibold" : "text-gray-700"
          }`}
        >
          <Home className="w-5 h-5" /> Dashboard
        </Link>

        <Link
          to="/orders"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/orders") ? "bg-gray-100 font-semibold" : "text-gray-700"
          }`}
        >
          <ShoppingCart className="w-5 h-5" /> Orders
        </Link>

        {/* Dropdown for Products */}
        <div className="relative">
          <button
            onClick={() => setShowProducts(!showProducts)}
            className="flex items-center justify-between w-full p-2 rounded text-gray-700 bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <Package className="w-5 h-5" /> Products
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showProducts ? "rotate-180" : ""
              }`}
            />
          </button>
          {showProducts && (
            <div className="ml-4 mt-1 bg-white border rounded shadow text-sm z-10">
              <Link
                to="/products"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/products") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                All Products
              </Link>
              <Link
                to="/products/add"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/products/add")
                    ? "font-semibold text-indigo-600"
                    : ""
                }`}
              >
                Add Product
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/customers"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/customers") ? "bg-gray-100 font-semibold" : "text-gray-700"
          }`}
        >
          <Users className="w-5 h-5" /> Customers
        </Link>

        <Link
          to="/chats"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/chats") ? "bg-gray-100 font-semibold" : "text-gray-700"
          }`}
        >
          <MessageSquare className="w-5 h-5" /> Chats
        </Link>

        {/* Dropdown for Categories */}
        <div className="relative">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center justify-between w-full p-2 rounded text-gray-700 bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <List className="w-5 h-5" /> Categories
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showCategories ? "rotate-180" : ""
              }`}
            />
          </button>
          {showCategories && (
            <div className="ml-4 mt-1 bg-white border rounded shadow text-sm z-10">
              <Link
                to="/categories"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/categories") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                All Categories
              </Link>
              <Link
                to="/categories/add"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/categories/add")
                    ? "font-semibold text-indigo-600"
                    : ""
                }`}
              >
                Add Category
              </Link>
            </div>
          )}
        </div>

        {/* Dropdown for TVA */}
        <div className="relative">
          <button
            onClick={() => setShowTva(!showTva)}
            className="flex items-center justify-between w-full p-2 rounded text-gray-700 bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <Percent className="w-5 h-5" /> TVA
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showTva ? "rotate-180" : ""
              }`}
            />
          </button>
          {showTva && (
            <div className="ml-4 mt-1 bg-white border rounded shadow text-sm z-10">
              <Link
                to="/tva/list"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/tva/list") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                Liste des TVA
              </Link>
              <Link
                to="/tva/manage"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/tva/manage") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                Gestion des TVA
              </Link>
            </div>
          )}
        </div>

        {/* Dropdown for Réductions */}
        <div className="relative">
          <button
            onClick={() => setShowReductions(!showReductions)}
            className="flex items-center justify-between w-full p-2 rounded text-gray-700 bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <Tag className="w-5 h-5" /> Réductions
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showReductions ? "rotate-180" : ""
              }`}
            />
          </button>
          {showReductions && (
            <div className="ml-4 mt-1 bg-white border rounded shadow text-sm z-10">
              <Link
                to="/reductions/list"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/reductions/list") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                Liste des Réductions
              </Link>
              <Link
                to="/reductions/add"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/reductions/add") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                Ajouter Réduction
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Link
          to="/profile"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/profile") ? "bg-gray-100 font-semibold" : "text-gray-700"
          }`}
        >
          <User className="w-5 h-5" /> Profile
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-2 p-2 text-gray-700"
        >
          <Settings className="w-5 h-5" /> Settings
        </Link>
        <Link
          to="/logout"
          className="flex items-center gap-2 p-2 text-gray-700"
        >
          <LogOut className="w-5 h-5" /> Logout
        </Link>

        <button className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-full">
          Generate Report +
        </button>
      </div>
    </div>
  );
};

export default Sidebar;