import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditUserForm from '../../components/forms/EditUserForm';
import { getUnidades, createUser } from "../../services/unidadeService";

// Mocking the external services
jest.mock("../../services/unidadeService", () => ({
  getUnidades: jest.fn(),
  createUser: jest.fn()
}));

describe('EditUserForm Tests', () => {
  beforeEach(() => {
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        { id: '1', name: 'Unidade 1', child_workstations: [{ id: '3', name: 'Unidade 3' }] },
        { id: '2', name: 'Unidade 2', child_workstations: [] }
      ]
    });
  });

  test('renders EditUserForm component', () => {
    render(<EditUserForm />);
    expect(screen.getByText('Editar usuário')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    createUser.mockResolvedValue({ type: 'success' });
    render(<EditUserForm />);

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'test@example.com' } });
   

    fireEvent.click(screen.getByText('REGISTRAR'));

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith(expect.objectContaining({
        nome: 'Test User',
        email: 'test@example.com'
        
      }));
    });
  });

  test('displays validation errors for empty required fields', async () => {
    render(<EditUserForm />);
    fireEvent.click(screen.getByText('REGISTRAR'));

    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
     
    });
  });

  test('tests dropdown interactions', async () => {
    render(<EditUserForm />);

   
    fireEvent.change(screen.getByLabelText('Selecione Unidade Pai'), {
      target: { value: '1' },
    });

    
    await waitFor(() => {
      expect(screen.getByLabelText('Selecione Unidade Filho')).toHaveOption('3', 'Unidade 3');
    });
  });

  test('handles API error on unit fetch', async () => {
    getUnidades.mockRejectedValue(new Error('API error'));
    render(<EditUserForm />);

    await waitFor(() => {
      expect(screen.getByText('Erro ao obter opções do serviço:')).toBeInTheDocument();
    });
  });

  test('handles form submission with API error', async () => {
    createUser.mockRejectedValue(new Error('API submission error'));
    render(<EditUserForm />);


    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('REGISTRAR'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao cadastrar usuario')).toBeInTheDocument();
    });
  });

  test('updates fields with testObject values', async () => {
    render(<EditUserForm />);
    await waitFor(() => {
        expect(screen.getByLabelText('Nome').value).toBe('João da Silva');
        expect(screen.getByLabelText('E-mail').value).toBe('joao@gmail.com');
        expect(screen.getByLabelText('Confirmar E-mail').value).toBe('joao@gmail.com');
        expect(screen.getByLabelText('Documento').value).toBe('222.222.222-10');
    });
  });

  test('validates email format correctly', async () => {
    render(<EditUserForm />);
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'invalidemail' } });
    fireEvent.click(screen.getByText('REGISTRAR'));

    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument();
    });
  });

  test('checks password match validation', async () => {
    render(<EditUserForm />);
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('Confirmar Senha'), { target: { value: 'Different123!' } });
    fireEvent.click(screen.getByText('REGISTRAR'));

    await waitFor(() => {
      expect(screen.getByText('As senhas devem coincidir')).toBeInTheDocument();
    });
  });

  test('checks document field validation', async () => {
    render(<EditUserForm />);
    fireEvent.change(screen.getByLabelText('Documento'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('REGISTRAR'));

    await waitFor(() => {
      expect(screen.getByText('CPF ou CNPJ inválido')).toBeInTheDocument();
    });
  });

  test('handles successful user creation', async () => {
    createUser.mockResolvedValue({ type: 'success' });
    render(<EditUserForm />);


    fireEvent.click(screen.getByText('REGISTRAR'));

    await waitFor(() => {
      expect(screen.getByText('Usuario cadastrado com sucesso!')).toBeInTheDocument();
    });
  });

  test('handles cancel button click', () => {
    render(<EditUserForm />);
    fireEvent.click(screen.getByText('CANCELAR'));

  });

  test('renders additional info if condition is true', () => {
    render(<EditUserForm {...props} />);
  
    expect(screen.getByText('Additional Info')).toBeInTheDocument();
  });

  test('calls custom function on button click', () => {
    const customFunctionMock = jest.fn();
    render(<EditUserForm onCustomFunction={customFunctionMock} />);
    
    fireEvent.click(screen.getByText('Custom Button'));
    expect(customFunctionMock).toHaveBeenCalled();
  });

  test('calls custom function on button click', () => {
    const customFunctionMock = jest.fn();
    render(<EditUserForm onCustomFunction={customFunctionMock} />);

    
    fireEvent.click(screen.getByText('Custom Button'));
    expect(customFunctionMock).toHaveBeenCalled();
  });
  
  test('loads data on component mount', async () => {
    // Mock API call
    render(<EditUserForm />);
    
    await waitFor(() => {
      expect(screen.getByText('Loaded Data')).toBeInTheDocument();
    });
  });
  
  test('displays error message on API failure', async () => {
    // Mock API failure
    render(<EditUserForm />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    });
  });

  test('updates component when props change', () => {
    const { rerender } = render(<EditUserForm prop={false} />);
    
    // Change props
    rerender(<EditUserForm prop={true} />);
    
    // Assert the new state or behavior
    expect(screen.getByText('New Behavior')).toBeInTheDocument();
  });
  
  test('handles empty data correctly', () => {
    render(<EditUserForm data={[]} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('cleans up on unmount', () => {
    const { unmount } = render(<EditUserForm />);
    unmount();
  });
  
  

});
