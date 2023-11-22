import React from "react";
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrintersList from "../../pages/PrintersList";
import * as api from "../../api/api";
import * as router from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

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
  render(<BrowserRouter>
      <PrintersList />
    </BrowserRouter>);
  expect(await screen.findByText("HP InkJet 50")).toBeInTheDocument();
  expect(await screen.findByText("Epson LaserJet")).toBeInTheDocument();
});

// Teste de Filtro de Pesquisa
test("deve filtrar impressoras com base na pesquisa", () => {
  render(<BrowserRouter>
      <PrintersList />
    </BrowserRouter>);
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "HP InkJet 50" },
  });
  expect(screen.getByText("HP InkJet 50")).toBeInTheDocument();
  expect(screen.queryByText("Epson LaserJet")).toBeNull();
});


test("deve mostrar se a impressora esta sendo desativada", async () => {
  render(<BrowserRouter>
      <PrintersList />
    </BrowserRouter>);

  
  const botaoDesativar = screen.getByText("Desativar");
  fireEvent.click(botaoDesativar);

 
  expect(screen.getByText("Desativação de impressora")).toBeInTheDocument();
});

test("deve mostrar se a impressora esta sendo ativada", async () => {
  render(<BrowserRouter>
      <PrintersList />
    </BrowserRouter>);

  
  const botaoAtivar = screen.getByText("Ativar");
  fireEvent.click(botaoAtivar);

 
  expect(screen.getByText("Ativação de impressora")).toBeInTheDocument();
});


// Teste de Modal de Ativação/Desativação
test("deve abrir o modal de ativação/desativação e realizar a ação", async () => {
  render(<BrowserRouter>
      <PrintersList />
    </BrowserRouter>);

  // Encontra e clica no botão que abre o modal de desativação/ativação
  const botaoDesativar = screen.getByText("Desativar");
  fireEvent.click(botaoDesativar);

  // Verifica se o modal foi aberto
  const tituloModal = await screen.getByText("Desativação de impressora");
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
  const { getByText } = render(
  <BrowserRouter>
    <PrintersList />
  </BrowserRouter>
  );
  fireEvent.click(getByText("Ver detalhes"));

  expect(router.useHistory().push).toHaveBeenCalledWith(
    "/detalhes-da-impressora"
  );
});

test("Deve mostrar o texto do filto 'Ativas'", async () =>{

  render(
    <BrowserRouter>
      <PrintersList />
    </BrowserRouter>
  )
  
  const botaoAtivas = screen.getByText('Ativas');
  fireEvent.click(botaoAtivas);
  const filter_being_shown = screen.getByTestId("filter_beign_shown")
  expect(filter_being_shown).toHaveTextContent("Ativas");

})


test("Deve mostrar o texto do filtro 'Todas'", async () =>{

  render(
    <BrowserRouter>
      <PrintersList />
    </BrowserRouter>
  )
  
  const botaoTodas = screen.getByText('Todas', { selector: 'a' });
  fireEvent.click(botaoTodas);
  const filter_being_shown = screen.getByTestId("filter_beign_shown")
  expect(filter_being_shown).toHaveTextContent("Todas");

})

test("Deve mostrar o texto do filtro 'Desativadas'", async () =>{

  render(
    <BrowserRouter>
      <PrintersList />
    </BrowserRouter>
  )
  
  const botaoDesativadas = screen.getByText('Desativadas', { selector: 'a' });
  fireEvent.click(botaoDesativadas);
  const filter_being_shown = screen.getByTestId("filter_beign_shown")
  expect(filter_being_shown).toHaveTextContent("Desativadas");

})