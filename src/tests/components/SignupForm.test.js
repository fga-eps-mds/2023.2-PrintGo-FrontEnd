import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SignupForm from '../../components/forms/SignupForm';
import { getUnidades } from "../../services/unidadeService";
import { createUser } from "../../services/userService";
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNscHJpaTRyOTAwMDFhaDJjazk5cWNxYW0iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIm5vbWUiOiJBZG1pbiIsImNhcmdvcyI6WyJVU0VSIiwiQURNSU4iXSwiaWF0IjoxNzAxODg5NjY5LCJleHAiOjE3MDE4OTMyNjl9.2yqtoHjjXjguYkOVC9wZYiO_pASsyQO_o0z3d-4JFR0";

jest.mock('../../api/api', () => ({
  getUnidades: jest.fn(),
  createUser: jest.fn(),
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
    render (
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
  });

  it('should render without crashing', () => {
    expect(screen.getByText("Cadastro de usuário")).toBeInTheDocument();
  });

  it('should display required error when value is invalid', async () => {
    // Simulate form submission
    fireEvent.submit(document.getElementById('signup-register-bnt'));

    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeInTheDocument()
      expect(screen.getByText("Email é obrigatório")).toBeInTheDocument()
      expect(screen.getByText("CPF ou CNPJ inválido")).toBeInTheDocument()
    });
  });

  it('should display matching error when email does not match', async () => {
    // Fill in the email and emailConfirmar fields
    fireEvent.input(document.getElementsByName('email')[0], { target: { value: 'test@test.com' } });
    fireEvent.input(document.getElementsByName('emailConfirmar')[0], { target: { value: 'test1@test.com' } });
    
    // Simulate form submission
    fireEvent.submit(document.getElementById('signup-register-bnt'));

    await waitFor(() => {
      expect(screen.getByText(/Os emails devem coincidir/i)).toBeInTheDocument();
    });
  });

  it('should not display error when value is valid', async () => {
    // Fill in valid values for the form fields
    fireEvent.input(document.getElementsByName('nome')[0], { target: { value: 'Test' } });
    fireEvent.input(document.getElementsByName('email')[0], { target: { value: 'test@test.com' } });
    fireEvent.input(document.getElementsByName('emailConfirmar')[0], { target: { value: 'test@test.com' } });
    
    // Simulate form submission
    fireEvent.submit(document.getElementById('signup-register-bnt'));

    await waitFor(() => {
      expect(screen.getByTestId('email-error')).toHaveTextContent('');
    });
  });
});
