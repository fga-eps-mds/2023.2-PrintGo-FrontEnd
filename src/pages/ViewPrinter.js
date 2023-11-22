import React, { useEffect, useState } from "react";
//import { getPrinterData } from "../api/api";
import '../style/pages/viewPrinter.css';
import ellipse from '../assets/login_ellipse.svg';
import voltar_vector from '../assets/voltar_vector.svg';
import Navbar from "../components/navbar/Navbar";

export default function ViewPrinter(){
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

    // Estado para armazenar os dados do padrão.
    const [patternData, setPatternData] = useState(
      {
        id: "",
        tipo: "Multifuncional P&B",
        marca: "Canon",
        modelo: "MF1643i II",
        numeroSerie: "",
        versaoFirmware: "",
        tempoAtivoSistema: "",
        totalDigitalizacoes: "",
        totalCopiasPB: "",
        totalCopiasColoridas: "",
        totalImpressoesPb: "",
        totalImpressoesColoridas: "",
        totalGeral: "",
        enderecoIp: "",
      }
    );

    // Estado para armazenar os dados da impressora.
    const [printerData, setPrinterData] = useState(
      {
        id: "",
        padrao_id: "",
        ip: "192.168.15.1",
        numeroSerie: "XXXX-000000",
        codigoLocadora: "PRINTER-004",
        contadorInstalacao: 0,
        ultimoContador: 0,
        dataInstalacao: "12/10/2023",
        dataUltimoContador: "20/11/2023",
        contadorRetirada: 0,
        dataRetirada: "12/10/2023",
        circunscricao: "1ª Delegacia Regional de Goiânia",
        unidade: "2ª Delegacia Municipal de Goiânia"
      }
    );

    /*
    useEffect( () => {
        // Função para buscar os dados na API.
        async function fetchPrinterData() {
            try {
                const data = await getPrinterData();
                setPrinterData(); // Atualiza o estado com os dados recebidos.
            } catch (error) {
                console.error('Erro ao obter os dados do serviço:', error);
            }
        }
        fetchPrinterData(); // Chame a função de busca.
    }, []);
    */

    return(
        <>
            <Navbar />
            <div id="container-viewprinter">
                <div id="viewprinter-left-content"></div>
                <div id="viewprinter-right-content">
                    <div id="viewprinter-card">
                        <div id="viewprinter-info-group">
                            <header id="viewprinter-card-header">
                                <img alt="" src={voltar_vector}></img>
                                <a href="">Voltar</a>
                            </header>
                            <p id="viewprinter-info-header">
                              {patternData.tipo} - {patternData.marca} - {patternData.modelo}
                            </p>
                            <div id="viewprinter-info-line">
                                {Object.entries(infoLabels).map(([key, label]) => (
                                  <div key={key} id="viewprinter-info-box">
                                    <label>{label}</label>
                                    <p>{printerData && printerData[key]}</p>
                                  </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="elipse-viewprinter">
                        <img alt= "elipse"  src={ellipse}></img>
                    </div>
                </div>
            </div>
        </>
    );
}