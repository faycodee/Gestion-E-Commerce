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

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/produits/${id}`
        );
        setProduct(response.data);

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
    <div className="bg-gray-100 min-h-screen p-8">
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div className="max-w-6xl mx-auto bg-white mt-[100px] shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <img
            src={`http://127.0.0.1:8000/storage/${product.image}`}
            alt={product.nom}
            className="w-full md:w-96 h-auto object-cover rounded-lg"
          />
        </div>

        <div className="flex-grow">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {product.nom}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-bold text-gray-900 mb-4">
            Price: {product.prix_HT} MAD
          </p>
          <p className="text-gray-600 mb-4">
            Available Stock: {checkStock()} items
          </p>

          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800">Category:</h2>
            <p className="text-gray-600">{category.nom}</p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="quantity" className="text-gray-700 font-medium">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={checkStock()}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-20"
              disabled={checkStock() <= 0}
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleAddToFavorites}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
            >
              <FaHeart />
              Add to Favorites
            </button>
            <button
              onClick={() => addToCart(product, quantity)}
              disabled={checkStock() <= 0}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors duration-300 ${
                checkStock() <= 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              <FaShoppingCart />
              {checkStock() <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          <div className="mt-6">
            <Link
              to="/shop"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
