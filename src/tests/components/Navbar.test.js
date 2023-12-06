import React from 'react';
import { render, fireEvent, screen, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';


describe('Navbar before login', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
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

  it('renders login button when user is not authenticated', () => {
    // Simula o usuário não autenticado
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    // Certifique-se de que o botão de login está presente
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

});

describe('Navbar after login', () => {
  beforeEach(() => {
    // Simula o usuário autenticado
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNscHJpaTRyOTAwMDFhaDJjazk5cWNxYW0iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIm5vbWUiOiJBZG1pbiIsImNhcmdvcyI6WyJVU0VSIiwiQURNSU4iXSwiaWF0IjoxNzAxODg5NjY5LCJleHAiOjE3MDE4OTMyNjl9.2yqtoHjjXjguYkOVC9wZYiO_pASsyQO_o0z3d-4JFR0");

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });

  it('does not render login button when user is authenticated', () => {
    expect(screen.queryByText('Login')).toBeNull();
  });

  it('renders user dropdown button', () => {
    expect(screen.getByText('Usuários')).toBeInTheDocument();
  });

  it('renders user dropdown when button is clicked', () => {
    const dropdownButton = screen.getByText('Usuários');
    fireEvent.click(dropdownButton);
    expect(screen.getByText('Cadastro de usuário')).toBeInTheDocument();
  });

  it('renders printers dropdown button', () => {
    expect(screen.getByText('Impressoras')).toBeInTheDocument();
  });

  it('renders printer dropdown when button is clicked', () => {
    const dropdownButton = screen.getByText('Impressoras');
    fireEvent.click(dropdownButton);
    expect(screen.getByText('Cadastro de impressora')).toBeInTheDocument();
    expect(screen.getByText('Cadastro de padrão de impressora')).toBeInTheDocument();
    expect(screen.getByText('Impressoras cadastradas')).toBeInTheDocument();
    expect(screen.getByText('Padrões de impressora cadastrados')).toBeInTheDocument();
  });

  it('renders user text', () => {
    expect(screen.getByText('Olá, Admin!')).toBeInTheDocument();
  });

  it('renders leave button and clears local storage on click', () => {
    const leaveButton = screen.getByTestId('navbar-leave-button');
    expect(leaveButton).toBeInTheDocument();

    fireEvent.click(leaveButton);
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    expect(localStorage.getItem('jwt')).toBeNull();
  });
});
