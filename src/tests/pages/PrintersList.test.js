import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImpressorasCadastradas from "../../pages/PrintersList";

// Teste de Renderização Inicial
test("deve renderizar a lista de impressoras corretamente", () => {
  render(<ImpressorasCadastradas />);
  expect(screen.getByText("Impressoras cadastradas")).toBeInTheDocument();
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
