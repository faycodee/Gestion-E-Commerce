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
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ChatBubbleLeftEllipsisIcon,
  ChartBarIcon,
  MapIcon,
  ArrowTrendingUpIcon,
  ArchiveBoxXMarkIcon,
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
  const [orderCount, setOrderCount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [timeframeOption, setTimeframeOption] = useState("month");
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [conversionRate, setConversionRate] = useState(0);
  const [abandonedCarts, setAbandonedCarts] = useState(0);
  
  // Refs for GSAP animations
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const chartsRef = useRef(null);
  const arabicStatsRef = useRef(null);
  const salesChartRef = useRef(null);
  const productsChartRef = useRef(null);
  const categoriesChartRef = useRef(null);

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

        // Calculate total income
        const income = produits.reduce(
          (sum, produit) => sum + produit.prix_HT * produit.quantity,
          0
        );
        setTotalIncome(income.toFixed(2));

        const produitAnalytics = produits.map((produit) => ({
          name: produit.nom,
          Quantity: produit.quantity,
          color: PRODUCT_COLORS[produit.nom] || generateRandomColor(),
        }));
        setProduitData(produitAnalytics);
        
        // Create top products data
        const sortedProducts = [...produitAnalytics].sort((a, b) => b.Quantity - a.Quantity).slice(0, 5);
        setTopProducts(sortedProducts);
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

    axios
      .get("http://localhost:8000/api/commandes")
      .then((response) => {
        const orders = response.data;
        setOrderCount(orders.length);
        
        // Generate sales data based on the orders
        generateSalesData(orders, timeframeOption);
        
        // Set mock conversion rate and abandoned carts
        setConversionRate(Math.floor(Math.random() * 30) + 10);
        setAbandonedCarts(Math.floor(Math.random() * 50) + 10);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });

    // GSAP Timeline for coordinated animations
    const tl = gsap.timeline();

    // Header animation
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }

    // Stats cards animation
    if (statsRef.current) {
      tl.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.5)" },
        "-=0.4"
      );
    }

    // Arabic stats animation
    if (arabicStatsRef.current) {
      tl.fromTo(
        arabicStatsRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power2.out" },
        "-=0.3"
      );
    }

    // Sales chart animation
    if (salesChartRef.current) {
      tl.fromTo(
        salesChartRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.2"
      );
    }

    // Products chart animation
    if (productsChartRef.current) {
      tl.fromTo(
        productsChartRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        "-=0.5"
      );
    }

    // User and categories charts animation
    if (chartsRef.current) {
      tl.fromTo(
        chartsRef.current.children,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.25, ease: "elastic.out(1, 0.75)" },
        "-=0.3"
      );
    }

    // Add hover effects to stat cards
    if (statsRef.current) {
      const statCards = statsRef.current.children;
      Array.from(statCards).forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { 
            y: -5, 
            scale: 1.03, 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)", 
            duration: 0.3 
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { 
            y: 0, 
            scale: 1, 
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", 
            duration: 0.3 
          });
        });
      });
    }

    // Arabic stats hover effects
    if (arabicStatsRef.current) {
      const arabicCards = arabicStatsRef.current.children;
      Array.from(arabicCards).forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { 
            y: -5, 
            scale: 1.03, 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)", 
            duration: 0.3 
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { 
            y: 0, 
            scale: 1, 
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", 
            duration: 0.3 
          });
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (statsRef.current) {
        const statCards = statsRef.current.children;
        Array.from(statCards).forEach(card => {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        });
      }
      
      if (arabicStatsRef.current) {
        const arabicCards = arabicStatsRef.current.children;
        Array.from(arabicCards).forEach(card => {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        });
      }
    };
  }, [timeframeOption]);

  const generateSalesData = (orders, timeframe) => {
    let salesDataPoints = [];
    const now = new Date();
    
    switch(timeframe) {
      case 'day':
        // Last 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const dateStr = date.toLocaleDateString('ar-SA', { weekday: 'short' });
          
          // Count orders for this day
          const dayOrders = orders.filter(order => {
            const orderDate = new Date(order.date_achat);
            return orderDate.toDateString() === date.toDateString();
          });
          
          salesDataPoints.push({
            name: dateStr,
            Ventes: dayOrders.length * Math.floor(Math.random() * 200 + 50)
          });
        }
        break;
        
      case 'week':
        // Last 4 weeks
        for (let i = 3; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - (i * 7));
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          
          salesDataPoints.push({
            name: `semaine ${4-i}`,
            Ventes: Math.floor(Math.random() * 1000 + 500)
          });
        }
        break;
        
      case 'month':
      default:
        // Last 6 months
        const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const currentMonth = now.getMonth();
        
        for (let i = 5; i >= 0; i--) {
          const monthIndex = (currentMonth - i + 12) % 12;
          
          salesDataPoints.push({
            name: months[monthIndex],
            Ventes: Math.floor(Math.random() * 5000 + 1000)
          });
        }
        break;
    }
    
    setSalesData(salesDataPoints);
  };

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
      value: `$ ${totalIncome}`,
      icon: <CurrencyDollarIcon className="h-6 w-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "New Orders",
      value: orderCount,
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

  const arabicStats = [
    {
      title: " Taux de conversion",
      value: `${conversionRate}%`,
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />,
      color: "bg-violet-100 text-violet-600",
    },
    {
      title: "Paniers abandonnés",
      value: abandonedCarts,
      icon: <ArchiveBoxXMarkIcon className="h-6 w-6" />,
      color: "bg-rose-100 text-rose-600",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 
        ref={headerRef} 
        className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 inline-block"
      >
        Dashboard
      </h1>

      {/* Stats Section */}
      <div
        ref={statsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-500 flex items-center gap-4"
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

      {/* Arabic Dashboard Title */}
      <div 
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105"
      >
        <h2 className="text-xl font-bold text-center" dir="rtl">Panneau de statistiques</h2>
      </div>

      {/* Arabic Stats Section */}
      <div
        ref={arabicStatsRef}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {arabicStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-r-4 border-indigo-500 flex items-center gap-4"
            dir="rtl"
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

      {/* Arabic Sales Charts Section */}
      <div 
        ref={salesChartRef}
        className="bg-white rounded-2xl shadow-md p-4 mb-6 transform transition hover:shadow-lg duration-300"
      >
        <div className="flex justify-between items-center mb-4" dir="rtl">
          <h2 className="text-lg font-semibold">Ventes par période</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setTimeframeOption("day")}
              className={`px-3 py-1 rounded transition-colors duration-300 ${timeframeOption === "day" ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              tous les jours
            </button>
            <button 
              onClick={() => setTimeframeOption("week")}
              className={`px-3 py-1 rounded transition-colors duration-300 ${timeframeOption === "week" ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              hebdomadaire
            </button>
            <button 
              onClick={() => setTimeframeOption("month")}
              className={`px-3 py-1 rounded transition-colors duration-300 ${timeframeOption === "month" ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              mensuel
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Ventes" fill="#4338CA">
              {salesData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`rgba(67, 56, 202, ${0.7 + index * 0.05})`} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Best Selling Products */}
      <div 
        ref={productsChartRef}
        className="bg-white rounded-2xl shadow-md p-4 mb-6 transform transition hover:shadow-lg duration-300"
      >
        <h2 className="text-lg font-semibold mb-4" dir="rtl">Produits les plus vendus</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={topProducts}
            layout="vertical"
            barSize={30}
            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="Quantity" name="الكمية المباعة">
              {topProducts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Section */}
      <div ref={chartsRef}>
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6 transform transition hover:shadow-lg duration-300 border-t-4 border-blue-500">
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
                dot={{ stroke: '#06B6D4', strokeWidth: 2, r: 4 }}
                activeDot={{ stroke: '#06B6D4', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div 
          ref={categoriesChartRef}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transform transition hover:shadow-lg duration-300 border-t-4 border-purple-500"
        >
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
                animationBegin={300}
                animationDuration={1500}
              >
                {categorieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
            {categorieData.map((categorie, index) => (
              <span 
                key={index} 
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
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

      {/* Footer */}
      <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500 mt-8">
        <p>&copy; 2025 Dashboard. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Dashboard;