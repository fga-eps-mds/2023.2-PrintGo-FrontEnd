import React from "react";
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import CreateUserPage from "./pages/CreateUser";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import ChangePassword from "./pages/ChangePassword";
import RegisterPrinter from "./pages/RegisterPrinter" 
import EditPrinter from "./pages/EditPrinter"

function App(){
   
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cadastroUsuario" element={<CreateUserPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/contato" element={<Contact/>}/>
      <Route path="/quemSomos" element={<AboutUs/>}/>
      <Route path="/trocaSenha" element={<ChangePassword/>}/>
      <Route path="/cadastroImpressora" element={<RegisterPrinter/>}/>
      <Route path="/editarImpressora" element={<EditPrinter/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;