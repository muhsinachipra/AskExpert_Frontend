import { Route, Routes } from 'react-router-dom'
import Register from '../pages/expert/authentication/Register'
import Otp from '../pages/expert/authentication/Otp'
import Login from '../pages/expert/authentication/Login'
import Landing from '../pages/expert/LandingPage'
import ExpertProfile from '../pages/expert/ExpertProfile'
import ExpertPrivateRoute from './privateRoutes/ExpertPrivateRoute'
import ForgotPassword from '../pages/expert/authentication/ForgotPassword'
import ResetPassword from '../pages/expert/authentication/ResetPassword'
import Home from '../pages/expert/home/Home'
import Schedule from '../pages/expert/session/Schedule'
import ExpertLayout from '../pages/expert/Layout'
// import { useSelector } from 'react-redux'
// import { RootState } from '../app/store'
import Unverified from '../pages/expert/Unverified'

export function ExpertRoutes() {
    // const { expertInfo } = useSelector((state: RootState) => state.auth);

    return (
        <Routes>
            {/* <Route path='/login' element={expertInfo ? <Navigate to="/expert" /> : <Login />} /> */}
            <Route path='/login' element={<Login />} />
            <Route index element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/forgot' element={<ForgotPassword />} />
            <Route path='/resetpassword/:email/:token' element={<ResetPassword />} />
            <Route path='not-verify' element={<Unverified />} />
            <Route element={<ExpertPrivateRoute />}>
                <Route element={<ExpertLayout />}>
                    <Route path='/home' element={<Home />} />
                    <Route path='/schedule' element={<Schedule />} />
                </Route>
                <Route path='profile' element={<ExpertProfile />} />
            </Route>
        </Routes>
    )
} 