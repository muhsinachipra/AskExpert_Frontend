// frontend\src\routes\privateRoutes\AdminPrivateRoute.tsx

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Loading from "../../components/Loading";

const AdminPrivateRoute = () => {
  const location = useLocation()
  const { adminInfo, adminStatus } = useSelector((state: RootState) => state.auth);
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  if (adminStatus === 'loading' || adminStatus === 'idle') {
    return <Loading />;
  }
  if (adminStatus === 'succeeded' && adminInfo) {
    return <Outlet />;
  }
  if (adminStatus === 'failed' || !adminInfo) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  // return null; // This ensures that nothing is rendered until status is determined
  return <Loading />;
}

export default AdminPrivateRoute