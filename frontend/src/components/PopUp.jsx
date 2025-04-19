import React, { useState, useEffect } from "react";
import axios from "axios";

const PopUp = ({ onClose, products, total }) => {
  const [formData, setFormData] = useState({
    name: "",
    tele: "",
    adresse: "",
    commentaire: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

      // // Append order details to Google Sheets
      // await axios.post("http://localhost:8000/api/google-sheets/append", {
      //   user_id: userId,
      //   name: formData.name,
      //   tele: formData.tele,
      //   adresse: formData.adresse,
      //   total,
      //   products,
      // });

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
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
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
