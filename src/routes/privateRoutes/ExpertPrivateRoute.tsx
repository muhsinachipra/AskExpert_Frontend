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
import { RootState } from "../../app/store";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Spinner from "../../components/Spinner";

const ExpertPrivateRoute = () => {
    const location = useLocation()
    const { expertInfo, expertStatus } = useSelector((state: RootState) => state.auth);
    const isExpertLoggedIn = localStorage.getItem("isExpertLoggedIn");
    if (!isExpertLoggedIn) {
        return <Navigate to="/expert/login" state={{ from: location }} replace />;
    }
    if (expertStatus === 'loading' || expertStatus === 'idle') {
        console.log('expertStatus in loading or idle', expertStatus);
        return <Spinner />;
    }
    if (expertStatus === 'succeeded' && expertInfo) {
        console.log('expertStatus in succeeded', expertStatus);
        return <Outlet />;
    }
    if (expertStatus === 'failed' || !expertInfo) {
        console.log('expertStatus in failed or no expertInfo', expertStatus);
        return <Navigate to="/expert/login" state={{ from: location }} replace />;
    }
    return null; // This ensures that nothing is rendered until status is determined

    // if (expertStatus === 'loading') {
    //     return <Spinner />;
    // }
    // if (expertStatus === 'succeeded') {
    //     return expertInfo ? <Outlet /> : <Navigate to="/expert/login" state={{ from: location }} replace />;
    // }
    // if (expertStatus === 'failed') {
    //     return <Navigate to="/expert/login" state={{ from: location }} replace />;
    // }
    // // return expertInfo ? <Outlet /> : <Navigate to="/expert/login" state={{ from: location }} replace />;
}

export default ExpertPrivateRoute;
