import * as yup from "yup";
import React from "react";
import "../../style/components/counterForm.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const impressoras = [];

const counterSchema = yup.object().shape({
    serial: yup.string().required('O número de série é obrigatório'),
    copiasPB: yup.number(),
    impressoesPB: yup.number(),
    copiasColor: yup.number(),
    impressoesColor: yup.number(),
    contadorGeral: yup.number(),
    dataEmissao: yup.date().required('A data de emissão é obrigatória').test('date-format', 'Data inválida. Use o formato dd/mm/aaaa', function(value) {
        if (!value) return true; // Aceita valor vazio, pois ele é opcional.
        // Verifica se a data está no formato dd/mm/aaaa
        return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value);
    }),
    horaEmissao: yup.string().test('time-format', 'Horário inválido. Use o formato hh:mm', function(value) {
        if (!value) return true; // Aceita valor vazio, pois ele é opcional.
        // Verifica se o horário está no formato hh:mm
        return /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(value);
    })
});

export default function CounterForm() {

    const {
        register,
        handleSubmit,
        formState: {errors, isValid },
        reset
    } = useForm({resolver: yupResolver(counterSchema), mode: "onChange"});

    const onSubmit = async (data) => {
        // A ser feito após o PrinterService.
        reset();
    }

    return (
        <div id="form-card">
            <div id="form-header">
                <h5>Inserir contador manual</h5>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="input-container">
                    <div id="input-line">
                        <div id="input-box">
                            <label>Número de série</label>
                            <input {...register("serial", {required: true})} placeholder="Número de série"/>
                            <span>{errors.serial?.message}</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}