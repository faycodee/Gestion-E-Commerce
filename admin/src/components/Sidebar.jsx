import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
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
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProducts, setShowProducts] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showTva, setShowTva] = useState(false); // State for TVA dropdown
  const [showReductions, setShowReductions] = useState(false);
  const [showLivraisons, setShowLivraisons] = useState(false);
  const sidebarRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    // Animate the sidebar with GSAP
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="w-64 bg-white shadow h-screen p-4 flex flex-col justify-between"
    >
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
                to="/tva"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/tva") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                All TVA
              </Link>
              <Link
                to="/tva/add"
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  isActive("/tva/add") ? "font-semibold text-indigo-600" : ""
                }`}
              >
                Add TVA
              </Link>
            </div>
          )}
        </div>

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