import React from "react";
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import CreateUserPage from "./pages/CreateUser";
import Login from "./pages/Login";
import Contato from "./pages/Contato";
import QuemSomos from "./pages/QuemSomos";
import ChangePassword from "./pages/ChangePassword";



function App(){
   
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cadastro" element={<CreateUserPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/contato" element={<Contato/>}/>
      <Route path="/quemsomos" element={<QuemSomos/>}/>
      <Route path="/changePassword" element={<ChangePassword/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;