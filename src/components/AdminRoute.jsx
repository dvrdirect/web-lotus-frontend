import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserRole } from "../utils/roles";

// HOC: protege una página para solo admin/staff
export const withAdminRoute = (WrappedComponent) => {
  const AdminRouteComponent = (props) => {
    const { isLoggedIn, userData } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
      return (
        <Navigate
          to="/"
          replace
          state={{ from: location.pathname, forceAuth: true }}
        />
      );
    }

    const role = getUserRole(userData);
    if (role !== "admin") {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return AdminRouteComponent;
};

export default withAdminRoute;
