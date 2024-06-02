// frontend\src\routes\privateRoutes\AdminPrivateRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const AdminPrivateRoute = () => {
    const { adminInfo } = useSelector((state:RootState) => state.auth);
  return adminInfo ?<Outlet/> :  <Navigate to="/admin/login" replace />
}

export default AdminPrivateRoute