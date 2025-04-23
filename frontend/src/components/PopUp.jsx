import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PopUp = ({ onClose, products, total }) => {
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
    // Fetch user data from the API
    const fetchUserData = async () => {
      const userId = JSON.parse(localStorage.getItem("user"))?.id;
      if (!userId) {
        alert("You must be logged in to place an order.");
        return;
      }

      try {
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
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data.");
      }
    };

    fetchUserData();
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

  const sendWhatsAppNotification = async (orderDetails) => {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v17.0/${process.env.REACT_APP_WHATSAPP_BUSINESS_ACCOUNT_ID}/messages`,
        {
          messaging_product: "whatsapp",
          to: process.env.REACT_APP_WHATSAPP_PHONE_NUMBER,
          type: "template",
          template: {
            name: "order_notification",
            language: {
              code: "en",
            },
            components: [
              {
                type: "body",
                parameters: [
                  {
                    type: "text",
                    text: orderDetails.order_id,
                  },
                  {
                    type: "text",
                    text: orderDetails.customer_name,
                  },
                  {
                    type: "text",
                    text: orderDetails.customer_phone,
                  },
                
                  {
                    type: "text",
                    text: orderDetails.address,
                  },
                 
                ],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("WhatsApp notification sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending WhatsApp notification:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userId = JSON.parse(localStorage.getItem("user"))?.id;

      if (!userId) {
        alert("You must be logged in to place an order.");
        setIsSubmitting(false);
        return;
      }

      // Update user tele and adresse if missing
      await axios.put(`http://localhost:8000/api/users/${userId}`, {
        tele: formData.tele,
        adresse: formData.adresse,
      });

      // Create the order
      const orderResponse = await axios.post(
        "http://localhost:8000/api/commandes",
        {
          user_id: userId,
          commentaire: formData.commentaire,
          date_achat: new Date().toISOString().split("T")[0], // Format date as YYYY-MM-DD
          statut: "Pending",
        }
      );

      const commandeId = orderResponse.data.id;

      // Create ligne_commandes for each product in the cart
      for (const product of products) {
        await axios.post("http://localhost:8000/api/ligne-commandes", {
          commande_id: commandeId,
          produit_id: product.produit_id,
          quantite: product.quantity,
          prix_unitaire: Number(product.produit_prix),
        });
      }

      // Calculate total with shipping if applicable
      const finalTotal =
        formData.livraison === "yes" ? total + fraisExpedition : total;

      // Send WhatsApp notification
      await sendWhatsAppNotification({
        order_id: commandeId,
        customer_name: formData.name,
        customer_phone: formData.tele,
        total: finalTotal,
        address: formData.adresse,
        city: formData.city,
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

      alert("Order placed successfully!");
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
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PopUp;
