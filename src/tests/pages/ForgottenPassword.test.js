import React from "react";
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForgottenPasswordForm from "../../components/forms/ForgottenPasswordForms";
import ForgottenPasswordPage from "../../pages/ForgottenPassword";
import * as api from "../../api/api";
import * as router from "react-router-dom";
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