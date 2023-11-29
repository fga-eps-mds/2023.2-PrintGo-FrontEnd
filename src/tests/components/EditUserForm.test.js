import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditUserForm from '../../components/forms/EditUserForm';
import { getUnidades, createUser } from "../../services/userService";

jest.mock('../../services/userService');

const mockGetUnidades = getUnidades;
const mockCreateUser = createUser;

describe('EditUserForm', () => {
    beforeEach(() => {
        // Mock inicial das chamadas de API
        mockGetUnidades.mockResolvedValue(/* valor esperado de retorno */);
        mockCreateUser.mockResolvedValue(/* valor esperado de retorno */);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('renders correctly', () => {
        render(<EditUserForm />);
        expect(screen.getByText('Editar usuário')).toBeInTheDocument();
        // Verificar outros elementos...
    });

    it('initial state and values are set correctly', () => {
        render(<EditUserForm />);
        // Verificações do estado inicial...
    });

    it('allows user interaction and form inputs', async () => {
        render(<EditUserForm />);
        userEvent.type(screen.getByLabelText('Nome'), 'João da Silva');
        userEvent.type(screen.getByLabelText('Documento'), '222.222.222-10');
        // Outras interações...
    });

    it('validates form inputs correctly', async () => {
        render(<EditUserForm />);
        userEvent.click(screen.getByText('REGISTRAR'));
        await waitFor(() => {
            expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
            // Outras validações...
        });
    });

    it('makes an API call on form submission', async () => {
        render(<EditUserForm />);
        // Preenche o formulário...
        userEvent.click(screen.getByText('REGISTRAR'));
        await waitFor(() => {
            expect(mockCreateUser).toHaveBeenCalledWith(/* argumentos esperados */);
        });
    });

    it('handles API response correctly', async () => {
        render(<EditUserForm />);
        // Preenche o formulário...
        userEvent.click(screen.getByText('REGISTRAR'));
        await waitFor(() => {
            // Verifica a resposta da API e o comportamento do componente...
        });
    });

    
});

