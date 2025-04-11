import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Alert from "./Alert";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stocks, setStocks] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/produits/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchProductImage = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/produit-images"
        );
        const image = response.data.find(
          (img) => img.id_produit === parseInt(id)
        );
        setProductImage(image ? image.url : "/images/default.jpg"); // Default image if no match
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        if (product) {
          const matchedCategory = response.data.find(
            (cat) => cat.id === product.id_categorie
          );
          setCategory(matchedCategory ? matchedCategory.nom : "Unknown");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    const fetchStocks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/stocks");
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchProduct();
    fetchProductImage();
    fetchCategory();
    fetchStocks();
  }, [id, product]);

  const checkStock = (productId) => {
    const productStocks = stocks.filter(
      (stock) => stock.id_produit === productId
    );
    const totalQuantity = productStocks.reduce(
      (sum, stock) => sum + stock.quantite,
      0
    );
    return totalQuantity;
  };

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = favorites.some((fav) => fav.id === product.id);
    if (!isAlreadyFavorite) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setAlert({
        show: true,
        message: "Added to Favorites!",
        type: "success",
      });
    } else {
      setAlert({
        show: true,
        message: "Already in Favorites!",
        type: "info",
      });
    }
  };

  const handleAddToCart = () => {
    const availableQuantity = checkStock(product.id);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (availableQuantity <= 0) {
      setAlert({
        show: true,
        message: "This product is out of stock",
        type: "error",
      });
      return;
    }

    if (quantity > availableQuantity) {
      setAlert({
        show: true,
        message: `Only ${availableQuantity} items available in stock`,
        type: "error",
      });
      return;
    }

    if (existingItem) {
      if (existingItem.quantity + quantity > availableQuantity) {
        setAlert({
          show: true,
          message: `Can't add ${quantity} more items. Only ${
            availableQuantity - existingItem.quantity
          } items available`,
          type: "error",
        });
        return;
      }
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAlert({
      show: true,
      message: `Added ${quantity} item(s) to Cart!`,
      type: "success",
    });
  };

  if (!product) {
    return <div>Loading...</div>;
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

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-shrink-0mt-[50px] ">
          <img
            src={productImage}
            alt={product.nom}
            className="w-full md:w-96 h-auto object-cover rounded-lg mt-[50px]"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow mt-[50px]">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {product.nom}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-bold text-gray-900 mb-4">
            Price: {product.prix} MAD
          </p>

          <p className="text-gray-600 mb-4">
            Category: {category || "Unknown"}
          </p>
          <p className="text-gray-600 mb-4">Date Added: {product.date}</p>
          <p className="text-gray-600 mb-4">
            Available Stock: {checkStock(product.id)} items
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="quantity" className="text-gray-700 font-medium">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={checkStock(product.id)}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-20"
              disabled={checkStock(product.id) <= 0}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleAddToFavorites}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
            >
              <FaHeart />
              Add to Favorites
            </button>
            <button
              onClick={handleAddToCart}
              disabled={checkStock(product.id) <= 0}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors duration-300 ${
                checkStock(product.id) <= 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              <FaShoppingCart />
              {checkStock(product.id) <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          {/* Back to Shop Button */}
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
