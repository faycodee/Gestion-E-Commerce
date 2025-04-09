import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/produits/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchProductImage = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/produit-images"
        );
        const image = response.data.find(
          (img) => img.id_produit === parseInt(id)
        );
        setProductImage(image ? image.url : "/images/default.jpg"); // Default image if no match
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };

    fetchProduct();
    fetchProductImage();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Display product image */}
        <img
          src={productImage}
          alt={product.nom}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.nom}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-bold text-gray-900 mb-4">
          Price: {product.prix} MAD
        </p>
        <p className="text-gray-600 mb-4">Stock Minimum: {product.stock_min}</p>
        <p className="text-gray-600 mb-4">
          Category ID: {product.id_categorie}
        </p>
        <p className="text-gray-600 mb-4">Date Added: {product.date}</p>
        <Link
          to="/shop"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;
