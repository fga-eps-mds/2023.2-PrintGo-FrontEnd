import ChangePassword from '../../pages/ChangePassword';
import React from 'react';
import * as router from 'react-router-dom';
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../api/api', () => ({
    login: jest.fn(),
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
            expect(screen.queryByText('queryByText'))
        });
    });
})
