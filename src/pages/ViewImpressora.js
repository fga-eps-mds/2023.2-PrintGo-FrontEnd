import React,{ useState } from "react";
import '../style/pages/viewImpressora.css';
import login_ellipse from '../assets/login_ellipse.svg';
import voltar_vector from '../assets/voltar_vector.svg'

export default function ViewImpressora(){
    return(
        <div id="container-view">
            <div id="left-content">
                
            </div>
            <div id="view-card">
                <div id="info-group">
                    <header id="card-header">
                        <img alt="" src={voltar_vector}></img>
                        <a href="#">Voltar</a>
                    </header>
                    <p id="cabecalho">Multifuncional Colorida - HP - Laser 107 A</p>
                    <div id="info-line">
                        <div id="info-box">
                            <label>Número de série</label>
                            <p>XXXX-000000</p>
                        </div>
                        <div id="info-box">
                            <label>IP</label>
                            <p>192.168.15.1</p>
                        </div>
                    </div>
                    <div id="info-line">
                        <div id="info-box">
                            <label>MIB</label>
                            <p>HP.json</p>
                        </div>
                        <div id="info-box">
                            <label>Código da locadora</label>
                            <p>xMnp0-A</p>
                        </div>
                    </div>
                    <div id="info-line">
                        <div id="info-box">
                            <label>Contador de instalação</label>
                            <p>0</p>
                        </div>
                        <div id="info-box">
                            <label>Data de instalação</label>
                            <p>12/10/2023</p>
                        </div>
                    </div>
                    <div id="info-line">
                        <div id="info-box">
                            <label>Contador de retirada</label>
                            <p>0</p>
                        </div>
                        <div id="info-box">
                            <label>Data de retirada</label>
                            <p>-</p>
                        </div>
                    </div>
                    <div id="info-line">
                        <div id="info-box">
                            <label>Unidade de localização</label>
                            <p>Catalão</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="elipse-view">
                <img alt= "elipse"  src={login_ellipse}></img>
            </div>
        </div>
    );
}