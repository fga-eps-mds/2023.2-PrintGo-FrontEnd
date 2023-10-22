import "../style/components/navbar.css"
import React from "react";
import logo from "../assets/logo 3.svg";
import chevron from "../assets/chevron-down.svg";
import email from "../assets/email.svg"
import sino from "../assets/sino.svg"
import user from "../assets/user.svg"


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
                <button>
                    Cadastros
                </button>
                <button>
                    Contagens
                </button>
            </div>
            
            <div className="Icons">
               <button>
            <img src={sino}></img>
            </button>
            <button>
            <img src={email}></img>
            </button> 
            </div>

            <div className="User">
            <button>
            <img src={user}></img>
            <p>User</p>
            <img src={chevron}></img> 
            </button>
            </div>
        </div>
    </div>
    


);




}