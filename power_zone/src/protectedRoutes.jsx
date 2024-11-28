import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({ allowedRoles, children }) => {
  let user = JSON.parse(localStorage.getItem("usuario"));

  if (!user || !allowedRoles.includes(user.rol)) {
    return <Navigate to="/PowerZone" replace />;
  }
  return children;
};