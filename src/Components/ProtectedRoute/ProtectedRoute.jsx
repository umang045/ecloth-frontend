import React from "react";
import { Navigate } from "react-router-dom";
import { isLogin } from "../../utils/AxiosConfig";

const ProtectedRoute = ({ element, requiredRole }) => {
  const isLoggedIn = isLogin();
  const userRole = localStorage.getItem("role");

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={`/${userRole}`} />;
  }

  return element;
};

export default ProtectedRoute;
