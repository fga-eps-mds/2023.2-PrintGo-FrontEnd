import React from "react";
import "../../style/components/navbar.css";
import logo from "../../assets/logo 3.svg";

const Navbar = () => {
  return (
    <div className="container-navbar">
      <img alt="" src={logo}></img>

      <div className="button-navbar">
        <button className="home-navbar">
          <a href="http://localhost:3000/">Home</a>
        </button>
        <button className="aboutUs-navbar">Quem Somos</button>
        <button className="contact-navbar">Contato</button>
      </div>

      <div className="dropdown-navbar-users">
        <button className="users-navbar">
          Usuários
          <div className="dropdown-users-navbar">
            <a href="http://localhost:3000/cadastro">Cadastro de usuário</a>
            <a href="#">Edição de usuário</a>
          </div>
        </button>
      </div>

      <div className="dropdown-navbar-printers">
        <button className="printers-navbar">
          Impressoras
          <div className="dropdown-printers-navbar">
            <a href="#">Cadastro de impressora</a>
            <a href="#">Edição de impressora</a>
          </div>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
