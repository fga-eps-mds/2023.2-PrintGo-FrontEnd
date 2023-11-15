import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "../../style/components/printerPatternForm.css";
import elipse6 from "../../assets/elipse6.svg";

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

const registerPrinterSchema = yup.object().shape({
  tipo: yup.string().required(`${fieldLabels.tipo} é obrigatório`),
  marca: yup.string().required(`${fieldLabels.marca} é obrigatório`),
  modelo: yup.string().required(`${fieldLabels.modelo} é obrigatório`),
  snmp: yup
    .object()
    .shape({
      modeloImpressora: yup
        .string()
        .required(`${fieldLabels.snmp.modeloImpressora} é obrigatório`),
      numeroSerie: yup
        .string()
        .required(`${fieldLabels.snmp.numeroSerie} é obrigatório`),
      versaoFirmware: yup
        .string()
        .required(`${fieldLabels.snmp.versaoFirmware} é obrigatório`),
      tempoAtivo: yup
        .string()
        .required(`${fieldLabels.snmp.tempoAtivo} é obrigatório`),
      totalDigitalizacoes: yup
        .string()
        .required(`${fieldLabels.snmp.totalDigitalizacoes} é obrigatório`),
      totalCopiasPB: yup
        .string()
        .required(`${fieldLabels.snmp.totalCopiasPB} é obrigatório`),
      totalCopiasColorido: yup
        .string()
        .required(`${fieldLabels.snmp.totalCopiasColorido} é obrigatório`),
      totalImpressoesPB: yup
        .string()
        .required(`${fieldLabels.snmp.totalImpressoesPB} é obrigatório`),
      totalImpressoesColorido: yup
        .string()
        .required(`${fieldLabels.snmp.totalImpressoesColorido} é obrigatório`),
      totalGeral: yup
        .string()
        .required(`${fieldLabels.snmp.totalGeral} é obrigatório`),
      enderecoIP: yup
        .string()
        .required(`${fieldLabels.snmp.enderecoIP} é obrigatório`),
    })
    .required("SNMP é obrigatório"),
});

export default function EditPatternForm() {
  const {
    register,
    handleSubmit,
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

  return (
    <div id="printer-pattern-signup-card">
      <h2 id="printer-pattern-form-header">Edição de padrão de impressora</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="printer-pattern-input-group">
          <div id="printer-pattern-input-box">
            <div id="printer-pattern-fields">
              {["tipo", "marca", "modelo"].map((field, index) => (
                <div id="printer-pattern-input-line" key={index}>
                  <label>
                    {fieldLabels[field]}
                    <span>*</span>
                  </label>
                  <input
                    {...register(field)}
                    //style={{ width: '200px'}}  // Adjust the width as needed
                    placeholder={`Digite ${fieldLabels[field].toLowerCase()}`}
                  />
                  <span>{errors[field]?.message}</span>
                </div>
              ))}
            </div>

            {/* SNMP Fields */}
            <div id="printer-pattern-snmp-fields">
              <label>SNMP</label>
              {Object.keys(fieldLabels.snmp).map((subField, subIndex) => (
                <div id="snmp-fields-input-line" key={`sub-${subIndex}`}>
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
