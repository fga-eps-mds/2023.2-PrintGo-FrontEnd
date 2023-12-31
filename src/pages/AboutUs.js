import React from "react";
import "../style/pages/aboutUs.css";
import PoliciaCivilLogo from "../assets/PoliciaCivilLogo.svg";
import elipse from "../assets/home_elipse.svg";
import Navbar from "../components/navbar/Navbar";

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="container-about-us">
        <div className="texto">
          <h2 className="h2-label">Quem Somos</h2>
          <p>
            O PrintGO tem a finalidade de corrigir o problema chave que foi
            definido junto com a visão do produto, que diz: Os servidores da
            Polícia Civil do Goiás não possuem uma ferramenta de monitoração de
            impressoras e impressão, mesmo que os servidores precisem monitorar
            e registrar valores de contadores nas unidades policias nos
            municípios de Goiás. O PrintGO é uma ferramenta de monitoramento de
            ativos de impressão que simplifica a tarefa de monitorar e registrar
            informações relacionadas ao uso e manutenção das impressoras de
            forma a garantir um acompanhamento preciso e eficaz.
          </p>
          <p>
            A aplicação web foi feita sob encomenda para a Polícia Civil do
            estado do Goiás pela Universidade de Brasília, UnB, sob supervisão
            das disciplinas de EPS e MDS juntamente com seus monitores e
            professor.
          </p>
        </div>
        <div className="logo-about-us">
          <img
            src={PoliciaCivilLogo}
            alt="PoliciaCivilLogo"
            className="PoliciaCivilLogo"
          />
        </div>

        <div className="ellipse-about">
          <img alt="" src={elipse}></img>
        </div>
      </div>
    </>
  );
}
