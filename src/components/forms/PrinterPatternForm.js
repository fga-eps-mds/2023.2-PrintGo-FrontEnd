import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "../../style/components/printerPatternForm.css";
import elipse6 from '../../assets/elipse6.svg';

const fieldLabels = {
  tipo: 'Padrão',
  marca: 'IP',
  modelo: 'Modelo',
  snmp: {
    modeloImpressora: 'Modelo da impressora',
    numeroSerie: 'Número de série',
    versaoFirmware: 'Versão do Firmware',
    tempoAtivo: 'Tempo ativo do sistema',
    totalDigitalizacoes: 'Total de digitalizações',
    totalCopiasPB: 'Total de cópias P&B',
    totalCopiasColorido: 'Total de cópias coloridas',
    totalImpressoesPB: 'Total de impressões P&B',
    totalImpressoesColorido: 'Total de impressoões coloridas',
    totalGeral: 'Total geral',
    enderecoIP: 'Endereço IP',
  }
};

const registerPrinterSchema = yup.object().shape({
  tipo: yup.string().required(`${fieldLabels.tipo} é obrigatório`),
  marca: yup.string().required(`${fieldLabels.marca} é obrigatório`),
  modelo: yup.string().required(`${fieldLabels.modelo} é obrigatório`),
  snmp: yup.object().shape({
    modeloImpressora: yup.string().required(`${fieldLabels.snmp.modeloImpressora} é obrigatório`),
    numeroSerie: yup.string().required(`${fieldLabels.snmp.numeroSerie} é obrigatório`),
    versaoFirmware: yup.string().required(`${fieldLabels.snmp.versaoFirmware} é obrigatório`),
    tempoAtivo: yup.string().required(`${fieldLabels.snmp.tempoAtivo} é obrigatório`),
    totalDigitalizacoes: yup.string().required(`${fieldLabels.snmp.totalDigitalizacoes} é obrigatório`),
    totalCopiasPB: yup.string().required(`${fieldLabels.snmp.totalCopiasPB} é obrigatório`),
    totalCopiasColorido: yup.string().required(`${fieldLabels.snmp.totalCopiasColorido} é obrigatório`),
    totalImpressoesPB: yup.string().required(`${fieldLabels.snmp.totalImpressoesPB} é obrigatório`),
    totalImpressoesColorido: yup.string().required(`${fieldLabels.snmp.totalImpressoesColorido} é obrigatório`),
    totalGeral: yup.string().required(`${fieldLabels.snmp.totalGeral} é obrigatório`),
    enderecoIP: yup.string().required(`${fieldLabels.snmp.enderecoIP} é obrigatório`),
  }).required('SNMP é obrigatório'),
});

export default function PrinterPatternForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({ resolver: yupResolver(registerPrinterSchema), mode: "onChange" });

  const onSubmit = async (data) => {
    console.log(data);
    // Add logic to create user or perform other actions here
    reset();
  };

  return (
    <div id="signup-card">
      <header id="form-header">
        Cadastrar padrão de impressora
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="input-group">
          <div id="input-box">
            {/* Other Fields */}
            <div>
              {['tipo', 'marca', 'modelo'].map((field, index) => (
                <div id="input-line" key={index}>
                  <label>{fieldLabels[field]}<span>*</span></label>
                  <input
                    {...register(field)}
                    style={{ width: '200px' }}  // Adjust the width as needed
                    placeholder={`Digite ${fieldLabels[field].toLowerCase()}`}
                  />
                  <span>{errors[field]?.message}</span>
                </div>
              ))}
            </div>

            {/* SNMP Fields */}
            <div>
              <label>SNMP</label>
              {Object.keys(fieldLabels.snmp).map((subField, subIndex) => (
                <div id="input-line" key={`sub-${subIndex}`}>
                  <label>{fieldLabels.snmp[subField]}<span>*</span></label>
                  {['modeloImpressora', 'numeroSerie', 'versaoFirmware', 'tempoAtivo', 'totalDigitalizacoes', 'totalCopiasPB', 'totalCopiasColorido', 'totalImpressoesPB', 'totalImpressoesColorido', 'totalGeral', 'enderecoIP'].includes(subField) ? (
                    <input
                      {...register(`snmp.${subField}`)}
                      style={{ width: '200px' }}  // Adjust the width as needed
                      placeholder="Código OID"
                    />
                  ) : (
                    <input
                      {...register(`snmp.${subField}`)}
                      style={{ width: '200px' }}  // Adjust the width as needed
                      placeholder={`Digite ${fieldLabels.snmp[subField].toLowerCase()}`}
                    />
                  )}
                  <span>{errors[`snmp.${subField}`]?.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="buttons">
          <button className="form-button" type="button" id="cancelar-bnt">
            CANCELAR
          </button>
          <button
            className="form-button"
            type="submit"
            id="registrar-bnt"
            disabled={!isValid}
          >
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
