import React from 'react';
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import EditPatternForm from '../../components/forms/EditPatternForm';
import '@testing-library/jest-dom/extend-expect';
import { getPadrao, editPadrao } from '../../services/printerService';
import { BrowserRouter as Router, useNavigate, useParams } from 'react-router-dom';
import * as router from 'react-router-dom';

jest.mock('../../api/api', () => ({
  getPadrao: jest.fn(),
  createUser: jest.fn(),
}));


function render(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return <Router>{children}</Router>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
const padrao = {
  tipo: "Tipo",
  marca: "Marca",
  modelo: "Modelo",
  modeloImpressora: "Modelo da impressora",
  numeroSerie: "Número de série",
  versaoFirmware: "Versão do Firmware",
  tempoAtivoSistema: "Tempo ativo do sistema",
  totalDigitalizacoes: "Total de digitalizações",
  totalCopiasPB: "Total de cópias P&B",
  totalCopiasColoridas: "Total de cópias coloridas",
  totalImpressoesPb: "Total de impressões P&B",
  totalImpressoesColoridas: "Total de impressões coloridas",
  totalGeral: "Total geral",
  enderecoIp: "Endereço IP",
}

jest.mock('../../services/printerService', () => ({
  getPadrao: jest.fn(),
  editPadrao: jest.fn()

}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

const padraoHash = btoa(JSON.stringify(padrao));

describe('EditPatternForm', () => {

  beforeEach(() => {
    useParams.mockReturnValue({padrao: padraoHash});
    getPadrao.mockResolvedValue({
      type: 'success',
      data: padrao
    });

    useParams.mockReturnValue(
      {id: "clprc9gem0001y06nguit2ikt"}
    );
    router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render without crashing', () => {
    useParams.mockReturnValue({padrao: padraoHash});
    render(<EditPatternForm />);

    expect(screen.getByTestId("printer-pattern-signup-card")).toBeInTheDocument()
  });
  
  it('should render without crashing', async() => {
    useParams.mockReturnValue({padrao: padraoHash});
    getPadrao.mockResolvedValue({
      type: 'success',
      data: padrao
    });

    render(<EditPatternForm />);


    await waitFor(() => {
        
      expect(screen.getByPlaceholderText("Digite tipo")).toHaveValue("Tipo")

    });
  });


  it('should submit', async() => {
    useParams.mockReturnValue({padrao: padraoHash});

    editPadrao.mockResolvedValue({type: 'success'});

    
    getPadrao.mockResolvedValue({
      type: 'success',
      data: padrao
    });


    render(<EditPatternForm />);

    const modeloInput = screen.getByPlaceholderText("Digite modelo");
    fireEvent.change(modeloInput, { target: { value: 'Modeloteste' } });

    const submitButton = screen.getByText("SALVAR");
    fireEvent.submit(submitButton);

    await waitFor(() => {
      //expect(window.location.pathname).toBe("/padroescadastrados");
      expect(editPadrao).toHaveBeenCalled()
      expect(editPadrao).toHaveBeenCalledWith({
        tipo: "Tipo",
        marca: "Marca",
        modelo: "Modeloteste",
        modeloImpressora: "Modelo da impressora",
        numeroSerie: "Número de série",
        versaoFirmware: "Versão do Firmware",
        tempoAtivoSistema: "Tempo ativo do sistema",
        totalDigitalizacoes: "Total de digitalizações",
        totalCopiasPB: "Total de cópias P&B",
        totalCopiasColoridas: "Total de cópias coloridas",
        totalImpressoesPb: "Total de impressões P&B",
        totalImpressoesColoridas: "Total de impressões coloridas",
        totalGeral: "Total geral",
        enderecoIp: "Endereço IP",
      });
        
      

    });
  });

});



  