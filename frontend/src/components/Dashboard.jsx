import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchReservations();
    }
  }, [navigate]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/reservations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setReservations(response.data);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  // GSAP Animation
  useEffect(() => {
    gsap.from(".reservation-card", { opacity: 0, y: 50, stagger: 0.2, duration: 1 });
  }, [reservations]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((reservation) => (
          <div
            key={reservation._id}
            className="reservation-card bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-bold">{reservation.customer_name}</h2>
            <p className="text-gray-600">{reservation.customer_phone}</p>
            <p className="text-gray-600">{reservation.reservation_date}</p>
            <p className="text-gray-600">{reservation.guests} ضيوف</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;