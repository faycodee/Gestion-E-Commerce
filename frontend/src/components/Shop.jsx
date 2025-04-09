import React, { useEffect, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/produits");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchProductImages = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/produit-images"
        );
        setProductImages(response.data);
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    fetchProducts();
    fetchProductImages();
  }, []);

  // GSAP animation for product cards
  useEffect(() => {
    gsap.from(".product-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
    });
  }, [products]);

  // Filtered products based on search term
  const filteredProducts = products.filter((product) =>
    product.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get the image URL for a product
  const getProductImage = (productId) => {
    const image = productImages.find((img) => img.id_produit === productId);
    return image ? image.url : "/images/default.jpg"; // Default image if no match
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="text-center mb-8 mt-[50px]">
        <h1 className="text-4xl font-bold text-gray-800">Our Shop</h1>
        <p className="text-gray-600 mt-2">
          Explore our wide range of products and find what suits you best.
        </p>
      </div>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for products..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Display product image */}
            <img
              src={getProductImage(product.id)}
              alt={product.nom}
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {product.nom}
            </h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-gray-900 mb-2">
              {product.prix} MAD
            </p>
            <Link
              to={`/product/${product.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 block text-center"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Shop;
