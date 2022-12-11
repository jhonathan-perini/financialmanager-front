import {Outlet, Route, Routes} from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Home from "./components/home/Home.jsx";
import About from "./components/about/About.jsx";
import Expenses from "./components/expenses/Expenses.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import {useEffect, useState} from "react";
import api from "./api/api.js";

const WithoutNav = () => <Outlet/>
const WithNav = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}


export default function AppRoutes(){
    const [sessionData, setSessionData] = useState(false)
    useEffect( () => {
        api.get('/isAuth').then(res => setSessionData(res.data))

    },[])
    return (
        <Routes>
            {!sessionData.email && <Route element={<WithoutNav/>}>
                <Route path="/" element={<Login/>}/>
            </Route>}
            {sessionData.email && <Route element={<WithNav/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/expenses" element={<Expenses/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>}
        </Routes>
    )
}