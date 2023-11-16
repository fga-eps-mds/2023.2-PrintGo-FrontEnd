import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ImpressorasCadastradas from "../../pages/PrintersList";
import * as api from "../../api/api";
import * as router from "react-router-dom";

// Mock das chamadas de API
jest.mock("../../api/api", () => ({
  getPrinters: jest.fn(),
  updatePrinterStatus: jest.fn(),
}));

// Mock do React Router
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

beforeEach(() => {
  api.getPrinters.mockResolvedValue([
    { id: 1, name: "HP InkJet 50", status: "Ativa" },
    { id: 2, name: "Epson LaserJet", status: "Ativa" },
  ]);
  api.updatePrinterStatus.mockResolvedValue({});
  jest.clearAllMocks();
});

// Teste de Renderização Inicial
test("deve renderizar a lista de impressoras corretamente", async () => {
  render(<ImpressorasCadastradas />);
  expect(await screen.findByText("HP InkJet 50")).toBeInTheDocument();
  expect(await screen.findByText("Epson LaserJet")).toBeInTheDocument();
});

// Teste de Filtro de Pesquisa
test("deve filtrar impressoras com base na pesquisa", () => {
  render(<ImpressorasCadastradas />);
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "HP InkJet 50" },
  });
  expect(screen.getByText("HP InkJet 50")).toBeInTheDocument();
  expect(screen.queryByText("Epson LaserJet")).toBeNull();
});

//Teste de Atualização de Status com Mock da API
test("deve atualizar o status da impressora", async () => {
  render(<ImpressorasCadastradas />);

  const botaoDesativar = await screen.findByText("Desativar", {
    selector: "button",
  });
  fireEvent.click(botaoDesativar);

  await waitFor(() => {
    expect(api.updatePrinterStatus).toHaveBeenCalledWith();
  });

  expect(await screen.findByText("Desativada")).toBeInTheDocument();
});
// Teste de Modal de Ativação/Desativação
test("deve abrir o modal de ativação/desativação e realizar a ação", async () => {
  render(<ImpressorasCadastradas />);

  // Encontra e clica no botão que abre o modal de desativação/ativação
  const botaoDesativar = screen.getByText("Desativar");
  fireEvent.click(botaoDesativar);

  // Verifica se o modal foi aberto
  const tituloModal = await screen.findByText("Desativação de impressora");
  expect(tituloModal).toBeInTheDocument();

  // Simula clique no botão de confirmação no modal
  const botaoConfirmar = screen.getByText("Confirmar");
  fireEvent.click(botaoConfirmar);

  // Verifica se a impressora foi desativada.
  const statusImpressora = await screen.findByText("Desativada");
  expect(statusImpressora).toBeInTheDocument();
});

//Teste de Navegação com Mock do Router
test("deve redirecionar para a página de detalhes da impressora", async () => {
  const { getByText } = render(<ImpressorasCadastradas />);
  fireEvent.click(getByText("Ver detalhes"));

  expect(router.useHistory().push).toHaveBeenCalledWith(
    "/detalhes-da-impressora"
  );
});
