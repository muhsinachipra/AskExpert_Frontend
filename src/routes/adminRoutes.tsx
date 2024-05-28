import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import Login from '../pages/admin/Login'

export function AdminRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    )
} 