import { render } from '@testing-library/react';
import Home from '../../pages/Home';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter

describe('Home Component', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });
});