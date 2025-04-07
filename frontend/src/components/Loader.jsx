import React, { useState, useEffect } from "react";
import {
  CircleIcon,
  CakeIcon,
  Martini,
  ChefHatIcon,
  UtensilsCrossedIcon,
} from "lucide-react";

export default function RestaurantLoader({
  actualProgress,
  onLoadingComplete,
}) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [status, setStatus] = useState("Preparing your experience...");

  useEffect(() => {
    // Smoothly animate to actual progress
    if (displayProgress < actualProgress) {
      const timer = setInterval(() => {
        setDisplayProgress((prev) => {
          const next = prev + 0.5;
          if (next >= actualProgress) {
            clearInterval(timer);
            return actualProgress;
          }
          return next;
        });
      }, 30);

      return () => clearInterval(timer);
    }
  }, [actualProgress, displayProgress]);

  useEffect(() => {
    if (displayProgress < 25) {
      setStatus("Warming up the kitchen...");
    } else if (displayProgress < 50) {
      setStatus("Setting the tables...");
    } else if (displayProgress < 75) {
      setStatus("Preparing the ingredients...");
    } else if (displayProgress < 100) {
      setStatus("Almost ready to serve...");
    } else {
      setStatus("Welcome to our restaurant!");
      setTimeout(() => onLoadingComplete(), 500); // Give time for final animation
    }
  }, [displayProgress, onLoadingComplete]);

  return (
    <div
      style={{ zIndex: 400 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-darkBackground"
    >
      <div className="flex gap-4 mb-8">
        <ChefHatIcon
          className={`w-8 h-8 transition-all duration-500 ${
            displayProgress > 25 ? "text-primary" : "text-gray-600"
          }`}
        />
        <UtensilsCrossedIcon
          className={`w-8 h-8 transition-all duration-500 ${
            displayProgress > 50 ? "text-primary" : "text-gray-600"
          }`}
        />

        <Martini
          className={`w-8 h-8 transition-all duration-500 ${
            displayProgress > 75 ? "text-primary" : "text-gray-600"
          }`}
        />
      </div>

      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-950 to-darkAccentBright transition-all duration-300"
          style={{ width: `${displayProgress}%` }}
        />
      </div>

      <div className="mt-4 text-primary font-medium">{`${Math.round(
        displayProgress
      )}%`}</div>
      <div className="mt-2 text-gray-400 text-sm">{status}</div>
    </div>
  );
}
