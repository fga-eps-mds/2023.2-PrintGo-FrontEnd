import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../../pages/Login';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as router from 'react-router-dom';

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
});
