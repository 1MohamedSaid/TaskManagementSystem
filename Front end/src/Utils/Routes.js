import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  // Replace with actual authentication logic
  return localStorage.getItem("authToken") !== null;
};

const PrivateRoute = ({ element: Component, ...rest }) => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = ({ element: Component, ...rest }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : <Outlet />;
};

export { PrivateRoute, PublicRoute };
