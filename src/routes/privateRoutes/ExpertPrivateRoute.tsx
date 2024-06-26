// frontend\src\routes\privateRoutes\ExpertPrivateRoute.tsx

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const ExpertPrivateRoute = () => {
    const location = useLocation()
    const { expertInfo } = useSelector((state: RootState) => state.auth);
    return expertInfo ? <Outlet /> : <Navigate to="/expert/login" state={{ from: location }} replace />;
}

export default ExpertPrivateRoute;
