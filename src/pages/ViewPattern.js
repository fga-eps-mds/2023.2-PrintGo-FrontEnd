import "../style/pages/viewPattern.css";
import React, { useEffect, useState } from "react";
import Ellipse from "../assets/login_ellipse.svg";
import voltar_vector from "../assets/voltar_vector.svg";
import Navbar from "../components/navbar/Navbar";
import { useParams } from "react-router-dom";

export default function ViewPattern() {

  const { padrao } = useParams();

  const infoLabels = {
    tipo: "Tipo",
    modelo: "Modelo",
    marca: "Marca",
  }

  const oidLabels = {
    mdeoloImpressora: "Modelo de impressora",
    numeroSerie: "Número de série",
    versaoFirmware: "Versão de Firmware",
    tempoAtivoSistema: "Tempo ativo do sistema",
    totalDigitalizacoes: "Total de digitalizações",
    totalCopiasPB: "Total de cópias P&B",
    totalCopiasColoridas: "Total de cópias color",
    totalImpressoesPb: "Total de impressões P&B",
    totalImpressoesColoridas: "Total de impressões color",
    totalGeral: "Total geral",
    enderecoIp: "Endereço de IP",
  }

  const [pattern, setPattern] = useState()

  useEffect(() => {
    try {
      console.log("Pattern Data:", padrao);
      const patternString = atob(padrao);
      const patternObject = JSON.parse(patternString);
      setPattern(patternObject);
    } catch (error) {
      console.error("Error decoding Base64 string", error);
    }
  })

  return (
    <>
      <Navbar />
      <div className="viewpattern-container">
        <div className="viewpattern-card">

          { pattern ? (
            <div className="viewpattern-info-group">
              
              <header className="viewpattern-card-header">
                <img alt="" src={voltar_vector}></img>
                <a href="/padroescadastrados">Voltar</a>
              </header>

              <div className="viewpattern-info-line">
                {Object.entries(infoLabels).map(([key, label]) => (
                  <div key={key} className="viewpattern-info-box">
                    <label>{label}</label>
                    <p>{pattern[key]}</p>
                  </div>
                ))}
              </div>

              <div className="viewpattern-oid-line">
                <p>SNMP</p>
                {Object.entries(oidLabels).map(([key, label]) => (
                  <div key={key} className="viewpattern-oid-box">
                    <label>{label}:</label>
                    <p>{pattern[key]}</p>
                  </div>
                ))}
              </div>

            </div>
            ) : (
              <p id="viewpattern-loading-text">Carregando dados...</p>
            )
          }
        </div>

        <div className="viewpattern-ellipse">
          <img alt="elipse" src={Ellipse} />
        </div>
      </div>
    </>
  );
}
