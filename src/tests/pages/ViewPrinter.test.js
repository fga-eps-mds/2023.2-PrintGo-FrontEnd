import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import ViewPrinter from '../../pages/ViewPrinter';
import { BrowserRouter } from 'react-router-dom';

describe('ViewPrinter component', () => {

  // Renderização.
  it('should render without crashing', () => {
    render (
      <BrowserRouter>
        <ViewPrinter />
      </BrowserRouter>
    );
  });

  it('should render printer information correctly', () => {
    render (
      <BrowserRouter>
        <ViewPrinter />
      </BrowserRouter>
    );

    expect(screen.getByText('Número de série')).toBeInTheDocument();
    expect(screen.getByText('IP')).toBeInTheDocument();
    expect(screen.getByText('Código da locadora')).toBeInTheDocument();
    expect(screen.getByText('Contador de instalação')).toBeInTheDocument();
    expect(screen.getByText('Data de instalação')).toBeInTheDocument();
    expect(screen.getByText('Contador de retirada')).toBeInTheDocument();
    expect(screen.getByText('Data de retirada')).toBeInTheDocument();
    expect(screen.getByText('Último contador')).toBeInTheDocument();
    expect(screen.getByText('Data do último contador')).toBeInTheDocument();
    expect(screen.getByText('Circunscrição')).toBeInTheDocument();
    expect(screen.getByText('Unidade')).toBeInTheDocument();
  });

  it('should render "Voltar" button', () => {
    render (
      <BrowserRouter>
        <ViewPrinter />
      </BrowserRouter>
    );

    expect(screen.getByText('Voltar')).toBeInTheDocument();
  });

  it('should render ellipse', () => {
    render (
      <BrowserRouter>
        <ViewPrinter />
      </BrowserRouter>
    );

    expect(screen.getByAltText('elipse')).toBeInTheDocument();
  });

  // Testando API
});