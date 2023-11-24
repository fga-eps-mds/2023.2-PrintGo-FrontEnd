import { getPrinterSchema , getRegisterPrinterSchema } from '../../components/utils/YupSchema';

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
      padrao: 'Padrão Teste',
      ip: '192.168.0.1',
      numeroSerie: '12345678',
      codigoLocadora: '123',
      contadorInstalacao: '10',
      dataInstalacao: '01/01/2021',
      contadorRetirada: '5',
      dataRetirada: '01/02/2021',
      ultimoContador: '15',
      dataUltimoContador: '01/03/2021',
      unidadePai: 'Unidade001',
      unidadeFilho: 'Unidade002',
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

describe('getRegisterPrinterSchema', () => {
  const fieldLabels = {
    tipo: "Tipo",
    marca: "Marca",
    modelo: "Modelo",
    snmp: {
      modeloImpressora: "Modelo da Impressora",
      numeroSerie: "Número de Série",
      versaoFirmware: "Versão do Firmware",
      tempoAtivo: "Tempo Ativo",
      totalDigitalizacoes: "Total de Digitalizações",
      totalCopiasPB: "Total de Cópias P&B",
      totalCopiasColorido: "Total de Cópias Coloridas",
      totalImpressoesPB: "Total de Impressões P&B",
      totalImpressoesColorido: "Total de Impressões Coloridas",
      totalGeral: "Total Geral",
      enderecoIP: "Endereço IP",
    }
  };

  it('validates correctly with valid data', async () => {
    const validData = {
      tipo: 'Laser',
      marca: 'Marca Teste',
      modelo: 'Modelo Teste',
      snmp: {
        modeloImpressora: 'Modelo Impressora Teste',
        numeroSerie: '12345678',
        versaoFirmware: 'v1.0.0',
        tempoAtivo: '100 horas',
        totalDigitalizacoes: '1000',
        totalCopiasPB: '500',
        totalCopiasColorido: '500',
        totalImpressoesPB: '1000',
        totalImpressoesColorido: '1000',
        totalGeral: '4000',
        enderecoIP: '192.168.1.1',
      }
    };

    const schema = getRegisterPrinterSchema(fieldLabels);
    await expect(schema.validate(validData)).resolves.toEqual(validData);
  });

  it('rejects with invalid data', async () => {
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
});
