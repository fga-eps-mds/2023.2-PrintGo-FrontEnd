import React, { useState, useMemo, useEffect } from "react";
import "../style/pages/printersList.css";
import { Link } from "react-router-dom";
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import engine from '../assets/engine.svg';
import Input from '../components/Input'; 
import Modal from '../components/ui/Modal';
import Navbar from "../components/navbar/Navbar";
import { getPadroes, getPrinters, togglePrinter } from "../services/printerService";
import { extractDate } from "../utils/utils";

export default function PrintersList() {

  useEffect( () => {
    async function fetchData() {
        try {
            const [dataPrinters] = await Promise.all([
                getPrinters()
            ]) 
            if (dataPrinters.type ==='success' && dataPrinters.data) {
              setPrinters(dataPrinters.data);
            }
        } catch (error) {
            console.error('Erro ao obter lista de impressoras:', error);
          }
    }
    fetchData();
  }, []);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBodytext, setModalBodytext] = useState('');
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [printers, setPrinters] = useState([]);

  const modalDeactivatePrinter = (printer) => {
    setSelectedPrinter(printer);
    setModalTitle("Desativação de impressora");
    setModalBodytext("Você tem certeza que deseja desativar a impressora?");
    setModalOpen(true);
  }

  const modalActivePrinter = (printer) => {
    setSelectedPrinter(printer);
    setModalTitle("Ativação de impressora");
    setModalBodytext("Você tem certeza que deseja reativar a impressora?");
    setModalOpen(true);
  }

  async function printerToggle() {
    try {
      const data = await togglePrinter(selectedPrinter.id, selectedPrinter.status);
      console.log(data);

      if (data.type === 'success') {
        const printer = printers.find(printer => printer.id === selectedPrinter.id);
        printer.status === 'ATIVO' ? printer.status = 'DESATIVADO' : printer.status = 'ATIVO';
        setModalOpen(false);
      }
    } catch (error) {
      setModalOpen(false);
    }
  }

  //qual filtro esta sendo aplicado
  function filterBeingShown(filter){

    if (filter === 'all') {
      return 'Todas';
    } else if (filter === 'active') {
      return 'Ativas';
    } else {
      return 'Desativadas';
    }
  }

  //filtros para busca de impressora
  const filteredPrinters = useMemo(() => {
    return printers.filter(printer => {
      const searchLower = search.toLowerCase();
      const {
        codigoLocadora,
        ip,
        padrao,
        numeroSerie,
      } = printer;
  
      return (
        search === '' ||
        codigoLocadora.toLowerCase().includes(searchLower) ||
        ip.toLowerCase().includes(searchLower) ||
        padrao.modelo.toLowerCase().includes(searchLower) ||
        numeroSerie.toLowerCase().includes(searchLower)
      );
    }).filter(printer => {
      return filter === 'all' ||
             (filter === 'active' && printer.status === "ATIVO") ||
             (filter === 'deactivated' && printer.status === "DESATIVADO");
    });
  }, [printers, search, filter]);

  return (
    <>
      {modalOpen && (
        <Modal 
          setOpenModal={setModalOpen} 
          title={modalTitle} 
          bodytext={modalBodytext}
          onConfirm={printerToggle}
        />
      )}

      <>
        <Navbar />

        <div className="printerslist-container">

          <div className="printerslist-header">
            <div className="printerslist-header-title">
              <h2>Impressoras cadastradas</h2>
              <h4 data-testid="filter_beign_shown">{filterBeingShown(filter)}</h4>
            </div>

            <div className="printerslist-header-search-filter">
              <Input 
                onChange={(e) => setSearch(e.target.value)} 
              />
              <img alt="Search" src={Search} />

              <div className="printerslist-filter">
                <img alt="Filter" src={Filter} />
                <div className="printerslist-filter-dropdown-container">
                  <div className="printerslist-dropdown-filter">
                    <Link to="#" onClick={() => setFilter('all')}>Todas</Link>
                    <Link to="#" onClick={() => setFilter('active')}>Ativas</Link>
                    <Link to="#" onClick={() => setFilter('deactivated')}>Desativadas</Link>
                  </div>
                </div>
              </div> 
            </div>
          </div>

          {filteredPrinters.map(printer => (
            <div 
              key={printer.id} 
              className="printerslist-printer" 
              style={{ color: printer.status === "ATIVO" ? '' : 'gray' }}
            >
              
              <div className="printerslist-model">
                <Link 
                  to={`/visualizarimpressora/${encodeURIComponent(btoa(JSON.stringify(printer)))}`}
                  style={{ color: printer.status === "ATIVO" ? '' : 'gray' }}
                >
                  {printer.padrao.modelo}
                </Link>
                {printer.status === 'DESATIVADO' && <h5>Desativada</h5>}
              </div>
              
              <div className="printerslist-identification" style={{ color: printer.status === "ATIVO" ? '' : 'gray' }}> 
                <h6>S/N: {printer.numeroSerie}</h6>
                <h6>IP: {printer.ip}</h6>
                <h6>{printer.codigoLocadora}</h6> 
              </div>
              
              <div className="printerslist-location-counter" style={{ color: printer.status === "ATIVO" ? '' : 'gray' }}>
                <h6>{printer.contadorInstalacao}</h6>
              </div>
              
              <div className="printerslist-counter-date" style={{ color: printer.status === "ATIVO" ? '' : 'gray' }}>
                <h6>Data do último contador: {extractDate(printer.dataUltimoContador)}</h6>
              </div>
              
              <div className="printerslist-engine">
                <img alt="" src={engine} />
                <div tabIndex="0" className="printerslist-engine-dropdown">
                  <div className="printerslist-printer-dropdown">
                    {printer.status === "ATIVO"
                      ? <Link to="#" tabIndex="0" onClick={() => modalDeactivatePrinter(printer)}>Desativar</Link>
                      : <Link to="#" tabIndex="0" onClick={() => modalActivePrinter(printer)}>Ativar</Link>
                    }
                    <Link to="#" tabIndex="0">Editar</Link>
                  </div>
                </div> 
              </div>
            </div>
          ))}
        </div>
      </>
    </>
  );
}
