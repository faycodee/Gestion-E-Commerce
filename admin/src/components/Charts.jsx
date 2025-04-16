import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Charts = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      chartRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={chartRef} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">User Details</h3>
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
  );
};

export default Charts;