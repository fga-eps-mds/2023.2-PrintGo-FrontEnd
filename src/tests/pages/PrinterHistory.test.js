import { render } from '@testing-library/react';
import PrinterHistory from '../../pages/PrinterHistory';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter

describe('PrinterHistory Component', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <PrinterHistory />
      </BrowserRouter>
    );
  });
});