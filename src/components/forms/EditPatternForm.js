import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../style/components/printerPatternForm.css";
import elipse6 from "../../assets/elipse6.svg";
import { getRegisterPatternSchema } from "../utils/YupSchema";

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


const testObject = {
  tipo: "teste",
  marca: "Marcateste",
  modelo: "Modeloteste",
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


export default function EditPatternForm() {
  const registerPrinterSchema = getRegisterPatternSchema(fieldLabels);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(registerPrinterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log(data);

    reset();
  };

  useEffect(() => {
    Object.entries(testObject).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [setValue]);

  return (
    <div id="printer-pattern-signup-card">
      <h2 id="printer-pattern-form-header">Edição de padrão de impressora</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="printer-pattern-input-group">
          <div id="printer-pattern-input-box">
            <div id="printer-pattern-fields">
              {["tipo", "marca", "modelo"].map((field) => (
                <div id="printer-pattern-input-line" key={field.id}>
                  <label>
                    {fieldLabels[field]}
                    <span>*</span>
                  </label>
                  <input
                    {...register(field)}
                    placeholder={`Digite ${fieldLabels[field].toLowerCase()}`}
                  />
                  <span>{errors[field]?.message}</span>
                </div>
              ))}
            </div>

            {/* SNMP Fields */}
            <div id="printer-pattern-snmp-fields">
              <label htmlFor="snmp">SNMP</label>
              {Object.keys(fieldLabels.snmp).map((subField) => (
                <div id="snmp-fields-input-line" key={`sub-${subField.id}`}>
                  <label>
                    {fieldLabels.snmp[subField]}
                    <span>*</span>
                  </label>
                  {[
                    "modeloImpressora",
                    "numeroSerie",
                    "versaoFirmware",
                    "tempoAtivo",
                    "totalDigitalizacoes",
                    "totalCopiasPB",
                    "totalCopiasColorido",
                    "totalImpressoesPB",
                    "totalImpressoesColorido",
                    "totalGeral",
                    "enderecoIP",
                  ].includes(subField) ? (
                    <input
                      {...register(`snmp.${subField}`)}
                      //style={{ width: '200px' }}  // Adjust the width as needed
                      placeholder="Código OID"
                    />
                  ) : (
                    <input
                      {...register(`snmp.${subField}`)}
                      style={{ width: "200px" }} // Adjust the width as needed
                      placeholder={`Digite ${fieldLabels.snmp[
                        subField
                      ].toLowerCase()}`}
                    />
                  )}
                  <span>{errors[`snmp.${subField}`]?.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="printer-pattern-buttons">
          <button
            className="printer-pattern-form-button"
            type="button"
            id="cancelar-bnt"
          >
            EXCLUIR
          </button>
          <button
            className="printer-pattern-form-button"
            type="submit"
            id="registrar-bnt"
            disabled={!isValid}
          >
            SALVAR
          </button>
        </div>
      </form>
      <div className="elipse-pattern">
        <img alt="elipse" src={elipse6} />
      </div>
    </div>
  );
}
