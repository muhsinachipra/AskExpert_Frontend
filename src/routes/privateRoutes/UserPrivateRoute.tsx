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
        // console.log('userStatus in loading or idle', userStatus);
        return <Loading />;
    }
    if (userStatus === 'succeeded' && userInfo) {
        // console.log('userStatus in succeeded', userStatus);
        return <Outlet />;
    }
    if (userStatus === 'failed' || !userInfo) {
        // console.log('userStatus in failed or no userInfo', userStatus);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return null; // This ensures that nothing is rendered until status is determined

    // if (userStatus === 'loading') {
    //     return <Loading />;
    // }
    // if (userStatus === 'succeeded') {
    //     return userInfo ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
    // }
    // if (userStatus === 'failed') {
    //     return <Navigate to="/login" state={{ from: location }} replace />;
    // }
}

export default UserPrivateRoute;
