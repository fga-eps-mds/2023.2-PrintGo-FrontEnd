import React, { useState } from "react";
import "../style/pages/patternList.css";
import { Link } from "react-router-dom"
import Search from '../assets/Search.svg';
import Input from "../components/Input";
import Navbar from "../components/navbar/Navbar";

export default function PatternList() {
  
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

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  // const [modalOpen, setModalOpen] = useState(false);
  // const [modalTitle, setModalTitle] = useState('');
  // const [modalBodytext, setModalBodytext] = useState('');
  // const [selectedPattern, setSelectedPattern] = useState();

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
            <h2>Padrões de impressora cadastrados</h2>
            {
              (filter === 'all' && (<h4>Todas</h4>)) ||
              (filter === 'active' && (<h4>Ativas</h4>)) ||
              (filter === 'deactivated' && (<h4>Desativadas</h4>))
            }
          </div>
          
          <div className="patternlist-header-search-filter">
            <Input
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
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
          
          </div>
        ))}
      </div>
    </>
  );
}