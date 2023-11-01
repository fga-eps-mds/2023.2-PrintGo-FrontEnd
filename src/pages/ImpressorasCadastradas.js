import React from "react";
import  "../style/pages/impressorasCadastradas.css";
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import Input from '../components/Input';

export default function ImpressorasCadastradas(){
    return(
        <div className="impressorasCadastradas-page">
            <div className="impressorasCadastradas-cabecalho">
                <h2>Impressoras cadastradas</h2>
                <div className="impressorasCadastradas-cabecalho-icones">
                  <div className="impressorasCadastradas-cabecalho-input">
                    <Input className="input-pesquisa-impressoras"/>
                  </div>
                  
                  <img alt="" src={Search} />
                  <img alt="" src={Filter} />
                  
                </div>

            </div>
        </div>
    );
}