import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons for toggle

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // Track the active FAQ item
  const [error, setError] = useState(null); // Track errors
  const [visibleFaqs, setVisibleFaqs] = useState(10); // Number of FAQs to show initially

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

  const loadMore = () => {
    setVisibleFaqs((prevVisible) => prevVisible + 10);
  };

  return (
    <div className="p-8 bg-background dark:bg-darkBackground min-h-screen  ">
      <div className="mb-8 m-auto flex flex-col mt-10 justify-center items-center">
        <h1
          className="text-[90px] font-bold mb-[80px] text-primary dark:text-darkPrimary"
          style={{ fontFamily: "Impact, Haettenschweiler" }}
        >
          {/* {t("about.1")}.&apos; */}
          FAQs
        </h1>
      </div>
      <div className="max-w-4xl mx-auto">
      
        <div className="border-t border-gray-300">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            faqs.slice(0, visibleFaqs).map((faq, index) => (
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
        {faqs.length > visibleFaqs && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faq;
