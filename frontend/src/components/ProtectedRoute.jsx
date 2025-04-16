import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  const user = localStorage.getItem("user");

  // If token or user doesn't exist, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If token and user exist, render the children (protected content)
  return children;
};

export default ProtectedRoute;