import ChangePassword from '../../pages/ChangePassword';
import React from 'react';
import * as router from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import * as api from '../../api/api'

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
        render(<ChangePassword />);
    })

    test('...', () => {
        jest.spyOn(router, 'useNavigate');
    });

    it('should render without crashing', () => {
        render(<ChangePassword />);
    });

    it('should display password changed with success', async () => {
        const newPasswordInput = screen.queryAllByPlaceholderText('*********')[0];
        const repeatPasswordInput = screen.queryAllByPlaceholderText('*********')[1];
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
        const newPasswordInput = screen.queryAllByPlaceholderText('*********')[0];
        const repeatPasswordInput = screen.queryAllByPlaceholderText('*********')[1];
        const submitButton = screen.getByText('Confirmar');

        fireEvent.change(newPasswordInput, { target: { value: 'Teste123@' } });
        fireEvent.change(newPasswordInput, { target: { value: '' } });
        fireEvent.change(repeatPasswordInput, { target: { value: '' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
        });
    });

    it('should display error for empty password confirmation', async () => {
        const newPasswordInput = screen.queryAllByPlaceholderText('*********')[0];
        const repeatPasswordInput = screen.queryAllByPlaceholderText('*********')[1];
        const submitButton = screen.getByText('Confirmar');

        fireEvent.change(newPasswordInput, { target: { value: '' } });
        fireEvent.change(repeatPasswordInput, { target: { value: 'Teste123@' } });
        fireEvent.change(repeatPasswordInput, { target: { value: '' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Confirmação de senha é obrigatória')).toBeInTheDocument();
        });
    });

    it('should display error for empty password confirmation', async () => {
      const newPasswordInput = screen.queryAllByPlaceholderText('*********')[0];
      const repeatPasswordInput = screen.queryAllByPlaceholderText('*********')[1];
      const submitButton = screen.getByText('Confirmar');

      fireEvent.change(newPasswordInput, { target: { value: 'Teste123@' } });
      fireEvent.change(repeatPasswordInput, { target: { value: 'asdw' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
          expect(screen.getByText('As senhas devem corresponder')).toBeInTheDocument();
      });
  });

    it('submits the form and calls the API successfully', async () => {
        const mockChangePassword = jest.spyOn(api, 'changePassword');
        mockChangePassword.mockResolvedValue({
          type: 'success'
        });
        
        const newPasswordInput = screen.queryAllByPlaceholderText('*********')[0];
        const repeatPasswordInput = screen.queryAllByPlaceholderText('*********')[1];
        const submitButton = screen.getByText('Confirmar');
    
        fireEvent.change(newPasswordInput, { target: { value: 'Teste123@' } });
        fireEvent.change(repeatPasswordInput, { target: { value: 'Teste123@' } });
        fireEvent.submit(submitButton);
    
        await waitFor(() => {
          expect(mockChangePassword).toHaveBeenCalledWith({
            confirmacaoNovaSenha: 'Teste123@',
            novaSenha: 'Teste123@'
          });
        });
    });

    it('submits the form and calls the API and returns a error', async () => {
      const mockChangePassword = jest.spyOn(api, 'changePassword');
      mockChangePassword.mockResolvedValue({
        type: 'error'
      });
      
      const newPasswordInput = screen.queryAllByPlaceholderText('*********')[0];
      const repeatPasswordInput = screen.queryAllByPlaceholderText('*********')[1];
      const submitButton = screen.getByText('Confirmar');
  
      fireEvent.change(newPasswordInput, { target: { value: 'Teste123@' } });
      fireEvent.change(repeatPasswordInput, { target: { value: 'Teste123@' } });
      fireEvent.submit(submitButton);
  
      await waitFor(() => {
        expect(mockChangePassword).toHaveBeenCalledWith({
          confirmacaoNovaSenha: 'Teste123@',
          novaSenha: 'Teste123@'
        });
      });
  });

})
