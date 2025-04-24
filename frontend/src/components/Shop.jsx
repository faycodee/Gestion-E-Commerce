import React, { useEffect, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Alert from "./Alert";

const Shop = () => {
  const navigate = useNavigate();
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

  // const getProductImage = (productId) => {
  //   const product = products.find((prod) => prod.id === productId);
  //   return product
  //     ? `http://127.0.0.1:8000/storage/${product.image}`
  //     : "/images/default.jpg";
  // };

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
        // Replace the product grid section with this new design:
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow"
            >
              <div
                className="relative group"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={`http://127.0.0.1:8000/storage/${product.image}`}
                  alt={product.nom}
                  className="w-full h-[250px] object-cover rounded-lg"
                />
                {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg">
                  <div className="absolute z-50 top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  
                  </div>
                </div> */}
              </div>

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
                      className=" p-2 rounded-full relative z-30 shadow-md hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <FaHeart className="text-xl " />
                    </button>{" "}
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
