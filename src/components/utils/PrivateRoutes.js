import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { decodeToken } from "react-jwt";

const checkAuthentication = () => {
  const token = localStorage.getItem('jwt'); // Substitua por seu método de armazenamento

  if (!token) {
    console.log("token nao existe")
    return false; // Token não existe
  }

  try {
    const decodedToken = decodeToken(token);

    if (!decodedToken || Date.now() >= decodedToken.exp * 1000) {
        console.log("token expirou")
        return false; // Token expirado
    }

    return true; // Token válido
  } catch (error) {
    console.log("erro ao codificar")
    return false; // Token inválido ou erro ao decodificar
  }
};

const PrivateRoutes = () => {

    return(
        checkAuthentication() ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes