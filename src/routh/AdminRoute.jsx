import React from "react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({children}) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) return <p>Loading...</p>;
  if (!user || role !== "admin") {
    return <Navigate state={location.pathname} to="/forbidden"></Navigate>;
  }
  return children
};

export default AdminRoute;
