import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Alert from "./Alert";

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/produits");
        setProducts(response.data.slice(0, 8)); // Limit to 8 products
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

  const checkStock = (productId) => {
    const product = products.find((prod) => prod.id === productId);
    return product ? product.quantity : 0;
  };

  const addToFavorites = (product) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.some((fav) => fav.id === product.id)) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));

      setAlert({
        show: true,
        message: `${product.nom} added to Favorites!`,
        type: "success",
      });
    } else {
      setAlert({
        show: true,
        message: `${product.nom} is already in Favorites!`,
        type: "info",
      });
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?.id;

      if (!userId) {
        setAlert({
          show: true,
          message: "You must be logged in to add products to the cart.",
          type: "error",
        });
        return;
      }

      const availableQuantity = checkStock(product.id);
      if (availableQuantity <= 0) {
        setAlert({
          show: true,
          message: "This product is out of stock.",
          type: "error",
        });
        return;
      }

      if (quantity > availableQuantity) {
        setAlert({
          show: true,
          message: `Only ${availableQuantity} items available in stock.`,
          type: "error",
        });
        return;
      }

      // Fetch the user's cart
      const panierResponse = await axios.get(
        "http://127.0.0.1:8000/api/paniers"
      );
      const userPanier = panierResponse.data.find(
        (panier) => panier.user_id === userId
      );

      if (!userPanier) {
        setAlert({
          show: true,
          message: "No cart found for the current user.",
          type: "error",
        });
        return;
      }

      let existingProduct = null;

      try {
        // Check if the product already exists in the user's cart
        const lignePanierResponse = await axios.get(
          `http://127.0.0.1:8000/api/ligne-panier/${userPanier.id}`
        );
        existingProduct = lignePanierResponse.data.find(
          (item) => item.produit_id === product.id
        );
      } catch (error) {
        if (error.response?.status === 404) {
          // No items in the cart, proceed to add the product
          console.warn(
            "No items found in the cart. Proceeding to add the product."
          );
        } else {
          throw error; // Re-throw other errors
        }
      }

      if (existingProduct) {
        // Show an alert if the product already exists in the cart
        setAlert({
          show: true,
          message: `${product.nom} is already in your cart.`,
          type: "info",
        });
        return;
      } else {
        // Add the product to the cart
        const addResponse = await axios.post(
          `http://127.0.0.1:8000/api/ligne-panier`,
          {
            panier_id: userPanier.id,
            produit_id: product.id,
            quantity: quantity,
          }
        );

        if (addResponse.status === 201) {
          setAlert({
            show: true,
            message: `Added ${quantity} item(s) of ${product.nom} to your cart!`,
            type: "success",
          });
        } else {
          throw new Error("Failed to add product to cart.");
        }
      }

      // Dispatch cartUpdated event
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error.response?.data || error.message
      );
      setAlert({
        show: true,
        message: "Failed to add product to cart. Please try again.",
        type: "error",
      });
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
    <div className="py-8 bg-background dark:bg-darkBackground">
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">No products available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="highlight-card bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow"
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
                      onClick={() => addToFavorites(product)}
                      className="p-2 rounded-full relative z-30 shadow-md hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <FaHeart className="text-xl" />
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={checkStock(product.id) <= 0}
                      className={`flex ml-3 items-center space-x-2 px-4 py-2 rounded-full text-sm transition-colors ${
                        checkStock(product.id) <= 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      <span>
                        {checkStock(product.id) <= 0
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </span>
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

export default Highlights;
