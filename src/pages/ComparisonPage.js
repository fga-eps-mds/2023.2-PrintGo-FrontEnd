import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Navbar from '../components/navbar/Navbar';
import Filter from '../assets/Filter.svg';

// Dados iniciais 
const initialData = {
  labels: [],
  datasets: [
    {
      label: 'Contagem Manual - Impressões',
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      data: [],
    },
    {
      label: 'Contagem Manual - Cópias',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      data: [],
    },
    {
      label: 'Contagem Contadora - Impressões',
      backgroundColor: 'rgba(0,255,0,0.2)',
      borderColor: 'rgba(0,255,0,1)',
      borderWidth: 1,
      data: [],
    },
    {
      label: 'Contagem Contadora - Cópias',
      backgroundColor: 'rgba(255,0,0,0.2)',
      borderColor: 'rgba(255,0,0,1)',
      borderWidth: 1,
      data: [],
    },
  ],
};

const ChartComponent = () => {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState('totalImpressoes'); // Estado inicial do filtro

  // Simula a atualização dos dados a cada 5 minutos (substitua por sua lógica de obtenção de dados)
  useEffect(() => {
    const interval = setInterval(() => {
      // Substituir esta lógica pela obtenção real dos dados SNMP
      const newData = {
        labels: ['Impressora A', 'Impressora B', 'Impressora C'],
        datasets: [
          {
            label: 'Contagem Manual - Impressões',
            data: [1000, 800, 1200], // Substituir pelos valores reais
          },
          {
            label: 'Contagem Manual - Cópias',
            data: [200, 150, 250], // Substituir pelos valores reais
          },
          {
            label: 'Contagem Contadora - Impressões',
            data: [980, 820, 1180], // Substituir pelos valores reais
          },
          {
            label: 'Contagem Contadora - Cópias',
            data: [190, 145, 245], // Substituir pelos valores reais
          },
        ],
      };
      setData(newData);
    }, 50000); // Atualiza a cada 5 minutos

    return () => clearInterval(interval);
  }, []);

  // Função para atualizar os dados com base no filtro selecionado
  const handleFilterChange = (newFilter) => {
    let newData = null;
    if (newFilter === 'totalImpressoes') {
      // Substituir pelos dados reais para total de impressões
      newData = {
        labels: ['Impressora A', 'Impressora B', 'Impressora C'],
        datasets: [
          {
            label: 'Contagem Manual - Impressões',
            data: [1000, 800, 1200],
          },
          {
            label: 'Contagem Contadora - Impressões',
            data: [980, 820, 1180],
          },
        ],
      };
    } else if (newFilter === 'numeroCopias') {
      // Substituir pelos dados reais para número de cópias
      newData = {
        labels: ['Impressora A', 'Impressora B', 'Impressora C'],
        datasets: [
          {
            label: 'Contagem Manual - Cópias',
            data: [200, 150, 250],
          },
          {
            label: 'Contagem Contadora - Cópias',
            data: [190, 145, 245],
          },
        ],
      };
    } else if (newFilter === 'impressoesColoridas') {
      // Substituir pelos dados reais para impressões coloridas e preto e branco
      newData = {
        labels: ['Impressora A', 'Impressora B', 'Impressora C'],
        datasets: [
          {
            label: 'Contagem Manual - Impressões Coloridas',
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            data: [200, 150, 300],
          },
          {
            label: 'Contagem Manual - Impressões Preto e Branco',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            data: [800, 650, 900],
          },
          {
            label: 'Contagem Contadora - Impressões Coloridas',
            backgroundColor: 'rgba(0,255,0,0.2)',
            borderColor: 'rgba(0,255,0,1)',
            borderWidth: 1,
            data: [190, 145, 295],
          },
          {
            label: 'Contagem Contadora - Impressões Preto e Branco',
            backgroundColor: 'rgba(255,0,0,0.2)',
            borderColor: 'rgba(255,0,0,1)',
            borderWidth: 1,
            data: [790, 645, 895],
          },
        ],
      };
    }

    setData(newData);
    setFilter(newFilter);
  };

  return (
    <div>
      <Navbar />
      <div className="printerslist-header">
        <div className="printerslist-header-title">
          <h2>Discrepância entre Dados de Impressoras</h2>
          <h4>Filtrar por:</h4>
        </div>
        <div className="printerslist-header-search-filter">
          <div className="printerslist-filter">
            <img src={Filter} alt="Filter" />
            <div className="printerslist-filter-dropdown-container">
              <div className="printerslist-dropdown-filter">
                <button onClick={() => handleFilterChange('totalImpressoes')}>Filtro 1</button>
                <button onClick={() => handleFilterChange('numeroCopias')}>Filtro 2</button>
                <button onClick={() => handleFilterChange('impressoesColoridas')}>Filtro 3</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1>Gráfico de Contagem de Impressões</h1>
      <Bar data={data} />
    </div>
  );
};

export default ChartComponent;
