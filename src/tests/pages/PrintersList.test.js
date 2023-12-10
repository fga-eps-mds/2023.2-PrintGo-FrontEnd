import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrintersList from "../../pages/PrintersList";
import * as api from "../../api/api";
import * as router from 'react-router-dom';
import { getPrinters } from "../../services/printerService";
import { getUnidades } from "../../services/unidadeService";


// Mock das chamadas de API
jest.mock("../../services/printerService", () => ({
  getPrinters: jest.fn(),
  updatePrinterStatus: jest.fn(),
}));

jest.mock('../../services/unidadeService', () => ({
  getUnidades: jest.fn(),
}))


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));



describe('PrintersListPage', () => {

  beforeEach(() => {
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: 1, nome: "unidade1"},
        {id: 2, nome: "unidade2"},
        {id: 3, nome: "unidade3"},
      ]
    });
    router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
      
  });
    
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  // Teste de Renderização Inicial
  test("deve renderizar a lista de impressoras corretamente", async () => {
    getPrinters.mockResolvedValue(
      {
        type: 'success',
        data: [
          {
            "id": "clpzts1g70001ikth3c7ixpn0",
            "ip": "192.168.1.9",
            "numeroSerie": "1234578",
            "padrao_id": "clpz1mhas0002mxauco67iokp",
            "codigoLocadora": "clpt90cbh000014p5ynunod0u",
            "locadora_id": null,
            "contadorInstalacao": 1000,
            "dataInstalacao": "2023-01-15T00:00:00.000Z",
            "ultimoContador": 40,
            "dataUltimoContador": "2023-12-01T12:30:00.000Z",
            "contadorRetiradas": 2010,
            "dataContadorRetirada": "2023-12-05T08:45:00.000Z",
            "unidadeId": "f39a868c-dbf7-4fca-a257-f915311b5a79",
            "status": "ATIVO",
            "padrao": {
                "id": "clpz1mhas0002mxauco67iokp",
                "tipo": "LaserJet",
                "marca": "HP",
                "modeloImpressora": "123.12.1.3123.01",
                "modelo": "Pro M404dn",
                "numeroSerie": "123.12.1.3123.01",
                "versaoFirmware": "123.12.1.3123.01",
                "totalDigitalizacoes": "123.12.1.3123.01",
                "totalCopiasPB": "123.12.1.3123.01",
                "totalCopiasColoridas": "123.12.1.3123.01",
                "totalImpressoesPb": "123.12.1.3123.01",
                "totalImpressoesColoridas": "123.12.1.3123.01",
                "totalGeral": "123.12.1.3123.01",
                "enderecoIp": "123.12.1.3123.01",
                "status": "ATIVO",
                "tempoAtivoSistema": "123.12.1.3123.01",
                "num": null
            }
          }
        ]
  
      }
    );
  
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
        {id: '2', name: "unidade2", parent_workstation: {id: "1"}},
        {id: '3', name: "unidade3"}
      ]
    });
  
    render(<router.BrowserRouter>
        <PrintersList />
      </router.BrowserRouter>
    );
  
    
    await waitFor(() => {
      
                
      expect(screen.getByText("Data do último contador: 01/12/23")).toBeInTheDocument();
      
    });
  });
  
  // Teste de Filtro de Pesquisa
  test("deve filtrar impressoras com base na pesquisa", async() => {
  
    getPrinters.mockResolvedValue(
      {
        type: 'success',
        data: [
          {
            "id": "clpzts1g70001ikth3c7ixpn0",
            "ip": "192.168.1.9",
            "numeroSerie": "1234578",
            "padrao_id": "clpz1mhas0002mxauco67iokp",
            "codigoLocadora": "clpt90cbh000014p5ynunod0u",
            "locadora_id": null,
            "contadorInstalacao": 1000,
            "dataInstalacao": "2023-01-15T00:00:00.000Z",
            "ultimoContador": 40,
            "dataUltimoContador": "2023-12-01T12:30:00.000Z",
            "contadorRetiradas": 2010,
            "dataContadorRetirada": "2023-12-05T08:45:00.000Z",
            "unidadeId": "f39a868c-dbf7-4fca-a257-f915311b5a79",
            "status": "ATIVO",
            "padrao": {
                "id": "clpz1mhas0002mxauco67iokp",
                "tipo": "LaserJet",
                "marca": "HP",
                "modeloImpressora": "123.12.1.3123.01",
                "modelo": "Pro M404dn",
                "numeroSerie": "123.12.1.3123.01",
                "versaoFirmware": "123.12.1.3123.01",
                "totalDigitalizacoes": "123.12.1.3123.01",
                "totalCopiasPB": "123.12.1.3123.01",
                "totalCopiasColoridas": "123.12.1.3123.01",
                "totalImpressoesPb": "123.12.1.3123.01",
                "totalImpressoesColoridas": "123.12.1.3123.01",
                "totalGeral": "123.12.1.3123.01",
                "enderecoIp": "123.12.1.3123.01",
                "status": "ATIVO",
                "tempoAtivoSistema": "123.12.1.3123.01",
                "num": null
            }
          }
        ]
  
      }
    );
  
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
        {id: '2', name: "unidade2", parent_workstation: {id: "1"}},
        {id: '3', name: "unidade3"}
      ]
    });
  
    render(<router.BrowserRouter>
        <PrintersList />
      </router.BrowserRouter>
    );
  
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "H" },
    });

    await waitFor(() => {
      
      expect(screen.getByText("HP LaserJet Pro M404dn")).toBeInTheDocument();
      expect(screen.queryByText("Epson LaserJet")).toBeNull();
    });
    
  });
  
  
  test("deve mostrar se a impressora esta sendo desativada", async () => {
    render(<router.BrowserRouter>
        <PrintersList />
      </router.BrowserRouter>);
  
    
    const botaoDesativar = screen.getByText("Desativar");
    fireEvent.click(botaoDesativar);
  
    
    expect(screen.getByText("Desativação de impressora")).toBeInTheDocument();
  });
  
  test("deve mostrar se a impressora esta sendo ativada", async () => {
    render(<router.BrowserRouter>
        <PrintersList />
      </router.BrowserRouter>
    );
  
    
    const botaoAtivar = screen.getByText("Ativar");
    fireEvent.click(botaoAtivar);
  
    
    expect(screen.getByText("Ativação de impressora")).toBeInTheDocument();
  });
  
  
  
  
  
  test("Deve mostrar o texto do filto 'Ativas'", async () =>{
  
    render(
      <router.BrowserRouter>
        <PrintersList />
      </router.BrowserRouter>
    )
    
    const botaoAtivas = screen.getByText('Ativas');
    fireEvent.click(botaoAtivas);
    const filter_being_shown = screen.getByTestId("filter_beign_shown")
    expect(filter_being_shown).toHaveTextContent("Ativas");
    })
  
  test("Deve mostrar o texto do filtro 'Todas'", async () =>{
  
    render(
      <router.BrowserRouter>
        <PrintersList />
      </router.BrowserRouter>
    )
    
    const botaoTodas = screen.getByText('Todas', { selector: 'a' });
    fireEvent.click(botaoTodas);
    const filter_being_shown = screen.getByTestId("filter_beign_shown")
    expect(filter_being_shown).toHaveTextContent("Todas");
  
  })
  
  test("Deve mostrar o texto do filtro 'Desativadas'", async () =>{
  
    render(
      <router.BrowserRouter>
        <PrintersList />
      </router.BrowserRouter>
    )
    
    const botaoDesativadas = screen.getByText('Desativadas', { selector: 'a' });
    fireEvent.click(botaoDesativadas);
    const filter_being_shown = screen.getByTestId("filter_beign_shown")
    expect(filter_being_shown).toHaveTextContent("Desativadas");
  
  });
});

