import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import EditPrinterForm, { fieldLabels, testObject } from '../../components/forms/EditPrinterForm';

jest.mock('axios', () => ({
  // Sua implementação mock, se necessário
}));

describe('EditPrinterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all form fields and buttons with testObject values', () => {
    render(<EditPrinterForm />);

    Object.entries(fieldLabels).forEach(([key, label]) => {
      const input = screen.getByPlaceholderText(label.includes('data') ? 'DD/MM/AAAA' : label);
      expect(input).toBeInTheDocument();
      expect(input.value).toBe(testObject[key]);
    });

    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
  });


});

