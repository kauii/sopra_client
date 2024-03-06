import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export const AuthGuard = () => {
  const { id } = useParams(); // Access the :id parameter using useParams

  const [isAuthorized, setIsAuthorized] = useState(false);
  const currentToken = localStorage.getItem('token');
  // Check if the user is authenticated and if the stored user ID matches the requested user ID for editing the profile
  // Retrieve additional user information or roles if needed
  // For simplicity, assume you have stored the user ID in localStorage during login
  const storedUserId = localStorage.getItem('id');
  console.log("Token", currentToken)
  console.log("type of storedID", typeof storedUserId)
  console.log("type of userId ", typeof id)
  console.log("Bool", storedUserId === id)

  if (storedUserId === id) {
    return <Outlet />;
  } else {
    console.log("WTF???")
    console.log("AGAIN:: Bool", storedUserId === id)
    return <Navigate to="/overview" replace />;
  }
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
