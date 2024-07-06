// frontend\src\routes\UserRoutes.tsx

import { Route, Routes } from 'react-router-dom'
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
// import { useSelector } from 'react-redux'
// import { RootState } from '../app/store'


export function UserRoutes() {

    // const { userInfo } = useSelector((state: RootState) => state.auth);
    // console.log('in userRoutes.....')
    return (
        <Routes>
            {/* <Route path='/login' element={userInfo ? <Navigate to="/home" /> : <Login />} /> */}
            
            <Route path='/login' element={<Login />} />
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
            </Route>
            <Route path='/test' element={<MyComponent />} />
        </Routes>
    )
} 