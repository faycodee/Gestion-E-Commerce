import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Livraison() {
  const [livraisons, setLivraisons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }
    fetchUserLivraisons(user.id);
  }, [navigate]);

  const fetchUserLivraisons = async (userId) => {
    try {
      // First get all commandes for the user
      const commandesResponse = await axios.get(
        `http://localhost:8000/api/commandes`
      );
      const userCommandes = commandesResponse.data.filter(
        (commande) => commande.user_id === userId
      );

      // Then get all livraisons
      const livraisonsResponse = await axios.get(
        "http://localhost:8000/api/livraisons"
      );

      // Filter livraisons to only show those associated with user's commandes
      const userLivraisons = livraisonsResponse.data.filter((livraison) =>
        userCommandes.some((commande) => commande.id === livraison.commande_id)
      );

      setLivraisons(userLivraisons);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching livraisons:", error);
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiPackage className="w-6 h-6" />;
      case "shipped":
        return <FiTruck className="w-6 h-6" />;
      case "delivered":
        return <FiCheckCircle className="w-6 h-6" />;
      case "canceled":
        return <FiXCircle className="w-6 h-6" />;
      default:
        return <FiPackage className="w-6 h-6" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background dark:bg-darkBackground">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-background dark:bg-darkBackground">
     
      <div className="mb-8 m-auto flex flex-col mt-10 justify-center items-center">
          <h1
            className="text-[90px] font-bold mb-[80px] text-primary dark:text-darkPrimary"
            style={{ fontFamily: "Impact, Haettenschweiler" }}
          >
Your Deliveries
            {/* {t("about.1")}.&apos; */}
          </h1></div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {livraisons.map((livraison) => (
          <div
            key={livraison.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(livraison.status)}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      livraison.status
                    )}`}
                  >
                    {livraison.status.charAt(0).toUpperCase() +
                      livraison.status.slice(1)}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">
                  Order #{livraison.commande_id}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Carrier:</span>
                  <span className="font-medium">
                    {livraison.nom_transporteur}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Cost:</span>
                  <span className="font-medium">
                    {livraison.frais_expedition} MAD
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{livraison.poid} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sent Date:</span>
                  <span className="font-medium">
                    {new Date(livraison.date_envoi).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Arrival:</span>
                  <span className="font-medium">{livraison.estime_arrive}</span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={livraison.URL_suivi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Track Package
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {livraisons.length === 0 && (
        <div className="text-center py-12">
          <FiPackage className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No Deliveries Found
          </h3>
          <p className="text-gray-500">
            You currently have no deliveries to track.
          </p>
        </div>
      )}
    </div>
  );
}

export default Livraison;
