import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; 
import '@testing-library/jest-dom';
import PrinterPatternForm, { fieldLabels } from '../../components/forms/PrinterPatternForm';

describe('PrinterPatternForm', () => {
  beforeEach(() => {
    render(<PrinterPatternForm />);
  });

  test('renderiza todos os campos e botões do formulário', () => {
    // Verifica se todos os campos principais estão renderizados
    ['tipo', 'marca', 'modelo'].forEach(field => {
      expect(screen.getByPlaceholderText(`Digite ${fieldLabels[field].toLowerCase()}`)).toBeInTheDocument();
    });

    // Verifica se os campos SNMP estão renderizados
    Object.keys(fieldLabels.snmp).forEach(subField => {
      expect(screen.getAllByPlaceholderText('Código OID')).toHaveLength(Object.keys(fieldLabels.snmp).length);
    });

    // Verifica se os botões estão renderizados
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
  });

  test('exibe erro quando um campo obrigatório é deixado em branco', async () => {
    const submitButton = screen.getByRole('button', { name: /registrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Este campo é obrigatório')).toBeInTheDocument(); 
    });
  });
 
});
