import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = ({ children, authentication }) => {
  const isAuthenticated = useSelector((state) => state.auth.status);

  if (authentication && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!authentication && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthLayout;
