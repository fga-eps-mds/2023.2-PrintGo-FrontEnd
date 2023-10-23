import React from "react";
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login";
import QuemSomos from "./pages/QuemSomos";
import ChangePassword from "./pages/ChangePassword";
import NavbarSimple from "./components/NavbarSimple"
import Navbar from "./components/Navbar"
import Contato from "./pages/Contato";

function App(){
   
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/quem-somos" element={<QuemSomos/>}/>
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/NavbarSimple" element={<NavbarSimple/>}/>
      <Route path="/Navbar" element={<Navbar/>}/>
      <Route path="/Contato" element={<Contato />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;