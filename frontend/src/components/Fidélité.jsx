import React, { useState, useEffect } from 'react';
import { FaMedal, FaTrophy, FaCrown } from 'react-icons/fa';
import axios from 'axios';

const Fidélité = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        const response = await axios.get(`http://localhost:8000/api/users/${user.id}`);
        setUserPoints(response.data.points_fidélité);
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    fetchUserPoints();
  }, []);

  const convertToCoupon = async (pointsToConvert, discountPercentage) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) throw new Error('User not authenticated');

      await axios.put(`http://localhost:8000/api/users/${user.id}`, {
        points_fidélité: userPoints - pointsToConvert
      });

      setAlert({
        show: true,
        message: `Coupon ${discountPercentage}% created successfully!`,
        type: 'success'
      });
      
      setUserPoints(prev => prev - pointsToConvert);
    } catch (error) {
      setAlert({
        show: true,
        message: 'Failed to create coupon',
        type: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-darkBackground p-8">
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
            Current Points: <span className="font-bold text-primary">{userPoints}</span>
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
              <span className="text-2xl font-bold text-primary">300 points</span>
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
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
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
              <span className="text-2xl font-bold text-primary">500 points</span>
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
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
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
              <span className="text-2xl font-bold text-primary">1000 points</span>
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
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Convert to 10% Discount
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fidélité;