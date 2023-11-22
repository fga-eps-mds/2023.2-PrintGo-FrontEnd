import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as api from "../../api/api";
import * as router from "react-router-dom";
import ViewPrinter from '../../pages/ViewPrinter';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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
});

// Teste de renderização dos labels.
test("deve renderizar os labels de informação corretamente", async () => {
  render(<BrowserRouter>
          <ViewPrinter />
        </BrowserRouter>);

  expect(await screen.findByText("Número de série")).toBeInTheDocument();
  expect(await screen.findByText("IP")).toBeInTheDocument();
  expect(await screen.findByText("Código de locadora")).toBeInTheDocument();
  expect(await screen.findByText("Contador de instalação")).toBeInTheDocument();
  expect(await screen.findByText("Data de instalação")).toBeInTheDocument();
  expect(await screen.findByText("Contador de retirada")).toBeInTheDocument();
  expect(await screen.findByText("Data de retirada")).toBeInTheDocument();
  expect(await screen.findByText("Último contador")).toBeInTheDocument();
  expect(await screen.findByText("Data do último contador")).toBeInTheDocument();
  expect(await screen.findByText("Circunscrição")).toBeInTheDocument();
  expect(await screen.findByText("Unidade")).toBeInTheDocument();
});

// Teste de renderização do Botão de Voltar.
test("deve renderizar o archor de voltar", async () => {
  render(<BrowserRouter>
          <ViewPrinter />
        </BrowserRouter>);
  
  const linkVoltar = screen.getByText("Voltar");

  expect(linkVoltar).toBeInTheDocument();
});