import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Alert from "./Alert";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [characteristics, setCharacteristics] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/produits/${id}`
        );
        setProduct(response.data);

        // Fetch characteristics
        const characteristicsResponse = await axios.get(
          `http://127.0.0.1:8000/api/caracteristiques`
        );
        const productCharacteristics = characteristicsResponse.data.data.filter(
          (char) => char.produit_id === parseInt(id)
        );
        setCharacteristics(productCharacteristics);

        const categoryResponse = await axios.get(
          `http://127.0.0.1:8000/api/categories/${response.data.category_id}`
        );
        setCategory(categoryResponse.data);

        setError(null);
      } catch (error) {
        setError(
          "Failed to fetch product or category. Please try again later."
        );
        console.error("Error fetching product or category:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const checkStock = () => {
    return product ? product.quantity : 0;
  };

  const handleAddToFavorites = () => {
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

      const availableQuantity = checkStock();
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
          console.warn(
            "No items found in the cart. Proceeding to add the product."
          );
        } else {
          throw error; // Re-throw other errors
        }
      }

      if (existingProduct) {
        // Update the quantity of the existing product
        const newQuantity = existingProduct.quantity + quantity;

        if (newQuantity > availableQuantity) {
          setAlert({
            show: true,
            message: `Can't add ${quantity} more items. Only ${
              availableQuantity - existingProduct.quantity
            } items available.`,
            type: "error",
          });
          return;
        }

        await axios.put(
          `http://127.0.0.1:8000/api/ligne-panier/${existingProduct.id}`,
          { quantity: newQuantity }
        );

        setAlert({
          show: true,
          message: `Quantity of ${product.nom} updated to ${newQuantity} in your cart!`,
          type: "success",
        });
      } else {
        // Add the product to the cart
        await axios.post(`http://127.0.0.1:8000/api/ligne-panier`, {
          panier_id: userPanier.id,
          produit_id: product.id,
          quantity: quantity,
        });

        setAlert({
          show: true,
          message: `Added ${quantity} item(s) of ${product.nom} to your cart!`,
          type: "success",
        });
      }

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
    <div className="bg-background dark:bg-darkBackground min-h-screen ">
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div className="">
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8  ">
          {/* Left column - Image gallery */}
          <div className="flex flex-col p-10 mt-9">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <img
                src={`http://127.0.0.1:8000/storage/${product.image}`}
                alt={product.nom}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Right column - Product info */}
          <div className="px-4 sm:px-6 lg:px-8 w-full lg:w-1/2">
            <div className="flex flex-col bg-white rounded-2xl p-6 shadow-lg h-[90vh] overflow-y-auto mt-[75px]">
              {/* Breadcrumb */}
              <nav className="mb-4">
                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                  <li>
                    <Link
                      to="/shop"
                      className="hover:text-blue-600 transition-colors"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </li>
                  <li className="font-medium text-gray-700">{category?.nom}</li>
                </ol>
              </nav>

              <div className="space-y-6">
                {/* Product Title */}
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.nom}
                </h1>

                {/* Pricing and Rating in one row */}
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-blue-600">
                      ${product.prix_HT}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${(product.prix_HT * 1.2).toFixed(2)}
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      -20%
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <span
                          key={rating}
                          className={`text-sm ${
                            rating <= 4 ? "text-yellow-400" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-gray-500">(4.0)</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Description
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Characteristics */}
                {characteristics.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Available Options
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-gray-500">
                          Colors
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            ...new Set(
                              characteristics.map((char) => char.couleur)
                            ),
                          ].map((color, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-sm border border-gray-200 rounded-full hover:border-blue-500 cursor-pointer"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-gray-500">
                          Sizes
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            ...new Set(
                              characteristics.map((char) => char.taille)
                            ),
                          ].map((size, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-sm border border-gray-200 rounded-full hover:border-blue-500 cursor-pointer"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stock Status */}
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      checkStock() > 0 ? "bg-green-500" : "bg-red-500"
                    } mr-2`}
                  ></div>
                  <span
                    className={`text-sm font-medium ${
                      checkStock() > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {checkStock() > 0
                      ? `${checkStock()} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3 mt-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.min(
                            checkStock(),
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        )
                      }
                      className="w-16 h-8 text-center border border-gray-300 rounded-md"
                      min="1"
                      max={checkStock()}
                    />
                    <button
                      onClick={() =>
                        setQuantity(Math.min(checkStock(), quantity + 1))
                      }
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3 mt-auto pt-4">
                  <button
                    onClick={() => addToCart(product, quantity)}
                    disabled={checkStock() <= 0}
                    className={`flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold ${
                      checkStock() <= 0
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleAddToFavorites}
                    className="flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500"
                  >
                    <FaHeart className="mr-2" />
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
