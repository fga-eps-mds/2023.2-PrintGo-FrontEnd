import React from "react";
import "../../style/components/navbarContact.css";
import logo from "../../assets/logo 3.svg";

const NavbarContact = () => {
  return (
    <div className="container-navbar-contact">
      <img alt="" src={logo}></img>

      <div className="button-navbar-contact">
        <button className="home-navbar-contact">
          <a href="http://localhost:3000/">Home</a>
        </button>
        <button className="aboutUs-navbar-contact">
          <a href="http://localhost:3000/quemsomos">Quem Somos</a>
        </button>
        <button className="contact-navbar-contact">
          {" "}
          <a href="http://localhost:3000/contato">Contato</a>
        </button>
      </div>
    </div>
  );
};
export default NavbarContact;
