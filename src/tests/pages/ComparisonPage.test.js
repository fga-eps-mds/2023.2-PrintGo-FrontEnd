import { render } from '@testing-library/react';
import ComparisonPage from '../../pages/ComparisonPage';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter

describe('ComparisonPage Component', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <ComparisonPage />
      </BrowserRouter>
    );
  });
});