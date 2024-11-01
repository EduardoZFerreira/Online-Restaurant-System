import { useSelector } from "react-redux";
import { selectCurrentRoles } from "../../features/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireRole = ({ requiredRole }: { requiredRole: string }) => {
  const roles = useSelector(selectCurrentRoles) as string[];
  const hasRole = roles.includes(requiredRole);
  const location = useLocation();

  return hasRole ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
