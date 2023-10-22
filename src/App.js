import React from "react";
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import CreateUserPage from "./pages/CreateUser";
import NavbarSimple from "./components/NavbarSimple"
import Navbar from "./components/Navbar"


function App(){
   
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Cadastro" element={<CreateUserPage/>}/>
      <Route path="/NavbarSimple" element={<NavbarSimple/>}/>
      <Route path="/Navbar" element={<Navbar/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;