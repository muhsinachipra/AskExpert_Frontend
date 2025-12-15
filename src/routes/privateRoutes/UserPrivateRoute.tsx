// frontend\src\routes\privateRoutes\UserPrivateRoute.tsx

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Loading from "../../components/Loading";

const UserPrivateRoute = () => {
    const location = useLocation()
    const { userInfo, userStatus } = useSelector((state: RootState) => state.auth);
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    if (!isUserLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (userStatus === 'loading' || userStatus === 'idle') {
        return <Loading />;
    }
    if (userStatus === 'succeeded' && userInfo) {
        return <Outlet />;
    }
    if (userStatus === 'failed' || !userInfo) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    // return null; // This ensures that nothing is rendered until status is determined
    return <Loading />;
}

export default UserPrivateRoute;
