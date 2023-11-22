import React from "react";
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from "../../components/ui/Modal";
import * as router from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

test('Deve renderizar o texto do corpo do modal corretamente', () => {
    render(<Modal bodytext="Tem certeza de que deseja excluir este usuário?" />);
  
    const bodyText = screen.getByText('Tem certeza de que deseja excluir este usuário?');
  
    expect(bodyText).toBeInTheDocument();
});