import { render } from '@testing-library/react';
import PatternList from '../../pages/PatternList';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter

describe('PatternList Component', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <PatternList />
      </BrowserRouter>
    );
  });
});