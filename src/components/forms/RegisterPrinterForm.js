import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getLotacoes, createUser } from "../../api/api";
import "../../style/components/registerPrinterForms.css";
import elipse6 from '../../assets/elipse6.svg';


const registerPrinterSchema = yup.object().shape({
    padrao: yup.string().required('Padrão é obrigatório'),
    ip: yup.string().required('IP é obrigatório'),
    numeroSerie: yup.string().required('Número de série é obrigatório'),
    codigoLocadora: yup.string().required('Código da locadora é obrigatório'),
    contadorInstalacao: yup.string().required('Contador de instalação é obrigatório'),
    dataInstalacao: yup.string().required('Data de instalação é obrigatória'),
    contadorRetirada: yup.string().required('Contador de retirada é obrigatório'),
    dataRetirada: yup.string().required('Data de retirada é obrigatória'),
    ultimoContador: yup.string().required('Último contador é obrigatório'),
    dataUltimoContador: yup.string().required('Data do último contador é obrigatória'),
    unidadePai: yup.string().required('Unidade pai é obrigatória'),
    unidadeFilho: yup.string().required('Unidade filho é obrigatória'),
  });

export default function RegisterPrinterForm(){
    const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
    } = useForm({ resolver: yupResolver(registerPrinterSchema), mode: "onChange" });

  const onSubmit = async (data) => {
    await createUser(data);
    reset();
  }

    return(
        <div id="signup-card">
            <header id="form-header">
                Cadastrar impressora
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="input-group">
                    <div id="input-line">
                        <div id="input-box">
                            <label>Padrão<span>*</span></label>
                            <input {...register("padrao", {required: true} )} placeholder="Padrão" />
                            <span>{errors.padrao?.message}</span>
                        </div>

                        <div id="input-box">
                            <label>IP<span>*</span></label>
                            <input {...register("ip", {required: true})} placeholder="123.456.789.123" />
                            <span>{errors.ip?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Número de série<span>*</span></label>
                            <input {...register("numeroSerie", {required: true} )} placeholder="XXXX-000000" />
                            <span>{errors.numeroSerie?.message}</span>
                        </div>

                        <div id="input-box">
                            <label>Código da locadora<span>*</span></label>
                            <input {...register("codigoLocadora", {required: true})} placeholder="Código da Locadora" />
                            <span>{errors.codigoLocadora?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Contador de instalação<span>*</span></label>
                            <input {...register("contadorInstalacao", {required: true})} placeholder="Contador de instalação"/>
                            <span>{errors.contadorInstalacao?.message}</span>
                        </div>
                        <div id="input-box">
                            <label>Data de instalação<span>*</span></label>
                            <input {...register("dataInstalacao", {required: true})} placeholder="dd/mm/aaaa"/>
                            <span>{errors.dataInstalacao?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Contador de retirada<span>*</span></label>
                            <input {...register("contadorRetirada", {required: true})} placeholder="Contador de retirada"/>
                            <span>{errors.contadorRetirada?.message}</span>
                        </div>
                        <div id="input-box">
                            <label>Data de retirada<span>*</span></label>
                            <input {...register("dataRetirada", {required: true})} placeholder="dd/mm/aaaa"/>
                            <span>{errors.dataRetirada?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Último contador<span>*</span></label>
                            <input {...register("ultimoContador", {required: true})} placeholder="Último contador"/>
                            <span>{errors.ultimoContador?.message}</span>
                        </div>
                        <div id="input-box">
                            <label>Data do último contador<span>*</span></label>
                            <input {...register("dataUltimoContador", {required: true})} placeholder="dd/mm/aaaa"/>
                            <span>{errors.dataUltimoContador?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Unidade pai<span>*</span></label>
                            <input {...register("unidadePai", {required: true})} placeholder="Unidade pai"/>
                            <span>{errors.unidadePai?.message}</span>
                        </div>
                        <div id="input-box">
                            <label>Unidade filho<span>*</span></label>
                            <input {...register("unidadeFilho", {required: true})} placeholder="Unidade filho"/>
                            <span>{errors.unidadeFilho?.message}</span>
                        </div>
                    </div>
                </div>

                <div id="buttons">
                    <button className="form-button" type="button" id="cancelar-bnt" >CANCELAR</button>
                    <button className="form-button" type="submit" id="registrar-bnt" disabled={!isValid}>REGISTRAR</button>
                </div>
            </form>
            <div className="elipse-signup">
                <img alt= "elipse"  src={elipse6}></img>
            </div>
        </div>
    );
}