import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";

const Panier = () => {
  const [lignePaniers, setLignePaniers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user"))?.id; // Get the logged-in user's ID
  const tableRef = useRef(null);
  const totalsRef = useRef(null);

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

  useEffect(() => {
    if (tableRef.current && totalsRef.current) {
      gsap.from(tableRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(totalsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });
    }
  }, [isLoading]);

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

  const removeFromLignePanier = async (itemId) => {
    try {
      const itemRow = document.getElementById(`cart-item-${itemId}`);

      // Animate row removal
      await gsap.to(itemRow, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });

      await axios.delete(`http://localhost:8000/api/ligne-panier/${itemId}`);
      setLignePaniers((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );

      // Dispatch cart update event
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error removing item from cart:", error);
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
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen p-8">
      <div className="text-center mb-8 mt-[50px]">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">My Cart</h1>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      {/* Enhanced Table of Products */}
      <div
        ref={tableRef}
        className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-6 py-4 text-left">Details</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Quantity</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lignePaniers.map((item) => {
                const productDetails = getProductDetails(item.produit_id);
                return (
                  <tr
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={productDetails.image || "placeholder.jpg"}
                          alt={productDetails.nom}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                        <span className="font-medium">
                          {productDetails.nom}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {productDetails.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold">
                        {productDetails.prix_HT} MAD
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-4 py-2 bg-gray-100 rounded-full">
                        {item.quantity || 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => removeFromLignePanier(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 transform hover:scale-105"
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
      </div>

      {/* Enhanced Cart Totals Section */}
      <div
        ref={totalsRef}
        className="max-w-md mx-auto mt-8 bg-white shadow-xl rounded-lg overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Cart Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{total.toFixed(2)} MAD</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">TVA (20%)</span>
              <span className="font-medium">{tva.toFixed(2)} MAD</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total</span>
              <span>{grandTotal.toFixed(2)} MAD</span>
            </div>
          </div>
          <button className="w-full mt-6 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panier;
