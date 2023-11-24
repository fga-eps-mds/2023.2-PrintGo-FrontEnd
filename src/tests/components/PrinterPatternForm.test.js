import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; 
import '@testing-library/jest-dom';
import PrinterPatternForm, { fieldLabels } from '../../components/forms/PrinterPatternForm';

describe('PrinterPatternForm', () => {
  beforeEach(() => {
    render(<PrinterPatternForm />);
  });

  test('renders all form fields and buttons', () => {
    // Testa campos principais
    ['tipo', 'marca', 'modelo'].forEach(field => {
      expect(screen.getByPlaceholderText(`Digite ${fieldLabels[field].toLowerCase()}`)).toBeInTheDocument();
    });

    // Testa campos SNMP
    Object.keys(fieldLabels.snmp).forEach(subField => {
      // Aqui você deve identificar cada campo de forma única, se necessário
      expect(screen.getAllByPlaceholderText('Código OID')).toHaveLength(Object.keys(fieldLabels.snmp).length);
    });

    // Testa botões
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
  });

});
