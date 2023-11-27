import React, { useState, useMemo, useEffect } from "react";
import "../style/pages/printersList.css";
import { Link } from "react-router-dom";
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import engine from '../assets/engine.svg';
import Input from '../components/Input'; 
import Modal from '../components/ui/Modal';
import Navbar from "../components/navbar/Navbar";
import { getPrinters, togglePrinter } from "../services/printerService";



export default function PrintersList() {

  useEffect( () => {
    async function fetchData() {
        try {
            const data = await getPrinters();
            if (data.type ==='success' && data.data) {
              setPrinters(data.data);
              console.log(data.data);
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
  const [printers, setPrinters] = useState([
    {
      "id": 1,
      "padrao": {
        "modelo": "HP Inkjet"
      },
      "ip": "192.168.1.100",
      "numeroSerie": "ABC123456",
      "codigoLocadora": "L123",
      "contadorInstalacao": 500,
      "dataInstalacao": "2023-11-24T10:00:00.000Z",
      "dataUltimoContador": "2023-11-25T15:30:00.000Z",
      "unidadeId": 789,
      "status": "ATIVO",
    },
    {
      "id": 2,
      "padrao": {
        "modelo": "Epson Laserjet"
      },
      "ip": "192.168.1.101",
      "numeroSerie": "XYZ789012",
      "codigoLocadora": "L456",
      "contadorInstalacao": 700,
      "dataInstalacao": "2023-11-22T14:45:00.000Z",
      "dataUltimoContador": "2023-11-25T12:45:00.000Z",
      "unidadeId": 789,
      "status": "DESATIVADO",
    }
    

  ]);


// modal para desativar impressora
  const modalDeactivatePrinter = (printer) => {
    setSelectedPrinter(printer);
    setModalTitle("Desativação de impressora");
    setModalBodytext("Você tem certeza que deseja desativar a impressora?");
    setModalOpen(true);
  }

  //modal para ativar impressora
  const modalActivePrinter = (printer) => {
    setSelectedPrinter(printer);
    setModalTitle("Ativação de impressora");
    setModalBodytext("Você tem certeza que deseja reativar a impressora?");
    setModalOpen(true);
  }

  //ativa e desativa impressora
  async function printerToggle() {
    try {
      const data = await togglePrinter(selectedPrinter.id, selectedPrinter.status);

      if (data.type === 'success') {
        window.location.reload(false);
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
  
  function extractDate(dateString) {
    const data = new Date(dateString);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses são zero-indexed
    const ano = String(data.getFullYear()).slice(2); // Obtendo os dois últimos dígitos do ano

    return `${dia}/${mes}/${ano}`;
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
            <div key={printer.id} className="printerslist-printer" style={{ color: printer.status === "ATIVO" ? '' : 'gray' }}>
              <div className="printerslist-model">
                <h4>{printer.padrao.modelo}</h4>
                {printer.status === 'DESATIVADO' && <h5>Desativada</h5>}
              </div>
              
              <div className="printerslist-identification" style={{ color: printer.status === "ATIVO" ? '' : 'gray' }}> 
                <h6>S/N: {printer.numeroSerie}</h6>
                <h6>IP: {printer.ip}</h6>
                <h6>{printer.codigoLocadora}</h6> 
              </div>
              
              <div className="printerslist-location-counter" style={{ color: printer.status === "ATIVO" ? '' : 'gray' }}>
                {/* <h6>{printer.unidade_pai}</h6>
                <h6>{printer.unidade_filha}</h6> */}
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
