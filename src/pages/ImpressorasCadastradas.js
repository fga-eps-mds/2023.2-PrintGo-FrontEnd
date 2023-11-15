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

  console.log(search)

  const toggleDropdown = () => {
    setDropdown(!dropdown)
  };

  const deactivatePrinter = (printerID) => {
    setSelectedPrinterID(printerID);
    setModalTitle("Desativação de impressora");
    setModalBodytext("Você tem certeza que deseja desativar a impressora?");
  }

  const activePrinter = (printerID) => {
    setSelectedPrinterID(printerID);
    setModalTitle("Ativação de impressora");
    setModalBodytext("Você tem certeza que deseja reativar a impressora?");
  }

  const printerToggle = () => {
    const updatedImpressoras = [...impressoras];
    updatedImpressoras[selectedPrinterID].ativada = !updatedImpressoras[selectedPrinterID].ativada;
    setImpressoras(updatedImpressoras);
    setModalOpen(false);
  };

  return(
    <div className="impressorasCadastradas-page">
      {modalOpen && (
        <Modal 
          setOpenModal={setModalOpen} 
          title={modalTitle} 
          bodytext={modalBodytext}
          onConfirm={printerToggle}
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
        : impressora.codigo_loc.toLocaleLowerCase().includes(search) ||
          impressora.unidade_pai.toLocaleLowerCase().includes(search) ||
          impressora.unidade_filha.toLocaleLowerCase().includes(search) ||
          impressora.ip.toLocaleLowerCase().includes(search) ||
          impressora.modelo.toLocaleLowerCase().includes(search) ||
          impressora.numeroSerie.toLocaleLowerCase().includes(search)

      
      
      }).map((impressora, index) => (

        <div key={index} className="impressorasCadastradas-Lista" style={{ color: impressora.ativada ? '' : 'gray' }}>
          <div className="impressoras-modelo">
            <h4>{impressora.modelo}</h4>
            {!impressora.ativada && (<h5>Desativada</h5>)}
          </div>
          
          <div className="impressoras-identificacao" style={{ color: impressora.ativada ? '' : 'gray' }}> 
            <h6>{impressora.numeroSerie}</h6>
            <h6>IP: {impressora.ip}</h6>
            <h6>{impressora.codigo_loc}</h6> 
          </div>
          
          <div className="impressoras-unidade-contador" style={{ color: impressora.ativada ? '' : 'gray' }}>
            <h6>{impressora.unidade_pai}</h6>
            <h6>{impressora.unidade_filha}</h6>
            <h6>{impressora.contador}</h6>
          </div>
          
          <div className="data-ultimo-contador" style={{ color: impressora.ativada ? '' : 'gray' }}>
            <h6>Data do último contador: {impressora.data}</h6>
          </div>
          

          <div className="impressorasCadastradas-Lista-img">
            <img 
              alt="" 
              src={engine}
            />
            <div className="impressorasCadastradas-dropdown-container">
              {dropdown && (
                <div className="impressorasCadastradas-dropdown">
                  <div onClick={() => {setModalOpen(true);}}>
                    {
                      (impressora.ativada && 
                        ( <Link to="#" onClick={() => {deactivatePrinter(index)}}>
                            Desativar
                          </Link>
                        )
                      ) || (!impressora.ativada && 
                        ( <Link to="#" onClick={() => {activePrinter(index)}}>
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