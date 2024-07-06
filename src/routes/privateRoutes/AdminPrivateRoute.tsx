// frontend\src\routes\privateRoutes\AdminPrivateRoute.tsx

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Spinner from "../../components/Spinner";

const AdminPrivateRoute = () => {
  const location = useLocation()
  const { adminInfo, adminStatus } = useSelector((state: RootState) => state.auth);
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  if (adminStatus === 'loading' || adminStatus === 'idle') {
    console.log('adminStatus in loading or idle', adminStatus);
    return <Spinner />;
  }
  if (adminStatus === 'succeeded' && adminInfo) {
    console.log('adminStatus in succeeded', adminStatus);
    return <Outlet />;
  }
  if (adminStatus === 'failed' || !adminInfo) {
    console.log('adminStatus in failed or no adminInfo', adminStatus);
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return null; // This ensures that nothing is rendered until status is determined

}

export default AdminPrivateRoute