// frontend\src\App.tsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { ExpertRoutes } from "./routes/ExpertRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminRoutes } from "./routes/AdminRoutes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { useEffect } from "react";
import { fetchUserData } from "./slices/authSlice";

export default function App() {

    const dispatch = useDispatch<AppDispatch>();
    const { userInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
        if (isUserLoggedIn && !userInfo) {
            try {
                dispatch(fetchUserData());
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                localStorage.removeItem("isUserLoggedIn");
            }
        }
    }, [dispatch, userInfo]);

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
