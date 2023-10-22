import React, { useState } from 'react';
import "../style/pages/contato.css";
import Imagem_Homen from "../assets/imagem-homen-ruivo.svg";
import Input from "../components/Input";

export default function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');

  const handleEnviar = () => {
    // Aqui você pode lidar com os dados, como validação e envio para um servidor
    console.log("Nome:", nome);
    console.log("E-mail:", email);
    console.log("Assunto:", assunto);
  };

  return (
    <div className="Main-page">
      <h1>Contato</h1>
      <div className="Contato-principal">
        <div className="Box-contato">
          <p>Contato</p>
          <div className="Input-contato">
            <Input
              label="Nome"
              placeholder="Digite seu nome"
              className="input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              label="E-mail"
              placeholder="Digite seu email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Assunto-input">
            <label>Assunto</label>
            <textarea
              placeholder="Assunto"
              className="Larger-input"
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
            />
          </div>
          <div className="button-div">
            <button className="Enviar-button" onClick={handleEnviar}>Enviar</button>
          </div>
        </div>
        <div className="Imagem">
          <img src={Imagem_Homen} alt="Imagem de um homem ruivo" />
        </div>
      </div>
    </div>
  );
}
