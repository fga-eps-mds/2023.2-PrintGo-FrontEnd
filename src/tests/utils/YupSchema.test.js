import { getPrinterSchema , getRegisterPrinterSchema , getPasswordSchema } from '../../components/utils/YupSchema';

describe('getPrinterSchema', () => {
  const printerFieldLabels = {
    padrao: "Padrão",
    ip: "IP",
    numeroSerie: "Número de Série",
    codigoLocadora: "Código da Locadora",
    contadorInstalacao: "Contador de Instalação",
    dataInstalacao: "Data de Instalação",
    contadorRetirada: "Contador de Retirada",
    dataRetirada: "Data de Retirada",
    ultimoContador: "Último Contador",
    dataUltimoContador: "Data do Último Contador",
    unidadePai: "Unidade Pai",
    unidadeFilho: "Unidade Filho",
  };

  it('validates correctly with valid data', async () => {
    const validData = {
      padrao_id: 'Padrão Teste',          
      ip: '192.168.0.1',
      numeroSerie: '12345678',
      codigoLocadora: '123',
      contadorInstalacao: 10,            
      dataInstalacao: '01/01/2021',
      contadorRetiradas: 5,               
      dataContadorRetirada: '01/02/2021', 
      ultimoContador: 15,                 
      dataUltimoContador: '01/03/2021',
      unidadeId: 'Unidade002',            
    };
  
    const schema = getPrinterSchema(printerFieldLabels);
    await expect(schema.validate(validData)).resolves.toEqual(validData);
  });
  

  it('rejects with invalid data', async () => {
    const invalidData = {
      padrao: '', // campo obrigatório vazio
      ip: '192.168.0', // formato de IP inválido
      // outros campos podem ser adicionados aqui para testar a validação
    };

    const schema = getPrinterSchema(printerFieldLabels);
    await expect(schema.validate(invalidData)).rejects.toThrow();
  });
});

/*describe('getRegisterPrinterSchema', () => {
  const fieldLabels = {
    padrao: "Padrão",
    ip: "IP",
    numeroSerie: "Número de Série",
    codigoLocadora: "Código da Locadora",
    contadorInstalacao: "Contador de Instalação",
    dataInstalacao: "Data de Instalação",
    contadorRetirada: "Contador de Retirada",
    dataRetirada: "Data de Retirada",
    ultimoContador: "Último Contador",
    dataUltimoContador: "Data do Último Contador",
    unidadePai: "Unidade Pai",
    unidadeFilho: "Unidade Filho",
  };

  it('rejects with void data', async () => {
    const invalidData = {
      tipo: '',
      marca: '',
      modelo: '',
      snmp: {
        modeloImpressora: '',
        numeroSerie: '',
        versaoFirmware: '',
        tempoAtivo: '',
        totalDigitalizacoes: '',
        totalCopiasPB: '',
        totalCopiasColorido: '',
        totalImpressoesPB: '',
        totalImpressoesColorido: '',
        totalGeral: '',
        enderecoIP: '',
      }
    };

    const schema = getRegisterPrinterSchema(fieldLabels);
    await expect(schema.validate(invalidData)).rejects.toThrow();
  });
});*/

describe('getPasswordSchema', () => {

  it('validates correctly with valid data', async () => {
    const validData = {
      novaSenha: 'Password@123',
      confirmacaoNovaSenha: 'Password@123'
    };

    const schema = getPasswordSchema();
    await expect(schema.validate(validData)).resolves.toEqual(validData);
  });

  it('rejects with invalid password', async () => {
    const invalidData = {
      novaSenha: 'pass', // senha muito curta e sem os requisitos necessários
      confirmacaoNovaSenha: 'pass'
    };

    const schema = getPasswordSchema();
    await expect(schema.validate(invalidData)).rejects.toThrow();
  });

  it('rejects when passwords do not match', async () => {
    const mismatchedData = {
      novaSenha: 'Password@123',
      confirmacaoNovaSenha: 'Different@123'
    };

    const schema = getPasswordSchema();
    await expect(schema.validate(mismatchedData)).rejects.toThrow();
  });
});