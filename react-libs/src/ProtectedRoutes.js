import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";



const ProtectedRoutes = () => {
    const location = useLocation();
    const isAuth = localStorage.getItem("auth_token");
    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default ProtectedRoutes;