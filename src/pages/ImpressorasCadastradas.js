import React from "react";
import  "../style/pages/impressorasCadastradas.css";
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import engine from '../assets/engine.svg';
import Input from '../components/Input';
import { useState } from "react";


export default function ImpressorasCadastradas(){

  const impressora = [ 
    {modelo: "HP Laser 107 A", nome: "HP-2022-XYZ789", regiao:"Catalão-GO", DRP:"9°DRP", DM:"2°DM", numeracao:"0", data:"06/11/23", id:"1"},
    {modelo: "HP InkJet 50", nome: "HPInkJet-1234-ABCD", regiao:"Goiania-GO", DRP:"1°DRP", DM:"9°DM", numeracao:"0", data:"21/11/23", id:"2"}
  ];
  

//  const listaImpressoras3 = impressora.map((impressora) => <impressora key={impressora.id} modelo={impressora.modelo} nome={impressora.nome} regiao={impressora.regiao} DRP={impressora.DR} DM={impressora.DM} numeracao={impressora.numeracao} data={impressora.data}/>);
  //      <div className="ImpressorasCadastradas-Lista" key={impressora.id}>
  //        {c.modelo} {c.nome} {c.regiao} {c.DRP} {c.DM} {c.numeracao} {c.data}
  //       <h6>{c.nome}</h6>
  //       <h6>{c.regiao}</h6>
  //       <h6>{c.DRP}</h6>
  //       <h6>{c.DM}</h6>
  //       <h6>{c.numeracao}</h6>
  //       <h6>{c.data}</h6>
  //      </div>
   
  const listaImpressora = impressora.map(
    (c,i) => <h6 key={i}>
      {i}
      {c.modelo}
      {c.nome}
      {c.regiao}
      {c.DRP}
      {c.DM}
      {c.numeracao}
      {c.data}
    </h6>
  )

  const listaImpressora2 = impressora.map(
    (c,i) => 
    <div className="ImpressorasCadastradas-Lista" key={impressora.id}>
      {i}
      {c.modelo}
      {c.nome}
      {c.regiao}
      {c.DRP}
      {c.DM}
      {c.numeracao}
      {c.data}
    </div>
  )


  
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
        
        {/* <h6>{listaImpressora}</h6> */}
        {/* <h6>{listaImpressora2}</h6> */}
        {/* <h6>{listaImpressora3}</h6> */}
  

        <h6>HP Laser 107 A</h6>
        <h6>HP-2022-XYZ789</h6>
        <h6>PRINTER-001</h6> 
        <h6>9°DRP</h6>
        <h6>2°DM</h6>
        <h6>0</h6>
        <h6>06/11/23</h6>

        <div className="impressorasCadastradas-Lista-img">
          <img alt="" src={engine}/>
        </div>
      </div>

      <div className="impressorasCadastradas-Lista">
        <h6>HP InkJet 50</h6>
        <h6>HPInkJet-1234-ABCD</h6>
        <h6>PRINTER-002</h6> 
        <h6>1°DRP</h6>
        <h6>9°DM</h6>
        <h6>0</h6>
        <h6>07/11/23</h6>

        <div className="impressorasCadastradas-Lista-img">
          <img alt="" src={engine}/>
        </div>
      </div>

      <div className="impressorasCadastradas-Lista">
        <h6>Epson EcoTank</h6>
        <h6>Epson-EcoTank-001</h6>
        <h6>PRINTER-003</h6> 
        <h6>11°DRP</h6>
        <h6>5°DM</h6>
        <h6>0</h6>
        <h6>08/11/23</h6>

        <div className="impressorasCadastradas-Lista-img">
          <img alt="" src={engine}/>
        </div>
      </div>

    </div>
  );
}