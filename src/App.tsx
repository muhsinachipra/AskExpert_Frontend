import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/userRoutes/userRoutes";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<UserRoutes />} />
            </Routes>
        </BrowserRouter>
    )
}