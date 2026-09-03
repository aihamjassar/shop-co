import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user, isAuthenticate } = useSelector((state) => state.auth);
  const allowed = allowedRoles.length === 0 || allowedRoles.includes(user?.role);

  if (!isAuthenticate) return <Navigate to="/" replace />;
  if (!allowed) return <Navigate to="/" replace />;
  return <Outlet />;
};
