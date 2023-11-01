import React from "react";
import "../../style/components/navbar.css";
import logo from "../../assets/logo 3.svg";

const Navbar = () => {
  return (
    <div className="container-navbar">
      <img alt="" src={logo}></img>

      <div className="button-navbar">
        <button className="home-navbar">Home</button>
        <button className="aboutUs-navbar">Quem Somos</button>
        <button className="contact-navbar">Contato</button>
      </div>

      <div className="dropdown-navbar">
        <button className="users-navbar">
          Usuários
          <div className="dropdown-users-navbar">
            <a href="#">Cadastro de usuário</a>
            <a href="#">Edição de usuário</a>
          </div>
        </button>
        <button className="printers-navbar">
          Impressoras
          <div className="dropdown-printer-navbar">
            <a href="#">Cadastro de impressora</a>
            <a href="#">Edição de impressora</a>
          </div>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
