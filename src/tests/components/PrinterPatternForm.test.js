import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import PrinterPatternForm from '../../components/forms/PrinterPatternForm';
import { BrowserRouter as Router } from 'react-router-dom';
import { createPadraoImpressora } from '../../services/printerService';

jest.mock('../../services/printerService', () => ({
  createPadraoImpressora: jest.fn(),
}));

function render(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return <Router>{children}</Router>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('PrinterPatternForm', () => {
    beforeEach(() => {
      jest.mocked(createPadraoImpressora).mockReset();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('deve renderizar o formulário corretamente', () => {
      render(<PrinterPatternForm />);
      expect(screen.getByText("Cadastrar padrão de impressora")).toBeInTheDocument();
    });


   
});
