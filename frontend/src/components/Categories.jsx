import React, { useEffect, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 8;

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // GSAP animation for category items
  useEffect(() => {
    gsap.from(".category-item", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
    });
  }, [categories]);

  // Filtered categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-background dark:bg-darkBackground min-h-screen p-8 ">
        <div className="mb-8 m-auto flex flex-col mt-10 justify-center items-center">
      <h1
            className="text-[90px] font-bold mb-[80px] text-primary dark:text-darkPrimary"
            style={{ fontFamily: "Impact, Haettenschweiler" }}
          >
            {/* {t("about.1")}.&apos; */}
            Categories
          </h1>
   </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[70px]">
        {currentCategories.map((category) => (
          <div
            key={category.id}
            className="category-item bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Display category image */}
            <img
              src={`http://127.0.0.1:8000/storage/${category.image}`}
              alt={category.nom}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                {category.nom}
              </h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {category.description}
              </p>
              <span className="text-sm text-gray-500">
                Created At: {new Date(category.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Categories;
