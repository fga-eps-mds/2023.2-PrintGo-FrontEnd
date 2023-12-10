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

export const getPasswordSchema = () => {
  return yup.object().shape({
    novaSenha: yup.string()
      .required('Senha é obrigatória')
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
      ),
    confirmacaoNovaSenha: yup.string()
      .oneOf([yup.ref('novaSenha'), null], 'As senhas devem corresponder')
      .required('Confirmação de senha é obrigatória')
  });
};
