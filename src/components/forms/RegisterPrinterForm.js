import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createUser } from "../../api/api";
import "../../style/components/registerPrinterForms.css";
import elipse6 from "../../assets/elipse6.svg";

const fieldLabels = {
  padrao: "Padrão",
  ip: "IP",
  numeroSerie: "Número de Série",
  codigoLocadora: "Código da Locadora",
  contadorInstalacao: "Contador de Instalação",
  dataInstalacao: "Data de Instalação",
  contadorRetirada: "Contador de Retirada",
  dataRetirada: "Data de Retirada",
  ultimoContador: "Último Contador",
  dataUltimoContador: "Data do Último Contador",
  unidadePai: "Unidade Pai",
  unidadeFilho: "Unidade Filho",
};

const registerPrinterSchema = yup.object().shape({
  padrao: yup.string().required(`${fieldLabels.padrao} é obrigatório`),
  ip: yup.string().required(`${fieldLabels.ip} é obrigatório`),
  numeroSerie: yup
    .string()
    .required(`${fieldLabels.numeroSerie} é obrigatório`),
  codigoLocadora: yup
    .string()
    .required(`${fieldLabels.codigoLocadora} é obrigatório`),
  contadorInstalacao: yup
    .string()
    .required(`${fieldLabels.contadorInstalacao} é obrigatório`),
  dataInstalacao: yup
    .string()
    .required(`${fieldLabels.dataInstalacao} é obrigatória`),
  contadorRetirada: yup
    .string()
    .required(`${fieldLabels.contadorRetirada} é obrigatório`),
  dataRetirada: yup
    .string()
    .required(`${fieldLabels.dataRetirada} é obrigatória`),
  ultimoContador: yup
    .string()
    .required(`${fieldLabels.ultimoContador} é obrigatório`),
  dataUltimoContador: yup
    .string()
    .required(`${fieldLabels.dataUltimoContador} é obrigatória`),
  unidadePai: yup.string().required(`${fieldLabels.unidadePai} é obrigatória`),
  unidadeFilho: yup
    .string()
    .required(`${fieldLabels.unidadeFilho} é obrigatória`),
});

export default function RegisterPrinterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerPrinterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    await createUser(data);
    reset();
  };

  return (
    <div id="registerPrinter-card">
      <header id="form-header">Cadastrar impressora</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="input-group">
          {Object.values(fieldLabels).map((field, index) => (
            <div id="input-line" key={index}>
              <div id="input-box">
                <label>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  <span>*</span>
                </label>
                <input
                  {...register(field)}
                  placeholder={
                    field.includes("data")
                      ? "DD/MM/AAAA"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  } // Alteração aqui
                />
                <span>{errors[field]?.message}</span>
              </div>
            </div>
          ))}
        </div>
        <div id="buttons">
          <button className="form-button" type="button" id="cancelar-bnt">
            CANCELAR
          </button>
          <button className="form-button" type="submit" id="registrar-bnt">
            REGISTRAR
          </button>
        </div>
      </form>
      <div className="elipse-signup">
        <img alt="elipse" src={elipse6} />
      </div>
    </div>
  );
}
