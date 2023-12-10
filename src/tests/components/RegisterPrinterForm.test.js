import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterPrinterForm, { fieldLabels } from '../../components/forms/RegisterPrinterForm';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');



describe('RegisterPrinterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.create.mockReturnValue(axios);
  });


  test('should change inputs on form', async () => {
    render(
      <BrowserRouter>
        <RegisterPrinterForm />
      </BrowserRouter>
    );

    const sampleData = {
      numeroSerie: '1234',
      ip: '192.168.1.1',
      // continue with other fields...
    };

    Object.entries(sampleData).forEach(([field, value]) => {
      const input = screen.getByPlaceholderText(fieldLabels[field]);
      fireEvent.change(input, { target: { value } });
      expect(input.value).toBe(value);
    });
  });

  test('renders all form fields, selects, and buttons', () => {
    render(
      <BrowserRouter>
        <RegisterPrinterForm />
      </BrowserRouter>
    );
  
    // Verificar a renderização dos botões
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Número de Série')).toBeInTheDocument();
    expect(screen.getByText('Número de Série')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('IP')).toBeInTheDocument();
    expect(screen.getByText('IP')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Código da Locadora')).toBeInTheDocument();
    expect(screen.getByText('Código da Locadora')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contador de Instalação')).toBeInTheDocument();
    expect(screen.getByText('Contador de Instalação')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Data de Instalação')).toBeInTheDocument();
    expect(screen.getByText('Data de Instalação')).toBeInTheDocument();


  });
  
  
  // Adicione mais testes conforme necessário
});
