import { render } from '@testing-library/react';
import HomeCompleted from '../../pages/HomeCompleted';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter

describe('HomeCompleted Component', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <HomeCompleted />
      </BrowserRouter>
    );
  });
});