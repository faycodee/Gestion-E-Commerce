import React from "react";
import { RiDashboardLine, RiShoppingBagLine, RiUser3Line, RiChat3Line, RiSettings3Line, RiLogoutBoxLine } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 dark:bg-gray-900 p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-purple-600 mb-8">E-Commerce</h1>
        <ul className="space-y-4">
          <li className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-purple-600 cursor-pointer">
            <RiDashboardLine />
            Dashboard
          </li>
          <li className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-purple-600 cursor-pointer">
            <RiShoppingBagLine />
            Orders
          </li>
          <li className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-purple-600 cursor-pointer">
            <RiUser3Line />
            Customers
          </li>
          <li className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-purple-600 cursor-pointer">
            <RiChat3Line />
            Chats
          </li>
          <li className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-purple-600 cursor-pointer">
            <RiSettings3Line />
            Settings
          </li>
        </ul>
      </div>
      <div>
        <button className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-red-600 cursor-pointer">
          <RiLogoutBoxLine />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;