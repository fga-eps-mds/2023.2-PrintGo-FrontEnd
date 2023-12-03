import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importe o Link
import "../../style/components/navbar.css";
import logo from "../../assets/logo 3.svg";
import { decodeToken } from "react-jwt";

import { FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [printerDropdownOpen, setPrinterDropdownOpen] = useState(false);


  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen)
  }

  const togglePrinterDropdown = () => {
    setPrinterDropdownOpen(!printerDropdownOpen)
  }

  const token = localStorage.getItem("jwt");

  const user = decodeToken(token);

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

      { user && (
        <div className="dropdown-navbar-users">
          <button className="users-navbar" onClick={toggleUserDropdown}>
            Usuários <FiChevronDown />
            {userDropdownOpen && (
              <div className="dropdown-users-navbar">
                <Link to="/cadastro">Cadastro de usuário</Link>
                <Link to="/editarusuario">Edição de usuário</Link>
              </div>
            )}
          </button>
        </div>
      )}

      { user && (
      <div className="dropdown-navbar-printers">
        <button className="printers-navbar" onClick={togglePrinterDropdown}>
          Impressoras <FiChevronDown />
          {printerDropdownOpen && (
            <div className="dropdown-printers-navbar">
              <Link to="/cadastroimpressora">Cadastro de impressora</Link>
              <Link to="/padraoimpressora">Cadastro de padrão de impressora</Link>
              <Link to="/impressorascadastradas">Impressoras cadastradas</Link>
              <Link to="/listapadroes">Padrões de impressora cadastrados</Link>
            </div>
          )}
        </button>
      </div>
      )}
    </div>
  );
};
export default Navbar;
