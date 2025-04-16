import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user"))?.id; // Get the logged-in user's ID

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setIsLoading(true);

        // Fetch favourites for the logged-in user
        const favouritesResponse = await axios.get(
          `http://localhost:8000/api/favourites`
        );

        // Filter favourites by the logged-in user's ID
        const userFavourites = favouritesResponse.data.filter(
          (fav) => fav.user_id === userId
        );

        setFavourites(userFavourites);

        // Fetch product details for each favourite
        const productPromises = userFavourites.map((fav) =>
          axios.get(`http://localhost:8000/api/produits/${fav.id}`)
        );

        const productResponses = await Promise.all(productPromises);
        setProducts(productResponses.map((res) => res.data));

        setError(null);
      } catch (err) {
        setError("Failed to fetch favourites. Please try again later.");
        console.error("Error fetching favourites:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchFavourites();
    } else {
      setError("You must be logged in to view your favourites.");
      setIsLoading(false);
    }
  }, [userId]);

  const removeFromFavourites = async (favouriteId) => {
    try {
      // Remove the favourite from the backend
      await axios.delete(`http://localhost:8000/api/favourites/${favouriteId}`);

      // Update the state to remove the favourite from the list
      setFavourites(favourites.filter((fav) => fav.id !== favouriteId));
      setProducts(products.filter((product) => product.id !== favouriteId));
    } catch (err) {
      console.error("Error removing favourite:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">No favourites found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="text-center mb-8 mt-[50px]">
        <h1 className="text-4xl font-bold text-gray-800">My Favourites</h1>
        <p className="text-gray-600 mt-2">
          Here are the products you've added to your favourites.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
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
                <button
                  onClick={() => removeFromFavourites(product.id)}
                  className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 w-full"
                >
                  <FaTrash className="mr-2" /> Remove
                </button>
              </div>
              <Link
                to={`/product/${product.id}`}
                className="block bg-blue-500 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 mt-4"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
