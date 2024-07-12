// frontend\src\routes\adminRoutes.tsx

import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/admin/Login'
// import Layout from '../components/admin/layout/Layout'
import RootLayout from '../pages/admin/Layout'
// import Dashboard from '../pages/admin/Dashboard'
// import ExpertManagement from '../pages/admin/ExpertManagement'
import AdminPrivateRoute from './privateRoutes/AdminPrivateRoute'
import Dashboard from '../pages/admin/dashboard/page'
import AllExperts from '../pages/admin/expert/page'
import VerifyExperts from '../pages/admin/expert/verifyExperts/page'
import Category from '../pages/admin/category/page'
import AllUsers from '../pages/admin/user/page'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'


export function AdminRoutes() {

    const { adminInfo } = useSelector((state: RootState) => state.auth);

    return (
        <Routes>
            <Route path='/login' element={adminInfo ? <Navigate to="/admin" /> : <Login />} />
            {/* <Route path='/login' element={<Login />} /> */}
            <Route element={<AdminPrivateRoute />}>
                <Route element={<RootLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='/all-experts' element={<AllExperts />} />
                    <Route path='/verify-experts' element={<VerifyExperts />} />
                    <Route path='/category' element={<Category />} />
                    <Route path='/users' element={<AllUsers />} />
                </Route>
            </Route>
        </Routes>
    )
} 