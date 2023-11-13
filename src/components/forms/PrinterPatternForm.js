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
    codigoOID: yup.string().required('Código OID é obrigatório'),
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
    // Coloque a lógica para criar usuário ou qualquer outra coisa aqui
    reset();
  };

  return (
    <div id="signup-card">
      <header id="form-header">
        Cadastrar padrão de impressora
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="input-group" style={{ display: 'flex' }}>
          {/* SNMP Fields */}
          <div style={{ flex: 1 }}>
            {Object.keys(registerPrinterSchema.fields).map((field, index) => (
              field === 'snmp' && (
                <div id="input-line" key={index}>
                  <div id="input-box">
                    <label>SNMP</label>
                    {Object.keys(fieldLabels[field]).map((subField, subIndex) => (
                      <div id="input-line" key={`sub-${subIndex}`}>
                        <div id="input-box">
                          <label>{fieldLabels[field][subField]}<span>*</span></label>
                          {['modeloImpressora', 'numeroSerie', 'versaoFirmware', 'tempoAtivo', 'totalDigitalizacoes', 'totalCopiasPB', 'totalCopiasColorido', 'totalImpressoesPB', 'totalImpressoesColorido', 'totalGeral', 'enderecoIP'].includes(subField) ? (
                            <input
                              {...register(`${field}.${subField}`)}
                              placeholder="Código OID"
                            />
                          ) : (
                            <input
                              {...register(`${field}.${subField}`)}
                              placeholder={`Digite ${fieldLabels[field][subField].toLowerCase()}`}
                            />
                          )}
                          <span>{errors[`${field}.${subField}`]?.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
  
          {/* Other Fields */}
          <div style={{ flex: 1 }}>
            {Object.keys(registerPrinterSchema.fields).map((field, index) => (
              field !== 'snmp' && (
                <div id="input-line" key={index}>
                  <div id="input-box">
                    <label>{fieldLabels[field]}<span>*</span></label>
                    <input
                      {...register(field)}
                      placeholder={`Digite ${fieldLabels[field].toLowerCase()}`}
                    />
                    <span>{errors[field]?.message}</span>
                  </div>
                </div>
              )
            ))}
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
