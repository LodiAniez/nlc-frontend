import React from "react";
import { Navigate } from "react-router-dom";
import { Routes } from "../../constants/pages";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to={Routes.LOGIN} />;
  }

  return element;
};

export default ProtectedRoute;
