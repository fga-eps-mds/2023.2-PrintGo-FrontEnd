import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import '../style/pages/printerHistory.css';

export default function PrinterHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const printerHistoryData = [
    { date: '12/10/2023', location: '2ª Delegacia Municipal de Goiânia' },
    { date: '05/09/2023', location: '8ª Delegacia Regional de Polícia do Rio Verde' },
    { date: '15/05/2023', location: '9ª Delegacia Regional de Polícia de Catalão' },
  ];

  const filteredData = printerHistoryData.filter(history =>
    history.date.includes(searchQuery) || history.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="printerHistory-container">
        <div className="header-container">
          <div>
            <h1>Histórico de Localização</h1>
            <h2>Multifuncional P&B - Canon - MF1643i II</h2>
          </div>
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="history-list">
          {filteredData.length > 0 ? (
            filteredData.map((history, index) => (
              <div key={index} className="history-item">
                <span className="history-date">{history.date}</span>
                <span className="history-location">{history.location}</span>
                <button className="details-button">Detalhes</button>
              </div>
            ))
          ) : (
            <div className="history-item">Nenhum resultado encontrado.</div>
          )}
        </div>
      </div>
    </>
  );
}
