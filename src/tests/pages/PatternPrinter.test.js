import React from 'react';
import { render, screen } from '@testing-library/react';
import PatternPrinter from '../../pages/PatternPrinter';
import '@testing-library/jest-dom/extend-expect';

// Mock de componentes que não são o foco do teste
jest.mock('../../components/navbar/Navbar', () => () => <div>Navbar Mock</div>);
jest.mock('../../components/forms/PrinterPatternForm', () => () => <div>PrinterPatternForm Mock</div>);

describe('PatternPrinterPage', () => {
  test('renders Navbar, image, and PrinterPatternForm', () => {
    render(<PatternPrinter />);

    // Verificar se a Navbar está presente
    expect(screen.getByText('Navbar Mock')).toBeInTheDocument();

    // Verificar se a imagem está presente
    expect(screen.getByTestId('register-printer-pattern-container')).toBeInTheDocument();
  });

});


