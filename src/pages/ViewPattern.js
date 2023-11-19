import "../style/pages/viewPattern.css";
import React, { useState } from "react";
import Ellipse from "../assets/login_ellipse.svg";
import voltar_vector from "../assets/voltar_vector.svg";
import Navbar from "../components/navbar/Navbar";

export default function ViewPattern() {

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
      oid_endereco: "1.3.6.1.2.1.1347.xx",
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
              <div className="viewpattern-info-box">
                <label>Tipo</label>
                <p>{pattern && pattern.tipo}</p>
              </div>
              <div className="viewpattern-info-box">
                <label>Marca</label>
                <p>{pattern && pattern.marca}</p>
              </div>
            </div>
            <div className="viewpattern-info-line">
              <div className="viewpattern-info-box">
                <label>Modelo</label>
                <p>{pattern && pattern.modelo}</p>
              </div>
            </div>
            <div className="viewpattern-oid-line">
              <label>SNMP</label>
              <div className="viewpattern-oid-box">
                <label>Modelo de impressora:</label>
                <p>{pattern && pattern.oid_modelo}</p>
              </div>
              <div className="viewpattern-oid-box">
                <label>Número de série:</label>
                <p>{pattern && pattern.oid_serial}</p>
              </div>
              <div className="viewpattern-oid-box">
                <label>Versão do Firmware:</label>
                <p>{pattern && pattern.oid_firmware}</p>
              </div>
              <div className="viewpattern-oid-box">
                <label>Tempo ativo do sistema:</label>
                <p>{pattern && pattern.oid_tempo}</p>
              </div>
              <div className="viewpattern-oid-box">
                <label>Total de cópias P&B:</label>
                <p>{pattern && pattern.oid_copiasPB}</p>
              </div>
              <div className="viewpattern-oid-box">
                <label>Total de cópias color:</label>
                <p>{pattern && pattern.oid_copias_color}</p>
              </div>
              <div className="viewpattern-oid-box">
                <label>Total de impressões P&B:</label>
                <p>{pattern && pattern.oid_impressoesPB}</p>
              </div>
              <div className="viewpattern-oid-box">
                <label>Total de impressões color:</label>
                <p>{pattern && pattern.oid_impressoes_color}</p>
              </div>
              <div className="viewpattern-oid-box">
                <label>Total geral:</label>
                <p>{pattern && pattern.oid_total}</p>
              </div>
              <div className="viewpattern-oid-box">
                <label>Endereço de IP:</label>
                <p>{pattern && pattern.oid_endereco}</p>
              </div>
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