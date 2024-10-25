import { Outlet } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";



export const PrivateRouteLogin = () => {
    const isAuthenticated = localStorage.getItem('token');
    return (
        !isAuthenticated ? <Outlet /> : <Dashboard />
    );
}

export const PrivateRouteOther = () => {
    const isAuthenticated = localStorage.getItem('token');
    return (
        isAuthenticated ? <Outlet /> : <Dashboard />
    );
}