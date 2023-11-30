import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/navbar/Navbar';
import '../style/pages/printerHistory.css';

// Componente do Modal
function HistoryModal({ isOpen, history, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{`Multifuncional P&B - ${history.model}`}</h2>
        <p>Número de série: {history.serialNumber}</p>
        <p>IP: {history.ip}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

// Validação das PropTypes para HistoryModal
HistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    model: PropTypes.string,
    serialNumber: PropTypes.string,
    ip: PropTypes.string,
    // Adicione outras propriedades usadas pelo seu modal aqui
  }),
  onClose: PropTypes.func.isRequired,
};

// Componente da página PrinterHistory
export default function PrinterHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState({});
  
  const printerHistoryData = [
    // Substitua com os dados reais do seu aplicativo
    { date: '12/10/2023', location: '2ª Delegacia Municipal de Goiânia', model: 'MF1643i II', serialNumber: 'XXXX-000000', ip: '192.168.15.1' },
    { date: '12/10/2023', location: '2ª Delegacia Municipal de Goiânia', model: 'MF1643i II', serialNumber: 'XXXX-000000', ip: '192.168.15.1' },
    { date: '12/10/2023', location: '2ª Delegacia Municipal de Goiânia', model: 'MF1643i II', serialNumber: 'XXXX-000000', ip: '192.168.15.1' },
    { date: '12/10/2023', location: '2ª Delegacia Municipal de Goiânia', model: 'MF1643i II', serialNumber: 'XXXX-000000', ip: '192.168.15.1' },
  ];

  const filteredData = printerHistoryData.filter(history =>
    history.date.includes(searchQuery) || history.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModalWithHistory = (history) => {
    setSelectedHistory(history);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="printerHistory-container">
        <div className="header-container">
          <h1>Histórico de Localização</h1>
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
                <button className="details-button" onClick={() => openModalWithHistory(history)}>
                  Detalhes
                </button>
              </div>
            ))
          ) : (
            <div className="history-item">Nenhum resultado encontrado.</div>
          )}
        </div>
      </div>
      <HistoryModal
        isOpen={isModalOpen}
        history={selectedHistory}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
