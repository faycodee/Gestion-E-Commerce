import React, { useEffect } from "react";
import { gsap } from "gsap";

function Contact() {
  useEffect(() => {
    // Animation GSAP pour les sections
    gsap.fromTo(
      ".contact-image",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1 }
    );

    gsap.fromTo(
      ".contact-form",
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Section: Image */}
        <div className="md:w-1/2 contact-image">
    <img
    src="/images/contact.jpg"
    alt="Contact Us"
    className="w-full h-full object-cover"
    />
        </div>

        {/* Right Section: Contact Form */}
        <div className="md:w-1/2 p-8 contact-form">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                E-mail
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Message
              </label>
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Contact Us
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
            <p className="text-gray-600">Oussamafaycal@gmail.com</p>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Based in</h3>
            <p className="text-gray-600">Morocco, Fes</p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;