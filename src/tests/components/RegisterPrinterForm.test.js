import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import RegisterPrinterForm, { fieldLabels } from '../../components/forms/RegisterPrinterForm';

jest.mock('axios', () => ({
  // Sua implementação mock, se necessário
}));

describe('RegisterPrinterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all form fields and buttons', () => {
    render(<RegisterPrinterForm />);

    Object.values(fieldLabels).forEach(label => {
      const placeholderText = label.includes("data") ? "DD/MM/AAAA" : label;
      expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
  });

  test('should change inputs on form', async () => {
    const data = {
      padrao: 'Teste',
      ip: '192.168.0.1',
      numeroSerie: '1A2B3C4E',
      codigoLocadora: '001',
      contadorInstalacao: '003',
      dataInstalacao: '11-02-2021',
      contadorRetirada: '006',
      dataRetirada: '11-12-2022',
    };

    render(<RegisterPrinterForm />);

    for (const [field, value] of Object.entries(data)) {
      const fieldValue = fieldLabels[field].includes("data") ? "DD/MM/AAAA" : fieldLabels[field];
      const input = screen.getByPlaceholderText(fieldValue);

      if (value !== "") {
        await userEvent.type(input, value);
      }
    }

    await waitFor(() => {
      for (const [field, value] of Object.entries(data)) {
        if (value !== "") {
          const fieldValue = fieldLabels[field].includes("data") ? "DD/MM/AAAA" : fieldLabels[field];
          const input = screen.getByPlaceholderText(fieldValue);
          expect(input.value).toBe(value);
        }
      }
    });
});

  
  
});
