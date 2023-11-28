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
    // Add similar events for other inputs

    fireEvent.click(screen.getByText('REGISTRAR'));

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith(expect.objectContaining({
        nome: 'Test User',
        email: 'test@example.com'
        // Add your other form fields here
      }));
    });
  });

  test('displays validation errors for empty required fields', async () => {
    render(<EditUserForm />);
    fireEvent.click(screen.getByText('REGISTRAR'));

    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
      // Add more assertions for other fields
    });
  });

  test('tests dropdown interactions', async () => {
    render(<EditUserForm />);

    // Select a unit
    fireEvent.change(screen.getByLabelText('Selecione Unidade Pai'), {
      target: { value: '1' },
    });

    // Check if child workstations are displayed
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

    // Fill in the form and submit
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('REGISTRAR'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao cadastrar usuario')).toBeInTheDocument();
    });
  });

  // Add more tests for other scenarios and edge cases
});
