import { Route, Routes } from 'react-router-dom'
import Register from '../pages/expert/Register'
import Otp from '../pages/expert/Otp'

export function ExpertRoutes() {
    return (
        <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/otp' element={<Otp />} />
        </Routes>
    )
} 