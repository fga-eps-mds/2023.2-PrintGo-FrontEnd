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
    // Mocking getUnidades response
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        { id: '1', name: 'Unidade 1' },
        { id: '2', name: 'Unidade 2' }
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

  // Add more tests for validation, error handling, etc.
});

