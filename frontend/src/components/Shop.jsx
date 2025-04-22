import React, { useEffect, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Alert from "./Alert";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const productsResponse = await axios.get(
          "http://127.0.0.1:8000/api/produits"
        );
        setProducts(productsResponse.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    gsap.from(".product-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
    });
  }, [products]);

  const getProductImage = (productId) => {
    const product = products.find((prod) => prod.id === productId);
    return product
      ? `http://127.0.0.1:8000/storage/${product.image}`
      : "/images/default.jpg";
  };

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

      // Fetch the user's cart
      const panierResponse = await axios.get(
        "http://127.0.0.1:8000/api/paniers"
      );
      let userPanier = panierResponse.data.find(
        (panier) => panier.user_id === userId
      );

      // Replace the cart creation block with this updated version:
      if (!userPanier) {
        try {
          // Create a new cart for the user with required fields
          const createPanierResponse = await axios.post(
            "http://127.0.0.1:8000/api/paniers",
            {
              user_id: userId,
              montant: 0,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          if (createPanierResponse.status === 201) {
            userPanier = createPanierResponse.data;
          } else {
            throw new Error("Failed to create cart");
          }
        } catch (error) {
          console.error(
            "Error creating cart:",
            error.response?.data || error.message
          );
          setAlert({
            show: true,
            message:
              error.response?.data?.message ||
              "Failed to create a new cart. Please try again.",
            type: "error",
          });
          return;
        }
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
          console.warn(
            "No items found in the cart. Proceeding to add the product."
          );
        } else {
          throw error;
        }
      }

      if (existingProduct) {
        // Update the quantity of the existing product
        const newQuantity = existingProduct.quantity + quantity;

        // Check if the new quantity exceeds available stock
        if (newQuantity > availableQuantity) {
          setAlert({
            show: true,
            message: `Only ${availableQuantity} items available in stock.`,
            type: "error",
          });
          return;
        }

        // Update the quantity
        const updateResponse = await axios.put(
          `http://127.0.0.1:8000/api/ligne-panier/${existingProduct.id}`,
          {
            quantity: newQuantity,
          }
        );

        if (updateResponse.status === 200) {
          setAlert({
            show: true,
            message: `Updated quantity of ${product.nom} in your cart!`,
            type: "success",
          });
        }
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
        "Error managing cart:",
        error.response?.data || error.message
      );
      setAlert({
        show: true,
        message: "Failed to update cart. Please try again.",
        type: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center  bg-background dark:bg-darkBackground">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center  bg-background dark:bg-darkBackground">
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

  const filteredProducts = products.filter((product) =>
    product.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen p-8  bg-background dark:bg-darkBackground">
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div className="text-center mb-8 mt-[50px]">
        <h1
          className="text-[90px] font-bold mb-[10px] text-primary dark:text-darkPrimary"
          style={{ fontFamily: "Impact, Haettenschweiler" }}
        >
          Our Shop
        </h1>
        <p className="text-gray-600 mt-2">
          Explore our wide range of products and find what suits you best.
        </p>
      </div>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for products..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {currentProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">
            No products found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
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
                  {product.prix_HT} MAD
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Available: {checkStock(product.id)} in stock
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
                    disabled={checkStock(product.id) <= 0}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-300 w-1/2 ${
                      checkStock(product.id) <= 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    <FaShoppingCart className="mr-2" />
                    {checkStock(product.id) <= 0 ? "Out of Stock" : "Add "}
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

      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Shop;
