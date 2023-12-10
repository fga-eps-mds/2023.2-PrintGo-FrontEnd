import "../style/pages/viewPattern.css";
import React, { useEffect, useState } from "react";
import Ellipse from "../assets/login_ellipse.svg";
import voltar_vector from "../assets/voltar_vector.svg";
import Navbar from "../components/navbar/Navbar";
import { useParams } from "react-router-dom";

export default function ViewPattern() {

  const { patternData } = useParams();

  const infoLabels = {
    tipo: "Tipo",
    modelo: "Modelo",
    marca: "Marca",
  }

  const oidLabels = {
    oid_modelo: "Modelo de impressora",
    oid_serial: "Número de série",
    oid_firmware: "Versão de Firmware",
    oid_tempo: "Tempo ativo do sistema",
    oid_digitalizacoes: "Total de digitalizações",
    oid_copiasPB: "Total de cópias P&B",
    oid_copias_color: "Total de cópias color",
    oid_impressoesPB: "Total de impressões P&B",
    oid_impressoes_color: "Total de impressões color",
    oid_total: "Total geral",
    oid_ip: "Endereço de IP",
  }

  const [pattern, setPattern] = useState()

  useEffect(() => {
    try {
      const patternString = atob(patternData);
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
                <a href="">Voltar</a>
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
                <label>SNMP</label>
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