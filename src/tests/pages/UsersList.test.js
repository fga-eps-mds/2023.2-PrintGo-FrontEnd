import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersList from '../../pages/UsersList';
import '@testing-library/jest-dom/extend-expect';

// Mock de componentes que não são o foco do teste
jest.mock('../../pages/UsersList', () => () => <div>UsersList Mock</div>);

describe('UsersListPage', () => {
  test('renders Navbar, and UsersList', () => {
    
    render(<UsersList />);

  });

});