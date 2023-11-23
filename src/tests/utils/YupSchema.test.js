import { getPrinterSchema } from '../../components/utils/YupSchema'; // Substitua pelo caminho correto

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
