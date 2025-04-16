import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons for toggle

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // Track the active FAQ item
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    // Fetch FAQs from the backend API
    const fetchFaqs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/faqs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFaqs(data);
      } catch (err) {
        setError("Failed to fetch FAQs. Please try again later.");
        console.error("Error fetching FAQs:", err);
      }
    };

    fetchFaqs();
  }, []);

  // Toggle the visibility of the answer
  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-800 min-h-screen  ">
      <h1 className="text-4xl font-bold text-center mt-[70px] text-gray-800 dark:text-gray-100 mb-8">
        FAQs
      </h1>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
          PRODUCT INFO
        </h2>
        <div className="border-t border-gray-300">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            faqs.map((faq, index) => (
              <div key={faq.Id_FAQ} className="border-b border-gray-300 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                    {faq.Question}
                  </h3>
                  <span className="text-gray-500">
                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="mt-2 text-gray-600 dark:text-gray-300">
                    <p>{faq.Reponde}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Category: {faq.categorie} | Views: {faq.Nombre_vues}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;
