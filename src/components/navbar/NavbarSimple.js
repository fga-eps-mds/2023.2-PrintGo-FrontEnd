import React from "react";
import "../../style/components/navbarSimple.css";
import logo from "../../assets/logo 3.svg";

const NavbarSimple = () => {
  return (
    <div className="container-navbar-simple">
      <img alt="" src={logo}></img>

      <div className="button-navbar-simple">
        <button className="home-navbar-simple">
          <a href="http://localhost:3000/">Home</a>
        </button>
        <button className="aboutUs-navbar-simple">
          <a href="http://localhost:3000/quemsomos">Quem Somos</a>
        </button>
        <button className="contact-navbar-simple">
          {" "}
          <a href="http://localhost:3000/contato">Contato</a>
        </button>
      </div>

      <div className="button-login-navbar-simple">
        <button className="login-navbar-simple">
          <a href="http://localhost:3000/login">Login</a>
        </button>
      </div>
    </div>
  );
};
export default NavbarSimple;
