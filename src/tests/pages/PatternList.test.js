import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PatternList from '../../pages/PatternList';

describe('PatternList', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <PatternList />
      </MemoryRouter>
    );
  });

  it('renders title', () => {
    expect(screen.getByText('Padrões de Impressoras Cadastradas')).toBeInTheDocument();
  });

})