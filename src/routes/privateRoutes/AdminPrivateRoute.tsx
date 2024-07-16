// frontend\src\routes\privateRoutes\AdminPrivateRoute.tsx

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAdminToken } from "../../slices/authSlice";

const AdminPrivateRoute = () => {
  const location = useLocation()
  const token = useSelector(selectCurrentAdminToken)

  return (
    token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
  )

}

export default AdminPrivateRoute