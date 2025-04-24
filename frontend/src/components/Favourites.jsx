import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import Alert from "./Alert";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter(
      (product) => product.id !== productId
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setAlert({
      show: true,
      message: "Product removed from Favorites!",
      type: "success",
    });
  };

  return (
    <div className="bg-background dark:bg-darkBackground min-h-screen p-8">
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div className="mb-8 m-auto flex flex-col mt-10 justify-center items-center">
        <h1
          className="text-[90px] font-bold mb-[80px] text-primary dark:text-darkPrimary"
          style={{ fontFamily: "Impact, Haettenschweiler" }}
        >
          Your Favorites
        </h1>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">No favorites added yet.</p>
          <Link
            to="/shop"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow"
            >
              <Link
                to={`/product/${product.id}`}
                className="relative group block"
              >
                <img
                  src={`http://127.0.0.1:8000/storage/${product.image}`}
                  alt={product.nom}
                  className="w-full h-[250px] object-cover rounded-lg"
                />
              </Link>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-800 line-clamp-1">
                    {product.nom}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 line-through mr-2">
                      ${(product.prix_HT * 1.2).toFixed(2)}
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      ${product.prix_HT}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={
                            star <= 4 ? "text-yellow-400" : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                  </div>

                  <div className="flex">
                    <button
                      onClick={() => removeFromFavorites(product.id)}
                      className="p-2 rounded-full relative z-30 shadow-md hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <FaTrash className="text-xl" />
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
