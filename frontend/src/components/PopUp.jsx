import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { sendWhatsAppNotification } from "../utils/whatsapp";

// Update the PopUp component props to include discount
const PopUp = ({
  onClose,
  products,
  total,
  montant_HT,
  TotalTVA,
  discount,
  couponCode,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    tele: "",
    adresse: "",
    commentaire: "",
    city: "",
    livraison: "no", // Default to "no"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fraisExpedition, setFraisExpedition] = useState(0);
  const [tvaRate, setTvaRate] = useState(0.2); // Default TVA rate
  const popupRef = useRef(null); // Reference to the popup container

  const cityPrices = {
    fes: 100,
    casablanca: 150,
    rabat: 120,
    marrakech: 130,
    tangier: 140,
    other: 200, // Default price for other cities
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch TVA rate
        const tvaResponse = await axios.get("http://localhost:8000/api/tvas");
        if (tvaResponse.data && tvaResponse.data.length > 0) {
          setTvaRate(tvaResponse.data[0].taux / 100); // Convert percentage to decimal
        }

        // Fetch user data from the API
        const userId = JSON.parse(localStorage.getItem("user"))?.id;
        if (!userId) {
          alert("You must be logged in to place an order.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/users/${userId}`
        );
        const user = response.data;

        // Pre-fill the form with user data
        setFormData({
          name: user.name || "",
          tele: user.tele || "",
          adresse: user.adresse || "",
          commentaire: "",
          city: "",
          livraison: "no",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch necessary data.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Close the popup when clicking outside of it
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); // Close the popup
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update frais_expedition based on city
    if (name === "city") {
      setFraisExpedition(cityPrices[value] || cityPrices.other);
    }
  };

  // Add points calculation function
  const calculatePointsReward = (total) => {
    if (total >= 1000) return 100; // 100 points for orders ≥ 1000
    if (total >= 500) return 50; // 50 points for orders ≥ 500
    if (total >= 200) return 20; // 20 points for orders ≥ 200
    return Math.floor(total / 20); // 1 point for every 20 spent
  };

  // Update the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("You must be logged in to place an order.");
        setIsSubmitting(false);
        return;
      }

      // Calculate points to award
      const pointsToAward = calculatePointsReward(total);
      const currentPoints = parseInt(user.points_fidélité);
      console.log("Current points:", currentPoints);
      console.log("pointsToAward:", pointsToAward);
      // Convert to number, default to 0 if null/undefined
      const newTotalPoints = currentPoints + pointsToAward;
      console.log("newTotalPoints:", newTotalPoints);

      console.log("Points calculation:", {
        currentPoints,
        pointsToAward,
        newTotalPoints,
      });

      try {
        const pointsUpdateResponse = await axios.put(
          `http://localhost:8000/api/users/${user.id}`,
          {
            tele: formData.tele,
            adresse: formData.adresse,
            points_fidélité: newTotalPoints,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Points update successful:", pointsUpdateResponse.data);
      } catch (error) {
        console.error("Points update failed:", error.response?.data);
        throw error;
      }

      // Create the order
      const orderResponse = await axios.post(
        "http://localhost:8000/api/commandes",
        {
          user_id: user.id,
          commentaire: formData.commentaire,
          date_achat: new Date().toISOString().split("T")[0], // Format date as YYYY-MM-DD
          statut: "Pending",
        }
      );

      const commandeId = orderResponse.data.id;

      // Send WhatsApp notification
      try {
        await sendWhatsAppNotification(
          commandeId.toString(),
          formData.name,
          formData.tele,
          formData.adresse
        );
        console.log("WhatsApp notification sent successfully");
      } catch (error) {
        console.error("Failed to send WhatsApp notification:", error);
        // Continue with order processing even if WhatsApp notification fails
      }

      // Create ligne_commandes for each product in the cart
      for (const product of products) {
        await axios.post("http://localhost:8000/api/ligne-commandes", {
          commande_id: commandeId,
          produit_id: product.produit_id,
          quantite: product.quantity,
          prix_unitaire: Number(product.produit_prix),
        });
      }

      console.log({
        commande_id: commandeId,
        montant_HT: montant_HT,
        payment_status: "pending",
        montant_TVA: TotalTVA,
      });

      // If livraison is "yes", create a livraison
      if (formData.livraison === "yes") {
        await axios.post("http://localhost:8000/api/livraisons", {
          frais_expedition: fraisExpedition,
          nom_transporteur: "Standard Transporter", // Example transporter name
          date_envoi: new Date().toISOString().split("T")[0], // Today's date
          URL_suivi: "http://example.com/track", // Example tracking URL
          poid: products.reduce(
            (total, product) => total + product.quantity,
            0
          ), // Example weight calculation
          estime_arrive: "3-5 days", // Example estimated arrival
          status: "pending",
          commande_id: commandeId,
        });
      }

      // In the handleSubmit function, after creating the order but before creating the facture:
      if (couponCode) {
        try {
          // Redeem the coupon
          await axios.post("http://localhost:8000/api/coupons/redeem", {
            code: couponCode,
          });
        } catch (error) {
          console.error("Error redeeming coupon:", error);
        }
      }

      // Create facture with proper calculations
      await axios.post("http://localhost:8000/api/factures", {
        commande_id: commandeId,
        montant_HT: montant_HT,
        payment_status: "pending",
        montant_TVA: TotalTVA,
        discount: discount,
        total_final: montant_HT + TotalTVA - discount,
      });

      // Update user points in localStorage after successful order
      const updatedUser = {
        ...user,
        points_fidélité: newTotalPoints,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert(
        `Order placed successfully! You earned ${pointsToAward} loyalty points!`
      );
      onClose(); // Close the popup
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef} // Attach the reference to the popup container
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              disabled // Name is not editable
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="tele"
              value={formData.tele}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="">Select a city</option>
              <option value="fes">Fes</option>
              <option value="casablanca">Casablanca</option>
              <option value="rabat">Rabat</option>
              <option value="marrakech">Marrakech</option>
              <option value="tangier">Tangier</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Livraison</label>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  name="livraison"
                  value="yes"
                  checked={formData.livraison === "yes"}
                  onChange={handleInputChange}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="livraison"
                  value="no"
                  checked={formData.livraison === "no"}
                  onChange={handleInputChange}
                />{" "}
                No
              </label>
            </div>
          </div>
          {formData.livraison === "yes" && (
            <div className="mb-4">
              <label className="block text-gray-700">Frais d'expédition</label>
              <p className="text-gray-800 font-bold">{fraisExpedition} MAD</p>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Commentaire</label>
            <textarea
              name="commentaire"
              value={formData.commentaire}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows="3"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
