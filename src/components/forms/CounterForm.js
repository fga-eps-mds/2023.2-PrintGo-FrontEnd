import * as yup from "yup";
import React from "react";
import "../../style/components/counterForm.css";
import download_pdf from "../../assets/Paper-Download.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const impressoras = [];

const counterSchema = yup.object().shape({
    serial: yup.string()
        .required('O número de série é obrigatório'),
    copiasPB: yup.string()
        .matches(/^\d+$/, 'O contador deve ser um número'),
    impressoesPB: yup.string()
        .matches(/^\d+$/, 'O contador deve ser um número'),
    copiasColor: yup.string()
        .matches(/^\d+$/, 'O contador deve ser um número'),
    impressoesColor: yup.string()
        .matches(/^\d+$/, 'O contador deve ser um número'),
    contadorGeral: yup.string()
        .matches(/^\d+$/, 'O contador deve ser um número'),
    dataEmissao: yup.date()
        .required('A data de emissão é obrigatória'),
    horaEmissao: yup.string()
        .required('O horário de emissão é obrigatória')
        .matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, 'Horário inválido. Use o formato hh:mm'),
    relatorioPDF: yup.mixed()
        .test('required', 'O relatório PDF é obrigatório', (value) => {
            // Verifica se o campo de arquivo foi preenchido
            return value && value.length > 0;
        })
    });

export default function CounterForm() {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm({ resolver: yupResolver(counterSchema), mode: "onChange" });

    const onSubmit = async (data) => {
        // A ser feito após o PrinterService.
        reset();
    }

    return (
        <div id="counter-form-card">
            <div id="form-header">
                <h5>Inserir contador manual</h5>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="input-container">
                    <div id="input-line">
                        <div id="input-box">
                            <label>Número de série</label>
                            <input {...register("serial", { required: true })} placeholder="Número de série" />
                            <span>{errors.serial?.message}</span>
                            <div id="arquivo-instrucional">
                                <a href="" download>
                                    <img alt="" src={ download_pdf }></img>
                                    Arquivo instrucional
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Cópias P&B</label>
                            <input {...register("copiasPB", { required: true })} placeholder="Valor do contador" />
                            <span>{errors.copiasPB?.message}</span>
                        </div>
                        <div id="input-box">
                            <label>Impressões P&B</label>
                            <input {...register("impressoesPB", { required: true })} placeholder="Valor do contador" />
                            <span>{errors.impressoesPB?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Cópias color</label>
                            <input {...register("copiasColor", { required: true })} placeholder="Valor do contador" />
                            <span>{errors.copiasColor?.message}</span>
                        </div>
                        <div id="input-box">
                            <label>Impressões color</label>
                            <input {...register("impressoesColor", { required: true })} placeholder="Valor do contador" />
                            <span>{errors.impressoesColor?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Contador geral</label>
                            <input {...register("contadorGeral", { required: true })} placeholder="Valor do contador" />
                            <span>{errors.contadorGeral?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Data de emissão</label>
                            <input {...register("dataEmissao", { required: true })} type="date" placeholder="dd/mm/aaaa" />
                            <span>{errors.dataEmissao?.message}</span>
                        </div>
                        <div id="input-box">
                            <label>Horário de emissão</label>
                            <input {...register("horaEmissao", { required: true })} placeholder="hh:mm" />
                            <span>{errors.horaEmissao?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Anexar relatório</label>
                            <input {...register("relatorioPDF", { required: true })} type="file" accept=".pdf" />
                            <span>{errors.relatorioPDF?.message}</span>
                        </div>
                    </div>
                </div>

                <div id="form-buttons">
                    <button className="form-button" type="button" id="cancel-bnt" >CANCELAR</button>
                    <button className="form-button" type="submit" id="insert-bnt" disabled={!isValid}>INSERIR</button>
                </div>

            </form>
        </div>
    );
}