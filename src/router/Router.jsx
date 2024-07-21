import { Navigate, Route, Routes } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import PageNotFound from "pages/404"
import AdminPage from "pages/AdminPage"
import AuthPage from "pages/AuthPage"
import Dashboard from "pages/DashboardPage"
import HomePage from "pages/HomePage"
import Loader from "components/modules/Loader"

import { getProfile } from "src/services/user"


const Router = () => {
    const { data , isLoading } = useQuery(["profile"] , getProfile)
    if(isLoading) return <Loader/>
    return(
        <> 
        <Routes>
            <Route index element={<HomePage/>} />
            <Route path="/dashboard" element={data ? <Dashboard/> : <Navigate to={"/auth"} />} />
            <Route path="/auth" element={data ? <Navigate to={"/dashboard"}/> : <AuthPage/>}/>
            <Route path="/admin" element={data && data.data.role === "ADMIN" ? <AdminPage/> : <Navigate to={"/"}/>} />
            <Route path="/*" element={<PageNotFound/>} />
        </Routes>
        </>
    )
}
export default Router