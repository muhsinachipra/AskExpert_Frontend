// frontend\src\routes\privateRoutes\ExpertPrivateRoute.tsx

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Navigate, Outlet } from "react-router-dom";

const ExpertPrivateRoute = () => {
    const { expertInfo } = useSelector((state: RootState) => state.auth);
    return expertInfo ? <Outlet /> : <Navigate to="/expert/login" replace />;
}

export default ExpertPrivateRoute;
