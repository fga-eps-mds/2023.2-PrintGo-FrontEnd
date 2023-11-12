import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Importe o MemoryRouter
import InsertCounter from '../../pages/InsertCounter';

describe('Testando a página InsertCounter', () => {

  test('Verifica se a navbar está sendo renderizada', () => {
    render(
      <MemoryRouter>
        <InsertCounter />
      </MemoryRouter>
    );
    const homeButton = screen.getByRole('button', { name: 'Home' });
    expect(homeButton).toBeInTheDocument();
  });

  test('Verifica se o formulário está sendo renderizado', () => {
    render(
      <MemoryRouter>
        <InsertCounter />
      </MemoryRouter>
    );
    const formHeader = screen.getByRole('heading', { name: 'Inserir contador manual' });
    expect(formHeader).toBeInTheDocument();
  });

  test('Verifica se a imagem da elipse está sendo renderizada', () => {
    render(
      <MemoryRouter>
        <InsertCounter />
      </MemoryRouter>
    );
    const ellipse = screen.getByAltText(/ellipse_image/i);
    expect(ellipse).toBeInTheDocument();
  });

});