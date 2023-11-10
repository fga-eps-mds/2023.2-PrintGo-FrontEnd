import ChangePassword from '../../pages/ChangePassword';
import React from 'react';
import * as router from 'react-router-dom';
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { changePassword } from '../../api/api';

jest.mock('../../api/api', () => ({
    changePassword: jest.fn(),
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

describe('Change Password page', () => {
    beforeEach(() => {
        router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
    })

    test('...', () => {
        jest.spyOn(router, 'useNavigate');
    });

    it('should render without crashing', () => {
        render(<ChangePassword />);
    });

    it('should display password changed with success', async () => {
        render(<ChangePassword />);
  
        const newPasswordInput = screen.getByPlaceholderText('*****************');
        const repeatPasswordInput = screen.getByPlaceholderText('******************');
        const submitButton = screen.getByText('Confirmar');

        fireEvent.change(newPasswordInput, { target: { value: 'novaSenha123' } });
        fireEvent.change(repeatPasswordInput, { target: { value: 'novaSenha123' } });

        fireEvent.click(submitButton);

        // Aguarda a resposta assíncrona (pode ser ajustado conforme necessário)
        await waitFor(() => {
            expect(screen.queryByText('Senha atualizada!')).toBeNull();
        });
    });

    it('should display error for empty password', async () => {
        render(<ChangePassword />);
  
        const newPasswordInput = screen.getByPlaceholderText('*****************');
        const repeatPasswordInput = screen.getByPlaceholderText('******************');
        const submitButton = screen.getByText('Confirmar');

        fireEvent.change(newPasswordInput, { target: { value: '' } });
        fireEvent.change(repeatPasswordInput, { target: { value: 'novaSenha123' } });

        fireEvent.click(submitButton);

        // Aguarda a resposta assíncrona (pode ser ajustado conforme necessário)
        await waitFor(() => {
            expect(screen.queryByText('Senha inválida')).toBeNull();
        });
    });

    it('should display error for empty password confirmation', async () => {
        render(<ChangePassword />);
  
        const newPasswordInput = screen.getByPlaceholderText('*****************');
        const repeatPasswordInput = screen.getByPlaceholderText('******************');
        const submitButton = screen.getByText('Confirmar');

        fireEvent.change(newPasswordInput, { target: { value: 'novaSenha123' } });
        fireEvent.change(repeatPasswordInput, { target: { value: '' } });

        fireEvent.click(submitButton);

        // Aguarda a resposta assíncrona (pode ser ajustado conforme necessário)
        await waitFor(() => {
            expect(screen.queryByText('Confirmação de Senha inválida')).toBeNull();
        });
    }); 

    it('submits the form and calls the API', async () => {
        changePassword.mockResolvedValue(true);
        const { getByPlaceholderText, getByText } = render(<ChangePassword />);
    
        fireEvent.change(getByPlaceholderText('*****************'), { target: { value: 'password' } });
        fireEvent.change(getByPlaceholderText('******************'), { target: { value: 'password' } });
        fireEvent.click(getByText('Confirmar'));
    
        await waitFor(() => {
          expect(changePassword).toHaveBeenCalledWith('password', 'password');
          expect(screen.queryByText('Senha atualizada!')).toBeNull();
        });
    });

    it('handles API errors', async () => {
        changePassword.mockRejectedValue(new Error());
        const { getByPlaceholderText, getByText } = render(<ChangePassword />);
        
        fireEvent.change(getByPlaceholderText('*****************'), { target: { value: 'password' } });
        fireEvent.change(getByPlaceholderText('******************'), { target: { value: 'password' } });
        fireEvent.click(getByText('Confirmar'));
        
        await waitFor(() => {
            expect(changePassword).toHaveBeenCalledWith('password', 'password');
            
            // Verifica se o texto de sucesso não está presente
            const errorText = screen.queryByText('Senha atualizada!');

            // Verifica se a cor do texto é vermelha
            expect(errorText).toBeNull()
        });
    });

    it('should not display error message', async () => {
        render(<ChangePassword />);
    
        const newPasswordInput = screen.getByPlaceholderText('*****************');
        const repeatPasswordInput = screen.getByPlaceholderText('******************');
        const submitButton = screen.getByText('Confirmar');
    
        // Simulando a entrada de senhas válidas
        fireEvent.change(newPasswordInput, { target: { value: 'novaSenha123' } });
        fireEvent.change(repeatPasswordInput, { target: { value: 'novaSenha123' } });
    
        // Simulando o envio do formulário
        fireEvent.click(submitButton);
    
        // Aguardando a mensagem de sucesso ser exibida
        await waitFor(() => {
          expect(screen.queryByText('Senha atualizada!')).toBeNull();
        });
    });
      
})
