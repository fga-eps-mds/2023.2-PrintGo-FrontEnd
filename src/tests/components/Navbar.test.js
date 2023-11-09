import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
  });

  test('renders home link', () => {
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });

  test('renders about us link', () => {
    const aboutUsLink = screen.getByText('Quem Somos');
    expect(aboutUsLink).toBeInTheDocument();
  });

  test('renders contact link', () => {
    const contactLink = screen.getByText('Contato');
    expect(contactLink).toBeInTheDocument();
  });

  test('renders users dropdown on click', () => {
    const usersButton = screen.getByText('Usuários');
    fireEvent.click(usersButton);
    const usersDropdown = screen.getByText('Cadastro de usuário');
    expect(usersDropdown).toBeInTheDocument();
  });

  test('renders printers dropdown on click', () => {
    const printersButton = screen.getByText('Impressoras');
    fireEvent.click(printersButton);
    const printersDropdown = screen.getByText('Cadastro de impressora');
    expect(printersDropdown).toBeInTheDocument();
  });

  test('renders users link', () => {
    fireEvent.click(screen.getByText('Usuários'))
    const usersLink = screen.getByText('Cadastro de usuário')
    expect(usersLink).toBeInTheDocument();
  })

  test('renders users link for edit users', () => {
    fireEvent.click(screen.getByText('Usuários'))
    const usersLink = screen.getByText('Edição de usuário')
    expect(usersLink).toBeInTheDocument();
  })
});
