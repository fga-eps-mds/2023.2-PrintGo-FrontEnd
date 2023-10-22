import React from "react";
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login";
import NavbarSimple from "./components/NavbarSimple"
import Navbar from "./components/Navbar"

function App(){
   
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/NavbarSimple" element={<NavbarSimple/>}/>
      <Route path="/Navbar" element={<Navbar/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;