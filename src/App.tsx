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
    const [showLoader, setShowLoader] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { userInfo, expertInfo, adminInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        // Set showLoader to true immediately and start timeout
        setShowLoader(true);
        const timeout = setTimeout(() => {
            setShowLoader(false);
        }, 1000); // Ensure loader is shown for at least 1 second

        const fetchData = async (key: string, info: UserInfo | ExpertInfo | AdminInfo | null, fetchAction: AsyncThunk<IUser, void, AsyncThunkConfig> | AsyncThunk<IExpert, void, AsyncThunkConfig> | AsyncThunk<IAdmin, void, AsyncThunkConfig>) => {
            const isLoggedIn = localStorage.getItem(key);
            if (isLoggedIn && !info) {
                try {
                    await dispatch(fetchAction());
                } catch (error) {
                    console.error(`Failed to fetch ${key} data:`, error);
                    localStorage.removeItem(key);
                }
            }
        };

        const loadResources = async () => {
            try {
                await Promise.all([
                    fetchData("isUserLoggedIn", userInfo, fetchUserData),
                    fetchData("isExpertLoggedIn", expertInfo, fetchExpertData),
                    fetchData("isAdminLoggedIn", adminInfo, fetchAdminData)
                ]);
            } finally {
                setLoading(false); // Ensure loading is set to false regardless of fetch success or failure
            }
        };

        loadResources();
        return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }, [dispatch, userInfo, expertInfo, adminInfo]);

    if (showLoader || loading) {
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
    );
}

// // frontend\src\App.tsx

// import Loading from "./components/Loading";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { UserRoutes } from "./routes/userRoutes";
// import { ExpertRoutes } from "./routes/expertRoutes";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AdminRoutes } from "./routes/adminRoutes";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "./app/store";
// import { useEffect, useState } from "react";
// import { AdminInfo, AsyncThunkConfig, ExpertInfo, fetchAdminData, fetchExpertData, fetchUserData, UserInfo } from "./slices/authSlice";
// import { IAdmin, IExpert, IUser } from "./types/domain";
// import { AsyncThunk } from "@reduxjs/toolkit";
// import { SocketProvider } from "./context/SocketContext";

// export default function App() {
    
//     const [loading, setLoading] = useState(true);
//     const dispatch = useDispatch<AppDispatch>();
//     const { userInfo, expertInfo, adminInfo } = useSelector((state: RootState) => state.auth);

//     useEffect(() => {
//         // Simulate loading time with a timeout (replace with your actual loading logic)
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 1000); // Adjust the timeout as needed

//         return () => clearTimeout(timer);
//     }, []);

//     useEffect(() => {
//         const fetchData = async (key: string, info: UserInfo | ExpertInfo | AdminInfo | null, fetchAction: AsyncThunk<IUser, void, AsyncThunkConfig> | AsyncThunk<IExpert, void, AsyncThunkConfig> | AsyncThunk<IAdmin, void, AsyncThunkConfig>) => {
//             const isLoggedIn = localStorage.getItem(key);
//             if (isLoggedIn && !info) {
//                 try {
//                     // console.log(`refetching useEffect...`)
//                     await dispatch(fetchAction());
//                     // console.log(`after dispatch(fetchAction()) in useEffect...`)
//                 } catch (error) {
//                     console.error(`Failed to fetch ${key} data:`, error);
//                     localStorage.removeItem(key);
//                 }
//             }
//         };

//         fetchData("isUserLoggedIn", userInfo, fetchUserData);
//         fetchData("isExpertLoggedIn", expertInfo, fetchExpertData);
//         fetchData("isAdminLoggedIn", adminInfo, fetchAdminData);
//     }, [dispatch, userInfo, expertInfo, adminInfo])

//     if (loading) {
//         return <Loading />;
//     }

//     return (
//         <SocketProvider>
//             <BrowserRouter>
//                 <ToastContainer />
//                 <Routes>
//                     <Route path="/*" element={<UserRoutes />} />
//                     <Route path="/expert/*" element={<ExpertRoutes />} />
//                     <Route path="/admin/*" element={<AdminRoutes />} />
//                 </Routes>
//             </BrowserRouter>
//         </SocketProvider>
//     )
// }
