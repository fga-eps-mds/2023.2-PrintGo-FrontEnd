import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from '../../components/utils/AdminRoutes'; // Adjust the import path as necessary
import { decodeToken } from "react-jwt";
import { formatDate } from '../../components/utils/dateUtils';

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

describe('formatDate', () => {
  it('deve adicionar um zero à esquerda para meses de um dígito', () => {
    const dateString = '2023-01-10T12:00:00Z'; // Janeiro (01) é um mês de um dígito
    const result = formatDate(dateString);
    expect(result).toBe('2023-01-11'); // Espera-se que adicione um zero ao mês
  });

  it('deve adicionar um zero à esquerda para dias de um dígito', () => {
    const dateString = '2023-12-01T12:00:00Z'; // Dia 1 é um dia de um dígito
    const result = formatDate(dateString);
    expect(result).toBe('2023-12-02'); // Espera-se que adicione um zero ao dia
  });

  it('deve formatar corretamente datas com meses e dias de dois dígitos', () => {
    const dateString = '2023-12-10T12:00:00Z'; // Dezembro (12) e dia 10 são de dois dígitos
    const result = formatDate(dateString);
    expect(result).toBe('2023-12-11'); // Nenhum zero adicional deve ser adicionado
  });

});
