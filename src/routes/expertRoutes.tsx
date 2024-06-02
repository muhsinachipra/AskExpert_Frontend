import { Route, Routes } from 'react-router-dom'
import Register from '../pages/expert/Register'
import Otp from '../pages/expert/Otp'
import Login from '../pages/expert/Login'
import Landing from '../pages/expert/LandingPage'
import ExpertProfile from '../pages/expert/ExpertProfile'
import ExpertPrivateRoute from './privateRoutes/ExpertPrivateRoute'

export function ExpertRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/login' element={<Login />} />
            <Route path="*" element={<ExpertPrivateRoute />}>
                <Route path='profile' element={<ExpertProfile />} />
            </Route>
        </Routes>
    )
} 