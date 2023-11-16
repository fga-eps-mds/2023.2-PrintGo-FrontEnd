import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import Login from '../../pages/Login';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as router from 'react-router-dom';
import * as api from '../../api/api'

jest.mock('../../api/api', () => ({
  login: jest.fn(),
}));

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

describe('Login Component', () => {
  beforeEach(() => {
    router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
  });

  test('...', () => {
    jest.spyOn(router, 'useNavigate');
  });

  it('should render without crashing', () => {
    render(<Login />);
  });

  it('should display error when email is invalid', async () => {
    render(<Login />);
    
    // Fill in the email field
    fireEvent.input(screen.getByPlaceholderText('email@email.com'), { target: { value: 'invalido' } });
    
    // Simulate form submission
    fireEvent.submit(screen.getByText('LOGIN'));

    await waitFor(() => {
      expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
    });
  });

  it('should not display error when value is valid', async () => {
    render(<Login />);
    
    // Fill in valid values for the email and password fields
    fireEvent.input(screen.getByPlaceholderText('email@email.com'), { target: { value: 'teste@teste.com' } });
    fireEvent.input(screen.getByPlaceholderText('************'), { target: { value: 'senha123' } });
    
    // Simulate form submission
    fireEvent.submit(screen.getByText('LOGIN'));

    await waitFor(() => {
      expect(screen.queryByText('E-mail inválido')).toBeNull();
      expect(screen.queryByText('E-mail ou senha incorreto.')).toBeNull();
    });
  });

  it('should display login error for invalid credentials', async () => {
    const mockLoginApi = jest.spyOn(api, 'login');
    mockLoginApi.mockRejectedValue(new Error('Invalid credentials'));

    render(<Login />);
    
    // Preencher campos de e-mail e senha com valores válidos
    fireEvent.input(screen.getByPlaceholderText('email@email.com'), { target: { value: 'teste@teste.com' } });
    fireEvent.input(screen.getByPlaceholderText('************'), { target: { value: 'senha123' } });
    
    // Simular o envio do formulário
    fireEvent.submit(screen.getByText('LOGIN'));

    await waitFor(() => {
      expect(screen.getByText('E-mail ou senha incorreto.')).toBeInTheDocument();
    });
  });

  it('should make API call with valid credentials', async () => {
    const mockLoginApi = jest.spyOn(api, 'login');
    mockLoginApi.mockResolvedValue('fakeToken');

    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);

    // Simular o envio do formulário com credenciais válidas
    render(<Login />);
    fireEvent.input(screen.getByPlaceholderText('email@email.com'), { target: { value: 'teste@teste.com' } });
    fireEvent.input(screen.getByPlaceholderText('************'), { target: { value: 'senha123' } });
    fireEvent.submit(screen.getByText('LOGIN'));

    await waitFor(() => {
      // Verificar se a função da API foi chamada com as credenciais corretas
      expect(mockLoginApi).toHaveBeenCalledWith('teste@teste.com', 'senha123');
      
      // Verificar se a navegação ocorreu após o login bem-sucedido
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });
});
