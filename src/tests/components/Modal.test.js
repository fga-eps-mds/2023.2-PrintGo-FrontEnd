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

test('Deve fechar o modal ao clicar no botão "Cancelar"', () => {
    const setOpenModal = jest.fn();
    render(<Modal setOpenModal={setOpenModal} />);
  
    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);
  
    expect(setOpenModal).toHaveBeenCalledTimes(1);
    expect(setOpenModal).toHaveBeenCalledWith(false);
});

test('Deve fechar o modal ao clicar no botão "X"', () => {
    const setOpenModal = jest.fn();
    render(<Modal setOpenModal={setOpenModal} />);
  
    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);
  
    expect(setOpenModal).toHaveBeenCalledTimes(1);
    expect(setOpenModal).toHaveBeenCalledWith(false);
});