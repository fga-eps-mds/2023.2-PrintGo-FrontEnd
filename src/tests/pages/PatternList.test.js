import React from 'react';
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PatternList from '../../pages/PatternList';
import { getPadroes, togglePattern } from '../../services/printerService'

jest.mock('../../services/printerService', () => ({
  getPadroes: jest.fn(),
  togglePattern: jest.fn(),
}));

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

  it('displays correct filter being shown text', async () => {
    render(<PatternList />);

    await waitFor(() => {
      expect(screen.getByText('Padrões de Impressoras Cadastradas')).toBeInTheDocument();
    });

    const filterBeingShownText = screen.getByTestId('filter_beign_shown');
    expect(filterBeingShownText).toHaveTextContent('Todas');

    fireEvent.click(screen.getByText('Ativas'));

    await waitFor(() => {
      expect(filterBeingShownText).toHaveTextContent('Ativas');
    });

    fireEvent.click(screen.getByText('Desativas'));

    await waitFor(() => {
      expect(filterBeingShownText).toHaveTextContent('Desativadas');
    });

    fireEvent.click(screen.getByText('Todas'));

    await waitFor(() => {
      expect(filterBeingShownText).toHaveTextContent('Todas');
    });
  });

  it('renders patterns correctly', async () => {
    getPadroes.mockResolvedValue({
      type: 'success',
      data: [
        {
          id: 1,
          marca: 'HP',
          modelo: '123',
          tipo: 'Laser',
          status: 'ATIVO',
        },
        {
          id: 2,
          marca: 'Epson',
          modelo: '456',
          tipo: 'Inkjet',
          status: 'DESATIVADO',
        },
      ],
    });

    render(<PatternList />);

    await waitFor(() => {
      expect(screen.getByText('Padrões de Impressoras Cadastradas')).toBeInTheDocument();
      expect(screen.getByText(/HP.*123.*Laser/i)).toBeInTheDocument();
      expect(screen.getByText(/Epson.*456.*Inkjet/i)).toBeInTheDocument();
    });
  });

  it('should open modal', async () => {
    getPadroes.mockResolvedValue({
      type: 'success',
      data: [
        {
          id: 1,
          marca: 'HP',
          modelo: '123',
          tipo: 'Laser',
          status: 'ATIVO',
        },
        {
          id: 2,
          marca: 'Epson',
          modelo: '456',
          tipo: 'Inkjet',
          status: 'DESATIVADO',
        },
      ],
    });

    render(<PatternList />);

    await waitFor(() => {
      expect(screen.getByText('Padrões de Impressoras Cadastradas')).toBeInTheDocument();
      expect(screen.getByText(/HP.*123.*Laser/i)).toBeInTheDocument();
      expect(screen.getByText(/Epson.*456.*Inkjet/i)).toBeInTheDocument();
    });

    const activePatternButton = screen.getByText("Desativar");
    fireEvent.click(activePatternButton);

    await waitFor(() => {
      expect(screen.getByText('Você tem certeza que deseja desativar o padrão?')).toBeInTheDocument();
    });

    const modalCancelButton = screen.getByText("Cancelar");
    fireEvent.click(modalCancelButton);

    const deactivatePatternButton = screen.getByText("Ativar");
    fireEvent.click(deactivatePatternButton);

    await waitFor(() => {
      expect(screen.getByText('Você tem certeza que deseja reativar o padrão?')).toBeInTheDocument();
    });

  });

  it('handles pattern deactivation', async () => {
    getPadroes.mockResolvedValue({
      type: 'success',
      data: [
        {
          id: 1,
          marca: 'HP',
          modelo: '123',
          tipo: 'Laser',
          status: 'ATIVO',
        },
        {
          id: 2,
          marca: 'Epson',
          modelo: '456',
          tipo: 'Inkjet',
          status: 'DESATIVADO',
        },
      ],
    });

    togglePattern.mockResolvedValue({ type: 'success' });

    render(<PatternList />);

    await waitFor(() => {
      expect(screen.getByText('Padrões de Impressoras Cadastradas')).toBeInTheDocument();
      expect(screen.getByText(/HP.*123.*Laser/i)).toBeInTheDocument();
      expect(screen.getByText(/Epson.*456.*Inkjet/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Desativar"));

    await waitFor(() => {
      expect(screen.getByText('Você tem certeza que deseja desativar o padrão?')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Confirmar"));

    await waitFor(() => {
      expect(togglePattern).toHaveBeenCalled();
      expect(screen.queryByText('Você tem certeza que deseja desativar o padrão?')).toBeNull();
    });
  });

  it('handles pattern activation', async () => {
    getPadroes.mockResolvedValue({
      type: 'success',
      data: [
        {
          id: 1,
          marca: 'HP',
          modelo: '123',
          tipo: 'Laser',
          status: 'ATIVO',
        },
        {
          id: 2,
          marca: 'Epson',
          modelo: '456',
          tipo: 'Inkjet',
          status: 'DESATIVADO',
        },
      ],
    });

    togglePattern.mockResolvedValue({ type: 'success' });

    render(<PatternList />);

    await waitFor(() => {
      expect(screen.getByText('Padrões de Impressoras Cadastradas')).toBeInTheDocument();
      expect(screen.getByText(/HP.*123.*Laser/i)).toBeInTheDocument();
      expect(screen.getByText(/Epson.*456.*Inkjet/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Ativar"));

    await waitFor(() => {
      expect(screen.getByText('Você tem certeza que deseja reativar o padrão?')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Confirmar"));

    await waitFor(() => {
      expect(togglePattern).toHaveBeenCalled();
      expect(screen.queryByText('Você tem certeza que deseja reativar o padrão?')).toBeNull();
    });
  });

  it('handles pattern activation', async () => {
    getPadroes.mockResolvedValue({
      type: 'success',
      data: [
        {
          id: 1,
          marca: 'HP',
          modelo: '123',
          tipo: 'Laser',
          status: 'ATIVO',
        },
        {
          id: 2,
          marca: 'Epson',
          modelo: '456',
          tipo: 'Inkjet',
          status: 'DESATIVADO',
        },
      ],
    });

    togglePattern.mockRejectedValue(new Error('error'));

    render(<PatternList />);

    await waitFor(() => {
      expect(screen.getByText('Padrões de Impressoras Cadastradas')).toBeInTheDocument();
      expect(screen.getByText(/HP.*123.*Laser/i)).toBeInTheDocument();
      expect(screen.getByText(/Epson.*456.*Inkjet/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Ativar"));

    await waitFor(() => {
      expect(screen.getByText('Você tem certeza que deseja reativar o padrão?')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Confirmar"));

    await waitFor(() => {
      expect(togglePattern).toHaveBeenCalled();
      expect(screen.queryByText('Você tem certeza que deseja reativar o padrão?')).toBeNull();
    });
  });
})