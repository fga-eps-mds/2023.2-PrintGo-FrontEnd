import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { decodeToken } from "react-jwt";

const checkAuthentication = () => {
  const token = localStorage.getItem('token'); // Substitua por seu método de armazenamento

  if (!token) {
    return false; // Token não existe
  }

  try {
    const decodedToken = decodeToken(token);

    if (!decodedToken || Date.now() >= decodedToken.exp * 1000) {
      return false; // Token expirado
    }

    return true; // Token válido
  } catch (error) {
    return false; // Token inválido ou erro ao decodificar
  }
};

const PrivateRoutes = () => {

    return(
        checkAuthentication() ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes