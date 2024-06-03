// frontend\src\routes\privateRoutes\AdminPrivateRoute.tsx

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const AdminPrivateRoute = () => {
  const location = useLocation()
  const { adminInfo } = useSelector((state: RootState) => state.auth);
  return adminInfo ? <Outlet /> : <Navigate to="/admin" state={{ from: location }} replace />
}

export default AdminPrivateRoute