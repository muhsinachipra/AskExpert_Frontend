// // frontend\src\routes\privateRoutes\ExpertPrivateRoute.tsx

// import { useSelector } from "react-redux";
// import { RootState } from "../../app/store";
// import { useLocation, Navigate, Outlet } from "react-router-dom";

// const ExpertPrivateRoute = () => {
//     const location = useLocation()
//     const { expertInfo } = useSelector((state: RootState) => state.auth);
// if (expertInfo) {
//     if (expertInfo?.isVerified === false) {
//         return <Navigate to="/expert/not-verify" state={{ from: location }} replace />;
//     }
//     return <Outlet />
// } else {
//     return <Navigate to="/expert/login" state={{ from: location }} replace />
// }
// }

// export default ExpertPrivateRoute;






// frontend\src\routes\privateRoutes\ExpertPrivateRoute.tsx

import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentExpertToken } from "../../slices/authSlice";

const ExpertPrivateRoute = () => {
    const location = useLocation()
    const token = useSelector(selectCurrentExpertToken)

    return (
        token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default ExpertPrivateRoute;
