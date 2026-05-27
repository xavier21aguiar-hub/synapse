import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"
import HomeToday from "../pages/HomeToday"

export default function AppRoutes() {

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<HomeToday/>}/>
                <Route path="dashboard" element={<Home/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}