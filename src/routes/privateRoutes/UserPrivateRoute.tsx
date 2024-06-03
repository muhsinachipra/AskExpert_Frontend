// frontend\src\routes\privateRoutes\UserPrivateRoute.tsx

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const UserPrivateRoute = () => {
    const location = useLocation()
    const { userInfo } = useSelector((state: RootState) => state.auth);
    return userInfo ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default UserPrivateRoute;
