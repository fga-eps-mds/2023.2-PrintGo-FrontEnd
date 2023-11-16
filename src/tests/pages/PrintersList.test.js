import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImpressorasCadastradas from "./ImpressorasCadastradas";

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
