import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoutes from '../../components/utils/PrivateRoutes';
import checkAuthentication from '../../components/utils/PrivateRoutes';

describe('checkAuthentication', () => {
  beforeEach(() => {
    // Simula o usuário autenticado
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNscHJpaTRyOTAwMDFhaDJjazk5cWNxYW0iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIm5vbWUiOiJBZG1pbiIsImNhcmdvcyI6WyJVU0VSIiwiQURNSU4iXSwiaWF0IjoxNzAxODg5NjY5LCJleHAiOjE3MDE4OTMyNjl9.2yqtoHjjXjguYkOVC9wZYiO_pASsyQO_o0z3d-4JFR0");

    render(
      <MemoryRouter>
        <PrivateRoutes />
      </MemoryRouter>
    );
  });

  it('returns outlet when checking authentication', () => {
    expect(screen.getByTestId('navigate')).toBeInTheDocument();
  });

});