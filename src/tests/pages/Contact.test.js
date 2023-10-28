import { render, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../../pages/Contact';
import emailjs from '@emailjs/browser';
import React from 'react';

jest.mock('@emailjs/browser');

describe('Contact Component', () => {
  it('should render without crashing', () => {
    render(<Contact />);
  });

  it('should handle input change', () => {
    const { getByPlaceholderText } = render(<Contact />);
    const input = getByPlaceholderText('Digite seu nome');
    fireEvent.change(input, { target: { value: 'Teste' } });
    expect(input.value).toBe('Teste');
  });

  it('should handle form submission', async () => {
    emailjs.send.mockResolvedValue({ status: 200, text: 'SUCCESS!' });
    const { getByPlaceholderText, getByText } = render(<Contact />);
    const nomeInput = getByPlaceholderText('Digite seu nome');
    const emailInput = getByPlaceholderText('Digite seu email');
    const assuntoInput = getByPlaceholderText('Assunto');
    const button = getByText('Enviar');

    fireEvent.change(nomeInput, { target: { value: 'Teste' } });
    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(assuntoInput, { target: { value: 'Assunto de teste' } });
    fireEvent.click(button);

    await waitFor(() => expect(emailjs.send).toHaveBeenCalled());
  });
});
