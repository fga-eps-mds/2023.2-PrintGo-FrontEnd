import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../style/components/navbar.css";
import { getUserById } from "../../services/userService";
import logo from "../../assets/logo_navbar.svg";
import LoggedUser from "../../assets/loggeduser.svg";
import { decodeToken } from "react-jwt";
import { FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const { id } = useParams();
  let user = null;
  const token = localStorage.getItem("jwt");
  if (token) {
    user = decodeToken(token);
  }
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [printerDropdownOpen, setPrinterDropdownOpen] = useState(false);
  const [tooglePrinterDropdown, setooglePrinterDropdown] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
  const [userData, setUserData] = useState(null);
  const [displayUserRole, setDisplayUserRole] = useState(true);

  let navigate = useNavigate();

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen)
  }

  const fetchUserData = async () => {
    try{
      const data = await getUserById(id);

      if (data) {
      setUserData(data);
      if(data.cargos.includes("ADMIN") && user.id !== id){ //o admin pode editar o cargo de outros usuarios
        setIsAdmin(true)
      }
      if(data.cargos.includes("LOCADORA") && user.id !== id){
        setIsAdmin(false)
      }
    }
    } catch (error) {
      console.log(error)
    }
  }

  const verifyAdmin = async () =>{
      if(user && !userData) {
        await fetchUserData();
        if(user.id === id){ //o admin nao pode alterar o proprio cargo
          setDisplayUserRole(false)
        }
      }
    }

    verifyAdmin()
  if(isAdmin){
    const togglePrinterDropdown = () => {
      setPrinterDropdownOpen(!printerDropdownOpen)
   }
  }


  const userLogOut = async (e) => {
    e.preventDefault();
    try{
      localStorage.clear();
      navigate("/");
    }
    catch(error){
      console.log(error)
    }
    
      
  }

  return (
    <div className="container-navbar">
      <img alt="" src={logo}></img>

      <div className="button-navbar">
        <button>
          <Link to="/">Home</Link>
        </button>
        <button>
          <Link to="/quemsomos">Quem Somos</Link>
        </button>
        <button>
          <Link to="/contato">Contato</Link>
        </button>

        { user && (
          <>
            { user.cargos.includes('ADMIN') && (
              <div className="navbar-users">
                <button className="navbar-users-button" onClick={toggleUserDropdown}>
                  <h4>Usuários</h4> 
                  <FiChevronDown />
                  {userDropdownOpen && (
                    <div className="navbar-users-dropdown">
                      <Link to="/cadastro">Cadastro de usuário</Link>
                      <Link to="/listausuarios">Usuários cadastrados</Link>
                    </div>
                  )}
                </button>
              </div>
            )}

            <div className="navbar-printers">
              <button className="navbar-printers-button" onClick={ setPrinterDropdownOpen(!printerDropdownOpen) }>
                <h4>Impressoras</h4> 
                <FiChevronDown />
                {printerDropdownOpen && (
                  <div className="navbar-printers-dropdown">
                    <Link to="/cadastroimpressora">Cadastro de impressora</Link>
                    <Link to="/padraoimpressora">Cadastro de padrão de impressora</Link>
                    <Link to="/impressorascadastradas">Impressoras cadastradas</Link>
                    <Link to="/listapadroes">Padrões de impressora cadastrados</Link>
                  </div>
                )}
              </button>
            </div>
          </>
        )}

      </div>

      { user && (
        <div className="navbar-user-info">
          <div className="navbar-user-message">
            <img alt="loggeduser" src={LoggedUser}/>
            <Link to={`/editarusuario/${user.id}`}>Olá, {user.nome}!</Link>
          </div>
          <Link className="navbar-user-leave" data-testid="navbar-leave-button" onClick={userLogOut}>
            <button>
              Sair
            </button>
          </Link>
        </div>
      )}

      { !user && (
        <div className="navbar-login">
          <Link to="/login" className="button-login-navbar">
            <button>
              <h4>Login</h4>
            </button>
          </Link>
        </div>
      )}

    </div>
  );
};
export default Navbar;