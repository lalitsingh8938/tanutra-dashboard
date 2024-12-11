import React from "react";
import { Route, Navigate } from "react-router-dom";

// Private Route Component
function PrivateRoute({ element: Element, ...rest }) {
  // Check if the user is logged in by checking for the access token in localStorage
  const isAuthenticated = localStorage.getItem("access_token");

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/Login" />}
    />
  );
}

export default PrivateRoute;
