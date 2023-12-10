import React from 'react';
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PatternList from '../../pages/PatternList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

function render(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return <Router>{children}</Router>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('PatternList', () => {
  beforeEach(() => {
    router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
    jest.clearAllMocks();
  });

  it('renders title', () => {
    render(<PatternList />);
    
    expect(screen.getByText('Padrões de Impressoras Cadastradas')).toBeInTheDocument();
  });

})