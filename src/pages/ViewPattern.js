import "../style/pages/viewPattern.css";
import React, { useState } from "react";
import Ellipse from "../assets/login_ellipse.svg";
import voltar_vector from "../assets/voltar_vector.svg";
import Navbar from "../components/navbar/Navbar";

export default function ViewPattern() {

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

  const [pattern, setPattern] = useState(
    {
      id_padrao: 1,
      tipo: "Multifuncional Colorida",
      modelo: "PIXMA MG3620",
      marca: "Canon",
      ativado: true,
      oid_modelo: "1.3.6.1.2.1.xxxx",
      oid_serial: "1.3.6.1.2.1.xxxx",
      oid_firmware: "1.3.6.1.2.1.xxxx",
      oid_tempo: "1.3.6.1.2.1.xxxx",
      oid_digitalizacoes: "1.3.6.1.2.1.xxxx",
      oid_copiasPB: "1.3.6.1.2.1.xxxx",
      oid_copias_color: "1.3.6.1.2.1.xxxx",
      oid_impressoesPB: "1.3.6.1.2.1.xxxx",
      oid_impressoes_color: "1.3.6.1.2.1.xxxx",
      oid_total: "1.3.6.1.2.1.xxxx",
      oid_ip: "1.3.6.1.2.1.1347.xx",
    }
  )

  return (
    <>
      <Navbar />
      <div className="viewpattern-container">
        <div className="viewpattern-card">
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
        </div>

        <div className="viewpattern-ellipse">
          <img alt="elipse" src={Ellipse} />
        </div>
      </div>
    </>
  );
}