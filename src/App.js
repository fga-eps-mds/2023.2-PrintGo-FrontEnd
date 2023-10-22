import React from "react";
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import CreateUserPage from "./pages/CreateUser";

function App(){
   
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Cadastro" element={<CreateUserPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;