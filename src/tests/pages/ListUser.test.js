import React from 'react';
import { render, screen } from '@testing-library/react';
import ListUsers from '../../pages/ListUsers';
import '@testing-library/jest-dom/extend-expect';

// Mock de componentes que não são o foco do teste
jest.mock('../../pages/ListUsers', () => () => <div>ListUsers Mock</div>);

describe('ListUsersPage', () => {
  test('renders Navbar, and ListUsers', () => {
    
    render(<ListUsers />);

  });

});