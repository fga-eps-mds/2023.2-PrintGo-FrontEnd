import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterPrinterForm, { fieldLabels } from '../../components/forms/RegisterPrinterForm';
import { createUser } from '../../api/api'; 

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
});