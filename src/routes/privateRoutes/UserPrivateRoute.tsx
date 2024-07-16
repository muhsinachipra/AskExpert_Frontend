// frontend\src\routes\privateRoutes\UserPrivateRoute.tsx

import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentUserToken } from "../../slices/authSlice";

const UserPrivateRoute = () => {
    const location = useLocation()
    const token = useSelector(selectCurrentUserToken)

    return (
        token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default UserPrivateRoute;
