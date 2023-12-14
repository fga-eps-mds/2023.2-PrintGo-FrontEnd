import { waitFor } from '@testing-library/react';
import { createImpressora, editImpressora, createPadraoImpressora, getPadrao,
         getPadroes, getPrinters, togglePattern, togglePrinter, editPadrao } from '../../services/printerService'
import { api } from '../../lib/api/config';

jest.mock('../../lib/api/config.js', () => ({
  api: {
    post: jest.fn(),
    patch: jest.fn(),
    get: jest.fn(),
  },
}));

describe('printer endpoints', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('creates a printer', async () => {
    const printer = {
      padrao_id: "12",
      ip: "123.12.1.3.01",
      numeroSerie: "hp-132-a789",
      codigoLocadora: "879845634",
      contadorInstalacao: 1000,
      dataInstalacao: "2023-01-15T00:00:00.000Z",
      contadorRetiradas: 10,
      dataContadorRetirada: "2023-12-01T12:30:00.000Z",
      dataUltimoContador: "2023-12-01T12:30:00.000Z",
      ultimoContador: 10
    };

    api.post.mockResolvedValue({ status: 201, data:"some data" });

    const result = await createImpressora(printer);

    expect(api.post).toHaveBeenCalledWith('/printer/impressora/create', printer);
    expect(result).toEqual({ type: 'success', data: 'some data' });
  });

  it('creates a printer and returns status != 201', async () => {
    const printer = {
      padrao_id: "12",
      ip: "123.12.1.3.01",
      numeroSerie: "hp-132-a789",
      codigoLocadora: "879845634",
      contadorInstalacao: 1000,
      dataInstalacao: "2023-01-15T00:00:00.000Z",
      contadorRetiradas: 10,
      dataContadorRetirada: "2023-12-01T12:30:00.000Z",
      dataUltimoContador: "2023-12-01T12:30:00.000Z",
      ultimoContador: 10
    };

    api.post.mockResolvedValue({ status: 500, data:"some data" });

    const result = await createImpressora(printer);

    expect(api.post).toHaveBeenCalledWith('/printer/impressora/create', printer);
    expect(result).toEqual({ type: 'error', data: 'some data' });
  });

  it('tries to creates a printer and throws error != 201', async () => {
    const printer = {
      padrao_id: "12",
      ip: "123.12.1.3.01",
      numeroSerie: "hp-132-a789",
      codigoLocadora: "879845634",
      contadorInstalacao: 1000,
      dataInstalacao: "2023-01-15T00:00:00.000Z",
      contadorRetiradas: 10,
      dataContadorRetirada: "2023-12-01T12:30:00.000Z",
      dataUltimoContador: "2023-12-01T12:30:00.000Z",
      ultimoContador: 10
    };

    api.post.mockRejectedValue(new Error('error'));

    const result = await createImpressora(printer);

    expect(api.post).toHaveBeenCalledWith('/printer/impressora/create', printer);
    expect(result).toEqual({ type: 'error', error: new Error('error') });
  });

  it('gets printers successfully', async () => {
    api.get.mockResolvedValue({ status: 200, data: "some data" })

    const result = await getPrinters();

    expect(api.get).toHaveBeenCalledWith('/printer/impressora');
    expect(result).toEqual({ type: 'success', data: 'some data' });
  });

  it('gets printers and returns status != 200', async () => {
    api.get.mockResolvedValue({ status: 500, data: "some data" })

    const result = await getPrinters();

    expect(api.get).toHaveBeenCalledWith('/printer/impressora');
    expect(result).toEqual({ type: 'error', data: 'some data' });
  });

  it('tries to get printers and returns error', async () => {
    api.get.mockRejectedValue(new Error('error'))

    const result = await getPrinters();

    expect(api.get).toHaveBeenCalledWith('/printer/impressora');
    expect(result).toEqual({ type: 'error', error: new Error('error') });
  });

  it('edits a printer successfully', async () => {
    const printer = {
      id: "1",
      padrao_id: "1",
      unidadeId: '3',
      ip: "123.12.1.3.01",
      numeroSerie: "hp-132-a789",
      codigoLocadora: "879845634",
      contadorInstalacao: 1000,
      dataInstalacao: "2023-01-15T00:00:00.000Z",
      contadorRetiradas: 10,
      dataContadorRetirada: "2023-12-01T12:30:00.000Z",
      dataUltimoContador: "2023-12-01T12:30:00.000Z",
      ultimoContador: 10,
    }

    const data = {
      padrao_id: "1",
      unidadeId: '3',
      ip: "123.12.1.3.01",
      numeroSerie: "hp-132-a789",
      codigoLocadora: "879845634",
      contadorInstalacao: 1000,
      dataInstalacao: "2023-01-15T00:00:00.000Z",
      contadorRetiradas: 10,
      dataContadorRetirada: "2023-12-01T12:30:00.000Z",
      dataUltimoContador: "2023-12-01T12:30:00.000Z",
      ultimoContador: 10,
    }

    api.patch.mockResolvedValue({ status: 200, data: 'some data' });

    const result = await editImpressora(printer);
    console.log(result);

    expect(result).toEqual({ type: 'success', data: 'some data' });
    expect(api.patch).toHaveBeenCalledWith(`/printer/impressora/${printer.id}`, data);
  });

  it('edits a printer and return status != 200', async () => {
    const printer = {
      id: "1",
      padrao_id: "1",
      unidadeId: '3',
      ip: "123.12.1.3.01",
      numeroSerie: "hp-132-a789",
      codigoLocadora: "879845634",
      contadorInstalacao: 1000,
      dataInstalacao: "2023-01-15T00:00:00.000Z",
      contadorRetiradas: 10,
      dataContadorRetirada: "2023-12-01T12:30:00.000Z",
      dataUltimoContador: "2023-12-01T12:30:00.000Z",
      ultimoContador: 10,
    }

    const data = {
      padrao_id: "1",
      unidadeId: '3',
      ip: "123.12.1.3.01",
      numeroSerie: "hp-132-a789",
      codigoLocadora: "879845634",
      contadorInstalacao: 1000,
      dataInstalacao: "2023-01-15T00:00:00.000Z",
      contadorRetiradas: 10,
      dataContadorRetirada: "2023-12-01T12:30:00.000Z",
      dataUltimoContador: "2023-12-01T12:30:00.000Z",
      ultimoContador: 10,
    }

    api.patch.mockResolvedValue({ status: 500, data: 'some data' });

    const result = await editImpressora(printer);
    console.log(result);

    expect(result).toEqual({ type: 'error', data: 'some data' });
    expect(api.patch).toHaveBeenCalledWith(`/printer/impressora/${printer.id}`, data);
  });

  it('tries to edit a printer and throws error', async () => {
    const printer = {
      id: "1",
      padrao_id: "1",
      unidadeId: '3',
      ip: "123.12.1.3.01",
      numeroSerie: "hp-132-a789",
      codigoLocadora: "879845634",
      contadorInstalacao: 1000,
      dataInstalacao: "2023-01-15T00:00:00.000Z",
      contadorRetiradas: 10,
      dataContadorRetirada: "2023-12-01T12:30:00.000Z",
      dataUltimoContador: "2023-12-01T12:30:00.000Z",
      ultimoContador: 10,
    }

    const data = {
      padrao_id: "1",
      unidadeId: '3',
      ip: "123.12.1.3.01",
      numeroSerie: "hp-132-a789",
      codigoLocadora: "879845634",
      contadorInstalacao: 1000,
      dataInstalacao: "2023-01-15T00:00:00.000Z",
      contadorRetiradas: 10,
      dataContadorRetirada: "2023-12-01T12:30:00.000Z",
      dataUltimoContador: "2023-12-01T12:30:00.000Z",
      ultimoContador: 10,
    }

    api.patch.mockRejectedValue(new Error('error'));

    const result = await editImpressora(printer);

    expect(result).toEqual({ type: 'error', error: new Error('error') });
    expect(api.patch).toHaveBeenCalledWith(`/printer/impressora/${printer.id}`, data);
  });

  it('toggles printer successfully', async () => {
    const data = {
      id: "2",
      status: "ATIVA"
    }

    api.patch.mockResolvedValue({ status: 200, data: 'some data' })

    const result = await togglePrinter(data.id, data.status);

    expect(api.patch).toHaveBeenCalledWith(`/printer/impressora/desativar/${data.id}`, data);
    expect(result).toEqual({ type: 'success', data: 'some data' });
  });

  it('toggles printer and returns status != 200', async () => {
    const data = {
      id: "2",
      status: "ATIVA"
    }

    api.patch.mockResolvedValue({ status: 500, data: 'some data' })

    const result = await togglePrinter(data.id, data.status);

    expect(api.patch).toHaveBeenCalledWith(`/printer/impressora/desativar/${data.id}`, data);
    expect(result).toEqual({ type: 'error', data: 'some data' });
  });

  it('tries to toggle a printer and throws error', async () => {
    const data = {
      id: "2",
      status: "ATIVA"
    }

    api.patch.mockRejectedValue(new Error('error'));

    const result = await togglePrinter(data.id, data.status);

    expect(api.patch).toHaveBeenCalledWith(`/printer/impressora/desativar/${data.id}`, data);
    expect(result).toEqual({ type: 'error', error: new Error('error') });
  });

})

describe('pattern endpoints', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('creates a pattern successfully', async () => {
    const pattern = {
          tipo: "padrao",
          marca: "exemplo_marca",
          modelo: "exemplo_modelo",
          numeroSerie: "192.168.1.2",
          versaoFirmware: "192.168.1.2",
          tempoAtivoSistema: "192.168.1.2",
          totalDigitalizacoes: "192.168.1.2", 
          totalCopiasPB: "192.168.1.2",      
          totalCopiasColoridas: "192.168.1.2", 
          totalImpressoesPb: "192.168.1.2",    
          totalImpressoesColoridas: "192.168.1.2", 
          totalGeral: "192.168.1.2",           
          enderecoIp: "192.168.1.2"
        };

    api.post.mockResolvedValue({ status: 201, data: "some data" });

    const result = await createPadraoImpressora(pattern);

    expect(api.post).toHaveBeenCalledWith('/printer/padrao/create', pattern);
    expect(result).toEqual({ type: 'success', data: 'some data' });
  });

  it('creates a pattern and returns status != 201', async () => {
    const pattern = {
      tipo: "padrao",
      marca: "exemplo_marca",
      modelo: "exemplo_modelo",
      numeroSerie: "192.168.1.2",
      versaoFirmware: "192.168.1.2",
      tempoAtivoSistema: "192.168.1.2",
      totalDigitalizacoes: "192.168.1.2", 
      totalCopiasPB: "192.168.1.2",      
      totalCopiasColoridas: "192.168.1.2", 
      totalImpressoesPb: "192.168.1.2",    
      totalImpressoesColoridas: "192.168.1.2", 
      totalGeral: "192.168.1.2",           
      enderecoIp: "192.168.1.2"
    };

    api.post.mockResolvedValue({ status: 500, data: "some data" });

    const result = await createPadraoImpressora(pattern);

    expect(api.post).toHaveBeenCalledWith('/printer/padrao/create', pattern);
    expect(result).toEqual({ type: 'error', data: 'some data' });
  });

  it('tries to creates a pattern and throws error != 201', async () => {
    const pattern = {
      tipo: "padrao",
      marca: "exemplo_marca",
      modelo: "exemplo_modelo",
      numeroSerie: "192.168.1.2",
      versaoFirmware: "192.168.1.2",
      tempoAtivoSistema: "192.168.1.2",
      totalDigitalizacoes: "192.168.1.2", 
      totalCopiasPB: "192.168.1.2",      
      totalCopiasColoridas: "192.168.1.2", 
      totalImpressoesPb: "192.168.1.2",    
      totalImpressoesColoridas: "192.168.1.2", 
      totalGeral: "192.168.1.2",           
      enderecoIp: "192.168.1.2"
    };

    api.post.mockRejectedValue(new Error('error'));

    const result = await createPadraoImpressora(pattern);

    expect(api.post).toHaveBeenCalledWith('/printer/padrao/create', pattern);
    expect(result).toEqual({ type: 'error', error: new Error('error') });
  });

  it('gets patterns successfully', async () => {
    api.get.mockResolvedValue({ status: 200, data: "some data" })

    const result = await getPadroes();

    expect(api.get).toHaveBeenCalledWith('/printer/padrao');
    expect(result).toEqual({ type: 'success', data: 'some data' });
  });

  it('gets patterns and returns status != 200', async () => {
    api.get.mockResolvedValue({ status: 500, data: "some data" })

    const result = await getPadroes();

    expect(api.get).toHaveBeenCalledWith('/printer/padrao');
    expect(result).toEqual({ type: 'error', data: 'some data' });
  });

  it('tries to get patterns and returns error', async () => {
    api.get.mockRejectedValue(new Error('error'))

    const result = await getPadroes();

    expect(api.get).toHaveBeenCalledWith('/printer/padrao');
    expect(result).toEqual({ type: 'error', error: new Error('error') });
  });

  it('gets a pattern by id successfully', async () => {
    const pattern = { id: "c9654wd" };
    api.get.mockResolvedValue({ status: 200, data: "some data" })

    const result = await getPadrao(pattern.id);

    expect(api.get).toHaveBeenCalledWith(`/printer/padrao/${pattern.id}`);
    expect(result).toEqual({ type: 'success', data: 'some data' });
  });

  it('gets a pattern by id and returns status != 200', async () => {
    const pattern = { id: "c9654wd" };
    api.get.mockResolvedValue({ status: 500, data: "some data" })

    const result = await getPadrao(pattern.id);

    expect(api.get).toHaveBeenCalledWith(`/printer/padrao/${pattern.id}`);
    expect(result).toEqual({ type: 'error', data: 'some data' });
  });

  it('gets a pattern by id and throws error', async () => {
    const pattern = { id: "c9654wd" };
    api.get.mockRejectedValue(new Error('error'));

    const result = await getPadrao(pattern.id);

    expect(api.get).toHaveBeenCalledWith(`/printer/padrao/${pattern.id}`);
    expect(result).toEqual({ type: 'error', error: new Error('error') });
  });

  it('edits a pattern successfully', async () => {
    const pattern = {
      id: "1",
      tipo: "Tipo",
      marca: "Marca",
      modelo: "Modelo",
      modeloImpressora: "Modelo da impressora",
      numeroSerie: "Número de série",
      versaoFirmware: "Versão do Firmware",
      tempoAtivoSistema: "Tempo ativo do sistema",
      totalDigitalizacoes: "Total de digitalizações",
      totalCopiasPB: "Total de cópias P&B",
      totalCopiasColoridas: "Total de cópias coloridas",
      totalImpressoesPb: "Total de impressões P&B",
      totalImpressoesColoridas: "Total de impressões coloridas",
      totalGeral: "Total geral",
      enderecoIp: "Endereço IP",
    }

    const data = {
      tipo: "Tipo",
      marca: "Marca",
      modelo: "Modelo",
      modeloImpressora: "Modelo da impressora",
      numeroSerie: "Número de série",
      versaoFirmware: "Versão do Firmware",
      tempoAtivoSistema: "Tempo ativo do sistema",
      totalDigitalizacoes: "Total de digitalizações",
      totalCopiasPB: "Total de cópias P&B",
      totalCopiasColoridas: "Total de cópias coloridas",
      totalImpressoesPb: "Total de impressões P&B",
      totalImpressoesColoridas: "Total de impressões coloridas",
      totalGeral: "Total geral",
      enderecoIp: "Endereço IP",
    }

    api.patch.mockResolvedValue({ status: 200, data: 'some data' });

    const result = await editPadrao(pattern);

    expect(result).toEqual({ type: 'success', data: 'some data' });
    expect(api.patch).toHaveBeenCalledWith(`/printer/padrao/${pattern.id}`, data);
  });

  it('edits a pattern and return status != 200', async () => {
    const pattern = {
      id: "1",
      tipo: "Tipo",
      marca: "Marca",
      modelo: "Modelo",
      modeloImpressora: "Modelo da impressora",
      numeroSerie: "Número de série",
      versaoFirmware: "Versão do Firmware",
      tempoAtivoSistema: "Tempo ativo do sistema",
      totalDigitalizacoes: "Total de digitalizações",
      totalCopiasPB: "Total de cópias P&B",
      totalCopiasColoridas: "Total de cópias coloridas",
      totalImpressoesPb: "Total de impressões P&B",
      totalImpressoesColoridas: "Total de impressões coloridas",
      totalGeral: "Total geral",
      enderecoIp: "Endereço IP",
    }

    const data = {
      tipo: "Tipo",
      marca: "Marca",
      modelo: "Modelo",
      modeloImpressora: "Modelo da impressora",
      numeroSerie: "Número de série",
      versaoFirmware: "Versão do Firmware",
      tempoAtivoSistema: "Tempo ativo do sistema",
      totalDigitalizacoes: "Total de digitalizações",
      totalCopiasPB: "Total de cópias P&B",
      totalCopiasColoridas: "Total de cópias coloridas",
      totalImpressoesPb: "Total de impressões P&B",
      totalImpressoesColoridas: "Total de impressões coloridas",
      totalGeral: "Total geral",
      enderecoIp: "Endereço IP",
    }

    api.patch.mockResolvedValue({ status: 500, data: 'some data' });

    const result = await editPadrao(pattern);

    expect(result).toEqual({ type: 'error', data: 'some data' });
    expect(api.patch).toHaveBeenCalledWith(`/printer/padrao/${pattern.id}`, data);
  });

  it('tries to edit a pattern and throws error', async () => {
    const pattern = {
      id: "1",
      tipo: "Tipo",
      marca: "Marca",
      modelo: "Modelo",
      modeloImpressora: "Modelo da impressora",
      numeroSerie: "Número de série",
      versaoFirmware: "Versão do Firmware",
      tempoAtivoSistema: "Tempo ativo do sistema",
      totalDigitalizacoes: "Total de digitalizações",
      totalCopiasPB: "Total de cópias P&B",
      totalCopiasColoridas: "Total de cópias coloridas",
      totalImpressoesPb: "Total de impressões P&B",
      totalImpressoesColoridas: "Total de impressões coloridas",
      totalGeral: "Total geral",
      enderecoIp: "Endereço IP",
    }

    const data = {
      tipo: "Tipo",
      marca: "Marca",
      modelo: "Modelo",
      modeloImpressora: "Modelo da impressora",
      numeroSerie: "Número de série",
      versaoFirmware: "Versão do Firmware",
      tempoAtivoSistema: "Tempo ativo do sistema",
      totalDigitalizacoes: "Total de digitalizações",
      totalCopiasPB: "Total de cópias P&B",
      totalCopiasColoridas: "Total de cópias coloridas",
      totalImpressoesPb: "Total de impressões P&B",
      totalImpressoesColoridas: "Total de impressões coloridas",
      totalGeral: "Total geral",
      enderecoIp: "Endereço IP",
    }

    api.patch.mockRejectedValue(new Error('error'));

    const result = await editPadrao(pattern);

    expect(result).toEqual({ type: 'error', error: new Error('error') });
    expect(api.patch).toHaveBeenCalledWith(`/printer/padrao/${pattern.id}`, data);
  });

  it('toggles pattern successfully', async () => {
    const pattern = {
      id: "2",
      status: "ATIVO"
    }

    api.patch.mockResolvedValue({ status: 200, data: 'some data' })

    const result = await togglePattern(pattern.id, pattern.status);

    expect(api.patch).toHaveBeenCalledWith(`/printer/padrao/${pattern.id}`, pattern);
    expect(result).toEqual({ type: 'success', data: 'some data' });
  });

  it('toggles pattern and returns status != 200', async () => {
    const pattern = {
      id: "2",
      status: "ATIVO"
    }

    api.patch.mockResolvedValue({ status: 500, data: 'some data' })

    const result = await togglePattern(pattern.id, pattern.status);

    expect(api.patch).toHaveBeenCalledWith(`/printer/padrao/${pattern.id}`, pattern);
    expect(result).toEqual({ type: 'error', data: 'some data' });
  });

  it('tries to pattern a printer and throws error', async () => {
    const pattern = {
      id: "2",
      status: "ATIVO"
    }

    api.patch.mockRejectedValue(new Error('error'));

    const result = await togglePattern(pattern.id, pattern.status);

    expect(api.patch).toHaveBeenCalledWith(`/printer/padrao/${pattern.id}`, pattern);
    expect(result).toEqual({ type: 'error', error: new Error('error') });
  });
});