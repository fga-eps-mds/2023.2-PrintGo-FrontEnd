import React from "react";
import  "../style/pages/printersList.css";
import { Link } from "react-router-dom"
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import engine from '../assets/engine.svg';
import Input from '../components/Input'; 
import Modal from '../components/ui/Modal';
import { useState } from "react";

export default function ImpressorasCadastradas(){

  // Dados de impressoras exemplo.
  const [impressoras, setImpressoras] = useState(
    [
      {
        modelo: 'HP InkJet 50',
        numeroSerie: 'HPInkJet-1234-ABCD',
        ip: '987.654.32',
        codigo_loc: 'PRINTER-002',
        unidade_pai: '1°DRP',
        unidade_filha: '2ª DM',
        contador: '83',
        data: '07/11/23',
        ativada: false,
        imagem: 'caminho/para/imagem1.jpg', 
      },
      {
        modelo: 'Epson LaserJet',
        numeroSerie: 'EpsonLaser-5678-EFGH',
        ip: '340.90.98',
        codigo_loc: 'PRINTER-003',
        unidade_pai: '2°DRP',
        unidade_filha: '3ª DM',
        contador: '88',
        data: '08/11/23',
        ativada: true,
        imagem: 'caminho/para/imagem2.jpg',
      },
    ]
  )

  const [dropdown, setDropdown] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBodytext, setModalBodytext] = useState('');
  const [selectedPrinterID, setSelectedPrinterID] = useState();

  const modalDeactivatePrinter = (printerID) => {
    // Abre o modal para desativar uma impressora.
    setSelectedPrinterID(printerID);
    setModalTitle("Desativação de impressora");
    setModalBodytext("Você tem certeza que deseja desativar a impressora?");
  }

  const modalActivePrinter = (printerID) => {
    // Abre o modal para ativar uma impressora.
    setSelectedPrinterID(printerID);
    setModalTitle("Ativação de impressora");
    setModalBodytext("Você tem certeza que deseja reativar a impressora?");
  }

  const printerToggle = () => {
    // Altera o estado de ativação de uma impressora após confirmação no modal.
    const updatedImpressoras = [...impressoras];
    updatedImpressoras[selectedPrinterID].ativada = !updatedImpressoras[selectedPrinterID].ativada;
    setImpressoras(updatedImpressoras);
    setModalOpen(false);
  };

  return(
    <div className="printerslist-container">
      {modalOpen && (
        <Modal 
          setOpenModal={setModalOpen} 
          title={modalTitle} 
          bodytext={modalBodytext}
          onConfirm={printerToggle}
        />
      )}

      <div className="printerslist-header">
        <div className="printerslist-header-title">
          <h2>Impressoras cadastradas</h2>
          <h7>todas/ativadas/desativadas</h7>
        </div>

        <div className="printerslist-header-search-filter">
          <Input 
            onChange={(e) => setSearch(e.target.value.toLowerCase())} 
          />
          <img alt="" src={Search} />
          <img alt="" src={Filter} />
        </div>
      </div>
      
      {impressoras.filter((impressora) => {
        return search.toLowerCase() === '' 
        ? impressora 
        : impressora.codigo_loc.toLocaleLowerCase().includes(search) ||
          impressora.unidade_pai.toLocaleLowerCase().includes(search) ||
          impressora.unidade_filha.toLocaleLowerCase().includes(search) ||
          impressora.ip.toLocaleLowerCase().includes(search) ||
          impressora.modelo.toLocaleLowerCase().includes(search) ||
          impressora.numeroSerie.toLocaleLowerCase().includes(search)

      }).map((impressora, index) => (
        <div key={index} className="printerslist-printer" style={{ color: impressora.ativada ? '' : 'gray' }}>
          <div className="printerslist-model">
            <h4>{impressora.modelo}</h4>
            {!impressora.ativada && (<h5>Desativada</h5>)}
          </div>
          
          <div className="printerslist-identification" style={{ color: impressora.ativada ? '' : 'gray' }}> 
            <h6>{impressora.numeroSerie}</h6>
            <h6>IP: {impressora.ip}</h6>
            <h6>{impressora.codigo_loc}</h6> 
          </div>
          
          <div className="printerslist-location-counter" style={{ color: impressora.ativada ? '' : 'gray' }}>
            <h6>{impressora.unidade_pai}</h6>
            <h6>{impressora.unidade_filha}</h6>
            <h6>{impressora.contador}</h6>
          </div>
          
          <div className="printerslist-counter-date" style={{ color: impressora.ativada ? '' : 'gray' }}>
            <h6>Data do último contador: {impressora.data}</h6>
          </div>
          
          <div className="printerslist-engine">
            <img 
              alt="" 
              src={engine}
            />
            <div className="printerslist-dropdown-container">
              {dropdown && (
                <div className="printerslist-dropdown">
                  <div onClick={() => {setModalOpen(true);}}>
                    {
                      (impressora.ativada && 
                        ( <Link to="#" onClick={() => {modalDeactivatePrinter(index)}}>
                            Desativar
                          </Link>
                        )
                      ) || (!impressora.ativada &&
                        ( <Link to="#" onClick={() => {modalActivePrinter(index)}}>
                            Ativar
                          </Link>
                        )
                      ) 
                    }
                  </div>
                  <Link to="#">Editar</Link>
                </div>
              )}
            </div> 
          </div>
        </div>
      ))}
    </div>
  );
}