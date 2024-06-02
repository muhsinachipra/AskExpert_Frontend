// frontend\src\routes\adminRoutes.tsx

import { Route, Routes } from 'react-router-dom'
import Login from '../pages/admin/Login'
import Layout from '../components/admin/layout/Layout'
import Dashboard from '../pages/admin/Dashboard'
import ExpertManagement from '../pages/admin/ExpertManagement'
import AdminPrivateRoute from './privateRoutes/AdminPrivateRoute'


export function AdminRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path="*" element={<AdminPrivateRoute />}>
                <Route path="dashboard" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="expertmanagement" element={<ExpertManagement />} />
                </Route>
            </Route>
        </Routes>
    )
} 