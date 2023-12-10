import React from 'react';
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import ViewPattern from '../../pages/ViewPattern';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

function render(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return <Router>{children}</Router>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('ViewPrinter', () => {

  beforeEach(() => {
    router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
    jest.clearAllMocks();
  });

  it('should render page', async () => {
    useParams.mockReturnValue({ padrao: "" });

    render(<ViewPattern />);
    
    expect(screen.getByText('Carregando dados...')).toBeInTheDocument();
  })

  it('should render page with pattern data', async () => {
    useParams.mockReturnValue({padrao: "eyJpZCI6ImNscHp4anI4dDAwMDBrem1oMGcwYW5uMHQiLCJ0aXBvIjoiYSIsIm1hcmNhIjoiYiIsIm1vZGVsb0ltcHJlc3NvcmEiOiJkIiwibW9kZWxvIjoiYyIsIm51bWVyb1NlcmllIjoiZSIsInZlcnNhb0Zpcm13YXJlIjoiZiIsInRvdGFsRGlnaXRhbGl6YWNvZXMiOiJoIiwidG90YWxDb3BpYXNQQiI6ImkiLCJ0b3RhbENvcGlhc0NvbG9yaWRhcyI6ImoiLCJ0b3RhbEltcHJlc3NvZXNQYiI6InRlc3RlIiwidG90YWxJbXByZXNzb2VzQ29sb3JpZGFzIjoibCIsInRvdGFsR2VyYWwiOiJtIiwiZW5kZXJlY29JcCI6Im4iLCJzdGF0dXMiOiJBVElWTyIsInRlbXBvQXRpdm9TaXN0ZW1hIjoiZyIsIm51bSI6bnVsbH0="})
  
    render(<ViewPattern />);

    await waitFor(() => {
      expect(screen.getByText('a')).toBeInTheDocument();
      expect(screen.getByText('b')).toBeInTheDocument();
      expect(screen.getByText('c')).toBeInTheDocument();
    })
  });

})