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
      id: "1",
      padrao: {
        tipo: "Multifuncional P&B",
        marca: "Canon",
        modelo: "MF1643i II",
      },
      ip: "192.168.15.1",
      numeroSerie: "XXXX-000000",
      codigoLocadora: "PRINTER-004",
      contadorInstalacao: 0,
      ultimoContador: 0,
      dataInstalacao: "2023-11-30T12:00:00Z",
      dataUltimoContador: "2023-11-30T12:00:00Z",
      contadorRetirada: 0,
      dataRetirada: "2023-11-30T12:00:00Z",
      unidadeId: "1",
      status: "ATIVO"
    },
    {
      id: "2",
      padrao: {
        tipo: "Impressora Laser Colorida",
        marca: "HP",
        modelo: "LaserJet Pro M404dn",
      },
      ip: "192.168.15.2",
      numeroSerie: "YYYY-111111",
      codigoLocadora: "PRINTER-005",
      contadorInstalacao: 10,
      ultimoContador: 5,
      dataInstalacao: "2023-11-25T10:30:00Z",
      dataUltimoContador: "2023-11-28T14:45:00Z",
      contadorRetirada: 2,
      dataRetirada: "2023-12-05T08:20:00Z",
      unidadeId: "2",
      status: "ATIVO",
    },
    {
      id: "3",
      padrao: {
        tipo: "Scanner",
        marca: "Epson",
        modelo: "Perfection V600",
      },
      ip: "192.168.15.3",
      numeroSerie: "ZZZZ-222222",
      codigoLocadora: "PRINTER-006",
      contadorInstalacao: 3,
      ultimoContador: 1,
      dataInstalacao: "2023-11-20T15:45:00Z",
      dataUltimoContador: "2023-11-22T09:10:00Z",
      contadorRetirada: 0,
      dataRetirada: null,
      unidadeId: "3",
      status: "INATIVO",
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
