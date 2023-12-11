import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrinterPatternForm, { fieldLabels } from '../../components/forms/PrinterPatternForm';
import { createPadraoImpressora } from '../../services/printerService';

jest.mock('../../services/printerService', () => ({
  createPadraoImpressora: jest.fn(),
}));

const mockCreatePadraoImpressora = jest.mocked(createPadraoImpressora);

describe('PrinterPatternForm', () => {
  beforeEach(() => {
    mockCreatePadraoImpressora.mockReset();
    render(<PrinterPatternForm />);
  });

  test('renderiza todos os campos e botões do formulário', () => {
    // Testa se todos os campos principais estão renderizados
    Object.entries(fieldLabels).filter(([key]) => key !== "snmp").forEach(([key, label]) => {
      expect(screen.getByPlaceholderText(`Digite ${label.toLowerCase()}`)).toBeInTheDocument();
    });

    // Testa se os campos SNMP estão renderizados
    Object.keys(fieldLabels.snmp).forEach(key => {
      expect(screen.getByPlaceholderText('Código OID')).toBeInTheDocument();
    });

    // Testa se os botões estão renderizados
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
  });

  test('exibe mensagem de erro para campos obrigatórios não preenchidos', async () => {
    const submitButton = screen.getByRole('button', { name: /registrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      Object.entries(fieldLabels).filter(([key]) => key !== "snmp").forEach(([key]) => {
        expect(screen.getByText('Este campo é obrigatório')).toBeInTheDocument();
      });
    });
  });

  test('envia o formulário com dados válidos', async () => {
    mockCreatePadraoImpressora.mockResolvedValue({ type: 'success' });

    // Preenchendo os campos do formulário
    fireEvent.change(screen.getByPlaceholderText('Digite tipo'), { target: { value: 'Tipo Teste' } });
    fireEvent.change(screen.getByPlaceholderText('Digite marca'), { target: { value: 'Marca Teste' } });
    fireEvent.change(screen.getByPlaceholderText('Digite modelo'), { target: { value: 'Modelo Teste' } });
    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

    await waitFor(() => {
      expect(mockCreatePadraoImpressora).toHaveBeenCalledWith(expect.anything());
     
    });
  });

});
