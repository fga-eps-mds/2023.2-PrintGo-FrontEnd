import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Navbar from '../components/navbar/Navbar';
import Filter from '../assets/Filter.svg';
import jsPDF from 'jspdf';
import '../style/pages/comparisonPage.css'
import 'jspdf-autotable';


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
            label: 'Contagem Manual - Total',
            data: [1000, 800, 1200],
          },
          {
            label: 'Contagem Contadora - Total',
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
            label: 'Contagem Manual (Cópias)',
            data: [200, 150, 250],
          },
          {
            label: 'Contagem Contadora (Cópias)',
            data: [190, 145, 245],
          },

          {
            label: 'Contagem Manual (Impressões)',
            data: [200, 150, 250],
          },
          {
            label: 'Contagem Contadora (Impressões)',
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

   // Função para gerar o relatório em PDF
   const generatePDFReport = () => {
    // Cria um novo documento PDF
    const doc = new jsPDF();

    // Define a data atual
    const currentDate = new Date().toLocaleDateString();

    // Adiciona título ao relatório
    doc.setFontSize(16);
    doc.text('Relatório de Contagem de Impressões', 10, 10);

    // Adiciona data ao relatório
    doc.setFontSize(12);
    doc.text(`Data do Relatório: ${currentDate}`, 10, 20);

    // Dados para a tabela de relatório
    const reportData = [];
    data.labels.forEach((label, index) => {
      const manualImpressions = data.datasets[0].data[index];
      const counterImpressions = data.datasets[2].data[index];
      const difference = manualImpressions - counterImpressions;
      reportData.push([label, manualImpressions, counterImpressions, difference]);
    });

    // Define as colunas da tabela de relatório
    const tableColumns = ['Impressora', 'Contagem Manual', 'Contagem Contadora', 'Diferença'];

    // Adiciona a tabela de relatório ao documento PDF
    doc.autoTable({
      head: [tableColumns],
      body: reportData,
      startY: 30,
    });

    // Salva o documento PDF com um nome único
    const fileName = `relatorio_impressoras_${currentDate.replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
  };

  return (
    <div>
      <Navbar />
      <div className="printerslist-header">
        <div className="printerslist-header-title">
          <h2>Gráfico de Contagem de Impressões</h2>
          <h4>Filtrar por:</h4>
          <button className="button-style report-button" onClick={generatePDFReport}>Gerar Relatório em PDF</button>
        </div>
        <div className="printerslist-header-search-filter">
          <div className="printerslist-filter">
            <img src={Filter} alt="Filter" />
            <div className="printerslist-filter-dropdown-container">
              <div className="printerslist-dropdown-filter">
                <button className="button-style filter-button" onClick={() => handleFilterChange('totalImpressoes')}>Filtro 1</button>
                <button className="button-style filter-button" onClick={() => handleFilterChange('numeroCopias')}>Filtro 2</button>
                <button className="button-style filter-button" onClick={() => handleFilterChange('impressoesColoridas')}>Filtro 3</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bar data={data} />
    </div>
  );
};

export default ChartComponent;
