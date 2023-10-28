import axios from 'axios';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from '../components/forms/SignupForm';

jest.mock('axios');

describe('SignupForm', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: ['lotacao1', 'lotacao2']
    });
  });

  it('should render without crashing', () => {
    render(<SignupForm />);
  });

  it('should handle form submission', async () => {
    const { getByPlaceholderText, getByText } = render(<SignupForm />);
    
    const nomeInput = getByPlaceholderText('Nome');
    const documentoInput = getByPlaceholderText('CPF ou CNPF');
    const emailInput = getByPlaceholderText('Email');
    const emailConfirmarInput = getByPlaceholderText('Confirmar Email');
    
    fireEvent.change(nomeInput, { target: { value: 'Teste' } });
    fireEvent.change(documentoInput, { target: { value: '12345678901' } });
    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(emailConfirmarInput, { target: { value: 'teste@teste.com' } });

    const submitButton = getByText('Cadastrar');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/createUser', {
        nome: 'Teste',
        documento: '12345678901',
        email: 'teste@teste.com',
        emailConfirmar: 'teste@teste.com',
        cargos: ['USER']
      });
    });
  });
});
