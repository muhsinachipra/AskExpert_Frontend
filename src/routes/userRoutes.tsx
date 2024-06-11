// frontend\src\routes\UserRoutes.tsx

import { Route, Routes } from 'react-router-dom'
import Login from '../pages/user/Login'
import SignUp from '../pages/user/SignUp'
import Landing from '../pages/user/LandingPage'
import MyComponent from '../pages/user/MyComponent'
import Otp from '../pages/user/Otp'
import ForgotPassword from '../pages/user/ForgotPassword'
import ResetPassword from '../pages/user/ResetPassword'
import UserProfile from '../pages/user/UserProfile'
import UserPrivateRoute from './privateRoutes/UserPrivateRoute'


export function UserRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/forgot' element={<ForgotPassword />} />
            <Route path='/resetpassword/:email/:token' element={<ResetPassword />} />
            <Route path='/' element={<Landing />} />
            <Route path="*" element={<UserPrivateRoute />}>
                <Route path='profile' element={<UserProfile />} />
            </Route>
            <Route path='/test' element={<MyComponent />} />
        </Routes>
    )
} 