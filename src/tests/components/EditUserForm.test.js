import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import EditUserForm from '../../components/forms/EditUserForm';
import { BrowserRouter as Router, useNavigate, useParams } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import { getUnidades } from "../../services/unidadeService";
import { getUserById, updateUser } from '../../services/userService';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNscHJpaTRyOTAwMDFhaDJjazk5cWNxYW0iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIm5vbWUiOiJBZG1pbiIsImNhcmdvcyI6WyJVU0VSIiwiQURNSU4iXSwiaWF0IjoxNzAxODg5NjY5LCJleHAiOjE3MDE4OTMyNjl9.2yqtoHjjXjguYkOVC9wZYiO_pASsyQO_o0z3d-4JFR0";

jest.mock('../../services/unidadeService', () => ({
  getUnidades: jest.fn(),
}))

jest.mock('../../services/userService', () => ({
  getUserById: jest.fn(),
  updateUser: jest.fn(),
}));

jest.mock('react-jwt', () => ({
  decodeToken: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

function render(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return <Router>{children}</Router>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('EditUserForm', () => {
    beforeEach(() => {
      getUnidades.mockResolvedValue({
        type: 'success',
        data: [
          {id: 1, nome: "unidade1"},
          {id: 2, nome: "unidade2"},
          {id: 3, nome: "unidade3"},
        ]
      });

      // Mock do id vindo da url.
      useParams.mockReturnValue(
        {id: "clprc9gem0001y06nguit2ikt"}
      );

      // Simule o usuário logado.
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
      decodeToken.mockReturnValue({
        "id": "clprc9gem0001y06nguit2ikt",
        "email": "ass@example.com",
        "nome": "Another User",
        "cargos": [
          "USER"
        ]
      })

      router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render page correctly', () => {
      render(<EditUserForm />);

      expect(screen.getByText("Editar usuário")).toBeInTheDocument();
    })

    it('should render page correctly', () => {
      render(<EditUserForm />);
      const botaoMudarSenha = screen.getByText("MUDAR SENHA");
      fireEvent.click(botaoMudarSenha);
      let url = location.href;
      const resultado = url.match(/\/\/[^\/]+(\/[^?#]*)/);
      url = resultado ? resultado[1] : null;
      expect(url).toBe("/mudarsenha");
      
    })

    it('should make API call and get workstations succesfully', async() => {
      getUnidades.mockResolvedValue({
        type: 'success',
        data: [
          {id: 1, nome: "unidade1"},
          {id: 2, nome: "unidade2"},
          {id: 3, nome: "unidade3"},
        ]
      });
  
      render(<EditUserForm />);
  
      await waitFor(() => {
        const unidade1 = screen.getByRole('option', { value: 1 });
        const unidade2 = screen.getByRole('option', { value: 2 });
        const unidade3 = screen.getByRole('option', { value: 3 });
        expect(unidade1).toBeInTheDocument();
        expect(unidade2).toBeInTheDocument();
        expect(unidade3).toBeInTheDocument();
      });
  
    });

    it('should make API call for workstations and throw error', async() => {
      getUnidades.mockRejectedValue(new Error('error'));
  
      render(<EditUserForm />);

      const unidadePaiCombobox = screen.getByTestId("unidadePai");
  
      await waitFor(() => {
        fireEvent.change(unidadePaiCombobox, { target: { value: '1' } });
        expect(unidadePaiCombobox.value).toBe("");
      });
  
    });

    it('should decode user from token', async () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);

      render(<EditUserForm />);

      await waitFor(() => {
        expect(decodeToken).toHaveBeenCalledWith(token);
      })
    })

    it('should make API call and get user successfully', async() => {

      getUserById.mockResolvedValue({
        "id": "clprc9gem0001y06nguit2ikt",
        "email": "ass@example.com",
        "nome": "Another User",
        "senha": "$2a$10$Dw/zp0AIR8G1Fxy0kR9tOu9MOyYTLBkwRyVXDlFEedDjMY4h23Wsu",
        "documento": "46921264009",
        "unidade_id": "cfa19c26-3b18-4659-b02e-51047e5b3d13",
        "resetPasswordToken": "a7f8f87806d8cf757770621a6f9b16b8165660a5",
        "resetPasswordExpires": "2023-12-06T22:49:18.221Z",
        "cargos": [
          "USER"
        ]
      });
  
      render(<EditUserForm />);
  
      await waitFor(() => {
        expect(useParams).toHaveBeenCalled();
        expect(getUserById).toHaveBeenCalledWith("clprc9gem0001y06nguit2ikt");
        expect(screen.getByPlaceholderText("Nome")).toHaveValue("Another User")
      });
    });

    it('should make API call for getting a user and catch a error', async() => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
      decodeToken.mockReturnValue({
        "id": "clprc9gem0001y06nguit2ikt",
        "email": "ass@example.com",
        "nome": "Another User",
        "cargos": [
          "USER"
        ]
      })

      getUserById.mockRejectedValue(new Error('error'));
  
      render(<EditUserForm />);
  
      await waitFor(() => {
        expect(decodeToken).toHaveBeenCalled();
        expect(getUserById).toHaveBeenCalledWith("clprc9gem0001y06nguit2ikt");
        expect(screen.getByPlaceholderText("Nome")).toHaveValue("")
      });
    });

    it('should make API call and get user successfully', async() => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
      decodeToken.mockReturnValue({
        "id": "clprc9gem0001y06nguit2ikt",
        "email": "ass@example.com",
        "nome": "Another User",
        "cargos": [
          "USER"
        ]
      })

      getUnidades.mockResolvedValue({
        type: 'success',
        data: [
          {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
          {id: '2', name: "unidade2", parent_workstation: {id: "1"}},
          {id: '3', name: "unidade3"}
        ]
      });

      getUserById.mockResolvedValue({
        "id": "clprc9gem0001y06nguit2ikt",
        "email": "ass@example.com",
        "nome": "Another User",
        "senha": "$2a$10$Dw/zp0AIR8G1Fxy0kR9tOu9MOyYTLBkwRyVXDlFEedDjMY4h23Wsu",
        "documento": "46921264009",
        "unidade_id": "2",
        "resetPasswordToken": "a7f8f87806d8cf757770621a6f9b16b8165660a5",
        "resetPasswordExpires": "2023-12-06T22:49:18.221Z",
        "cargos": [
          "USER"
        ]
      });
  
      render(<EditUserForm />);
  
      await waitFor(() => {
        expect(decodeToken).toHaveBeenCalled();
        expect(getUnidades).toHaveBeenCalled();
        expect(getUserById).toHaveBeenCalledWith("clprc9gem0001y06nguit2ikt");
        expect(screen.getByPlaceholderText("Nome")).toHaveValue("Another User");
        expect(screen.getByTestId("unidadeFilha")).toBeInTheDocument();
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
  
      render(<EditUserForm />);
  
      const unidadePaiCombobox = screen.getByTestId("unidadePai");
  
      await waitFor(() => {
        fireEvent.change(unidadePaiCombobox, { target: { value: '1' } });
        expect(unidadePaiCombobox.value).toBe("1");
        expect(screen.getByTestId("unidadeFilha")).toBeInTheDocument();
      });
    })

    it('should submit form and call API', async () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
      decodeToken.mockReturnValue({
        "id": "clprc9gem0001y06nguit2ikt",
        "email": "ass@example.com",
        "nome": "Another User",
        "cargos": [
          "USER"
        ]
      })

      getUnidades.mockResolvedValue({
        type: 'success',
        data: [
          {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
          {id: '2', name: "unidade2", parent_workstation: {id: "1"}},
          {id: '3', name: "unidade3"}
        ]
      });

      getUserById.mockResolvedValue({
        "id": "clprc9gem0001y06nguit2ikt",
        "email": "ass@example.com",
        "nome": "Another User",
        "senha": "$2a$10$Dw/zp0AIR8G1Fxy0kR9tOu9MOyYTLBkwRyVXDlFEedDjMY4h23Wsu",
        "documento": "46921264009",
        "unidade_id": "2",
        "resetPasswordToken": "a7f8f87806d8cf757770621a6f9b16b8165660a5",
        "resetPasswordExpires": "2023-12-06T22:49:18.221Z",
        "cargos": [
          "USER"
        ]
      });

      updateUser.mockResolvedValue({type: 'success'});

      render(<EditUserForm />);

      await waitFor(() => {
        expect(decodeToken).toHaveBeenCalled();
        expect(getUnidades).toHaveBeenCalled();
        expect(getUserById).toHaveBeenCalledWith("clprc9gem0001y06nguit2ikt");
        expect(screen.getByPlaceholderText("Nome")).toHaveValue("Another User");
        expect(screen.getByPlaceholderText("CPF ou CNPJ")).toHaveValue("46921264009");
        expect(screen.getByPlaceholderText("Email")).toHaveValue("ass@example.com");
        const confirmEmail = screen.getByPlaceholderText("Confirmar Email");
        fireEvent.change(confirmEmail, { target: { value: 'ass@example.com' } });
        expect(screen.getByTestId("unidadeFilha").value).toBe('2');
      });

      console.log(screen.getByPlaceholderText("Nome").value);

      const submitButton = screen.getByText("SALVAR");
      fireEvent.submit(submitButton);

      await waitFor(() => {
        expect(updateUser).toHaveBeenCalledWith({
          "cargos": ["USER"],
          "documento": "46921264009",
          "email": "ass@example.com",
          "id": "clprc9gem0001y06nguit2ikt",
          "nome": "Another User",
          "unidade_id": "2"
        }, "clprc9gem0001y06nguit2ikt");
      });
    })

    it('should submit form and call API and throw error', async () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
      decodeToken.mockReturnValue({
        "id": "clprc9gem0001y06nguit2ikt",
        "email": "ass@example.com",
        "nome": "Another User",
        "cargos": [
          "USER"
        ]
      })

      getUnidades.mockResolvedValue({
        type: 'success',
        data: [
          {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
          {id: '2', name: "unidade2", parent_workstation: {id: "1"}},
          {id: '3', name: "unidade3"}
        ]
      });

      getUserById.mockResolvedValue({
        "id": "clprc9gem0001y06nguit2ikt",
        "email": "ass@example.com",
        "nome": "Another User",
        "senha": "$2a$10$Dw/zp0AIR8G1Fxy0kR9tOu9MOyYTLBkwRyVXDlFEedDjMY4h23Wsu",
        "documento": "46921264009",
        "unidade_id": "2",
        "resetPasswordToken": "a7f8f87806d8cf757770621a6f9b16b8165660a5",
        "resetPasswordExpires": "2023-12-06T22:49:18.221Z",
        "cargos": [
          "USER"
        ]
      });

      updateUser.mockResolvedValue({type: 'error'});

      render(<EditUserForm />);

      await waitFor(() => {
        expect(decodeToken).toHaveBeenCalled();
        expect(getUnidades).toHaveBeenCalled();
        expect(getUserById).toHaveBeenCalled();
        expect(screen.getByPlaceholderText("Nome")).toHaveValue("Another User");
        expect(screen.getByPlaceholderText("CPF ou CNPJ")).toHaveValue("46921264009");
        expect(screen.getByPlaceholderText("Email")).toHaveValue("ass@example.com");
        const confirmEmail = screen.getByPlaceholderText("Confirmar Email");
        fireEvent.change(confirmEmail, { target: { value: 'ass@example.com' } });
        expect(screen.getByTestId("unidadeFilha").value).toBe('2');
      });

      console.log(screen.getByPlaceholderText("Nome").value);

      const submitButton = screen.getByText("SALVAR");
      fireEvent.submit(submitButton);

      await waitFor(() => {
        expect(updateUser).toHaveBeenCalledWith({
          "cargos": ["USER"],
          "documento": "46921264009",
          "email": "ass@example.com",
          "id": "clprc9gem0001y06nguit2ikt",
          "nome": "Another User",
          "unidade_id": "2"
        }, "clprc9gem0001y06nguit2ikt");
        expect(screen.getByText("Erro ao atualizar usuário")).toBeInTheDocument();
      });
    })
});