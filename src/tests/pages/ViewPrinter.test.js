import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as api from "../../api/api";
import * as router from "react-router-dom";
import ViewPrinter from '../../pages/ViewPrinter';
import { BrowserRouter } from 'react-router-dom';

// Mock das chamadas de API
jest.mock("../../api/api", () => ({
  getPrinterById: jest.fn(),
  getPatternById: jest.fn(),
}));

// Mock do React Router
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  })
}));

beforeEach(() => {
  api.getPrinterById.mockResolvedValue(
    {
      id: "",
      padrao_id: "",
      ip: "192.168.15.1",
      numeroSerie: "XXXX-000000",
      codigoLocadora: "PRINTER-004",
      contadorInstalacao: 0,
      ultimoContador: 0,
      dataInstalacao: "12/10/2023",
      dataUltimoContador: "20/11/2023",
      contadorRetirada: 0,
      dataRetirada: "12/10/2023",
      circunscricao: "1ª Delegacia Regional de Goiânia",
      unidade: "2ª Delegacia Municipal de Goiânia",
    }
  );
  api.getPatternById.mockResolvedValue(
    {
      tipo: "Multifuncional P&B",
      marca: "Canon",
      modelo: "MF1643i II",
    }
  )
  jest.clearAllMocks();
});

// Teste de renderização inicial.
test("deve renderizar a visualização de impressora corretamente", async () => {
  render(<BrowserRouter>
          <ViewPrinter />
        </BrowserRouter>);
  expect(await screen.findByText("Multifuncional P&B - Canon - MF1643i II")).toBeInTheDocument();
  expect(await screen.findByText("PRINTER-004")).toBeInTheDocument();
});