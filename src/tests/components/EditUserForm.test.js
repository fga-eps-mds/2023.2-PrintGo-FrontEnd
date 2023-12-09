import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';
import { render as rtlRender, fireEvent, waitFor, screen, useSelector } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditUserForm from '../../components/forms/EditUserForm';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

jest.mock('../../services/userService', () => ({
  getUnidades:jest.fn(),
  createUser:jest.fn()
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

const mockGetUnidades = require('../../services/userService').getUnidades;
const mockCreateUser = require('../../services/userService').createUser;

describe('EditUserForm', () => {
    beforeEach(() => {
        router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
        mockGetUnidades.mockResolvedValue(/* valor esperado de retorno */);
        mockCreateUser.mockResolvedValue(/* valor esperado de retorno */);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render page correctly', () => {
      render(<EditUserForm />);

      expect(screen.getByText("Editar usuário")).toBeInTheDocument();
    })

    // test('validates form inputs correctly', async () => {
    //     render(<EditUserForm />);
    //     userEvent.click(screen.getByText('REGISTRAR'));
    //     await waitFor(() => {
    //         expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
    //         // Outras validações...
    //     });
    // });

    // test('makes an API call on form submission', async () => {
    //     render(<EditUserForm />);
    //     // Preenche o formulário...
    //     userEvent.click(screen.getByText('REGISTRAR'));
    //     await waitFor(() => {
    //         expect(mockCreateUser).toHaveBeenCalledWith(/* argumentos esperados */);
    //     });
    // });

    // test('handles API response correctly', async () => {
    //     render(<EditUserForm />);
    //     // Preenche o formulário...
    //     userEvent.click(screen.getByText('REGISTRAR'));
    //     await waitFor(() => {
    //         // Verifica a resposta da API e o comportamento do componente...
    //     });
    // });

    // test('renders select or input based on key value', () => {
    //   render(<EditUserForm />);
    //   // Teste para linhas 53: verificar se os selects para 'unidadePai' e 'unidadeFilha' são renderizados
    //   expect(screen.getByLabelText('Selecione Unidade Pai')).toBeInTheDocument();
    //   expect(screen.getByLabelText('Selecione Unidade Filho')).toBeInTheDocument();
    // });


    

    // test('shows error messages for invalid inputs', async () => {
    //     render(<EditUserForm />);
    //     // Teste para linha 70: verificar a renderização de mensagens de erro para campos inválidos
    //     userEvent.click(screen.getByText('REGISTRAR'));
    //     await waitFor(() => {
    //         expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
    //         // Verificar outras mensagens de erro...
    //     });
    // });

    // test('renders input boxes', () => {
    //     render(
    //     <BrowserRouter>
    //         <EditUserForm />
    //     </BrowserRouter>
    //     );
    //     // Teste para linha 71: verificar se as caixas de entrada são renderizadas
    //     expect(document.querySelector('#edit-user-input-box')).toBeInTheDocument();
    // });

    // test('renders buttons with correct text', () => {
    //     render(
    //     <BrowserRouter>
    //         <EditUserForm />
    //     </BrowserRouter>
    //     );
    //     // Teste para linhas 74 e 75: verificar a renderização dos botões
    //     expect(screen.getByText('CANCELAR')).toBeInTheDocument();
    //     expect(screen.getByText('SALVAR')).toBeInTheDocument();
    // });

    // test('changes register button text on submitting', async () => {
    //     render(
    //     <BrowserRouter>
    //         <EditUserForm />
    //     </BrowserRouter>
    //    );
    //     // Teste para linhas 76,77,78: verificar mudança de texto no botão durante a submissão
    //     userEvent.click(screen.getByText('REGISTRAR'));
    //     await waitFor(() => {
    //         expect(screen.getByText('CADASTRANDO')).toBeInTheDocument();
    //         // Verificar se o ícone de carregamento está presente...
    //     });
    // });

    

    // test('displays toast messages on form submission', async () => {
    //     render(<EditUserForm />);
    //     // Teste para linhas 88,89 e 90: verificar exibição de mensagens toast após submissão
    //     userEvent.type(screen.getByLabelText('Nome'), 'João da Silva');
    //     userEvent.click(screen.getByText('REGISTRAR'));
    //     await waitFor(() => {
    //         expect(screen.getByText('Usuario cadastrado com sucesso!')).toBeInTheDocument();
    //         // Verificar também o toast de erro...
    //     });
    // });

    // test('resets form on successful submission', async () => {
    //     render(<EditUserForm />);
    //     // Teste para linha 96: verificar se o formulário é resetado após submissão bem-sucedida
    //     userEvent.type(screen.getByLabelText('Nome'), 'João da Silva');
    //     userEvent.click(screen.getByText('REGISTRAR'));
    //     await waitFor(() => {
    //         // Verificar se o formulário foi resetado...
    //     });
    // });

    // test('handles errors in data fetching', async () => {
    //     mockGetUnidades.mockRejectedValue(new Error('Erro ao obter opções do serviço'));
    //     render(<EditUserForm />);
    //     // Teste para linhas 98 e 99: verificar o tratamento de erros na busca de dados
    //     await waitFor(() => {
            
    //     });
    // });
 
    

    // test('show loading icon when form is submitting', async () => {
    //     mockCreateUser.mockResolvedValue();
    //     render(
    //     <BrowserRouter>
    //     <EditUserForm/>
    //     </BrowserRouter>
    //     );
    //     userEvent.type(screen.getByRole('textbox', { name: 'Nome *' }), 'Antonio Rangel');
    //     userEvent.type(screen.getByRole('textbox', { name: 'Documento *' }), '555.555.555.-55');
    //     userEvent.type(screen.getByRole('textbox', { name: 'E-mail *' }), 'antonio@gmail.com');
    //     userEvent.type(screen.getByRole('textbox', { name: 'Confirmar E-mail *' }), 'antonio@gmail.com');
    //     userEvent.type(screen.getByRole('select', { name: 'Unidade Pai *' }), 'unidade pai');
    //     userEvent.type(screen.getByRole('select', { name: 'Unidade Filha *' }), 'unidade filha');

    //     fireEvent.click(screen.getByText('SALVAR'));
    //     expect(screen.getByText('SALVAR').disabled).toBeFalsy();
    //     await waitFor(() =>{
    //     expect(screen.getByTestId('animate-spin')).toBeInTheDocument();
    //     expect(screen.getByAltText('CADASTRANDO')).toBeInTheDocument();
    //     });

    //     await waitFor(() =>{
    //     expect(screen.getByTestId('animate-spin')).not.toBeInTheDocument();
    //     expect(screen.getByText('SALVAR')).toBeInTheDocument();
    // });

    // });

    // test('renders correctly', () => {
    //     render(
    //         <BrowserRouter>
    //             <EditUserForm />
    //         </BrowserRouter>
    //     );
    //     expect(screen.getByTestId('edit-user-card')).toBeInTheDocument();
    // });

    // test('initial state and values are set correctly', () => {
    //     render(
    //         <BrowserRouter>
    //             <EditUserForm />
    //         </BrowserRouter>
    //     );
    //     expect(screen.getByRole('textbox', { name: 'Nome *' }).value).toBe('')
    // });



    // test('updates state on unidadePai selection', async () => {
    //     render(
    //     <BrowserRouter>
    //         <EditUserForm />
    //     </BrowserRouter>
    //     );
    //     const unidadePai = screen.getByRole('combobox')
    //     // Teste para linhas 60 a 62: selecionar uma unidade pai e verificar a mudança de estado
    //     fireEvent.change(unidadePai, { target: { value: 'some-unit-id' } });
    //     await waitFor(() => {
    //         const unidadeFilha = screen.getByTestId('unidadeFilha')
    //         expect(unidadeFilha).toBeInTheDocument()
    //     });
        
    // });

});



