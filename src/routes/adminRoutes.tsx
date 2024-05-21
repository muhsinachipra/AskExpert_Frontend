import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'

export function AdminRoutes() {
    return (
        <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    )
} 