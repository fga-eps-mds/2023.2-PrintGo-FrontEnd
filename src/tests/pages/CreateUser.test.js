import { render } from '@testing-library/react';
import CreateUser from '../../pages/CreateUser';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter

describe('CreateUser Component', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <CreateUser />
      </BrowserRouter>
    );
  });
});