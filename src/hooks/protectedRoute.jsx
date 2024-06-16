import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthContext from "@/context/AuthProvider";

const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated, role } = useAuth(); // Only destructure authState

  console.log("auth: ", isAuthenticated, "  role:  ", role);

  if (!isAuthenticated) {
    // Not authenticated, redirect to login
    return <Navigate to="/401" />;
  }

  if (roles && !roles.includes(role)) {
    // Role not authorized, redirect to unauthorized page
    console.log(roles);
    return <Navigate to="/401" />;
  }

  // Authorized, render outlet
  return <Outlet />;
};

export default ProtectedRoute;
