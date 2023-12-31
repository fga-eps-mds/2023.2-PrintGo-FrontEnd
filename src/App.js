import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateUserPage from "./pages/CreateUser";
import EditUserPage from "./pages/EditUser";
import UsersList from "./pages/UsersList";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import ChangePassword from "./pages/ChangePassword";
import RegisterPrinter from "./pages/RegisterPrinter";
import EditPrinter from "./pages/EditPrinter";
import PatternPrinter from "./pages/PatternPrinter";
import EditPattern from "./pages/EditPattern";
import PrintersList from "./pages/PrintersList";
import ViewPrinter from "./pages/ViewPrinter";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PatternList from "./pages/PatternList";
import ViewPattern from "./pages/ViewPattern";
import ForgottenPasswordPage from "./pages/ForgottenPassword";
import RecoverPasswordPage from "./pages/RecoverPassword";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import AdminRoutes from "./components/utils/AdminRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/editarusuario/:id" element={<EditUserPage/>}/>
            <Route path="/mudarsenha" element={<ChangePassword />} />
            <Route path="/cadastroimpressora" element={<RegisterPrinter />} />
            <Route path="/editarimpressora/:printer" element={<EditPrinter />} />
            <Route path="/padraoimpressora" element={<PatternPrinter />} />
            <Route path="/editarpadrao/:padrao" element={<EditPattern />} />
            <Route path="/impressorascadastradas" element={<PrintersList />} />
            <Route path="/visualizarimpressora/:printerData" element={<ViewPrinter/>}/>
            <Route path="/listapadroes" element={<PatternList />} />
            <Route path="/padroescadastrados" element={<PatternList />} />
            <Route path="/visualizarpadrao/:padrao" element={<ViewPattern />} />
            <Route element={<AdminRoutes/>}>
              <Route path="/listausuarios" element={<UsersList />} />
              <Route path="/cadastro" element={<CreateUserPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/quemsomos" element={<AboutUs />} />
          <Route path="/recuperarSenha" element={<RecoverPasswordPage/>} />
          <Route path="/esqueciMinhaSenha" element={<ForgottenPasswordPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
