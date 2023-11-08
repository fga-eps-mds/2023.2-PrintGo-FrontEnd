import React from "react";
import  "../style/pages/impressorasCadastradas.css";
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import engine from '../assets/engine.svg';
import Input from '../components/Input';


const impressora=[
  {modelo: "HP Laser 107 A", nome: "HP-2022-XYZ789", regiao:"Catalão-GO", numeracao:"0", DRP:"9°DRP", DM:"2°DM", data:"06/11/23"}
];

const listaImpressora=impressora.map(
  (c.i)=>
  <li key={i}>{i} - {modelo} {c.nome} {c.regiao} - R${c.numeracao} </li> 
)

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
        <h6>HP Laser 107 A</h6> 
        <h6>Catalão-GO</h6>
        <h6>9°DRP</h6>
        <h6>2°DM</h6>
        <h6>0</h6>
        <h6>06/11/23</h6>
        <div className="impressorasCadastradas-Lista-img">
          <img alt="" src={engine}/>
        </div>
        <ul>listaImpressora</ul>
      </div>
    </div>

  );
}