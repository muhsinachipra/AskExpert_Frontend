// frontend\src\App.tsx

import Loading from "./components/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/userRoutes";
import { ExpertRoutes } from "./routes/expertRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminRoutes } from "./routes/adminRoutes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { useEffect, useState } from "react";
import { AdminInfo, AsyncThunkConfig, ExpertInfo, fetchAdminData, fetchExpertData, fetchUserData, UserInfo } from "./slices/authSlice";
import { IAdmin, IExpert, IUser } from "./types/domain";
import { AsyncThunk } from "@reduxjs/toolkit";
import { SocketProvider } from "./context/SocketContext";

export default function App() {
    
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const { userInfo, expertInfo, adminInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchData = async (key: string, info: UserInfo | ExpertInfo | AdminInfo | null, fetchAction: AsyncThunk<IUser, void, AsyncThunkConfig> | AsyncThunk<IExpert, void, AsyncThunkConfig> | AsyncThunk<IAdmin, void, AsyncThunkConfig>) => {
            const isLoggedIn = localStorage.getItem(key);
            if (isLoggedIn && !info) {
                try {
                    // console.log(`refetching useEffect...`)
                    await dispatch(fetchAction());
                    // console.log(`after dispatch(fetchAction()) in useEffect...`)
                } catch (error) {
                    console.error(`Failed to fetch ${key} data:`, error);
                    localStorage.removeItem(key);
                }
            }
        };

        fetchData("isUserLoggedIn", userInfo, fetchUserData);
        fetchData("isExpertLoggedIn", expertInfo, fetchExpertData);
        fetchData("isAdminLoggedIn", adminInfo, fetchAdminData);
    }, [dispatch, userInfo, expertInfo, adminInfo])


    useEffect(() => {
        // Simulate loading time with a timeout (replace with your actual loading logic)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <SocketProvider>
            <BrowserRouter>
                <ToastContainer />
                <Routes>
                    <Route path="/*" element={<UserRoutes />} />
                    <Route path="/expert/*" element={<ExpertRoutes />} />
                    <Route path="/admin/*" element={<AdminRoutes />} />
                </Routes>
            </BrowserRouter>
        </SocketProvider>
    )
}



// // frontend\src\App.tsx

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { UserRoutes } from "./routes/UserRoutes";
// import { ExpertRoutes } from "./routes/ExpertRoutes";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AdminRoutes } from "./routes/AdminRoutes";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "./app/store";
// import { useEffect } from "react";
// import { fetchAdminData, fetchExpertData, fetchUserData } from "./slices/authSlice";

// export default function App() {

//     const dispatch = useDispatch<AppDispatch>();
//     const { userInfo } = useSelector((state: RootState) => state.auth);
//     const { expertInfo } = useSelector((state: RootState) => state.auth);
//     const { adminInfo } = useSelector((state: RootState) => state.auth);

//     useEffect(() => {
//         const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
//         if (isUserLoggedIn && !userInfo) {
//             try {
//                 dispatch(fetchUserData());
//             } catch (error) {
//                 console.error("Failed to fetch user data:", error);
//                 localStorage.removeItem("isUserLoggedIn");
//             }
//         }
//     }, [dispatch, userInfo]);

//     useEffect(() => {
//         const isExpertLoggedIn = localStorage.getItem("isExpertLoggedIn");
//         if (isExpertLoggedIn && !expertInfo) {
//             try {
//                 dispatch(fetchExpertData());
//             } catch (error) {
//                 console.error("Failed to fetch expert data:", error);
//                 localStorage.removeItem("isExpertLoggedIn");
//             }
//         }
//     }, [dispatch, expertInfo]);

//     useEffect(() => {
//         const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
//         if (isAdminLoggedIn && !adminInfo) {
//             try {
//                 dispatch(fetchAdminData());
//             } catch (error) {
//                 console.error("Failed to fetch admin data:", error);
//                 localStorage.removeItem("isAdminLoggedIn");
//             }
//         }
//     }, [dispatch, adminInfo]);

//     return (
//         <BrowserRouter>
//             <ToastContainer />
//             <Routes>
//                 <Route path="/*" element={<UserRoutes />} />
//                 <Route path="/expert/*" element={<ExpertRoutes />} />
//                 <Route path="/admin/*" element={<AdminRoutes />} />
//             </Routes>
//         </BrowserRouter>
//     )
// }













// // frontend\src\App.tsx

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { UserRoutes } from "./routes/UserRoutes";
// import { ExpertRoutes } from "./routes/ExpertRoutes";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AdminRoutes } from "./routes/AdminRoutes";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "./app/store";
// import { useEffect } from "react";
// import { fetchUserData } from "./slices/authSlice";

// export default function App() {

//     const dispatch = useDispatch<AppDispatch>();
//     const { userInfo } = useSelector((state: RootState) => state.auth);

//     useEffect(() => {
//         const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
//         if (isUserLoggedIn && !userInfo) {
//             try {
//                 console.log('refetching user data...')
//                 dispatch(fetchUserData());
//             } catch (error) {
//                 console.error("Failed to fetch user data:", error);
//                 localStorage.removeItem("isUserLoggedIn");
//             }
//         }
//     }, [dispatch, userInfo]);

//     return (
//         <BrowserRouter>
//             <ToastContainer />
//             <Routes>
//                 <Route path="/*" element={<UserRoutes />} />
//                 <Route path="/expert/*" element={<ExpertRoutes />} />
//                 <Route path="/admin/*" element={<AdminRoutes />} />
//             </Routes>
//         </BrowserRouter>
//     )
// }
