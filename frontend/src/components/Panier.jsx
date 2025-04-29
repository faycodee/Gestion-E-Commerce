import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import PopUp from "./PopUp"; // Import the PopUp component
import { useNavigate } from "react-router-dom";

const Panier = () => {
  const navigate = useNavigate();
  const [lignePaniers, setLignePaniers] = useState([]);
  const [products, setProducts] = useState([]);
  const [tvas, setTvas] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); // State for selected items
  const [isPopUpOpen, setIsPopUpOpen] = useState(false); // State to manage PopUp visibility
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const userId = JSON.parse(localStorage.getItem("user"))?.id; // Get the logged-in user's ID
  const tableRef = useRef(null);
  const totalsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
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

        // Fetch TVA details
        const tvaResponse = await axios.get("http://localhost:8000/api/tvas");
        setTvas(tvaResponse.data);

        setError(null);
      } catch (err) {
        setError(
          "Failed to fetch the cart, products, or TVA. Please try again later."
        );
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    } else {
      setError("You must be logged in to view your cart.");
      setIsLoading(false);
    }
  }, [userId]);
  // Add points calculation function
  const calculatePointsReward = (total) => {
    if (total >= 1000) return 100; // 100 points for orders ≥ 1000
    if (total >= 500) return 50; // 50 points for orders ≥ 500
    if (total >= 200) return 20; // 20 points for orders ≥ 200
    return Math.floor(total / 20); // 1 point for every 20 spent
  };

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

  const getTvaDetails = (tvaId) => {
    return tvas.find((tva) => tva.id === tvaId) || { taux: 0 };
  };

  const calculateTotal = () => {
    return lignePaniers.reduce((total, item) => {
      const productDetails = getProductDetails(item.produit_id);
      const price = parseFloat(productDetails.prix_HT || 0);
      return total + price * (item.quantity || 1);
    }, 0);
  };

  const calculateTVA = () => {
    return lignePaniers.reduce((totalTva, item) => {
      const productDetails = getProductDetails(item.produit_id);
      const tvaDetails = getTvaDetails(productDetails.tva_id);
      const price = parseFloat(productDetails.prix_HT || 0);
      const tvaRate = parseFloat(tvaDetails.taux || 0) / 100;
      return totalTva + price * (item.quantity || 1) * tvaRate;
    }, 0);
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

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      if (newQuantity < 1) {
        setError("Quantity must be at least 1.");
        return;
      }

      // Update the quantity in the backend
      await axios.put(`http://localhost:8000/api/ligne-panier/${itemId}`, {
        quantity: newQuantity,
      });

      // Update the quantity in the frontend state
      setLignePaniers((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );

      // Dispatch cart update event
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError("Failed to update quantity. Please try again.");
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const deleteSelectedItems = async () => {
    try {
      for (const itemId of selectedItems) {
        await axios.delete(`http://localhost:8000/api/ligne-panier/${itemId}`);
      }

      setLignePaniers((prevItems) =>
        prevItems.filter((item) => !selectedItems.includes(item.id))
      );

      setSelectedItems([]); // Clear selected items
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error deleting selected items:", error);
      setError("Failed to delete selected items. Please try again.");
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/coupons/validate",
        {
          code: couponCode,
        }
      );

      if (response.data.discount_percentage) {
        const discountAmount =
          (total * response.data.discount_percentage) / 100;
        setDiscount(discountAmount);
        setCouponError("");
      }
    } catch (error) {
      setDiscount(0);
      setCouponError(error.response?.data?.message || "Invalid coupon code");
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
  const tva = calculateTVA();
  const grandTotal = total + tva - discount;

  const handleCheckout = () => {
    setIsPopUpOpen(true); // Open the PopUp
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex flex-col lg:flex-row gap-8 mt-[150px] ">
        {/* Left side - Cart Items */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
          {lignePaniers.map((item) => {
            const productDetails = getProductDetails(item.produit_id);
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow mb-4"
              >
                <img
                    src={`http://127.0.0.1:8000/storage/${productDetails.image}`}
                  alt={productDetails.nom}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">
                    {productDetails.nom}
                  </h3>
                  <button
                    onClick={() => removeFromLignePanier(item.id)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold min-w-[80px] text-right">
                    ${(productDetails.prix_HT * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right side - Order Details */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Order details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tva.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Checkout
              </button>
              <button
                onClick={() => navigate("/shop")}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
              >
                Continue Shopping
              </button>
              <div className="mt-6">
                <p className="text-gray-600 mb-2">Do you have a promo code?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value.toUpperCase())
                    }
                    placeholder="Promo code"
                    className="flex-grow border rounded-lg px-4 py-2"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-red-500 text-sm mt-1">{couponError}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-sm border border-blue-100 dark:border-gray-600">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Earn Loyalty Points!
              </h3>
            </div>

            <ul className="space-y-2 mb-4">
              {[
                { spend: 1000, points: 100 },
                { spend: 500, points: 50 },
                { spend: 200, points: 20 },
                { base: 20, points: 1 },
              ].map((tier, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">
                    {tier.base
                      ? `Get ${tier.points} point for every $${tier.base} spent`
                      : `Spend $${tier.spend}+ get ${tier.points} points`}
                  </span>
                </li>
              ))}
            </ul>

            <div className="bg-white dark:bg-gray-600 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                With this order you'll earn
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {calculatePointsReward(total)} points
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PopUp Component */}
      {isPopUpOpen && (
        <PopUp
          onClose={() => setIsPopUpOpen(false)} // Close the PopUp
          products={lignePaniers} // Pass cart items
          total={total} // Pass total amount
          montant_HT={total.toFixed(2)} // Pass total amount
          TotalTVA={tva.toFixed(2)} // Pass total amount
        />
      )}
    </div>
  );
};

export default Panier;
