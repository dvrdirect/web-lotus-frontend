import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// HOC: envuelve un componente de página y lo protege con auth
export const withProtectedRoute = (WrappedComponent) => {
  const ProtectedRouteComponent = (props) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
      // Redirige a la landing y pide abrir la ventana de login
      return (
        <Navigate
          to="/"
          replace
          state={{ from: location.pathname, forceAuth: true }}
        />
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedRouteComponent;
};

export default withProtectedRoute;
