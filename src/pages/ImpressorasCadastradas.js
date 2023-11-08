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
          <div className="impressorasCadastradas-cabecalho-imagens"> 
            <img alt="" src={Search} />
            <img alt="" src={Filter} />
          </div>
        </div>
      </div>

      <div className="impressorasCadastradas-Lista">
        <h6>Impressora HP Laser 107 A - - - Catalão-GO - - - 9°DRP - 2°DM - - - img - img</h6>
        <h6>Impressora HP InkJet 50 - - -  - -Goiânia-GO - - - 1°DRP - 9°DM - - - img - img</h6>
        <h6>Impressora Epson EcoTank - - - -Formosa-GO - - 11°DRP -5°DM - - - img - img</h6>
          <div className="impressorasCadastradas-tester">
              <h7>olaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h7>
             </div>
      </div>
    </div>
  );
}