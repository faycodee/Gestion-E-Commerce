import React, { useState, useEffect } from "react";
import { FaMedal, FaTrophy, FaCrown } from "react-icons/fa";
import axios from "axios";
import Alert from "./Alert";

const Fidélité = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [userCoupons, setUserCoupons] = useState([]);

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          setAlert({
            show: true,
            message: "Please login to view your points",
            type: "error",
          });
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/users/${user.id}`
        );
        setUserPoints(response.data.points_fidélité);
      } catch (error) {
        setAlert({
          show: true,
          message: "Failed to fetch loyalty points",
          type: "error",
        });
      }
    };

    fetchUserPoints();
  }, []);

  useEffect(() => {
    const savedCoupons = JSON.parse(localStorage.getItem("userCoupons")) || [];
    setUserCoupons(savedCoupons);
  }, []);

  const convertToCoupon = async (pointsToConvert, discountPercentage) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("User not authenticated");

      // First, generate the coupon
      const couponResponse = await axios.post(
        "http://localhost:8000/api/coupons/generate",
        {
          discount_percentage: discountPercentage,
          expiry_days: 30,
        }
      );

      // Then, deduct points from user
      await axios.put(`http://localhost:8000/api/users/${user.id}`, {
        points_fidélité: userPoints - pointsToConvert,
      });

      setUserPoints((prev) => prev - pointsToConvert);

      // Save coupon to localStorage
      const newCoupon = {
        code: couponResponse.data.code,
        discount_percentage: discountPercentage,
        expiry_date: couponResponse.data.expiry_date,
        created_at: new Date().toISOString(),
      };

      const updatedCoupons = [...userCoupons, newCoupon];
      localStorage.setItem("userCoupons", JSON.stringify(updatedCoupons));
      setUserCoupons(updatedCoupons);

      // Show success message
      setAlert({
        show: true,
        message: `Coupon ${
          couponResponse.data.code
        } (${discountPercentage}% OFF) created! Valid until ${new Date(
          couponResponse.data.expiry_date
        ).toLocaleDateString()}`,
        type: "success",
      });

      // Auto hide success alert after 5 seconds
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 5000);
    } catch (error) {
      // Show error message
      setAlert({
        show: true,
        message: error.response?.data?.message || "Failed to create coupon",
        type: "error",
      });

      // Auto hide error alert after 3 seconds
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-darkBackground p-8">
      {/* Alert Component */}
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ show: false, message: "", type: "" })}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mt-[70px]">
          <h1
            className="text-[90px] font-bold mb-[10px] text-primary dark:text-darkPrimary"
            style={{ fontFamily: "Impact, Haettenschweiler" }}
          >
            Your Loyalty Program
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-5">
            Current Points:{" "}
            <span className="font-bold text-primary">{userPoints}</span>
          </p>
        </div>

        {/* Loyalty Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Bronze Tier */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-center mb-4">
              <FaMedal className="text-5xl text-bronze" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">Bronze</h3>
            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-primary">
                300 points
              </span>
            </div>
            <ul className="text-gray-600 dark:text-gray-300 mb-6">
              <li className="flex items-center mb-2">
                <span className="mr-2">•</span>
                20 points offered
              </li>
              <li className="flex items-center mb-2">
                <span className="mr-2">•</span>
                Special offer on next order
              </li>
            </ul>
            <button
              onClick={() => convertToCoupon(300, 2)}
              disabled={userPoints < 300}
              className={`w-full py-2 rounded-lg ${
                userPoints >= 300
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Convert to 2% Discount
            </button>
          </div>

          {/* Silver Tier */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-center mb-4">
              <FaTrophy className="text-5xl text-silver" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">Silver</h3>
            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-primary">
                500 points
              </span>
            </div>
            <ul className="text-gray-600 dark:text-gray-300 mb-6">
              <li className="flex items-center mb-2">
                <span className="mr-2">•</span>
                50 points offered
              </li>
              <li className="flex items-center mb-2">
                <span className="mr-2">•</span>
                Free shipping over $30
              </li>
            </ul>
            <button
              onClick={() => convertToCoupon(500, 5)}
              disabled={userPoints < 500}
              className={`w-full py-2 rounded-lg ${
                userPoints >= 500
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Convert to 5% Discount
            </button>
          </div>

          {/* Gold Tier */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-center mb-4">
              <FaCrown className="text-5xl text-gold" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">Gold</h3>
            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-primary">
                1000 points
              </span>
            </div>
            <ul className="text-gray-600 dark:text-gray-300 mb-6">
              <li className="flex items-center mb-2">
                <span className="mr-2">•</span>
                100 points offered
              </li>
              <li className="flex items-center mb-2">
                <span className="mr-2">•</span>
                10% off all year
              </li>
            </ul>
            <button
              onClick={() => convertToCoupon(1000, 10)}
              disabled={userPoints < 1000}
              className={`w-full py-2 rounded-lg ${
                userPoints >= 1000
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Convert to 10% Discount
            </button>
          </div>
        </div>

        {/* Coupons List Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Your Coupons
          </h2>
          {userCoupons.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300 text-center py-8">
              No coupons available. Convert your points to get discounts!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userCoupons.map((coupon, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                      {coupon.discount_percentage}% OFF
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Created:{" "}
                      {new Date(coupon.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded p-3 mb-3 text-center">
                    <span className="font-mono text-lg font-bold text-primary break-all">
                      {coupon.code}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      Expires:
                    </span>
                    <span className="text-red-500 font-medium">
                      {new Date(coupon.expiry_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fidélité;
