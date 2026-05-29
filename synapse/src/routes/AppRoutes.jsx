import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"
import HomeToday from "../pages/HomeToday"
import HomeTodayV2 from "../pages/HomeTodayV2"
import Finance from "../pages/Finance"

export default function AppRoutes() {

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<HomeTodayV2/>}/>
                <Route path="dashboard" element={<Home/>}/>
                <Route path="/finance" element={<Finance/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}