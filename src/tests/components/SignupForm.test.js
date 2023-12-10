import React from 'react';
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SignupForm from '../../components/forms/SignupForm';
import { getUnidades } from "../../services/unidadeService";
import { createUser } from "../../services/userService";

jest.mock('../../services/unidadeService', () => ({
  getUnidades: jest.fn(),
}))

jest.mock('../../services/userService', () => ({
  createUser: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

function render(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return <Router>{children}</Router>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('SignupForm', () => {
  beforeEach(() => {
    router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
    jest.clearAllMocks();
  });
  
  it('should render without crashing', () => {
    render(<SignupForm />);

    expect(screen.getByText("Cadastro de usuário")).toBeInTheDocument();
  });

  it('should display required error when value is invalid', async () => {
    render(<SignupForm />);

    // Simulate form submission
    fireEvent.submit(screen.getByText("REGISTRAR"));

    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeInTheDocument();
      expect(screen.getByText("Email é obrigatório")).toBeInTheDocument();
      expect(screen.getByText("CPF ou CNPJ inválido")).toBeInTheDocument();
      expect(screen.getByText("Email é obrigatória")).toBeInTheDocument();
      expect(screen.getAllByText("Senha é obrigatória")[0]).toBeInTheDocument();
    });
  });

  it('should make API call and get workstations succesfully', async() => {
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: 1, nome: "unidade1"},
        {id: 2, nome: "unidade2"},
        {id: 3, nome: "unidade3"},
      ]
    });

    render(<SignupForm />);

    await waitFor(() => {
      const unidade1 = screen.getByRole('option', { value: 1 });
      const unidade2 = screen.getByRole('option', { value: 2 });
      const unidade3 = screen.getByRole('option', { value: 3 });
      expect(unidade1).toBeInTheDocument();
      expect(unidade2).toBeInTheDocument();
      expect(unidade3).toBeInTheDocument();
    });

  });

  it('should enable child workstations combobox', async () => {
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
        {id: '2', name: "unidade2"},
        {id: '3', name: "unidade3"}
      ]
    });

    render(<SignupForm />);

    const unidadePaiCombobox = screen.getByTestId("unidadePai");

    await waitFor(() => {
      fireEvent.change(unidadePaiCombobox, { target: { value: '1' } });
      expect(unidadePaiCombobox.value).toBe("1");
      expect(screen.getByTestId("unidadeFilha")).toBeInTheDocument();
    });
  })

  it('should make API call for creating user successfully', async() => {
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', nome: "unidade1", child_workstations: [{id: '2', nome: "unidade2"}]},
        {id: '2', nome: "unidade2"},
        {id: '3', nome: "unidade3"},
      ]
    });

    createUser.mockResolvedValue({
      type: 'success'
    })

    render(<SignupForm />);

    const nameInput = screen.queryByPlaceholderText('Nome');
    const documentoInput = screen.queryByPlaceholderText('CPF ou CNPJ');
    const emailInput = screen.queryByPlaceholderText('Email');
    const confirmEmailInput = screen.queryByPlaceholderText('Confirmar Email');
    const passwordInput = screen.queryByPlaceholderText('Senha');
    const confirmPasswordInput = screen.queryByPlaceholderText('Confirmar Senha');
    const unidadePaiSelect = screen.getByTestId("unidadePai");
    const submitButton = screen.getByText("REGISTRAR");

    await waitFor(() => {

      fireEvent.change(nameInput, { target: { value: 'Teste' } });
      fireEvent.change(documentoInput, { target: { value: '14737349089' } });
      fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
      fireEvent.change(confirmEmailInput, { target: { value: 'teste@teste.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Teste123@' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'Teste123@' } });
      fireEvent.change(unidadePaiSelect, { target: { value: '1' } });

      const unidadeFilhoSelect = screen.getByTestId("unidadeFilha");

      fireEvent.change(unidadeFilhoSelect, { target: { value: '2' } });
      expect(unidadeFilhoSelect.value).toBe('2');

    });

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({
        nome: 'Teste',
        documento: '14737349089',
        email: 'teste@teste.com',
        emailConfirmar: 'teste@teste.com',
        senha: 'Teste123@',
        senhaConfirmar: 'Teste123@',
        unidade_id: "2",
        cargos: [
          "USER",
        ],
        isAdmin: false,
        isLocadora: false,
      });
    })

  });

  it('should make API call and return error', async () => {
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', nome: "unidade1", child_workstations: [{id: '2', nome: "unidade2"}]},
        {id: '2', nome: "unidade2"},
        {id: '3', nome: "unidade3"},
      ]
    });

    createUser.mockResolvedValue({
      type: 'error'
    })

    render(<SignupForm />);

    const nameInput = screen.queryByPlaceholderText('Nome');
    const documentoInput = screen.queryByPlaceholderText('CPF ou CNPJ');
    const emailInput = screen.queryByPlaceholderText('Email');
    const confirmEmailInput = screen.queryByPlaceholderText('Confirmar Email');
    const passwordInput = screen.queryByPlaceholderText('Senha');
    const confirmPasswordInput = screen.queryByPlaceholderText('Confirmar Senha');
    const unidadePaiSelect = screen.getByTestId("unidadePai");
    const submitButton = screen.getByText("REGISTRAR");

    await waitFor(() => {

      fireEvent.change(nameInput, { target: { value: 'Teste' } });
      fireEvent.change(documentoInput, { target: { value: '14737349089' } });
      fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
      fireEvent.change(confirmEmailInput, { target: { value: 'teste@teste.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Teste123@' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'Teste123@' } });
      fireEvent.change(unidadePaiSelect, { target: { value: '1' } });

      const unidadeFilhoSelect = screen.getByTestId("unidadeFilha");

      fireEvent.change(unidadeFilhoSelect, { target: { value: '2' } });
      expect(unidadeFilhoSelect.value).toBe('2');

    });

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({
        nome: 'Teste',
        documento: '14737349089',
        email: 'teste@teste.com',
        emailConfirmar: 'teste@teste.com',
        senha: 'Teste123@',
        senhaConfirmar: 'Teste123@',
        unidade_id: "2",
        cargos: [
          "USER",
        ],
        isAdmin: false,
        isLocadora: false,
      });
    })
  });

  it('should submit form setting user as admin and rental company', async () => {
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', nome: "unidade1", child_workstations: [{id: '2', nome: "unidade2"}]},
        {id: '2', nome: "unidade2"},
        {id: '3', nome: "unidade3"},
      ]
    });

    createUser.mockResolvedValue({
      type: 'success'
    })

    render(<SignupForm />);

    const nameInput = screen.queryByPlaceholderText('Nome');
    const documentoInput = screen.queryByPlaceholderText('CPF ou CNPJ');
    const emailInput = screen.queryByPlaceholderText('Email');
    const confirmEmailInput = screen.queryByPlaceholderText('Confirmar Email');
    const passwordInput = screen.queryByPlaceholderText('Senha');
    const confirmPasswordInput = screen.queryByPlaceholderText('Confirmar Senha');
    const unidadePaiSelect = screen.getByTestId("unidadePai");
    const adminCheckbox = screen.getByTestId("admin-checkbox");
    const rentalCheckbox = screen.getByTestId("locadora-checkbox");
    const submitButton = screen.getByText("REGISTRAR");

    await waitFor(() => {

      fireEvent.change(nameInput, { target: { value: 'Teste' } });
      fireEvent.change(documentoInput, { target: { value: '14737349089' } });
      fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
      fireEvent.change(confirmEmailInput, { target: { value: 'teste@teste.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Teste123@' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'Teste123@' } });
      fireEvent.change(unidadePaiSelect, { target: { value: '1' } });
      fireEvent.click(adminCheckbox);
      fireEvent.click(rentalCheckbox);

      const unidadeFilhoSelect = screen.getByTestId("unidadeFilha");

      fireEvent.change(unidadeFilhoSelect, { target: { value: '2' } });
      expect(unidadeFilhoSelect.value).toBe('2');

      expect(adminCheckbox).toBeChecked();
      expect(rentalCheckbox).toBeChecked();

    });

    await waitFor(() => {
      fireEvent.submit(submitButton);
    })

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({
        nome: 'Teste',
        documento: '14737349089',
        email: 'teste@teste.com',
        emailConfirmar: 'teste@teste.com',
        senha: 'Teste123@',
        senhaConfirmar: 'Teste123@',
        unidade_id: "2",
        cargos: [
          "USER",
          "ADMIN",
          "LOCADORA"
        ],
        isAdmin: true,
        isLocadora: true,
      });
    })
  });
});
