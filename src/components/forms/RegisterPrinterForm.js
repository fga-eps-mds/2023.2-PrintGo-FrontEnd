import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

import "../../style/components/registerPrinterForms.css";
import elipse6 from "../../assets/elipse6.svg";
import { getPrinterSchema } from "../utils/YupSchema";

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



export default function RegisterPrinterForm() {
  const registerPrinterSchema = getPrinterSchema(fieldLabels);
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
    console.log(data);
    reset();
  };

  return (
    <div id="registerPrinter-card">
      <header id="form-header">Cadastrar impressora</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="input-group">
          {Object.entries(fieldLabels).map(([key, label]) => (
            <div id="input-line" key={key}>
              <div id="input-box">
                <label>
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                  <span>*</span>
                </label>
                <input
                  {...register(key)}
                  placeholder={
                    label.includes("data")
                      ? "DD/MM/AAAA"
                      : label.charAt(0).toUpperCase() + label.slice(1)
                  } 
                />
                <span>{errors[key]?.message}</span>
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

export {fieldLabels};
