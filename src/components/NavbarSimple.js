import "../style/components/navbarSimple.css"
import React from "react";
import logo from "../assets/logo 3.svg";

export default function NavbarSimple(){

return(
  
        <div className="container-navbar-s">
            <img src={logo}></img>
            <div className="Botoes-navbar"> 
                <button>
                    Home
                </button>
                <button>
                    Quem somos
                </button>
                <button>
                    Contato
                </button>
            </div>
            
            <div className="Login-navbar">
                <button >
                    Login
                </button>
            </div>
        </div>
 
);


}