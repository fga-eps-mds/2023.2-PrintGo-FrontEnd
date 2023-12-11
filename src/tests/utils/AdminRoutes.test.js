import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from '../../components/utils/AdminRoutes'; // Adjust the import path as necessary
import { decodeToken } from "react-jwt";

// Mock the 'decodeToken' and 'localStorage.getItem' functions
jest.mock("react-jwt", () => ({
  decodeToken: jest.fn(),
}));

jest.spyOn(window.localStorage.__proto__, 'getItem');
window.localStorage.__proto__.getItem = jest.fn();

// Helper function to set up tests
const setup = (isAdmin = false) => {
  localStorage.getItem.mockReturnValue(isAdmin ? 'mockedAdminToken' : 'mockedUserToken');
  decodeToken.mockReturnValue({ cargos: isAdmin ? ["ADMIN"] : ["USER"] });

  render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route path='/admin' element={<AdminRoutes />}>
          <Route path="" element={<div>Admin Page</div>} />
        </Route>
        <Route path='/' element={<div>Home Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('AdminRoutes', () => {
  it('should redirect non-admin users to the home page', () => {
    setup(false);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('should allow admin users to access the admin routes', () => {
    setup(true);
    expect(screen.getByText('Admin Page')).toBeInTheDocument();
  });
});

