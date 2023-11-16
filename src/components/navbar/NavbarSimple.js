import React from "react";
import { Link } from "react-router-dom"; // Importe o Link
import "../../style/components/navbarSimple.css";
import logo from "../../assets/logo 3.svg";

const NavbarSimple = () => {
  return (
    <div className="container-navbar-simple">
      <img alt="" src={logo} />

      <div className="button-navbar-simple">
        <button className="home-navbar-simple">
          <Link to="/">Home</Link> {/* Use o Link para navegar para a rota */}
        </button>
        <button className="aboutUs-navbar-simple">
          <Link to="/quemsomos">Quem Somos</Link>
        </button>
        <button className="contact-navbar-simple">
          <Link to="/contato">Contato</Link>
        </button>
      </div>

      <div className="button-login-navbar-simple">
        <Link to="/login">
          <button className="login-navbar-simple">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};
export default NavbarSimple;
