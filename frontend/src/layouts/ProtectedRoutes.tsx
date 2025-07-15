import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // Replace this with your actual auth logic (e.g. context or cookie or redux)
  const isLoggedIn = localStorage.getItem("token");

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
