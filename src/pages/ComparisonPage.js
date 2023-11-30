import React from 'react';
import '../style/pages/comparisonPage.css';

// Dados mockados
const printersData = [
  {
    id: 1,
    modelo: 'Impressora A',
    contagemManual: 1000,
    contagemContadora: 980,
  },
  {
    id: 2,
    modelo: 'Impressora B',
    contagemManual: 800,
    contagemContadora: 820,
  },
  {
    id: 3,
    modelo: 'Impressora C',
    contagemManual: 1200,
    contagemContadora: 1180,
  },
];

export default function ComparisonPage() {
  return (
    <div className="comparison-container">
      <h1>Discrepância entre Dados de Impressoras</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Contagem Manual</th>
            <th>Contagem Contadora</th>
            <th>Discrepância</th>
          </tr>
        </thead>
        <tbody>
          {printersData.map((printer) => (
            <tr key={printer.id}>
              <td>{printer.id}</td>
              <td>{printer.modelo}</td>
              <td>{printer.contagemManual}</td>
              <td>{printer.contagemContadora}</td>
              <td>{printer.contagemManual - printer.contagemContadora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
