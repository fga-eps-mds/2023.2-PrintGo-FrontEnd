import React from "react";

import "../style/pages/contato.css"
import Imagem_Homen from "../assets/imagem-homen-ruivo.svg";
import Input from "../components/Input"


export default function Contato(){

return(
   
    <div className="Main-page">
        <div className="Contato-principal">
            <h1>Contato</h1>
            <div className="Box-contato">
                <p>Contato</p>
            </div>
            <Input label="Nome:" placeholder="Digite seu nome" />
            <button className="Enviar-button">Enviar</button>
        </div>
        <div className="Imagem">
            <img src={Imagem_Homen} alt="Imagem de um homem ruivo"/>
        </div> 
    </div>
);

}
