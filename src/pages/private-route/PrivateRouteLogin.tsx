import { Navigate, Outlet } from "react-router-dom";

export const PrivateRouteLogin = () => {
    const isAuthenticated = localStorage.getItem('token');

    return (
        !isAuthenticated ? <Outlet /> : <Navigate to={'/dashboard'} />
    );
}

export const PrivateRouteOther = () => {
    const isAuthenticated = localStorage.getItem('token');
    return (
        isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
    );
}