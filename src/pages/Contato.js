import React, { useState } from 'react';
import "../style/pages/contato.css";
import Imagem_Homen from "../assets/imagem-homen-ruivo.svg";
import Input from "../components/Input";
import emailjs from "@emailjs/browser";


export default function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');

  function handleEnviar(){
    // Aqui você pode lidar com os dados, como validação e envio para um servidor
    console.log("Nome:", nome);
    console.log("E-mail:", email);
    console.log("Assunto:", assunto);

    const templateParams = {
        from_name: nome,
        email: email,
        message: assunto
    }

    emailjs.send("service_amwcg9n","template_5l6g71s",templateParams,"az5Vq1c-iMacr4p-z")
    .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setAssunto('');
        setEmail('');
        setNome('');
    }, (err) => {
        console.log('FAILED...', err);

    })
  }

  return (
    <div className="Main-page-contato">
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
        
      </div>
      <div className="ellipse-contact"></div>
      <div className="Imagem-contato">
          <img src={Imagem_Homen} alt="Imagem de um homem ruivo" />
      </div>
    </div>
  );
}
