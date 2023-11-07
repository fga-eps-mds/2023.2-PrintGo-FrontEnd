import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SignupForm from '../../components/forms/SignupForm';
import { getLotacoes } from "../../services/lotacaoService";
import { createUser } from "../../services/userService";
import { getPoliceUnits } from "../../services/policeUnitService";

import '@testing-library/jest-dom/extend-expect';

jest.mock('../../api/api', () => ({
  getLotacoes: jest.fn(),
  createUser: jest.fn(),
  getPoliceUnits: jest.fn(),
}));

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
  });

  it('should render without crashing', () => {
    render(<SignupForm />);
  });

  it('should display required error when value is invalid', async () => {
    render(<SignupForm />);
    
    // Simulate form submission
    fireEvent.submit(document.getElementById('register-bnt'));

    await waitFor(() => {
      expect(screen.getByText(/Nome é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/Email é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/CPF ou CNPJ inválido/i)).toBeInTheDocument()
      // Add more error checks as necessary
    });
  });

  it('should display matching error when email does not match', async () => {
    render(<SignupForm />);
    
    // Fill in the email and emailConfirmar fields
    fireEvent.input(document.getElementsByName('email')[0], { target: { value: 'test@test.com' } });
    fireEvent.input(document.getElementsByName('emailConfirmar')[0], { target: { value: 'test1@test.com' } });
    
    // Simulate form submission
    fireEvent.submit(document.getElementById('register-bnt'));

    await waitFor(() => {
      expect(screen.getByText(/Os emails devem coincidir/i)).toBeInTheDocument();
    });
  });

  it('should not display error when value is valid', async () => {
    render(<SignupForm />);
    
    // Fill in valid values for the form fields
    fireEvent.input(document.getElementsByName('nome')[0], { target: { value: 'Test' } });
    fireEvent.input(document.getElementsByName('email')[0], { target: { value: 'test@test.com' } });
    fireEvent.input(document.getElementsByName('emailConfirmar')[0], { target: { value: 'test@test.com' } });
    // Add more valid inputs as necessary
    
    // Simulate form submission
    fireEvent.submit(document.getElementById('register-bnt'));

    await waitFor(() => {
        expect(screen.getByTestId('email-error')).toHaveTextContent('');
      // Add more non-error checks as necessary
    });
  });
});
