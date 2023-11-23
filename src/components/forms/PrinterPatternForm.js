import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import "../../style/components/printerPatternForm.css";
import elipse6 from "../../assets/elipse6.svg";
import { getRegisterPrinterSchema } from "../utils/yupSchema";

const fieldLabels = {
  tipo: "Tipo",
  marca: "Marca",
  modelo: "Modelo",
  snmp: {
    modeloImpressora: "Modelo da impressora",
    numeroSerie: "Número de série",
    versaoFirmware: "Versão do Firmware",
    tempoAtivo: "Tempo ativo do sistema",
    totalDigitalizacoes: "Total de digitalizações",
    totalCopiasPB: "Total de cópias P&B",
    totalCopiasColorido: "Total de cópias coloridas",
    totalImpressoesPB: "Total de impressões P&B",
    totalImpressoesColorido: "Total de impressoões coloridas",
    totalGeral: "Total geral",
    enderecoIP: "Endereço IP",
  },
};


export default function PrinterPatternForm() {
  const registerPrinterSchema = getRegisterPrinterSchema(fieldLabels);
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
    <div id="printer-pattern-signup-card">
      <h2 id="printer-pattern-form-header">Cadastrar padrão de impressora</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="printer-pattern-input-group">
          <div id="printer-pattern-input-box">
            {/* Campos Principais */}
            <div id="printer-pattern-fields">
              {Object.entries(fieldLabels).filter(([key]) => key !== "snmp").map(([key, label]) => (
                <div id="printer-pattern-input-line" key={key}>
                  <label>
                    {label}
                    <span>*</span>
                  </label>
                  <input
                    {...register(key)}
                    placeholder={`Digite ${label.toLowerCase()}`}
                  />
                  <span>{errors[key]?.message}</span>
                </div>
              ))}
            </div>

            {/* Campos SNMP */}
            <div id="printer-pattern-snmp-fields">
              <label>SNMP</label>
              {Object.entries(fieldLabels.snmp).map(([subKey, subLabel]) => (
                <div id="snmp-fields-input-line" key={subKey}>
                  <label>
                    {subLabel}
                    <span>*</span>
                  </label>
                  <input
                    {...register(`snmp.${subKey}`)}
                    placeholder="Código OID"
                  />
                  <span>{errors[`snmp.${subKey}`]?.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="printer-pattern-buttons">
          <button className="printer-pattern-form-button" type="button" id="cancelar-bnt">CANCELAR</button>
          <button className="printer-pattern-form-button" type="submit" id="registrar-bnt">REGISTRAR</button>
        </div>
      </form>
      <div className="elipse-pattern">
        <img alt="elipse" src={elipse6} />
      </div>
    </div>
  );
}
export { fieldLabels };

