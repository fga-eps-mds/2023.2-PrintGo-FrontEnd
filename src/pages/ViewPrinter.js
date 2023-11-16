import React, { useEffect, useState } from "react";
import { getPrinterData } from "../api/api";
import '../style/pages/viewPrinter.css';
import login_ellipse from '../assets/login_ellipse.svg';
import voltar_vector from '../assets/voltar_vector.svg';
import Navbar from "../components/navbar/Navbar";

export default function ViewImpressora(){
    // Estado para armazenar os dados da impressora.
    const [printerData, setPrinterData] = useState([]);

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

    // Dados de uma impressora exemplo.
    const exampleData = {
        numeroSerie: "XXXX-000000",
        ip: "192.168.15.1",
        codigoLocadora: "PRINTER-004",
        contadorInstalacao: "0",
        dataInstalacao: "12/10/2023",
        contadorRetirada: "0",
        dataRetirada: "-",
        ultimoContador: "0",
        dataUltimoContador: "-",
        unidadePai: "1ª Delegacia Regional de Goiânia",
        unidadeFilha: "2ª Delegacia Municipal de Goiânia"
    }

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
                            <p id="viewprinter-info-header">Multifuncional P&B - Canon - MF1643i II</p>
                            <div id="viewprinter-info-line">
                                <div id="viewprinter-info-box">
                                    <label>Número de série</label>
                                    <p>{exampleData && exampleData.numeroSerie}</p>
                                </div>
                                <div id="viewprinter-info-box">
                                    <label>IP</label>
                                    <p>{exampleData && exampleData.ip}</p>
                                </div>
                            </div>
                            <div id="viewprinter-info-line">
                                <div id="viewprinter-info-box">
                                    <label>Código da locadora</label>
                                    <p>{exampleData && exampleData.codigoLocadora}</p>
                                </div>
                            </div>
                            <div id="viewprinter-info-line">
                                <div id="viewprinter-info-box">
                                    <label>Contador de instalação</label>
                                    <p>{exampleData && exampleData.contadorInstalacao}</p>
                                </div>
                                <div id="viewprinter-info-box">
                                    <label>Data de instalação</label>
                                    <p>{exampleData && exampleData.dataInstalacao}</p>
                                </div>
                            </div>
                            <div id="viewprinter-info-line">
                                <div id="viewprinter-info-box">
                                    <label>Contador de retirada</label>
                                    <p>{exampleData && exampleData.contadorRetirada}</p>
                                </div>
                                <div id="viewprinter-info-box">
                                    <label>Data de retirada</label>
                                    <p>{exampleData && exampleData.dataRetirada}</p>
                                </div>
                            </div>
                            <div id="viewprinter-info-line">
                                <div id="viewprinter-info-box">
                                    <label>Último contador</label>
                                    <p>{exampleData && exampleData.ultimoContador}</p>
                                </div>
                                <div id="viewprinter-info-box">
                                    <label>Data do último contador</label>
                                    <p>{exampleData && exampleData.dataUltimoContador}</p>
                                </div>
                            </div>
                            <div id="viewprinter-info-line">
                                <div id="viewprinter-info-box">
                                    <label>Unidade pai</label>
                                    <p>{exampleData && exampleData.unidadePai}</p>
                                </div>
                                <div id="viewprinter-info-box">
                                    <label>Unidade filha</label>
                                    <p>{exampleData && exampleData.unidadeFilha}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="elipse-viewprinter">
                        <img alt= "elipse"  src={login_ellipse}></img>
                    </div>
                </div>
            </div>
        </>
    );
}