// frontend\src\routes\UserRoutes.tsx

import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/user/authentication/Login'
import SignUp from '../pages/user/authentication/SignUp'
import Landing from '../pages/user/LandingPage'
import MyComponent from '../pages/user/MyComponent'
import Otp from '../pages/user/authentication/Otp'
import ForgotPassword from '../pages/user/authentication/ForgotPassword'
import ResetPassword from '../pages/user/authentication/ResetPassword'
import UserProfile from '../pages/user/UserProfile'
import UserPrivateRoute from './privateRoutes/UserPrivateRoute'
import Home from '../pages/user/home/Home'
import SelectExpert from '../pages/user/SelectExpert'
import Slots from '../pages/user/Slots'
import Success from '../pages/user/Success'
import Appointments from '../pages/user/Appointments'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import ChatPage from '../pages/user/ChatPage'
import VideoCall from '../components/user/VideoCall'
import Review from '../pages/user/Review'

export function UserRoutes() {

    const { userInfo } = useSelector((state: RootState) => state.auth);
    return (
        <Routes>
            <Route path='/login' element={userInfo ? <Navigate to="/home" /> : <Login />} />
            {/* <Route path='/login' element={<Login />} /> */}
            <Route path='/register' element={<SignUp />} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/forgot' element={<ForgotPassword />} />
            <Route path='/resetpassword/:email/:token' element={<ResetPassword />} />
            <Route path='/' element={<Landing />} />
            <Route path="*" element={<UserPrivateRoute />}>
                <Route path='profile' element={<UserProfile />} />
                <Route path='home' element={<Home />} />
                <Route path='experts/:categoryName' element={<SelectExpert />} />
                <Route path='slots/:expertId' element={<Slots />} />
                <Route path='success' element={<Success />} />
                <Route path='appointments' element={<Appointments />} />
                <Route path='chat' element={<ChatPage />} />
                <Route path='room/:roomId' element={<VideoCall />} />
                <Route path='review/:appointmentId' element={<Review />} />
            </Route>
            <Route path='/test' element={<MyComponent />} />
        </Routes>
    )
} 