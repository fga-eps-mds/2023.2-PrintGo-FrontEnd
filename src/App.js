import React from "react";
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";

function App(){
   
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;