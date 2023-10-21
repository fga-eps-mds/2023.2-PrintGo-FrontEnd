import React from "react";
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Navbar from "./components/Navbar"

function App(){
   
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Navbar" element={<Navbar/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;