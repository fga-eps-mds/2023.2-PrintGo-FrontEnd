import React from 'react';
import { render, screen } from '@testing-library/react';
import EditPrinter from '../../pages/EditPrinter';
import '@testing-library/jest-dom/extend-expect';

// Mock de componentes que não são o foco do teste
jest.mock('../../components/navbar/Navbar', () => () => <div>Navbar Mock</div>);
jest.mock('../../components/forms/EditPrinterForm', () => () => <div>EditPrinterForm Mock</div>);

describe('EditPrinterPage', () => {
  test('renders Navbar, image, and EditPrinterForm', () => {
    render(<EditPrinter />);

    // Verificar se a Navbar está presente
    expect(screen.getByText('Navbar Mock')).toBeInTheDocument();

    // Verificar se a imagem está presente
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('registerPrinter_image'));

    expect(screen.getByText('EditPrinterForm Mock')).toBeInTheDocument();
  });

});
