import React, { useEffect, useState } from "react";
import axios from "axios";

const Panier = () => {
  const [lignePaniers, setLignePaniers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user"))?.id; // Get the logged-in user's ID

  useEffect(() => {
    const fetchPanierWithProducts = async () => {
      try {
        setIsLoading(true);

        // Fetch the user's panier
        const response = await axios.get("http://localhost:8000/api/paniers");
        const userPanier = response.data.find(
          (panier) => panier.user_id === userId
        );

        if (!userPanier) {
          setError("No cart found for the current user.");
          setLignePaniers([]);
          return;
        }

        // Fetch the products in the user's panier
        const lignePanierResponse = await axios.get(
          `http://localhost:8000/api/ligne-panier/${userPanier.id}`
        );

        if (
          !lignePanierResponse.data ||
          lignePanierResponse.data.length === 0
        ) {
          setError("No products found in the cart.");
          setLignePaniers([]);
          return;
        }

        setLignePaniers(lignePanierResponse.data);

        // Fetch all product details
        const productsResponse = await axios.get(
          "http://127.0.0.1:8000/api/produits"
        );
        setProducts(productsResponse.data);

        setError(null);
      } catch (err) {
        setError(
          "Failed to fetch the cart or products. Please try again later."
        );
        console.error("Error fetching panier or products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchPanierWithProducts();
    } else {
      setError("You must be logged in to view your cart.");
      setIsLoading(false);
    }
  }, [userId]);

  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId) || {};
  };

  const calculateTotal = () => {
    return lignePaniers.reduce((total, item) => {
      const productDetails = getProductDetails(item.produit_id);
      const price = parseFloat(productDetails.prix_HT || 0);
      return total + price * (item.quantity || 1);
    }, 0);
  };

  const calculateTVA = (total) => {
    const tvaRate = 0.2; // Example TVA rate of 20%
    return total * tvaRate;
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

  if (lignePaniers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  const total = calculateTotal();
  const tva = calculateTVA(total);
  const grandTotal = total + tva;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="text-center mb-8 mt-[50px]">
        <h1 className="text-4xl font-bold text-gray-800">My Cart</h1>
        <p className="text-gray-600 mt-2">
          Here are the products in your cart.
        </p>
      </div>

      {/* Table of Products */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Price (MAD)</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lignePaniers.map((item) => {
              const productDetails = getProductDetails(item.produit_id);
              return (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={productDetails.image || "placeholder.jpg"}
                      alt={productDetails.nom || "Product"}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {productDetails.nom || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {productDetails.description || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {productDetails.prix_HT || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.quantity || 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => removeFromLignePanier(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cart Totals Section */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Cart Totals</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                Cart Subtotal
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {total.toFixed(2)} MAD
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">TVA (20%)</td>
              <td className="border border-gray-300 px-4 py-2">
                {tva.toFixed(2)} MAD
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Total</td>
              <td className="border border-gray-300 px-4 py-2 font-bold">
                {grandTotal.toFixed(2)} MAD
              </td>
            </tr>
          </tbody>
        </table>
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Panier;
