import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImpressorasCadastradas from "./ImpressorasCadastradas";

// Teste de Renderização Inicial
test("deve renderizar a lista de impressoras corretamente", () => {
  render(<ImpressorasCadastradas />);
  expect(screen.getByText("Impressoras cadastradas")).toBeInTheDocument();
});
