import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { IAuthData } from "./contex/AuthProvider";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.accessToken && auth?.roles?.find((role: string) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken && !auth?.roles?.find((role: string) => allowedRoles?.includes(role)) ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
