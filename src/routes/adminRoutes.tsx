import { Route, Routes } from 'react-router-dom'
import Login from '../pages/admin/Login'
import Layout from '../components/admin/Layout'
import Dashboard from '../pages/admin/Dashboard'
import Products from '../pages/admin/Products'


export function AdminRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
            </Route>
        </Routes>
    )
} 