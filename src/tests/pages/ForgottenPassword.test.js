import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForgottenPasswordPage from "../../pages/ForgottenPassword";
import { BrowserRouter } from 'react-router-dom';

test('renders ForgottenPasswordPage component', () => {
    render(
        <BrowserRouter>
            <ForgottenPasswordPage />
        </BrowserRouter>
    );
    
    const page = screen.getByTestId('forgotpassword-container');
    
    expect(page).toBeInTheDocument();
});