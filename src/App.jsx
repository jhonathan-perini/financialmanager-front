import Login from "./components/login/Login";
import {Outlet, Route, Routes, useLocation, redirect} from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import Expenses from "./components/expenses/Expenses";
import Dashboard from "./components/dashboard/Dashboard";
import {createContext, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import api from "./api/api.js";
import AppRoutes from "./Routes.jsx";




export const UserContext = createContext({})
function App() {



  return (
        <AppRoutes/>
  )
}

export default App
