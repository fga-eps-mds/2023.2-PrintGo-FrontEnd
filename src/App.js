import React from "react";
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login";
import Contato from "./pages/Contato";
import QuemSomos from "./pages/QuemSomos";



function App(){
   
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/contato" element={<Contato/>}/>
      <Route path="/quemsomos" element={<QuemSomos/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;