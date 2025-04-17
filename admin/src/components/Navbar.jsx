import React, { useState } from "react";
import {
  RiSearchLine,
  RiNotification3Line,
  RiUser3Line,
} from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="w-full h-16 bg-white flex items-center justify-between px-4 shadow-md relative">
      {/* Left: Search */}
      <div className="flex items-center gap-4">
        {/* <RiSearchLine className="text-gray-500" /> */}
        {/* <input
          type="text"
          placeholder="Search for projects"
          className="outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
        /> */}
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <div className="relative">
          <RiNotification3Line
            className="text-purple-600 text-xl cursor-pointer"
            onClick={() => setShowNotif(!showNotif)}
          />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg p-4 space-y-2 z-20">
              <div className="flex justify-between items-center">
                <span className="text-gray-800">Messages</span>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">13</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-800">Sales</span>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-800">Alerts</span>
              </div>
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div className="relative">
          <RiUser3Line
            className="text-gray-500 text-xl cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
          />

          {showProfile && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg p-3 space-y-2 z-20">
              <div className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded cursor-pointer">
                <AiOutlineUser />
                <span>Profile</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded cursor-pointer">
                <AiOutlineSetting />
                <span>Settings</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded cursor-pointer">
                <FiLogOut />
                <span>Log out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
