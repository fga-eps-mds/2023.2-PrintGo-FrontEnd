import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditPrinterForm, { fieldLabels, testObject } from '../../components/forms/EditPrinterForm';
import { MemoryRouter } from 'react-router-dom';  // Adicionado para fornecer contexto de roteamento

describe('EditPrinterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all form fields and buttons with testObject values', () => {
    render(
      <MemoryRouter>
        <EditPrinterForm />
      </MemoryRouter>
    );

    Object.entries(fieldLabels).forEach(([key, label]) => {
      const input = screen.getByPlaceholderText(label.includes('data') ? 'DD/MM/AAAA' : label);
      expect(input).toBeInTheDocument();
      expect(input.value).toBe(testObject[key]);
    });

    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
  });
});
