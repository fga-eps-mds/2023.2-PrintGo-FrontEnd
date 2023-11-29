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

    test('renders correctly', () => {
        render(<EditUserForm />);
        expect(screen.getByText('Editar usuário')).toBeInTheDocument();
        // Verificar outros elementos...
    });

    test('initial state and values are set correctly', () => {
        render(<EditUserForm />);
        // Verificações do estado inicial...
    });

    test('allows user interaction and form inputs', async () => {
        render(<EditUserForm />);
        userEvent.type(screen.getByLabelText('Nome'), 'João da Silva');
        userEvent.type(screen.getByLabelText('Documento'), '222.222.222-10');
        // Outras interações...
    });

    test('validates form inputs correctly', async () => {
        render(<EditUserForm />);
        userEvent.click(screen.getByText('REGISTRAR'));
        await waitFor(() => {
            expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
            // Outras validações...
        });
    });

    test('makes an API call on form submission', async () => {
        render(<EditUserForm />);
        // Preenche o formulário...
        userEvent.click(screen.getByText('REGISTRAR'));
        await waitFor(() => {
            expect(mockCreateUser).toHaveBeenCalledWith(/* argumentos esperados */);
        });
    });

    test('handles API response correctly', async () => {
        render(<EditUserForm />);
        // Preenche o formulário...
        userEvent.click(screen.getByText('REGISTRAR'));
        await waitFor(() => {
            // Verifica a resposta da API e o comportamento do componente...
        });
    });

    test('renders select or input based on key value', () => {
      render(<EditUserForm />);
      // Teste para linhas 53: verificar se os selects para 'unidadePai' e 'unidadeFilha' são renderizados
      expect(screen.getByLabelText('Selecione Unidade Pai')).toBeInTheDocument();
      expect(screen.getByLabelText('Selecione Unidade Filho')).toBeInTheDocument();
  });

  test('updates state on unidadePai selection', async () => {
      render(<EditUserForm />);
      // Teste para linhas 60 a 62: selecionar uma unidade pai e verificar a mudança de estado
      fireEvent.change(screen.getByLabelText('Selecione Unidade Pai'), { target: { value: 'some-unit-id' } });
      // Verificar a atualização correspondente no estado do componente...
  });

  test('shows error messages for invalid inputs', async () => {
      render(<EditUserForm />);
      // Teste para linha 70: verificar a renderização de mensagens de erro para campos inválidos
      userEvent.click(screen.getByText('REGISTRAR'));
      await waitFor(() => {
          expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
          // Verificar outras mensagens de erro...
      });
  });

  test('renders input boxes', () => {
      render(<EditUserForm />);
      // Teste para linha 71: verificar se as caixas de entrada são renderizadas
      expect(screen.getByTestId('input-box')).toBeInTheDocument();
  });

  test('renders buttons with correct text', () => {
      render(<EditUserForm />);
      // Teste para linhas 74 e 75: verificar a renderização dos botões
      expect(screen.getByText('CANCELAR')).toBeInTheDocument();
      expect(screen.getByText('REGISTRAR')).toBeInTheDocument();
  });

  test('changes register button text on submitting', async () => {
      render(<EditUserForm />);
      // Teste para linhas 76,77,78: verificar mudança de texto no botão durante a submissão
      userEvent.click(screen.getByText('REGISTRAR'));
      await waitFor(() => {
          expect(screen.getByText('CADASTRANDO')).toBeInTheDocument();
          // Verificar se o ícone de carregamento está presente...
      });
  });

  test('renders elipse image', () => {
      render(<EditUserForm />);
      // Teste para linha 82: verificar se a imagem da elipse é renderizada
      expect(screen.getByAltText('elipse')).toBeInTheDocument();
  });

  test('displays toast messages on form submission', async () => {
      render(<EditUserForm />);
      // Teste para linhas 88,89 e 90: verificar exibição de mensagens toast após submissão
      userEvent.type(screen.getByLabelText('Nome'), 'João da Silva');
      userEvent.click(screen.getByText('REGISTRAR'));
      await waitFor(() => {
          expect(screen.getByText('Usuario cadastrado com sucesso!')).toBeInTheDocument();
          // Verificar também o toast de erro...
      });
  });

  test('resets form on successful submission', async () => {
      render(<EditUserForm />);
      // Teste para linha 96: verificar se o formulário é resetado após submissão bem-sucedida
      userEvent.type(screen.getByLabelText('Nome'), 'João da Silva');
      userEvent.click(screen.getByText('REGISTRAR'));
      await waitFor(() => {
          // Verificar se o formulário foi resetado...
      });
  });

  test('handles errors in data fetching', async () => {
      mockGetUnidades.mockRejectedValue(new Error('Erro ao obter opções do serviço'));
      render(<EditUserForm />);
      // Teste para linhas 98 e 99: verificar o tratamento de erros na busca de dados
      await waitFor(() => {
         
      });
  });


});

