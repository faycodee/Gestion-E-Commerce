import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ChevronDown,
  Home,
  ShoppingCart,
  Package,
  Users,
  MessageSquare,
  List,
  Percent,
  Tag,
  Settings,
  Scissors, // Icon for Reductions
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProducts, setShowProducts] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showTva, setShowTva] = useState(false);
  const [showCaracteristiques, setShowCaracteristiques] = useState(false);
  const [showReductions, setShowReductions] = useState(false); // State for Reductions dropdown
  const [showLivraisons, setShowLivraisons] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-white shadow h-screen p-4 flex flex-col justify-between">
      <div className="space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/") ? "bg-gray-100 font-semibold" : "text-gray-700"
          } hover:bg-gray-100 transition`}
        >
          <Home className="w-5 h-5" /> Dashboard
        </Link>

        <Link
          to="/orders"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/orders") ? "bg-gray-100 font-semibold" : "text-gray-700"
          } hover:bg-gray-100 transition`}
        >
          <ShoppingCart className="w-5 h-5" /> Orders
        </Link>

        {/* Dropdown for Products */}
        <div className="relative">
          <button
            onClick={() => setShowProducts(!showProducts)}
            className="flex items-center justify-between w-full p-2 rounded text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
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

        {/* Dropdown for Categories */}
        <div className="relative">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center justify-between w-full p-2 rounded text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
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
                  isActive("/categories/add") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                Add Category
              </Link>
            </div>
          )}
        </div>

        {/* Dropdown for Reductions */}
        <div className="relative">
          <button
            onClick={() => setShowReductions(!showReductions)}
            className="flex items-center justify-between w-full p-2 rounded text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
          >
            <span className="flex items-center gap-2">
              <Scissors className="w-5 h-5" /> Reductions
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
                All Reductions
              </Link>
              <Link
                to="/reductions/add"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/reductions/add") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                Add Reduction
              </Link>
            </div>
          )}
        </div>

        {/* Dropdown for TVA */}
        <div className="relative">
          <button
            onClick={() => setShowTva(!showTva)}
            className="flex items-center justify-between w-full p-2 rounded text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
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
                to="/tvas"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/tvas") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                All TVA
              </Link>
              <Link
                to="/tvas/add"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/tvas/add") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                Add TVA
              </Link>
            </div>
          )}
        </div>

        {/* Dropdown for Caractéristiques */}
        <div className="relative">
          <button
            onClick={() => setShowCaracteristiques(!showCaracteristiques)}
            className="flex items-center justify-between w-full p-2 rounded text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
          >
            <span className="flex items-center gap-2">
              <Settings className="w-5 h-5" /> Caractéristiques
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showCaracteristiques ? "rotate-180" : ""
              }`}
            />
          </button>
          {showCaracteristiques && (
            <div className="ml-4 mt-1 bg-white border rounded shadow text-sm z-10">
                      <Link
          to="/caracteristiques"
          className={`block px-4 py-2 hover:bg-gray-50 ${
            isActive("/caracteristiques") ? "font-semibold text-indigo-600" : ""
          }`}
        >
          All Caractéristiques
        </Link>
              <Link
                to="/caracteristiques/add"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/caracteristiques/add") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                Add Caractéristique
              </Link>
            </div>
          )}
        </div>

        {/* Link for Livraisons */}
        <Link
          to="/livraisons"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/livraisons") ? "bg-gray-100 font-semibold" : "text-gray-700"
          } hover:bg-gray-100 transition`}
        >
          <Package className="w-5 h-5" /> Livraisons
        </Link>

        <Link
          to="/customers"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/customers") ? "bg-gray-100 font-semibold" : "text-gray-700"
          } hover:bg-gray-100 transition`}
        >
          <Users className="w-5 h-5" /> Customers
        </Link>

        <Link
          to="/chats"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/chats") ? "bg-gray-100 font-semibold" : "text-gray-700"
          } hover:bg-gray-100 transition`}
        >
          <MessageSquare className="w-5 h-5" /> Chats
        </Link>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => navigate("/reports")}
          className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-full transition"
        >
          Generate Report +
        </button>
      </div>
    </div>
  );
};

export default Sidebar;