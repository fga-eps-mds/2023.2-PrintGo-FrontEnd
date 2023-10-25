import React from 'react';
import { render, screen } from '@testing-library/react';
import QuemSomos from '../pages/QuemSomos'; // Importe seu componente QuemSomos

test('Renderiza a página QuemSomos corretamente', () => {
  render(<QuemSomos />);
  
  // Use os métodos do React Testing Library para interagir e verificar elementos na tela
  const pageTitle = screen.getByText('Quem Somos');
  const paragraph1 = screen.getByText(/O PrintGO tem a finalidade/i);
  const paragraph2 = screen.getByText(/A aplicação web foi feita sob encomenda/i);

  expect(pageTitle).toBeInTheDocument();
  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});
