import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons for toggle

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // Track the active FAQ item

  useEffect(() => {
    // Fetch FAQs from the backend API
    fetch("http://localhost:8000/api/faqs")
      .then((response) => response.json())
      .then((data) => setFaqs(data));

    // GSAP animation for FAQ items
    gsap.fromTo(
      ".faq-item",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }
    );
  }, []);

  // Toggle the visibility of the answer
  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
        Frequently Asked Questions
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="faq-item p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {faq.Question}
              </h2>
              <span className="text-purple-500">
                {activeIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            {activeIndex === index && (
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {faq.Réponse}
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Catégorie: {faq.Catégorie} &nbsp;
                  Vues: {faq.Nombre_vues}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;