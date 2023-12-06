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
  modeloImpressora: yup
    .string()
    .required(`${fieldLabels.snmp.modeloImpressora} é obrigatório`),
  numeroSerie: yup
    .string()
    .required(`${fieldLabels.snmp.numeroSerie} é obrigatório`),
  versaoFirmware: yup
    .string()
    .required(`${fieldLabels.snmp.versaoFirmware} é obrigatório`),
  tempoAtivoSistema: yup
    .string()
    .required(`${fieldLabels.snmp.tempoAtivoSistema} é obrigatório`),
  totalDigitalizacoes: yup
    .string()
    .required(`${fieldLabels.snmp.totalDigitalizacoes} é obrigatório`),
  totalCopiasPB: yup
    .string()
    .required(`${fieldLabels.snmp.totalCopiasPB} é obrigatório`),
  totalCopiasColoridas: yup
    .string()
    .required(`${fieldLabels.snmp.totalCopiasColoridas} é obrigatório`),
  totalImpressoesPb: yup
    .string()
    .required(`${fieldLabels.snmp.totalImpressoesPb} é obrigatório`),
  totalImpressoesColoridas: yup
    .string()
    .required(`${fieldLabels.snmp.totalImpressoesColoridas} é obrigatório`),
  totalGeral: yup
    .string()
    .required(`${fieldLabels.snmp.totalGeral} é obrigatório`),
  enderecoIp: yup
    .string()
    .required(`${fieldLabels.snmp.enderecoIp} é obrigatório`),
  });
}

