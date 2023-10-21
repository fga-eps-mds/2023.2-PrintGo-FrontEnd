import React from "react";
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login";
import QuemSomos from "./pages/QuemSomos";

function App(){
   
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/quem-somos" element={<QuemSomos/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;