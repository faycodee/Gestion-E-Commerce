import React from "react";
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
} from "@heroicons/react/24/solid"; // Importation des icônes Heroicons

const stats = [
  {
    title: "Total customers",
    value: 765,
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
    title: "New Orders",
    value: 150,
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

const analyticsData = [
  { name: "January", Organic: 42, Paid: 25 },
  { name: "February", Organic: 48, Paid: 50 },
  { name: "March", Organic: 40, Paid: 64 },
  { name: "April", Organic: 55, Paid: 74 },
  { name: "May", Organic: 66, Paid: 51 },
  { name: "June", Organic: 73, Paid: 50 },
  { name: "July", Organic: 70, Paid: 65 },
];

const pieData = [
  { name: "Shirts", value: 40 },
  { name: "Shoes", value: 35 },
  { name: "Bags", value: 25 },
];

const COLORS = ["#6366F1", "#06B6D4", "#A855F7"];

const orders = [
  {
    id: "#0000",
    client: "Chandler Jacobi",
    amount: "$ 989.4",
    status: "Completed",
    date: "03/02/2020",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "#0001",
    client: "Monserrat Marquardt",
    amount: "$ 471.44",
    status: "Un-paid",
    date: "29/11/2019",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "#0002",
    client: "Lonie Wyman",
    amount: "$ 934.24",
    status: "Paid",
    date: "03/04/2020",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "#0003",
    client: "Corine Abernathy",
    amount: "$ 351.28",
    status: "Paid",
    date: "22/06/2019",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const statusColor = {
  Paid: "bg-green-100 text-green-600",
  "Un-paid": "bg-red-100 text-red-600",
  Completed: "bg-orange-100 text-orange-600",
};

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow flex items-center gap-4"
          >
            <div
              className={`text-3xl p-2 rounded-full ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">User Analytics</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analyticsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Organic" stroke="#06B6D4" strokeWidth={2} />
              <Line type="monotone" dataKey="Paid" stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2 text-sm">
            <span className="text-cyan-600">● Organic</span>
            <span className="text-purple-600">● Paid</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2 text-sm">
            <span className="text-indigo-500">● Shirts</span>
            <span className="text-cyan-500">● Shoes</span>
            <span className="text-purple-500">● Bags</span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 px-3">Client</th>
              <th className="py-2 px-3">Order ID</th>
              <th className="py-2 px-3">Amount</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-3 flex items-center gap-2">
                  <img src={order.image} alt="client" className="w-8 h-8 rounded-full" />
                  <span>{order.client}</span>
                </td>
                <td className="py-3 px-3">{order.id}</td>
                <td className="py-3 px-3">{order.amount}</td>
                <td className="py-3 px-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-3">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
