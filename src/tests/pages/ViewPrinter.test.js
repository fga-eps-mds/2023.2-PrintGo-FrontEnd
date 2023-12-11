import React from 'react';
import { render as rtlRender, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as router from "react-router-dom";
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import ViewPrinter from '../../pages/ViewPrinter';

// Mock do React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

function render(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return <Router>{children}</Router>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

beforeEach(() => {
  router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
  jest.resetAllMocks();
});

// Teste de renderização inicial.
test("deve renderizar a visualização de impressora corretamente", async () => {
  useParams.mockReturnValue({ printerData: "" });

  render(<ViewPrinter />);

  expect(screen.getByText("Carregando dados...")).toBeInTheDocument();
});

// Teste de renderização dos labels.
test("deve renderizar a página com os dados de uma impressora", async () => {
  useParams.mockReturnValue({printerData: "eyJpZCI6ImNscTA3bWkwaDAwMDJ2eGdocWttMmJscDEiLCJpcCI6IjEzMi4xNS4yLjQ1LjE3IiwibnVtZXJvU2VyaWUiOiIxMzIxNTY4NCIsInBhZHJhb19pZCI6ImNscTA3bDh6NTAwMDB2eGdoZG11czkwZnAiLCJjb2RpZ29Mb2NhZG9yYSI6IjI2MjZhd2RhIiwibG9jYWRvcmFfaWQiOm51bGwsImNvbnRhZG9ySW5zdGFsYWNhbyI6MTAsImRhdGFJbnN0YWxhY2FvIjoiMjAyMy0xMi0xMFQwMDowMDowMC4wMDBaIiwidWx0aW1vQ29udGFkb3IiOjEwLCJkYXRhVWx0aW1vQ29udGFkb3IiOiIyMDIzLTEyLTEwVDAwOjAwOjAwLjAwMFoiLCJjb250YWRvclJldGlyYWRhcyI6MTAsImRhdGFDb250YWRvclJldGlyYWRhIjoiMjAyMy0xMi0xMFQwMDowMDowMC4wMDBaIiwidW5pZGFkZUlkIjoiZjM5YTg2OGMtZGJmNy00ZmNhLWEyNTctZjkxNTMxMWI1YTc5Iiwic3RhdHVzIjoiQVRJVk8iLCJwYWRyYW8iOnsiaWQiOiJjbHEwN2w4ejUwMDAwdnhnaGRtdXM5MGZwIiwidGlwbyI6Ikxhc2VySmV0IiwibWFyY2EiOiJIUCIsIm1vZGVsb0ltcHJlc3NvcmEiOiIxMzIuMTIuMS41LjEyIiwibW9kZWxvIjoiUHJvIiwibnVtZXJvU2VyaWUiOiIxMzIuMTIuMS41LjEyIiwidmVyc2FvRmlybXdhcmUiOiIxMzIuMTIuMS41LjEyIiwidG90YWxEaWdpdGFsaXphY29lcyI6IjEzMi4xMi4xLjUuMTIiLCJ0b3RhbENvcGlhc1BCIjoiMTMyLjEyLjEuNS4xMiIsInRvdGFsQ29waWFzQ29sb3JpZGFzIjoiMTMyLjEyLjEuNS4xMiIsInRvdGFsSW1wcmVzc29lc1BiIjoiMTMyLjEyLjEuNS4xMiIsInRvdGFsSW1wcmVzc29lc0NvbG9yaWRhcyI6IjEzMi4xMi4xLjUuMTIiLCJ0b3RhbEdlcmFsIjoiMTMyLjEyLjEuNS4xMiIsImVuZGVyZWNvSXAiOiIxMzIuMTIuMS41LjEyIiwic3RhdHVzIjoiQVRJVk8iLCJ0ZW1wb0F0aXZvU2lzdGVtYSI6IjEzMi4xMi4xLjUuMTIiLCJudW0iOm51bGx9fQ"});

  render(<ViewPrinter />);

  await waitFor(() => {
    expect(screen.getByText("13215684")).toBeInTheDocument();
  })
  
});


