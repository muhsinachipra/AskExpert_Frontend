import { Route, Routes } from 'react-router-dom'
import Login from '../../pages/user/Login'

export function UserRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
        </Routes>
    )
} 