import "../style/components/navbar.css"
import React from "react";
import logo from "../assets/logo 3.svg";

export default function Navbar(){

return(
   
    <div className="fundo">
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
            
            <button className="Login">
                Login
            </button>
        </div>
    </div>
    


);




}