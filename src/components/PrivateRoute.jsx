import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Use the custom useAuth hook

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();  // Get the authentication status

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;  // Redirect to the login page if not authenticated
  }

  return children;  // If authenticated, render the protected component
};

export default PrivateRoute;
