import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SignupForm from '../../components/forms/SignupForm';
import * as api from '../../api/api';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../api/api', () => ({
  getLotacoes: jest.fn(),
  createUser: jest.fn(),
}));

describe('SignupForm', () => {
  beforeEach(() => {
    api.getLotacoes.mockResolvedValue({
      type: 'success',
      data: ['lotacao1', 'lotacao2']
    });
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
