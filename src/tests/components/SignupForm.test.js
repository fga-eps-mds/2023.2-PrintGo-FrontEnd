import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SignupForm from '../../components/forms/SignupForm';
import { getUnidades } from "../../services/unidadeService";
import { createUser } from "../../services/userService";


import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../api/api', () => ({
  getUnidades: jest.fn(),
  createUser: jest.fn(),
}));
jest.mock('../../services/unidadeService');
jest.mock('../../services/userService');
describe('SignupForm', () => {
  beforeEach(() => {
    // getPoliceUnits.mockResolvedValue({
    //   type: 'success',
    //   data: [
    //     {
    //         "id": "clonjn9mh0000o7cfhm53vf6o",
    //         "nome": "policia1"
    //     },
    //     {
    //         "id": "clonjprup0000o7dse80s0u4i",
    //         "nome": "policia2"
    //     }
    //   ]
    // });
    // getLotacoes.mockResolvedValue({
    //   type: 'success',
    //   data: [
    //     {
    //         "id": "clonkbroa0002o7ds660j2uxs",
    //         "nome": "Delegacia 1",
    //         "rua": "Rua da Delegacia Da cunha",
    //         "logradouro": "Centro",
    //         "complemento": "Sala 707",
    //         "bairro": "Centro",
    //         "cidade": "Anápolis",
    //         "cep": "75100-000",
    //         "numero": 707,
    //         "unidade_pai_id": "clonjn9mh0000o7cfhm53vf6o"
    //     },
    //     {
    //         "id": "clonlzmj10001o7s995pddxqe",
    //         "nome": "Delegacia 2",
    //         "rua": "Rua da Delegacia Da cunha",
    //         "logradouro": "Centro",
    //         "complemento": "Sala 707",
    //         "bairro": "Centro",
    //         "cidade": "Anápolis",
    //         "cep": "75100-000",
    //         "numero": 707,
    //         "unidade_pai_id": "clonjn9mh0000o7cfhm53vf6o"
    //     },
    //     {
    //         "id": "clonlznlj0003o7s9u76vi3dk",
    //         "nome": "Delegacia 3",
    //         "rua": "Rua da Delegacia Da cunha",
    //         "logradouro": "Centro",
    //         "complemento": "Sala 707",
    //         "bairro": "Centro",
    //         "cidade": "Anápolis",
    //         "cep": "75100-000",
    //         "numero": 707,
    //         "unidade_pai_id": "clonjprup0000o7dse80s0u4i"
    //     },
    //   ]
    // });
    jest.clearAllMocks();
  });
  

  it('should render without crashing', async() => {
    render(
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
    
    );

    const unidadesMock = [
      { id: '1', name: 'Unidade1' },
      { id: '2', name: 'Unidade2' },
    ];

    getUnidades.mockResolvedValueOnce({ type: 'success', data: unidadesMock });

    const unidadePai = screen.getByRole('combobox')

    fireEvent.change(unidadePai, { target: { value: 'some-unit-id' } });

    await waitFor(() => expect(getUnidades).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      const unidadeFilha = screen.getByTestId('unidadeFilha')
      expect(unidadeFilha).toBeInTheDocument()
    });
  });

  it('should render without crashing', () => {
    render(
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
    
    );

    expect(screen.getByTestId("signup-card")).toBeInTheDocument()
  });

  it('should display required error when value is invalid', async () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );
    
    // Simulate form submission
    fireEvent.submit(screen.getByText("REGISTRAR"));

    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeInTheDocument()
      expect(screen.getByText("Email é obrigatório")).toBeInTheDocument()
      expect(screen.getByText("CPF ou CNPJ inválido")).toBeInTheDocument()
      // Add more error checks as necessary
    });
  });

  it('should display matching error when email does not match', async () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );
    
    // Fill in the email and emailConfirmar fields
    fireEvent.input(document.getElementsByName('email')[0], { target: { value: 'test@test.com' } });
    fireEvent.input(document.getElementsByName('emailConfirmar')[0], { target: { value: 'test1@test.com' } });
    
    // Simulate form submission
    fireEvent.submit(screen.getByText("REGISTRAR"));

    await waitFor(() => {
      expect(screen.getByText("Os emails devem coincidir")).toBeInTheDocument();
    });
  });

  it('should not display error when value is valid', async () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );
    
    // Fill in valid values for the form fields
    fireEvent.input(document.getElementsByName('nome')[0], { target: { value: 'Test' } });
    fireEvent.input(document.getElementsByName('email')[0], { target: { value: 'test@test.com' } });
    fireEvent.input(document.getElementsByName('emailConfirmar')[0], { target: { value: 'test@test.com' } });
    // Add more valid inputs as necessary
    
    // Simulate form submission
    fireEvent.submit(screen.getByText("REGISTRAR"));

    await waitFor(() => {
        expect(screen.getByTestId('email-error')).toHaveTextContent('');
      // Add more non-error checks as necessary
    });
  });
});
