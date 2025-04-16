import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [showProducts, setShowProducts] = useState(false);

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
          🏠 Dashboard
        </Link>

        <Link
          to="/orders"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/orders") ? "bg-gray-100 font-semibold" : "text-gray-700"
          }`}
        >
          🛒 Orders
        </Link>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProducts(!showProducts)}
            className="flex items-center justify-between w-full p-2 rounded text-gray-700 bg-gray-100"
          >
            <span className="flex items-center gap-2">🚚 Products</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showProducts ? "rotate-180" : ""}`} />
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
                  isActive("/products/add") ? "font-semibold text-indigo-600" : ""
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
          👥 Customers
        </Link>

        <Link
          to="/chats"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/chats") ? "bg-gray-100 font-semibold" : "text-gray-700"
          }`}
        >
          💬 Chats
        </Link>
      </div>

      <div className="space-y-2">
        <Link
          to="/profile"
          className={`flex items-center gap-2 p-2 rounded ${
            isActive("/profile") ? "bg-gray-100 font-semibold" : "text-gray-700"
          }`}
        >
          👤 Profile
        </Link>
        <Link to="/settings" className="flex items-center gap-2 p-2 text-gray-700">
          ⚙️ Settings
        </Link>
        <Link to="/logout" className="flex items-center gap-2 p-2 text-gray-700">
          🔓 Logout
        </Link>

        <button className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-full">
          Generate Report +
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
