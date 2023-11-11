import React from "react";
import  "../style/pages/impressorasCadastradas.css";
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import engine from '../assets/engine.svg';
import Input from '../components/Input';
import { useState } from "react";


export default function ImpressorasCadastradas(){
   
  const impressoras = [
    {
      nome: 'HP InkJet 50',
      codigo: 'HPInkJet-1234-ABCD',
      modelo: 'PRINTER-002',
      tipo: '1°DRP',
      data: '07/11/23',
      imagem: 'caminho/para/imagem1.jpg',
    },
    {
      nome: 'Epson LaserJet',
      codigo: 'EpsonLaser-5678-EFGH',
      modelo: 'PRINTER-003',
      tipo: '2°DRP',
      data: '08/11/23',
      imagem: 'caminho/para/imagem2.jpg',
    },
    
  ];
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
      
      {impressoras.map((impressora, index) => (

        <div key={index} className="impressorasCadastradas-Lista">
          <h6>{impressora.nome}</h6>
          <h6>{impressora.codigo}</h6>
          <h6>{impressora.modelo}</h6> 
          <h6>{impressora.tipo}</h6>
          <h6>{impressora.data}</h6>

          <div className="impressorasCadastradas-Lista-img">
            <img alt="" src={engine}/>
          </div>

        </div>
      ))}

    </div>
  );
}