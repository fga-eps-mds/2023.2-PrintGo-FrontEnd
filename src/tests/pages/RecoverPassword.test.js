import React from "react";
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecoverPasswordPage from "../../pages/RecoverPassword";
import * as api from "../../api/api";
import * as router from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';



test('renders ForgottenPasswordPage component', () => {
    render(
        <BrowserRouter>
            <RecoverPasswordPage />
        </BrowserRouter>
    );
  
    
    const page = screen.getByTestId('change-password-container');
  
    
    expect(page).toBeInTheDocument();
});