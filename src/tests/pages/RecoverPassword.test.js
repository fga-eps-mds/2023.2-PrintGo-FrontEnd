import React from "react";
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecoverPasswordPage from "../../pages/RecoverPassword";
import * as api from "../../api/api";
import * as router from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';



test('renders ForgottenPasswordPage component', () => {
    render(
        <BrowserRouter>
            <RecoverPasswordPage />
        </BrowserRouter>
    );
  
    
    const page = screen.getByTestId('change-password-container');
  
    
    expect(page).toBeInTheDocument();
});

test('enables submit button when valid', async() => {
    render(
        <BrowserRouter>
            <RecoverPasswordPage />
        </BrowserRouter>
    );
    const passwordInput = screen.getByTestId('input-nova-senha');
    const confirmPasswordInput = screen.getByTestId('input-repita-senha');
    
    
    await act(async () => {
        fireEvent.change(passwordInput, { target: { value: 'ValidPassword1@' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPassword1@' } });
    });
    
    await waitFor(() => {
        expect(screen.getByText('Confirmar').disabled).toBeFalsy();
    });
});

test('disables submit button when invalid', () => {
    render(
        <BrowserRouter>
            <RecoverPasswordPage />
        </BrowserRouter>
    );
    const passwordInput = screen.getByTestId('input-nova-senha');
    const confirmPasswordInput = screen.getByTestId('input-repita-senha');
    
    fireEvent.change(passwordInput, { target: { value: 'invalid' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'invalid' } });
  
    expect(screen.getByText('Confirmar').disabled).toBeTruthy();
});

test('shows inputs', () => {
    render(
        <BrowserRouter>
            <RecoverPasswordPage />
        </BrowserRouter>
    )
    
    
  
    expect(screen.getByText('Nova Senha')).toBeInTheDocument();
    expect(screen.getByText('Repita a senha')).toBeTruthy();
  
    // Testar erro de senhas não iguais
});



test('testa a alteração de senha', async () => {
    render(
        <BrowserRouter>
            <RecoverPasswordPage />
        </BrowserRouter>
    );
    const passwordInput = screen.getByTestId('input-nova-senha');
    const confirmPasswordInput = screen.getByTestId('input-repita-senha');
    
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword1@' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPassword1@' } });
  
   
    
    fireEvent.submit(screen.getByText('Confirmar'));
    await act( async() => {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        expect(window.location.pathname).toBe('/');
    });

    
});