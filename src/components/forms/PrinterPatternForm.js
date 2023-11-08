import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createUser } from "../../api/api";
import "../../style/components/printerPatternForm.css";
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

export default function PrinterPatternForm() {
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

  return (
    <div id="signup-card">
      <header id="form-header">
        Cadastrar padrão de impressora
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="input-group">
          {Object.keys(registerPrinterSchema.fields).map((field, index) => (
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
          <button className="form-button" type="submit" id="registrar-bnt" disabled={!isValid}>REGISTRAR</button>
        </div>
      </form>
      <div className="elipse-signup">
        <img alt="elipse" src={elipse6} />
      </div>
    </div>
  );
}
