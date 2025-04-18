import React, { useState } from "react";
import axios from "axios";
// import StripeCheckout from "react-stripe-checkout";

const PopUp = ({ onClose, products, total }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Default to Cash on Delivery
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

//   const handleStripePayment = async (token) => {
//     try {
//       setIsSubmitting(true);
//       // Send payment details to the backend
//       await axios.post("http://localhost:8000/api/stripe-payment", {
//         token,
//         amount: total * 100, // Stripe expects the amount in cents
//       });

//       // Proceed with order submission
//       await submitOrder("Stripe");
//     } catch (error) {
//       console.error("Stripe payment failed:", error);
//       alert("Payment failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

  const submitOrder = async (paymentType) => {
    try {
      setIsSubmitting(true);

      // Send order details to Google Sheets
    //   await axios.post("https://sheet.best/api/", {
    //     ...formData,
    //     total,
    //     paymentMethod: paymentType,
    //     products: products.map((p) => `${p.nom} (x${p.quantity})`).join(", "),
    //   });
      console.log("Order details:", {
        ...formData,
        total,
        paymentMethod: paymentType,
        products: products.map((p) => `${p.nom} (x${p.quantity})`).join(", "),
      });
      

    //   // Send WhatsApp notification to admin
    //   await axios.post("http://localhost:8000/api/whatsapp-notify", {
    //     message: `New Order: ${formData.name}, ${formData.phone}, ${formData.address}, ${formData.city}. Total: ${total} MAD.`,
    //   });

      alert("Order placed successfully!");
      onClose();
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Failed to place the order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === "cod") {
      submitOrder("Cash on Delivery");
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
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="stripe">Stripe</option>
            </select>
          </div>
          {paymentMethod === "stripe" && (
            <StripeCheckout
              stripeKey="YOUR_STRIPE_PUBLIC_KEY"
              token={handleStripePayment}
              amount={total * 100}
              name="E-Commerce Checkout"
              currency="MAD"
            />
          )}
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