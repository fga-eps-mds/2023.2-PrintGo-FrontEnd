import React from "react";
import { Link } from "react-router-dom"; // Importe o Link
import "../../style/components/navbar.css";
import logo from "../../assets/logo 3.svg";

const Navbar = () => {
  return (
    <div className="container-navbar">
      <img alt="" src={logo}></img>

      <div className="button-navbar">
        <button className="home-navbar">
          <Link to="/">Home</Link> 
        </button>
        <button className="aboutUs-navbar">
          <Link to="/quemsomos">Quem Somos</Link>
        </button>
        <button className="contact-navbar">
          <Link to="/contato">Contato</Link>
        </button>
      </div>

      <div className="dropdown-navbar-users">
        <button className="users-navbar">
          Usuários
          <div className="dropdown-users-navbar">
            <Link to="/cadastro">Cadastro de usuário</Link>
            <Link to="#">Edição de usuário</Link>
          </div>
        </button>
      </div>

      <div className="dropdown-navbar-printers">
        <button className="printers-navbar">
          Impressoras
          <div className="dropdown-printers-navbar">
            <Link to="#">Cadastro de impressora</Link>
            <Link to="#">Edição de impressora</Link>
          </div>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
