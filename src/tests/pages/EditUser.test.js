import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditUserPage from '../../pages/EditUser';


jest.mock("../../components/navbar/Navbar", () => (props) => <div data-testid="navbar-mock">Navbar</div>);
jest.mock("../../components/forms/EditUserForm", () => (props) => <div data-testid="edit-user-form-mock">EditUserForm</div>);

test("renders EditUserPage component", () => {
  render(<EditUserPage />);

  // Verifica se a página está sendo renderizada corretamente
  expect(screen.getByAltText("pessoas")).toBeInTheDocument();
  expect(screen.getByAltText("elipse")).toBeInTheDocument();
  
});