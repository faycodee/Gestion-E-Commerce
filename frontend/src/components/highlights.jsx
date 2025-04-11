import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productsResponse, imagesResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/produits"),
          axios.get("http://127.0.0.1:8000/api/produit-images"),
        ]);

        setProducts(productsResponse.data.slice(0, 8));
        setProductImages(imagesResponse.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    gsap.from(".highlight-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".highlight-card",
        start: "top 80%",
      },
    });
  }, [products]);

  const getProductImage = (productId) => {
    const image = productImages.find((img) => img.id_produit === productId);
    return image ? image.url : "/images/default.jpg";
  };

  const addToFavorites = (product) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.some((fav) => fav.id === product.id)) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${product.nom} added to Favorites!`);
    } else {
      alert(`${product.nom} is already in Favorites!`);
    }
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.some((item) => item.id === product.id)) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.nom} added to Cart!`);
    } else {
      alert(`${product.nom} is already in Cart!`);
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

  return (
    <div className="bg-gray-100 py-8">
      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">No products available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="highlight-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={getProductImage(product.id)}
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
                  {product.prix} MAD
                </p>
                <div className="flex justify-between items-center space-x-2">
                  <button
                    onClick={() => addToFavorites(product)}
                    className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 w-1/2"
                  >
                    <FaHeart className="mr-2" /> Favorites
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 w-1/2"
                  >
                    <FaShoppingCart className="mr-2" /> Cart
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
      )}
    </div>
  );
};

export default Highlights;
