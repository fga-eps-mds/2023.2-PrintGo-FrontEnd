import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateUserPage from "./pages/CreateUser";
import EditUserPage from "./pages/EditUser";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import ChangePassword from "./pages/ChangePassword";
import RegisterPrinter from "./pages/RegisterPrinter";
import EditPrinter from "./pages/EditPrinter";
import PatternPrinter from "./pages/PatternPrinter";
import EditPattern from "./pages/EditPattern";
import PrintersList from "./pages/PrintersList";
import PatternList from "./pages/PatternList";
import ForgottenPasswordPage from "./pages/ForgottenPassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecoverPasswordPage from "./pages/RecoverPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CreateUserPage />} />
          <Route path="/editarusuario" element={<EditUserPage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/quemsomos" element={<AboutUs />} />
          <Route path="/mudarsenha" element={<ChangePassword />} />
          <Route path="/recuperarSenha" element={<RecoverPasswordPage/>} />
          <Route path="/esqueciMinhaSenha" element={<ForgottenPasswordPage />} />
          <Route path="/cadastroimpressora" element={<RegisterPrinter />} />
          <Route path="/editarimpressora" element={<EditPrinter />} />
          <Route path="/padraoimpressora" element={<PatternPrinter />} />
          <Route path="/editarpadrao" element={<EditPattern />} />
          <Route path="/impressorascadastradas" element={<PrintersList />} />
          <Route path="/listapadroes" element={<PatternList />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
