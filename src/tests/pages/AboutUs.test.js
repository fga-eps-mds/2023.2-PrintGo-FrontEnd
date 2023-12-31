import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Importe o MemoryRouter
import AboutUs from '../../pages/AboutUs';

describe('Testando a página AboutUs', () => {

  test('verifica se o logo da Polícia Civil está sendo renderizado', () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );
    const logo = screen.getByAltText(/PoliciaCivilLogo/i);
    expect(logo).toBeInTheDocument();
  });

  test('verifica se o primeiro parágrafo está sendo renderizado', () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );
    const paragraph1 = screen.getByText(/O PrintGO tem a finalidade de corrigir o problema chave que foi definido junto com a visão do produto,/i);
    expect(paragraph1).toBeInTheDocument();
  });

  test('verifica se o segundo parágrafo está sendo renderizado', () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );
    const paragraph2 = screen.getByText(/A aplicação web foi feita sob encomenda para a Polícia Civil do estado do Goiás pela Universidade de Brasília,/i);
    expect(paragraph2).toBeInTheDocument();
  });


});
