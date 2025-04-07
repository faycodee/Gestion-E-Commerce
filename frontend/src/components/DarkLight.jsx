import React, { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { toggleLightDark } from "../store";
import { Sun, Moon } from "lucide-react";
export default function DarkLightToggle() {
  const lightdark = useSelector((state) => state.lightdark);
  const dispatch = useDispatch();
  console.log(lightdark.mode);

  return (
    <div
      style={{ position: "fixed", right: 50, top: "85vh", zIndex: 200 }}
      className="flex items-center justify-center  
-7 bg-transparent"
    >
      <button
        onClick={() => dispatch(toggleLightDark())}
        className="p-2 rounded-full shadow-md transition-transform transform hover:scale-110"
      >
        {lightdark.mode === "dark" ? (
          <Sun className="text-yellow-400 w-6 h-6" />
        ) : (
          <Moon className="text-gray-800 w-6 h-6" />
        )}
      </button>
    </div>
  );
}
