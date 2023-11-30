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
        <h2>Detalhes da Impressora</h2>
        <div className="modal-section">
          <p><strong>Número de série:</strong> {history.serialNumber}</p>
          <p><strong>IP:</strong> {history.ip}</p>
          <p><strong>Código de locadora:</strong> {history.rentalCode}</p>
          <p><strong>Data de instalação:</strong> {history.installationDate}</p>
          <p><strong>Impressões coloridas (Impressora):</strong> {history.coloredPrints}</p>
          <p><strong>Impressões coloridas (Locadora):</strong> {history.coloredPrintsRental}</p>
          <p><strong>Contador de instalação:</strong> {history.installationCounter}</p>
          <p><strong>Data de retirada:</strong> {history.withdrawalDate || '-'}</p>
          <p><strong>Impressões preto/branco (Impressora):</strong> {history.bwPrints}</p>
          <p><strong>Impressões preto/branco (Locadora):</strong> {history.bwPrintsRental}</p>
          <p><strong>Contador de retirada:</strong> {history.withdrawalCounter}</p>
          <p><strong>Data do último contador:</strong> {history.lastCounterDate || '-'}</p>
          <p><strong>Último contador:</strong> {history.lastCounter}</p>
          <p><strong>Unidade filha:</strong> {history.childUnit}</p>
          <p><strong>Unidade pai:</strong> {history.parentUnit}</p>
        </div>
        <button className = "close-button"onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

// Validação das PropTypes para HistoryModal
HistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    serialNumber: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired,
    rentalCode: PropTypes.string.isRequired,
    installationDate: PropTypes.string.isRequired,
    coloredPrints: PropTypes.number.isRequired,
    coloredPrintsRental: PropTypes.number.isRequired,
    installationCounter: PropTypes.number.isRequired,
    withdrawalDate: PropTypes.string,
    bwPrints: PropTypes.number.isRequired,
    bwPrintsRental: PropTypes.number.isRequired,
    withdrawalCounter: PropTypes.number.isRequired,
    lastCounterDate: PropTypes.string,
    lastCounter: PropTypes.number.isRequired,
    childUnit: PropTypes.string.isRequired,
    parentUnit: PropTypes.string.isRequired,
  }).isRequired,
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
