import React from 'react';
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ForgottenPasswordForms from '../../components/forms/ForgottenPasswordForms';
import { forgottenPassword } from '../../services/userService';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../services/userService', () => ({
  forgottenPassword: jest.fn(),
}))

function render(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return <Router>{children}</Router>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('ForgottenPasswordForms', () => {
  beforeEach(() => {
    router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<ForgottenPasswordForms />);

    expect(screen.getByText("Esqueci minha senha")).toBeInTheDocument();
  });

  it('should submit form and call API successfully', async () => {
    forgottenPassword.mockResolvedValue({
      type: 'success',
    });

    render(<ForgottenPasswordForms />);

    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } })

    const submitButton = screen.getByText("Confirmar");

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(forgottenPassword).toHaveBeenCalledWith({
        email: "teste@teste.com"
      })
    })
  })

  it('should submit form and call API and return error', async () => {
    forgottenPassword.mockResolvedValue({
      type: 'error',
    });

    render(<ForgottenPasswordForms />);

    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } })

    const submitButton = screen.getByText("Confirmar");

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(forgottenPassword).toHaveBeenCalledWith({
        email: "teste@teste.com"
      })
    })
  })

});