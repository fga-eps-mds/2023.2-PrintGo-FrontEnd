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

});
