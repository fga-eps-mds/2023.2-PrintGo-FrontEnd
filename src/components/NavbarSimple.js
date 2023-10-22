import "../style/components/navbarSimple.css"
import React from "react";
import logo from "../assets/logo 3.svg";

export default function NavbarSimple(){

return(
  
        <div className="container">
            <img src={logo}></img>
            <div className="Botoes"> 
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
            
            <div className="Login">
            <button >
                Login
            </button>
            </div>
        </div>
 
    


);




}