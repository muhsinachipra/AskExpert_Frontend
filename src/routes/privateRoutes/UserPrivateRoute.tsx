// frontend\src\routes\privateRoutes\UserPrivateRoute.tsx

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Navigate, Outlet } from "react-router-dom";

const UserPrivateRoute = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default UserPrivateRoute;
