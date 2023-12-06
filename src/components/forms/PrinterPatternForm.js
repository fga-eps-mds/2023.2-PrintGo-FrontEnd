import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import "../../style/components/printerPatternForm.css";
import elipse6 from "../../assets/elipse6.svg";
import { getRegisterPrinterSchema } from "../utils/YupSchema";
import { ReloadIcon } from "@radix-ui/react-icons";

const fieldLabels = {
  tipo: "Tipo",
  marca: "Marca",
  modelo: "Modelo",
  snmp: {
    modeloImpressora: "Modelo da impressora",
    numeroSerie: "Número de série",
    versaoFirmware: "Versão do Firmware",
    tempoAtivoSistema: "Tempo ativo do sistema",
    totalDigitalizacoes: "Total de digitalizações",
    totalCopiasPB: "Total de cópias P&B",
    totalCopiasColoridas: "Total de cópias coloridas",
    totalImpressoesPB: "Total de impressões P&B",
    totalImpressoesColoridas: "Total de impressoões coloridas",
    totalGeral: "Total geral",
    enderecoIP: "Endereço IP",
  },
};


export default function PrinterPatternForm() {
  const registerPrinterSchema = getRegisterPrinterSchema(fieldLabels);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(registerPrinterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const convertedObject = {
      tipo: data.tipo,
      marca: data.marca,
      modelo: data.modelo,
      ...data.snmp 
    };
    
    console.log(convertedObject);
    // reset();
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

            <div id="printer-pattern-snmp-fields">
              <label htmlFor="snmp">SNMP</label>
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
          <button className="form-button" type="submit" id="registrar-bnt" disabled={!isValid ||isSubmitting}>
            {isSubmitting && (
              <ReloadIcon id="animate-spin"/>
            )}
            {!isSubmitting ? 'REGISTRAR': "CADASTRANDO"}
          </button>
        </div>
      </form>
      <div className="elipse-pattern">
        <img alt="elipse" src={elipse6} />
      </div>
    </div>
  );
}
export { fieldLabels };

