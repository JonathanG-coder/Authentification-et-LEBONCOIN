import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/UseAuth";
import Loader from "../components/Loader";

const PublicRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <Loader/>
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
