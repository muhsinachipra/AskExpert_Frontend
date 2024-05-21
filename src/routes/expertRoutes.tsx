import { Route, Routes } from 'react-router-dom'
import Register from '../pages/expert/Register'

export function ExpertRoutes() {
    return (
        <Routes>
            <Route path='/register' element={<Register />} />
        </Routes>
    )
} 