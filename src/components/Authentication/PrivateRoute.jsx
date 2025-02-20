import React from "react";
import { Navigate } from "react-router-dom"; // Import Navigate

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("access_token");

  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/Login" />;
  }

  return children;
};

export default PrivateRoute;
