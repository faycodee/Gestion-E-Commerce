import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter(
      (product) => product.id !== productId
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert("Product removed from Favorites!");
  };

  return (
    <div className="bg-background dark:bg-darkBackground min-h-screen p-8">
     
      <div className="mb-8 m-auto flex flex-col mt-10 justify-center items-center">
      <h1
            className="text-[90px] font-bold mb-[80px] text-primary dark:text-darkPrimary"
            style={{ fontFamily: "Impact, Haettenschweiler" }}
          >
            {/* {t("about.1")}.&apos; */}
            Your Favorites
          </h1>
      </div>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={`http://127.0.0.1:8000/storage/${product.image}`}
                alt={product.nom}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {product.nom}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-gray-900 mb-4">
                  {product.prix_HT} MAD
                </p>
                <div className="flex justify-between items-center space-x-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 w-1/2"
                  >
                    Show Details
                  </Link>
                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 w-1/2"
                  >
                    Remove
                  </button>
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
