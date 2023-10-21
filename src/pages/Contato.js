import React from "react";

import "../style/pages/contato.css"
import Imagem_Homen from "../assets/imagem-homen-ruivo.svg";
import Input from "../components/Input"


export default function Contato(){

return(
   
    <div className="Main-page">
        <h1>Contato</h1>
        <div className="Contato-principal">
            <div className="Box-contato">
                <p>Contato</p>
                <div className="Input-contato">
                    <Input label="Nome" placeholder="Nome" />
                    <Input label="E-mail" placeholder="Email" />
                </div>
                <div className="Assunto-input">
                    <Input label="Assunto" placeholder="Email" className="larger-input" />
                </div>
                <div className="button-div">
                    <button className="Enviar-button">Enviar</button>
                </div>
            </div>
            <div className="Imagem">
                <img src={Imagem_Homen} alt="Imagem de um homem ruivo"/>
            </div> 
        </div>
    </div>
);

}
