import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import CounterForm from '../../components/forms/CounterForm';
import '@testing-library/jest-dom/extend-expect';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

describe('Testando o formulário de CounterForm', () => {

  it('deve renderizar o formulário sem crashar', () => {
    render(<CounterForm />);
  });

  it('deve mostrar os erros de required quando tentar enviar com o formulário inválido', async () => {
    render(<CounterForm />);
    
    // Simule uma submissão do formulário.
    fireEvent.submit(document.getElementById('insert-bnt'));

    await waitFor(() => {
      expect(screen.getByText(/O número de série é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/Data inválida/i)).toBeInTheDocument();
      expect(screen.getByText(/O horário de emissão é obrigatória/i)).toBeInTheDocument();
      expect(screen.getByText(/O relatório PDF é obrigatório/i)).toBeInTheDocument();
    });
  });

  it('deve mostrar erro se o valor de um input for inválido', async () => {
    render(<CounterForm />);
    
    // Coloque inputs inválidos para o form
    fireEvent.input(document.getElementsByName('copiasPB')[0], { target: { value: 'Test' } });
    fireEvent.input(document.getElementsByName('impressoesPB')[0], { target: { value: 'Test' } });
    fireEvent.input(document.getElementsByName('copiasColor')[0], { target: { value: 'Test' } });
    fireEvent.input(document.getElementsByName('impressoesColor')[0], { target: { value: 'Test' } });
    fireEvent.input(document.getElementsByName('contadorGeral')[0], { target: { value: 'Test' } });
    fireEvent.input(document.getElementsByName('dataEmissao')[0], { target: { value: 'Test' } });
    fireEvent.input(document.getElementsByName('horaEmissao')[0], { target: { value: 'Test' } });
    
    // Simule uma submissão do formulário.
    fireEvent.submit(document.getElementById('insert-bnt'));

    await waitFor(() => {
        expect(screen.getByText(/Cópias P&B deve ser um número/i)).toBeInTheDocument();
        expect(screen.getByText(/Impressões P&B deve ser um número/i)).toBeInTheDocument();
        expect(screen.getByText(/Cópias color deve ser um número/i)).toBeInTheDocument();
        expect(screen.getByText(/Impressões color deve ser um número/i)).toBeInTheDocument();
        expect(screen.getByText(/Contador geral deve ser um número/i)).toBeInTheDocument();
        expect(screen.getByText(/Data inválida/i)).toBeInTheDocument();
        expect(screen.getByText(/Horário inválido. Use o formato hh:mm/i)).toBeInTheDocument();
    });
  });

  it('deve conseguir enviar o formulário se os dados forem válidos', async () => {
    render(<CounterForm />);
    
    // Coloque inputs válidos.
    fireEvent.input(document.getElementsByName('serial')[0], { target: { value: 'a' } });
    fireEvent.input(document.getElementsByName('copiasPB')[0], { target: { value: '2' } });
    fireEvent.input(document.getElementsByName('impressoesPB')[0], { target: { value: '2' } });
    fireEvent.input(document.getElementsByName('copiasColor')[0], { target: { value: '2' } });
    fireEvent.input(document.getElementsByName('impressoesColor')[0], { target: { value: '2' } });
    fireEvent.input(document.getElementsByName('contadorGeral')[0], { target: { value: '2' } });
    fireEvent.input(document.getElementsByName('dataEmissao')[0], { target: { value: '2022-06-22' } });
    fireEvent.input(document.getElementsByName('horaEmissao')[0], { target: { value: '11:51' } });

    const file = new File(['file content'], 'example.pdf', { type: 'application/pdf' });

    fireEvent.input(document.getElementsByName('relatorioPDF')[0], { target: { files: [file] } });
    
    // Simule uma submissão do formulário.
    fireEvent.submit(document.getElementById('insert-bnt'));

    await waitFor(() => {
      expect(screen.getByTestId('serial-test')).toHaveTextContent('');
      expect(screen.getByTestId('copiasPB-test')).toHaveTextContent('');
      expect(screen.getByTestId('impressoesPB-test')).toHaveTextContent('');
      expect(screen.getByTestId('copiasColor-test')).toHaveTextContent('');
      expect(screen.getByTestId('impressoesColor-test')).toHaveTextContent('');
      expect(screen.getByTestId('contadorGeral-test')).toHaveTextContent('');
      expect(screen.getByTestId('dataEmissao-test')).toHaveTextContent('');
      expect(screen.getByTestId('horaEmissao-test')).toHaveTextContent('');
    });
  });
});
