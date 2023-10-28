import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from '../pages/AboutUs';

test('Renderiza a página QuemSomos corretamente', () => {
  render(<AboutUs />);
  
  const pageTitle = screen.getByText('Quem Somos');
  const paragraph1 = screen.getByText(/O PrintGO tem a finalidade/i);
  const paragraph2 = screen.getByText(/A aplicação web foi feita sob encomenda/i);

  expect(pageTitle).not.toBeNull();
  expect(paragraph1).not.toBeNull();
  expect(paragraph2).not.toBeNull();
});
