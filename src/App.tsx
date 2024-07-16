// frontend\src\App.tsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/userRoutes";
import { ExpertRoutes } from "./routes/expertRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminRoutes } from "./routes/adminRoutes";

export default function App() {

    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/*" element={<UserRoutes />} />
                <Route path="/expert/*" element={<ExpertRoutes />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
        </BrowserRouter>
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
