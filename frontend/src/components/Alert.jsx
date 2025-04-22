import React from "react";

const Alert = React.memo(({ message, type, onClose }) => {
  const alertColors = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
  };

  return (
    <div className="fixed top-20 z-50 left-1/2 transform -translate-x-1/2">
      <div
        className={`border-l-4 p-4 ${alertColors[type]} rounded-lg shadow-lg min-w-64`}
        role="alert"
        aria-live="assertive"
      >
        <div className="flex justify-between items-center">
          <span className="text-sm">{message}</span>
          <button
            onClick={onClose}
            className="text-2xl leading-none"
            aria-label="Close alert"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
});

export default Alert;
