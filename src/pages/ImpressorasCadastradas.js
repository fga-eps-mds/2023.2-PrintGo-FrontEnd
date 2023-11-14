import React from "react";
import  "../style/pages/impressorasCadastradas.css";
import { Link } from "react-router-dom"
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import engine from '../assets/engine.svg';
import Input from '../components/Input'; 
import Modal from '../components/ui/Modal';
import { useState } from "react";


export default function ImpressorasCadastradas(){
   
  const impressoras = [
    {
      modelo: 'HP InkJet 50',
      padrao: 'HPInkJet-1234-ABCD',
      ip: '987.654.32',
      codigo_loc: 'PRINTER-002',
      unidade_pai: '1°DRP',
      unidade_filha: '2ª DM',
      contador: '83',
      data: '07/11/23',
      imagem: 'caminho/para/imagem1.jpg',
    },
    {
      modelo: 'Epson LaserJet',
      padrao: 'EpsonLaser-5678-EFGH',
      ip: '340.90.98',
      codigo_loc: 'PRINTER-003',
      unidade_pai: '2°DRP',
      unidade_filha: '3ª DM',
      contador: '88',
      data: '08/11/23',
      imagem: 'caminho/para/imagem2.jpg',
    },
    
  ];

  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  console.log(search)

  const toggleDropdown = () => {
    setDropdown(!dropdown)
  };


  return(
    <div className="impressorasCadastradas-page">
      {modalOpen && (
        <Modal 
          setOpenModal={setModalOpen} 
          title={"Desativação de impressora"} 
          bodytext={"Você tem certeza que deseja desativar esta impressora?"}
        />
        
      )}
      <div className="impressorasCadastradas-cabecalho">
        <h2>Impressoras cadastradas</h2>
        <div className="impressorasCadastradas-cabecalho-icones">
          <div className="impressorasCadastradas-cabecalho-input">
            <Input 
              onChange={(e) => setSearch(e.target.value.toLowerCase())} 
              className="input-pesquisa-impressoras"
            
            />
          </div>
          <div className="impressorasCadastradas-cabecalho-imagens"> 
            <img alt="" src={Search} />
            <img alt="" src={Filter} onClick={toggleDropdown} />
          </div>
        </div>
      </div>
      
      {impressoras.filter((impressora) => {
        return search.toLowerCase() === '' 
        ? impressora 
        : impressora.nome.toLowerCase().includes(search)
      
      
      }).map((impressora, index) => (

        <div key={index} className="impressorasCadastradas-Lista">
          <div className="impressoras-modelo">
            <h4>{impressora.modelo}</h4>
          </div>
          
          <div className="impressoras-identificacao"> 
            <h6>{impressora.padrao}</h6>
            <h6>IP: {impressora.ip}</h6>
            <h6>{impressora.codigo_loc}</h6> 
          </div>
          
          <div className="impressoras-unidade-contador">
            <h6>{impressora.unidade_pai}</h6>
            <h6>{impressora.unidade_filha}</h6>
            <h6>{impressora.contador}</h6>
          </div>
          
          <div className="data-ultimo-contador">
            <h6>Data do último contador: {impressora.data}</h6>
          </div>
          

          <div className="impressorasCadastradas-Lista-img">
            <img 
              alt="" 
              src={engine}
              onClick={toggleDropdown}
            />

              {dropdown && (
                <div className="dropdownEngine">
                  <div onClick={() => {setModalOpen(true);}}>
                    <Link to="#">Desativar</Link>
                  </div>
                  <Link to="#">Editar</Link>
                </div>
              )} 
          </div>

        </div>
      ))}

      
    </div>
  );
}


/*

// SeuComponentePrincipal.js
import React, { useState } from 'react';
import Modal from './Modal';

const SeuComponentePrincipal = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [textoDoModal, setTextoDoModal] = useState('');

  const abrirModal = (texto) => {
    setTextoDoModal(texto);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setTextoDoModal('');
  };

  return (
    <div>
      <button onClick={() => abrirModal('Seu texto aqui')}>Abrir Modal</button>

      {mostrarModal && (
        <Modal texto={textoDoModal} onClose={fecharModal} />
      )}
    </div>
  );
};

export default SeuComponentePrincipal;

*/