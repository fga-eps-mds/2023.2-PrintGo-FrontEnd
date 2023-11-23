import * as yup from 'yup';

export const getPrinterSchema = (printerFieldLabels) => {


  return yup.object().shape({
    padrao: yup.string().required(`${printerFieldLabels.padrao} é obrigatório`),
    ip: yup.string().required(`${printerFieldLabels.ip} é obrigatório`),
    numeroSerie: yup.string().required(`${printerFieldLabels.numeroSerie} é obrigatório`),
    codigoLocadora: yup.string().required(`${printerFieldLabels.codigoLocadora} é obrigatório`),
    contadorInstalacao: yup.string().required(`${printerFieldLabels.contadorInstalacao} é obrigatório`),
    dataInstalacao: yup.string().required(`${printerFieldLabels.dataInstalacao} é obrigatória`),
    contadorRetirada: yup.string().required(`${printerFieldLabels.contadorRetirada} é obrigatório`),
    dataRetirada: yup.string().required(`${printerFieldLabels.dataRetirada} é obrigatória`),
    ultimoContador: yup.string().required(`${printerFieldLabels.ultimoContador} é obrigatório`),
    dataUltimoContador: yup.string().required(`${printerFieldLabels.dataUltimoContador} é obrigatória`),
    unidadePai: yup.string().required(`${printerFieldLabels.unidadePai} é obrigatória`),
    unidadeFilho: yup.string().required(`${printerFieldLabels.unidadeFilho} é obrigatória`),
  });
};


