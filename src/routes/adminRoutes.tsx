// frontend\src\routes\adminRoutes.tsx

import { Route, Routes } from 'react-router-dom'
import Login from '../pages/admin/Login'
// import Layout from '../components/admin/layout/Layout'
import RootLayout from '../pages/admin/Layout'
// import Dashboard from '../pages/admin/Dashboard'
// import ExpertManagement from '../pages/admin/ExpertManagement'
import AdminPrivateRoute from './privateRoutes/AdminPrivateRoute'
import Dashboard from '../pages/admin/dashboard/page'
import ProjectsPage from '../pages/admin/projects/page'
import MessagesPage from '../pages/admin/messages/page'


export function AdminRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<AdminPrivateRoute />}>
                <Route element={<RootLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='/projects' element={<ProjectsPage />} />
                    <Route path='/messages' element={<MessagesPage />} />
                </Route>
            </Route>
        </Routes>
    )
} 