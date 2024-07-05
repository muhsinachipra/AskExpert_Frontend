import { Navigate, Route, Routes } from 'react-router-dom'
import Register from '../pages/expert/authentication/Register'
import Otp from '../pages/expert/authentication/Otp'
import Login from '../pages/expert/authentication/Login'
import Landing from '../pages/expert/LandingPage'
import ExpertProfile from '../pages/expert/ExpertProfile'
import ExpertPrivateRoute from './privateRoutes/ExpertPrivateRoute'
import ForgotPassword from '../pages/expert/authentication/ForgotPassword'
import ResetPassword from '../pages/expert/authentication/ResetPassword'
import Home from '../pages/expert/Home'
import Home2 from '../pages/expert/home/Home'
import Schedule from '../pages/expert/session/Schedule'
import ExpertLayout from '../pages/expert/Layout'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import Unverified from '../pages/expert/Unverified'

export function ExpertRoutes() {
    const { expertInfo } = useSelector((state: RootState) => state.auth);

    return (
        <Routes>
            <Route path='/login' element={expertInfo ? <Navigate to="/expert" /> : <Login />} />
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/forgot' element={<ForgotPassword />} />
            <Route path='/resetpassword/:email/:token' element={<ResetPassword />} />
            <Route element={<ExpertPrivateRoute />}>
                <Route path='not-verify' element={<Unverified />} />
                <Route element={<ExpertLayout />}>
                    <Route index element={<Home2 />} />
                    <Route path='/schedule' element={<Schedule />} />
                </Route>
                <Route path='profile' element={<ExpertProfile />} />
                <Route path='home' element={<Home />} />
            </Route>
        </Routes>
    )
} 