import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { decodeToken } from "react-jwt";

const AdminRoutes = () => {
    let loggedUser = null;
    let isAdmin = false;
    const token = localStorage.getItem("jwt");
    if (token) {
        loggedUser = decodeToken(token);
    }

    if (loggedUser.cargos.includes("ADMIN")){
        isAdmin = true;
    }
    
    if (isAdmin) {
        return <Outlet data-testid="outlet"/>
    } 
    else{
        return <Navigate to="/" />;
        
    }
}

export default AdminRoutes;