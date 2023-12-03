import React, { useState } from "react";
import "../style/pages/contact.css";
import Imagem_Homen from "../assets/imagem-homen-ruivo.svg";
import Input from "../components/Input";
import emailjs from "@emailjs/browser";
import elipse from "../assets/home_elipse.svg";
import Navbar from "../components/navbar/Navbar";
export default function Contact() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");

  function handleEnviar(){

    const templateParams = {
      from_name: nome,
      email: email,
      message: assunto,
    };

    emailjs.send("service_amwcg9n","template_5l6g71s",templateParams,"az5Vq1c-iMacr4p-z")
    .then((response) => {
        setAssunto('');
        setEmail('');
        setNome('');
    }, (err) => {

    })
  }

  return (
    <>
      <Navbar />
      <div className="Main-page-contact">
        <div className="Contact-principal">
          <div className="Box-contact">
            <p>Contato</p>
            <div className="Input-contact">
              <Input
                label="Nome"
                placeholder="Digite seu nome"
                className="input-contact-form"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Input
                label="E-mail"
                placeholder="Digite seu email"
                className="input-contact-form"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="Subject-input">
              <label htmlFor="assunto">Assunto</label>
              <textarea
                placeholder="Assunto"
                className="Larger-input"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
              />
            </div>
            <div className="button-div">
              <button className="Send-button" onClick={handleEnviar}>
                Enviar
              </button>
            </div>
          </div>
        </div>
        <div className="elipse-contact">
          <img alt="" src={elipse}></img>
        </div>
        <div className="Image-contact">
          <img src={Imagem_Homen} alt="Imagem de um homem ruivo" />
        </div>
      </div>
    </>
  );
}
