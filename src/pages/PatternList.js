import React, { useState, useMemo, useEffect } from "react";
import "../style/pages/patternList.css";
import { Link, useNavigate } from "react-router-dom";
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import Engine from '../assets/engine.svg';
import Input from '../components/Input'; 
import Modal from '../components/ui/Modal';
import Navbar from "../components/navbar/Navbar";
import { getPadroes, togglePattern } from "../services/printerservice";

export default function PatternList() {

  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBodytext, setModalBodytext] = useState('');
  const [selectedPattern, setSelectedPattern] = useState();
  const [patterns, setPatterns] = useState([]);

  useEffect( () => {
    async function fetchData() {
      try {
        const data = await getPadroes();
        if (data.type === 'success' && data.data) {
          setPatterns(data.data);
        }
      } catch (error) {
        console.error('Erro ao obter lista de padrões', error);
      }
    }

    fetchData();
  }, []);

  const redirectToView = (pattern) => {
    const patternEncoded = btoa(JSON.stringify(pattern));
    navigate(`/visualizarpadrao/${patternEncoded}`);
  }

  // modal para desativar impressora
  const modalDeactivatePattern = (pattern) => {
    setSelectedPattern(pattern);
    setModalTitle("Desativação de padrão");
    setModalBodytext("Você tem certeza que deseja desativar o padrão?");
    setModalOpen(true);
  }

  //modal para ativar impressora
  const modalActivePattern= (pattern) => {
    setSelectedPattern(pattern);
    setModalTitle("Ativação de padrão");
    setModalBodytext("Você tem certeza que deseja reativar o padrão?");
    setModalOpen(true);
  }
  
  //ativa e desativa padrão.
  async function patternToggle() {
    try {
      if (selectedPattern) {
        const data = await togglePattern(selectedPattern.id, selectedPattern.status);
        console.log(data);
        
        if (data.type === 'success') {
          const pattern = patterns.find(pattern => pattern.id === selectedPattern.id);
          if (pattern.status === 'ATIVO') {
            pattern.status = 'DESATIVADO';
          } else {
            pattern.status = 'ATIVO';
          }
          setModalOpen(false);
        }
      } else {
        console.error("Pattern not selected");
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
  const filteredPatterns = useMemo(() => {
    return patterns.filter(pattern => {
      const searchLower = search.toLowerCase();
      const {
        tipo,
        modelo,
        marca,
      } = pattern;
  
      return (
        search === '' ||
        tipo.toLowerCase().includes(searchLower) ||
        modelo.toLowerCase().includes(searchLower) ||
        marca.toLowerCase().includes(searchLower)
      );
    }).filter(pattern => {
      return filter === 'all' ||
             (filter === 'active' && pattern.status === "ATIVO") ||
             (filter === 'deactivated' && pattern.status === "DESATIVADO");
    });
  }, [patterns, search, filter]);

  return (
    <>

      {modalOpen && (
        <Modal 
          setOpenModal={setModalOpen} 
          title={modalTitle} 
          bodytext={modalBodytext}
          onConfirm={patternToggle}
        />
      )}

      <>

        <Navbar />
        <div className="patternlist-container"> 
          <div className="patternlist-header">
            <div className="patternlist-header-title">
              <h2>Padrões de Impressoras Cadastradas</h2>
              <h4 data-testid="filter_beign_shown">{filterBeingShown(filter)}</h4>
            </div>
            
            <div className="patternlist-header-search-filter">
              <Input
                onChange={(e) => setSearch(e.target.value)}
              />
              <img alt="Search" src={Search} />

              <div className="patternlist-filter">
                <img alt="" src={Filter} className="patternlist-filter"></img>
              
                <div className="patternlist-filter-dropdown-container">
                  <div className="patternlist-dropdown-filter">
                    <Link to="#" onClick={() => setFilter('all')}>Todas</Link>
                    <Link to="#" onClick={() => setFilter('active')}>Ativas</Link>
                    <Link to="#" onClick={() => setFilter('deactivated')}>Desativas</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {filteredPatterns.map(pattern => (
            <div key={pattern.id_padrao} className="patternlist-pattern" style={{ color: pattern.status === "ATIVO" ? '' : 'gray' }}>
              <div className="patternlist-model">
                <h4 
                  onKeyDown={(e) => {
                    if (e.key === 'enter') {
                      redirectToView(pattern);
                    }
                  }}
                  tabIndex={0}
                  onClick={() => redirectToView(pattern)}
                >
                  Padrão {pattern.marca} - {pattern.modelo} - {pattern.tipo}
                </h4>
                {pattern.status === 'DESATIVADO' && <h5>Desativado</h5>}
              </div>
              
              <div className="patternlist-engine">
                <img alt="" src={Engine}/>
                <div tabIndex="0" className="patternlist-engine-dropdown">
                    <div  className="patternlist-pattern-dropdown">
                      {pattern.status === "ATIVO"
                        ? <Link to="#" tabIndex="0" onClick={() => modalDeactivatePattern(pattern)}>Desativar</Link>
                        : <Link to="#" tabIndex="0" onClick={() => modalActivePattern(pattern)}>Ativar</Link>
                      }
                      <Link to="#" tabIndex="0">Editar</Link>
                    </div>
                </div> 
              </div>
            </div>
          ))
          }
        </div>
      </>
    </>
  );
}
