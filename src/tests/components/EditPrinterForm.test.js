import React from 'react';
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';
import { BrowserRouter as Router, useParams, useNavigate } from 'react-router-dom';
import EditPrinterForm from '../../components/forms/EditPrinterForm';
import { getUnidades } from '../../services/unidadeService';
import { editImpressora, getPadroes } from '../../services/printerService';

jest.mock('../../services/unidadeService', () => ({
  getUnidades: jest.fn(),
}));

jest.mock('../../services/printerService', () => ({
  getPadroes: jest.fn(),
  editImpressora: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

function render(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return <Router>{children}</Router>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

const printer = {
  id: "1",
  padrao_id: "1",
  unidadeId: '3',
  ip: "123.12.1.3.01",
  numeroSerie: "hp-132-a789",
  codigoLocadora: "879845634",
  contadorInstalacao: 1000,
  dataInstalacao: "2023-01-15T00:00:00.000Z",
  contadorRetiradas: 10,
  dataContadorRetirada: "2023-12-01T12:30:00.000Z",
  dataUltimoContador: "2023-12-01T12:30:00.000Z",
  ultimoContador: 10,
  padrao: {
    id: "1",
    tipo: "padrao",
    marca: "exemplo_marca",
    modelo: "exemplo_modelo",
    numeroSerie: "192.168.1.2",
    versaoFirmware: "192.168.1.2",
    tempoAtivoSistema: "192.168.1.2",
    totalDigitalizacoes: "192.168.1.2", 
    totalCopiasPB: "192.168.1.2",      
    totalCopiasColoridas: "192.168.1.2", 
    totalImpressoesPb: "192.168.1.2",    
    totalImpressoesColoridas: "192.168.1.2", 
    totalGeral: "192.168.1.2",           
    enderecoIp: "192.168.1.2"
  }
};

const patterns = [
  {
    id: "1",
    tipo: "padrao",
    marca: "exemplo_marca",
    modelo: "exemplo_modelo",
    numeroSerie: "192.168.1.2",
    versaoFirmware: "192.168.1.2",
    tempoAtivoSistema: "192.168.1.2",
    totalDigitalizacoes: "192.168.1.2", 
    totalCopiasPB: "192.168.1.2",      
    totalCopiasColoridas: "192.168.1.2", 
    totalImpressoesPb: "192.168.1.2",    
    totalImpressoesColoridas: "192.168.1.2", 
    totalGeral: "192.168.1.2",           
    enderecoIp: "192.168.1.2"
  }
];

const printerHash = btoa(JSON.stringify(printer));

describe('EditPrinterForm', () => {
  beforeEach(() => {
    useParams.mockReturnValue({printer: printerHash});
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
        {id: '2', name: "unidade2", parent_workstation: {id: "1"}},
        {id: '3', name: "unidade3"}
      ]
    });
    getPadroes.mockResolvedValue({ type: 'success', data: patterns});
    router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
    jest.clearAllMocks();
  });

  it('should render page and load printer data', async () => {
    editImpressora.mockResolvedValue({ type: 'success' });

    render(<EditPrinterForm />);
    
    await waitFor(() => {

      const submitButton = screen.getByText("EDITAR");
      fireEvent.click(submitButton);
      
      expect(editImpressora).toHaveBeenCalled();
    })
  });

  it('should try to submit form and return a error', async () => {
    editImpressora.mockResolvedValue({ type: 'error' });

    render(<EditPrinterForm />);
    
    await waitFor(() => {

      const submitButton = screen.getByText("EDITAR");
      fireEvent.click(submitButton);
      
      expect(editImpressora).toHaveBeenCalled();
    })
  });

  it('should handle workstation change', async () => {
    //editImpressora.mockResolvedValue({ type: 'success' })

    render(<EditPrinterForm />);

    const unidadePaiSelect = screen.getByTestId("unidadePai-select");
    const unidadeFilhaSelect = screen.getByTestId("unidadeFilha-select");
    
    await waitFor(() => {
      fireEvent.change(unidadePaiSelect, { target: { value: '' } });
      expect(unidadePaiSelect.value).toBe('');

      fireEvent.change(unidadePaiSelect, { target: { value: '1' } });
      expect(unidadePaiSelect.value).toBe('1');

      fireEvent.change(unidadeFilhaSelect, { target: { value: '2' } });
      expect(unidadeFilhaSelect.value).toBe('2');
    })

  });

})
