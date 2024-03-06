import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export const AuthGuard = () => {
  const { id } = useParams(); // Access the :id parameter using useParams

  const currentToken = localStorage.getItem("token");
  // Check if the user is authenticated and if the stored user ID matches the requested user ID for editing the profile
  // Retrieve additional user information or roles if needed
  // For simplicity, assume you have stored the user ID in localStorage during login
  const storedUserId = localStorage.getItem("id");

  if (currentToken && storedUserId === id) {
    return <Outlet />;
  } else {
    return <Navigate to="/overview" replace />;
  }
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
