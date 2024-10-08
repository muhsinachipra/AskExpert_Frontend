// frontend\src\routes\ExpertRoutes.tsx

import { Navigate, Route, Routes } from 'react-router-dom'
import Register from '../pages/expert/authentication/Register'
import Otp from '../pages/expert/authentication/Otp'
import Login from '../pages/expert/authentication/Login'
import Landing from '../pages/expert/LandingPage'
import Appointments from '../pages/expert/Appointments'
import ExpertPrivateRoute from './privateRoutes/ExpertPrivateRoute'
import ForgotPassword from '../pages/expert/authentication/ForgotPassword'
import ResetPassword from '../pages/expert/authentication/ResetPassword'
import Schedule from '../pages/expert/session/Schedule'
import ExpertLayout from '../pages/expert/Layout'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import Unverified from '../pages/expert/Unverified'
import Profile from '../pages/expert/Profile'
import Wallet from '../pages/expert/Wallet'
import ChatPage from '../pages/expert/chat/ChatPage'
import Ratings from '../pages/expert/Ratings'
import NotFound from '../pages/error/NotFound'

export function ExpertRoutes() {
    const { expertInfo } = useSelector((state: RootState) => state.auth);

    return (
        <Routes>
            <Route path='/login' element={expertInfo ? <Navigate to="/expert/appointments" /> : <Login />} />
            <Route index element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/forgot' element={<ForgotPassword />} />
            <Route path='/resetpassword/:email/:token' element={<ResetPassword />} />
            <Route path='not-verify' element={<Unverified />} />
            <Route path='/*' element={<NotFound role={'expert'} />} />
            <Route element={<ExpertPrivateRoute />}>
                <Route element={<ExpertLayout />}>
                    <Route path='schedule' element={<Schedule />} />
                    <Route path='appointments' element={<Appointments />} />
                    <Route path='rating' element={<Ratings />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='wallet' element={<Wallet />} />
                </Route>
                <Route path='chat' element={<ChatPage />} />
            </Route>
        </Routes>
    )
}
