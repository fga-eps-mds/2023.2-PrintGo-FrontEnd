import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterPrinterForm, { fieldLabels } from '../../components/forms/RegisterPrinterForm';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import * as printerService from '../../services/printerService';
import * as unidadeService from '../../services/unidadeService';
import * as userService from '../../services/userService';


jest.mock('axios');
jest.mock('../../services/printerService');
jest.mock('../../services/unidadeService');
jest.mock('../../services/userService');


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

  it('fetches data on mount and updates the state', async () => {
    // Mock das respostas dos serviços
    const unidadesMock = { type: 'success', data: [{ id: '1', name: 'Unidade 1' }] };
    const padroesMock = { type: 'success', data: [{ id: '1', tipo: 'Padrão 1', marca: 'Marca 1', modelo: 'Modelo 1' }] };
    const usersMock = { type: 'success', data: [{ id: '1', name: 'User 1', cargos: ['LOCADORA'] }] };
   
    unidadeService.getUnidades.mockResolvedValue(unidadesMock);
    printerService.getPadroes.mockResolvedValue(padroesMock);
    userService.getUsers.mockResolvedValue(usersMock);
   
    // Renderizar o componente dentro de um BrowserRouter
    const { getByText } = render(
      <BrowserRouter>
        <RegisterPrinterForm />
      </BrowserRouter>
    );
   
    // Aguardar as chamadas assíncronas e verificar se o estado é atualizado
    await waitFor(() => {
      expect(getByText('Selecione padrão')).toBeInTheDocument();
      expect(getByText('Selecione a unidade pai')).toBeInTheDocument();
      // Verifique se as outras opções esperadas estão presentes no DOM
    });
   });
   
  
  
  // Adicione mais testes conforme necessário
});
