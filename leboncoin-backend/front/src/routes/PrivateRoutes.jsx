import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/UseAuth";
import Loader from "../components/Loader";
const PrivateRoute = () => {
    const {user, loading} = useAuth()
    if (loading) return <Loader/>
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute