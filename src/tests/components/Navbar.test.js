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
});
