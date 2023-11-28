import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importe o Link
import "../../style/components/navbar.css";
import logo from "../../assets/logo 3.svg";

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
        <button className="users-navbar" onClick={toggleUserDropdown}>
          Usuários <FiChevronDown />
          {userDropdownOpen && (
            <div className="dropdown-users-navbar">
              <Link to="/cadastro">Cadastro de usuário</Link>
              <Link to="#">Edição de usuário</Link>
            </div>
          )}
        </button>
      </div>

      <div className="dropdown-navbar-printers">
        <button className="printers-navbar" onClick={togglePrinterDropdown}>
          Impressoras <FiChevronDown />
          {printerDropdownOpen && (
            <div className="dropdown-printers-navbar">
              <Link to="/cadastroimpressora">Cadastro de impressora</Link>
              <Link to="/editarimpressora">Edição de impressora</Link>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
export default Navbar;
