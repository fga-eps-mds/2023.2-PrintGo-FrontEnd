import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterPrinterForm, { fieldLabels } from '../../components/forms/RegisterPrinterForm';
import { createUser } from '../../api/api'; 
import userEvent from '@testing-library/user-event';

jest.mock('../../api/api', () => ({
  createUser: jest.fn(),
}));

createUser.mockImplementation((data) => {
  return Promise.resolve();
})

const data = {
    padrao: 'Teste',
    ip: '192.168.0.1',
    numeroSerie: "1A2B3C4E",
    codigoLocadora: "001",
    contadorInstalacao: "003",
    dataInstalacao: "11-02-2021",
    contadorRetirada: "006",
    dataRetirada: "11-12-2022",
    ultimoContador: "3",
    dataUltimoContador: "13-12-2022",
    unidadePai: "Catalão",
    unidadeFilho: "Formosa",
};

const dataWithEmptyFields = {
    padrao: 'Teste',
    ip: '192.168.0.1',
    numeroSerie: "1A2B3C4E",
    codigoLocadora: "001",
    contadorInstalacao: "003",
    dataInstalacao: "11-02-2021",
    contadorRetirada: "006",
    dataRetirada: "11-12-2022",
    ultimoContador: "",
    dataUltimoContador: "",
    unidadePai: "Catalão",
    unidadeFilho: "Formosa",
};

describe('RegisterPrinterForm', () => {
  it('should render without crashing', () => {
    render(<RegisterPrinterForm />);
  });

  it('should change inputs on form', async () => {
    const { getByPlaceholderText } = render(<RegisterPrinterForm />);

    Object.entries(data).forEach(([field, value]) => {
      const fieldValue = fieldLabels[field];
      const input = getByPlaceholderText(fieldValue);
      fireEvent.change(input, { target: { value } });
    });

    await waitFor(() => {
      Object.entries(data).forEach(([field, value]) => {
        const fieldValue = fieldLabels[field];
        const input = getByPlaceholderText(fieldValue);
        expect(input.value).toBe(value);
      });
    });
  });

  it('submits form with valid data', async () => {
  render(<RegisterPrinterForm />);

  Object.entries(data).forEach(([field, value]) => {
    const fieldValue = fieldLabels[field];
    const input = screen.getByPlaceholderText(fieldValue);
    userEvent.type(input, value);
  });

  const submitButton = screen.getByText('REGISTRAR');
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(createUser).toHaveBeenCalledWith(data);
  });
  });

  it('does not submit form with empty fields', async () => {
    render(<RegisterPrinterForm />);
   
    Object.entries(dataWithEmptyFields).forEach(([field, value]) => {
      const fieldValue = fieldLabels[field];
      const input = screen.getByPlaceholderText(fieldValue);
      userEvent.type(input, value);
    });
   
    const submitButton = screen.getByText('REGISTRAR');
    userEvent.click(submitButton);
   
    await waitFor(() => {
      expect(createUser).not.toHaveBeenCalled();
      expect(screen.getByText('Último Contador é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Data do Último Contador é obrigatória')).toBeInTheDocument();
    });
   });
   
  it('resets form after submission', async () => {
    render(<RegisterPrinterForm />);
   
    Object.entries(data).forEach(([field, value]) => {
      const fieldValue = fieldLabels[field];
      const input = screen.getByPlaceholderText(fieldValue);
      userEvent.type(input, value);
    });
   
    const submitButton = screen.getByText('REGISTRAR');
    userEvent.click(submitButton);
   
    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith(data);
      Object.values(fieldLabels).forEach((field) => {
        const input = screen.getByPlaceholderText(field);
        expect(input.value).toBe('');
      });
    });
   });
});