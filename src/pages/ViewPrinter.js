import React, { useState, useEffect } from "react";
import '../style/pages/viewPrinter.css';
import ellipse from '../assets/login_ellipse.svg';
import voltar_vector from '../assets/voltar_vector.svg';
import Navbar from "../components/navbar/Navbar";
import { useParams } from "react-router-dom";


export default function ViewPrinter(){
    const { printerData } = useParams();

    // Labels dos campos de informação.
    const infoLabels = {
        numeroSerie: "Número de série",
        ip: "IP",
        codigoLocadora: "Código de locadora",
        espacoLivre: "",
        contadorInstalacao: "Contador de instalação",
        dataInstalacao: "Data de instalação",
        contadorRetirada: "Contador de retirada",
        dataRetirada: "Data de retirada",
        ultimoContador: "Último contador",
        dataUltimoContador: "Data do último contador",
        circunscricao: "Circunscrição",
        unidade: "Unidade"
    }

    // Estado para armazenar os dados da impressora.
    const [printer, setPrinter] = useState(null);

    useEffect(() => {
      try {
        console.log("Printer Data:", printerData);
        const printerString = atob(printerData);
        const printerObject = JSON.parse(printerString);
        setPrinter(printerObject);
      } catch (error) {
        console.error("Error decoding Base64 string:", error);
        // Handle the error as needed, e.g., setPrinter to a default value or show an error message.
      }
    }, [printerData]);

    return(
        <>
          <Navbar />
          <div id="container-viewprinter">
            <div id="viewprinter-left-content"></div>
            <div id="viewprinter-right-content">
              <div id="viewprinter-card">
                
                  {printer ? (
                    <div id="viewprinter-info-group">
                      <header id="viewprinter-card-header">
                        <img alt="" src={voltar_vector}></img>
                        <a href="/impressorascadastradas">Voltar</a>
                      </header>
                      <p id="viewprinter-info-header">
                        {printer.padrao.tipo} - {printer.padrao.marca} - {printer.padrao.modelo}
                      </p>
                      <div id="viewprinter-info-line">
                        {Object.entries(infoLabels).map(([key, label]) => (
                          <div key={key} id="viewprinter-info-box">
                            <label>{label}</label>
                            <p>{printer?.[key]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    ) : (
                      <p id="viewprinter-loading-text">Carregando dados...</p>
                    )
                  }

              </div>
              <div className="elipse-viewprinter">
                <img alt= "elipse"  src={ellipse}></img>
              </div>
            </div>
          </div>
        </>
    );
}