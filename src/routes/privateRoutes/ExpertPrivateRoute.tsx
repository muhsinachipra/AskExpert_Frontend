// frontend\src\routes\privateRoutes\ExpertPrivateRoute.tsx

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Loading from "../../components/Loading";

const ExpertPrivateRoute = () => {
    const location = useLocation()
    const { expertInfo, expertStatus } = useSelector((state: RootState) => state.auth);
    const isExpertLoggedIn = localStorage.getItem("isExpertLoggedIn");
    if (!isExpertLoggedIn) {
        return <Navigate to="/expert/login" state={{ from: location }} replace />;
    }
    if (expertStatus === 'loading' || expertStatus === 'idle') {
        return <Loading />;
    }
    if (expertStatus === 'succeeded' && expertInfo) {
        return <Outlet />;
    }
    if (expertStatus === 'failed' || !expertInfo) {
        return <Navigate to="/expert/login" state={{ from: location }} replace />;
    }
    return null; // This ensures that nothing is rendered until status is determined
}

export default ExpertPrivateRoute;
