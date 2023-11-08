import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createUser } from "../../api/api";
import "../../style/components/editPrinterForms.css";
import elipse6 from '../../assets/elipse6.svg';

const editPrinterSchema = yup.object().shape({
  Tipo: yup.string().required('Tipo é obrigatório'),
  Marca: yup.string().required('Marca é obrigatório'),
  Modelo: yup.string().required('Modelo é obrigatório'),
  ModeloDaImpressora: yup.string().required('Modelo da impressora é obrigatório'),
  NumeroDeSerie: yup.string().required('Número de série é obrigatório'),
  VersaoDeFirmware: yup.string().required('Versão de Firmware é obrigatória'),
  TempoAtivoDoSistema: yup.string().required('Tempo ativo do sistema é obrigatório'),
  TotalDeDigitalizacoes: yup.string().required('Total de digitalizações é obrigatória'),
  TotalDeCopiasPB: yup.string().required('Total de cópias P&B é obrigatório'),
  TotalDeImpressoesColor: yup.string().required('Total de impressoes coloridas é obrigatória'),
  TotalGeral: yup.string().required('Total geral é obrigatória'),
  EnderecoDeIp: yup.string().required('Endereço de IP é obrigatória'),
});

export default function EditPrinterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors},
    reset
  } = useForm({ resolver: yupResolver(editPrinterSchema), mode: "onChange" });

  const onSubmit = async (data) => {
    await createUser(data);
    reset();
  }

  return (
    <div id="editPrinter-card">
      <div id="buttons">
        <button className="form-button" type="button" id="voltar-bnt">Voltar</button>
      </div>
      <header id="form-header">
        Editar impressora
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="input-group">
          {Object.keys(editPrinterSchema.fields).map((field, index) => (
            <div id="input-line" key={index}>
              <div id="input-box">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}<span>*</span></label>
                <input
                    {...register(field)}
                    placeholder={field.includes('data') ? 'DD/MM/AAAA' : field.charAt(0).toUpperCase() + field.slice(1)} // Alteração aqui
                />
                <span>{errors[field]?.message}</span>
              </div>
            </div>
          ))}
        </div>
        <div id="buttons">
          <button className="form-button" type="button" id="cancelar-bnt">CANCELAR</button>
          <button className="form-button" type="submit" id="editar-bnt">EDITAR</button>
        </div>
      </form>
      <div className="elipse-signup">
        <img alt="elipse" src={elipse6} />
      </div>
    </div>
  );
}
