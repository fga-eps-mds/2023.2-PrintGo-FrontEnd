import React, { useState } from "react";
import  "../style/pages/printersList.css";
import { Link } from "react-router-dom"
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import engine from '../assets/engine.svg';
import Input from '../components/Input'; 
import Modal from '../components/ui/Modal';
import Navbar from "../components/navbar/Navbar";

export default function ImpressorasCadastradas(){

  // Dados de impressoras exemplo.
  const [impressoras, setImpressoras] = useState(
    [
      {
        id_impressora: 1,
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
        id_impressora: 2,
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

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBodytext, setModalBodytext] = useState('');
  const [selectedPrinter, setSelectedPrinter] = useState();

  const modalDeactivatePrinter = (printer) => {
    // Abre o modal para desativar uma impressora.
    setSelectedPrinter(printer);
    setModalTitle("Desativação de impressora");
    setModalBodytext("Você tem certeza que deseja desativar a impressora?");
    setModalOpen(true);
  }

  const modalActivePrinter = (printer) => {
    // Abre o modal para ativar uma impressora.
    setSelectedPrinter(printer);
    setModalTitle("Ativação de impressora");
    setModalBodytext("Você tem certeza que deseja reativar a impressora?");
    setModalOpen(true);
  }

  const printerToggle = () => {
    // Altera o estado de ativação de uma impressora após confirmação no modal.
    const updatedImpressoras = [...impressoras];
    
    const printerToBeUpdated = updatedImpressoras.find(printer => printer === selectedPrinter);
    printerToBeUpdated.ativada = !printerToBeUpdated.ativada;

    setImpressoras(updatedImpressoras);
    setModalOpen(false);
  };

  return(
    <>
      <Navbar />
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
            {
              (filter === 'all' && (<h4>Todas</h4>)) ||
              (filter === 'active' && (<h4>Ativas</h4>)) ||
              (filter === 'deactivated' && (<h4>Desativadas</h4>))
            }
          </div>

          <div className="printerslist-header-search-filter">
            <Input 
              onChange={(e) => setSearch(e.target.value.toLowerCase())} 
            />
            <img alt="" src={Search} />

            <div className="printerslist-filter">
              <img alt="" src={Filter} className="printerslist-filter"></img>
            
              <div className="printerslist-filter-dropdown-container">
                <div className="printerslist-dropdown-filter">
                  <Link to="#" onClick={() => {setFilter('all')}}>Todas</Link>
                  <Link to="#" onClick={() => {setFilter('active')}}>Ativas</Link>
                  <Link to="#" onClick={() => {setFilter('deactivated')}}>Desativas</Link>
                </div>
              </div>
            </div> 

          </div>
        </div>
        
        {impressoras.filter((impressora) => {
          // Filtro de pesquisa.
          return search.toLowerCase() === '' 
          ? impressora.ativada || !impressora.ativada 
          : impressora.codigo_loc.toLocaleLowerCase().includes(search) ||
            impressora.unidade_pai.toLocaleLowerCase().includes(search) ||
            impressora.unidade_filha.toLocaleLowerCase().includes(search) ||
            impressora.ip.toLocaleLowerCase().includes(search) ||
            impressora.modelo.toLocaleLowerCase().includes(search) ||
            impressora.numeroSerie.toLocaleLowerCase().includes(search)

        }).filter((impressora) => {
          // Filtro por estado.
          if (filter === 'active') {
            return impressora.ativada;
          } else if (filter === 'deactivated') {
            return !impressora.ativada;
          } else {
            return impressora.ativada || !impressora.ativada;
          }

        }).map((impressora, index) => (
          <div key={impressora.id_impressora} className="printerslist-printer" style={{ color: impressora.ativada ? '' : 'gray' }}>
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
              <div tabIndex="0" className="printerslist-engine-dropdown">
                  <div  className="printerslist-printer-dropdown">
                      {
                        (impressora.ativada && 
                          ( <Link to="#" tabIndex="0" onClick={() => {modalDeactivatePrinter(impressora)}}>
                              Desativar
                            </Link>
                          )
                        ) || (!impressora.ativada &&
                          ( <Link to="#" tabIndex="0" onClick={() => {modalActivePrinter(impressora)}}>
                              Ativar
                            </Link>
                          )
                        ) 
                      }
                    <Link to="#" tabIndex="0">Editar</Link>
                  </div>
              </div> 
            </div>
          </div>
        ))}
      </div>
    </>
  );
}