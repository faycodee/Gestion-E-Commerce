import React from "react";
import { RiSearchLine, RiNotification3Line, RiUser3Line } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-white dark:bg-gray-800 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center gap-4">
        <RiSearchLine className="text-gray-500" />
        <input
          type="text"
          placeholder="Search for projects"
          className="outline-none bg-transparent text-gray-700 dark:text-gray-300"
        />
      </div>
      <div className="flex items-center gap-4">
        <RiNotification3Line className="text-gray-500" />
        <RiUser3Line className="text-gray-500" />
      </div>
    </div>
  );
};

export default Navbar;