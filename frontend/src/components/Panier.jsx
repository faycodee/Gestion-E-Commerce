import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import PopUp from "./PopUp"; // Import the PopUp component

const Panier = () => {
  const [lignePaniers, setLignePaniers] = useState([]);
  const [products, setProducts] = useState([]);
  const [tvas, setTvas] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); // State for selected items
  const [isPopUpOpen, setIsPopUpOpen] = useState(false); // State to manage PopUp visibility

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
  const grandTotal = total + tva;

  const handleCheckout = () => {
    setIsPopUpOpen(true); // Open the PopUp
  };

  return (
    <div className="bg-background dark:bg-darkBackground from-gray-50 to-gray-100 min-h-screen p-8">
      <div className="text-center mb-8 mt-[50px]">
     
     
        <div className="mb-8 m-auto flex flex-col mt-10 justify-center items-center">
          <h1
            className="text-[90px] font-bold mb-[80px] text-primary dark:text-darkPrimary"
            style={{ fontFamily: "Impact, Haettenschweiler" }}
          >
            My Cart
            {/* {t("about.1")}.&apos; */}
          </h1>
        </div>
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
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedItems(
                        e.target.checked
                          ? lignePaniers.map((item) => item.id)
                          : []
                      )
                    }
                    checked={
                      selectedItems.length === lignePaniers.length &&
                      lignePaniers.length > 0
                    }
                  />
                </th>
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
                const tvaDetails = getTvaDetails(productDetails.tva_id);
                return (
                  <tr
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
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
                      <p className="text-sm text-gray-500">
                        TVA: {tvaDetails.nom} ({tvaDetails.taux}%)
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold">
                        {productDetails.prix_HT} MAD
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 w-20 text-center"
                      />
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

      <div className="flex justify-end mt-4">
        <button
          onClick={deleteSelectedItems}
          disabled={selectedItems.length === 0}
          className={`${
            selectedItems.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } text-white px-4 py-2 rounded-lg transition-colors duration-200`}
        >
          Delete Selected
        </button>
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
              <span className="text-gray-600">Total TVA</span>
              <span className="font-medium">{tva.toFixed(2)} MAD</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total</span>
              <span>{grandTotal.toFixed(2)} MAD</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* PopUp Component */}
      {isPopUpOpen && (
        <PopUp
          onClose={() => setIsPopUpOpen(false)} // Close the PopUp
          products={lignePaniers} // Pass cart items
          total={total} // Pass total amount
          Subtotal={total.toFixed(2)} // Pass total amount
          TotalTVA={tva.toFixed(2)} // Pass total amount
        />
      )}
    </div>
  );
};

export default Panier;
