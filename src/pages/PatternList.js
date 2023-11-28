import React, { useState, useMemo, useEffect } from "react";
import "../style/pages/printersList.css";
import { Link } from "react-router-dom";
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import Engine from '../assets/engine.svg';
import Input from '../components/Input'; 
import Modal from '../components/ui/Modal';
import Navbar from "../components/navbar/Navbar";

export default function PatternList() {
  
  

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  // const [modalOpen, setModalOpen] = useState(false);
  // const [modalTitle, setModalTitle] = useState('');
  // const [modalBodytext, setModalBodytext] = useState('');
  // const [selectedPattern, setSelectedPattern] = useState();
  const [patterns, setPatterns] = useState(
    [
      {
        id_padrao: 1,
        tipo: "Multifuncional Colorida", 
        modelo: "PIXMA MG3620",
        marca: "Canon",
        ativado: true
      },
      {
        id_padrao: 2,
        tipo: "Laser",
        modelo: "LaserJet Pro M404dn",
        marca: "HP",
        ativado: true
      },
      {
        id_padrao: 3,
        tipo: "Jato de Tinta",
        modelo: "EcoTank L3150",
        marca: "Epson",
        ativado: false
      },
    ]
  )

  return (
    <>
      <Navbar />
      <div className="patternlist-container"> 
      {/* ativar futuramente
        {modalOpen && (
          <Modal 
            setOpenModal={setModalOpen} 
            title={modalTitle} 
            bodytext={modalBodytext}
            onConfirm={printerToggle}
          />
        )}
      */}
        <div className="patternlist-header">
          <div className="patternlist-header-title">
            <h2>Padrões de Impressoras Cadastradas</h2>
            {
              (filter === 'all' && (<h4>Todas</h4>)) ||
              (filter === 'active' && (<h4>Ativas</h4>)) ||
              (filter === 'deactivated' && (<h4>Desativadas</h4>))
            }
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

        {patterns.filter((pattern) => {
          // Filtro de pesquisa.
          return search.toLowerCase() === ''
          ? pattern.ativado || !pattern.ativado
          : pattern.tipo.toLocaleLowerCase().includes(search) ||
            pattern.modelo.toLocaleLowerCase().includes(search) ||
            pattern.marca.toLocaleLowerCase().includes(search)

        }).filter((pattern) => {
          // Filtro por estado.
          if (filter === 'active') {
            return pattern.ativado;
          } else if (filter === 'deactivated') {
            return !pattern.ativado;
          } else {
            return pattern.ativado || !pattern.ativado;
          }

        }).map((pattern) => (
          <div key={pattern.id_padrao} className="patternlist-pattern" style={{ color: pattern.ativado ? '' : 'gray'}}>
            <div className="patternlist-model">
              <h4>Padrão {pattern.marca} - {pattern.modelo} - {pattern.tipo}</h4>
              {!pattern.ativado && (<h5>Desativada</h5>)}
            </div>
            
            <div className="patternlist-engine">
              <img 
                alt="" 
                src={Engine}
              />
              <div tabIndex="0" className="patternlist-engine-dropdown">
                  <div  className="patternlist-pattern-dropdown">
                      {
                        /*
                        (pattern.ativada && 
                          ( <Link to="#" tabIndex="0" onClick={() => {modalDeactivatePrinter(pattern)}}>
                              Desativar
                            </Link>
                          )
                        ) || (!pattern.ativada &&
                          ( <Link to="#" tabIndex="0" onClick={() => {modalActivePrinter(pattern)}}>
                              Ativar
                            </Link>
                          )
                        ) 
                        */
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
  );
}