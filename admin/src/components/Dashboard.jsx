import React, { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { gsap } from "gsap";

const COLORS = ["#6366F1", "#06B6D4", "#A855F7", "#F59E0B", "#10B981", "#EF4444"];
const PRODUCT_COLORS = {
  "Apple iPhone 14": "#6366F1",
  "Samsung Galaxy S20": "#06B6D4",
  "Sony WH-1000XM5": "#A855F7",
  "Dell XPS 13": "#F59E0B",
  "Apple MacBook Pro 16": "#10B981",
  "Logitech MX Master 3": "#EF4444",
  "Canon EOS R6": "#8B5CF6",
  "Bose SoundLink Revolve+": "#3B82F6",
  "Fitbit Charge 5": "#F43F5E",
};

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [userAnalytics, setUserAnalytics] = useState([]);
  const [produitData, setProduitData] = useState([]);
  const [categorieData, setCategorieData] = useState([]);
  const [orderCount, setOrderCount] = useState(0); // New state for order count
  const statsRef = useRef(null); // Ref for stats section
  const chartsRef = useRef(null); // Ref for charts section

  useEffect(() => {
    // Fetch data
    axios
      .get("http://localhost:8000/api/users")
      .then((response) => {
        const users = response.data;
        setUserCount(users.length);
        const analytics = calculateUserAnalytics(users);
        setUserAnalytics(analytics);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    axios
      .get("http://localhost:8000/api/produits")
      .then((response) => {
        const produits = response.data;
        const produitAnalytics = produits.map((produit) => ({
          name: produit.nom,
          Quantity: produit.quantity,
          color: PRODUCT_COLORS[produit.nom] || generateRandomColor(), // Assign specific color or generate one
        }));
        setProduitData(produitAnalytics);
      })
      .catch((error) => {
        console.error("Error fetching produit data:", error);
      });

    axios
      .get("http://localhost:8000/api/categories")
      .then((response) => {
        const categories = response.data;
        const categorieAnalytics = categories.map((categorie, index) => ({
          name: categorie.nom,
          Count: categorie.id,
          color: COLORS[index % COLORS.length],
        }));
        setCategorieData(categorieAnalytics);
      })
      .catch((error) => {
        console.error("Error fetching categorie data:", error);
      });

    // Fetch order count
    axios
      .get("http://localhost:8000/api/commandes") // Replace with your API endpoint
      .then((response) => {
        setOrderCount(response.data.length); // Assuming the API returns an array of orders
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });

    // GSAP animations
    gsap.fromTo(
      statsRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );

    gsap.fromTo(
      chartsRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.5 }
    );
  }, []);

  const calculateUserAnalytics = (users) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.map((month, index) => {
      const count = users.filter((user) => {
        const createdAt = new Date(user.created_at);
        return createdAt.getMonth() === index;
      }).length;

      return { name: month, Users: count };
    });
  };

  const stats = [
    {
      title: "Customers",
      value: userCount,
      icon: <UserGroupIcon className="h-6 w-6" />,
      color: "bg-orange-100 text-orange-500",
    },
    {
      title: "Total income",
      value: "$ 6,760.89",
      icon: <CurrencyDollarIcon className="h-6 w-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "New Orders", // Updated title
      value: orderCount, // Dynamically updated value
      icon: <ShoppingCartIcon className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Unread Chats",
      value: 15,
      icon: <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />,
      color: "bg-cyan-100 text-cyan-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Section */}
      <div
        ref={statsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow flex items-center gap-4"
          >
            <div className={`text-3xl p-2 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div ref={chartsRef}>
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">User Analytics</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userAnalytics}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Users"
                stroke="#06B6D4"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Categorie Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                dataKey="Count"
              >
                {categorieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
            {categorieData.map((categorie, index) => (
              <span key={index} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categorie.color }}
                ></span>
                {categorie.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
