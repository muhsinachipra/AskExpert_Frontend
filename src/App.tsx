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

// import {
//     createBrowserRouter,
//     RouterProvider,
// } from "react-router-dom";
// import { UserRoutes } from "./routes/userRoutes";
// import { ExpertRoutes } from "./routes/expertRoutes";
// import { AdminRoutes } from "./routes/adminRoutes";
// import { ToastContainer } from "react-toastify";


// const router = createBrowserRouter([
//     {
//         path: "/*",
//         element: <UserRoutes />,
//     },
//     {
//         path: "/expert/*",
//         element: <ExpertRoutes />,
//     },
//     {
//         path: "/admin/*",
//         element: <AdminRoutes />,
//     },
// ]);

// export default function App() {
//     return (
//         <RouterProvider router={router} />
//     )
// }