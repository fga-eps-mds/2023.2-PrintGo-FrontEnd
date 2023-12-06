import * as yup from 'yup';

export const getPrinterSchema = (printerFieldLabels) => {


  return yup.object().shape({
    padrao_id: yup.string().required(`${printerFieldLabels.padrao_id} é obrigatório`),
    ip: yup.string().required(`${printerFieldLabels.ip} é obrigatório`),
    numeroSerie: yup.string().required(`${printerFieldLabels.numeroSerie} é obrigatório`),
    codigoLocadora: yup.string().required(`${printerFieldLabels.codigoLocadora} é obrigatório`),
    contadorInstalacao: yup.number().required(`${printerFieldLabels.contadorInstalacao} é obrigatório`),
    dataInstalacao: yup.string().required(`${printerFieldLabels.dataInstalacao} é obrigatória`),
    contadorRetiradas: yup.number().required(`${printerFieldLabels.contadorRetiradas} é obrigatório`),
    dataContadorRetirada: yup.string().required(`${printerFieldLabels.dataContadorRetirada} é obrigatória`),
    ultimoContador: yup.number().required(`${printerFieldLabels.ultimoContador} é obrigatório`),
    dataUltimoContador: yup.string().required(`${printerFieldLabels.dataUltimoContador} é obrigatória`),
    unidadeId: yup.string().required(`${printerFieldLabels.unidadeId} é obrigatória`),
  });
};


export const getRegisterPrinterSchema = (fieldLabels) => {

  return yup.object().shape({
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
};

