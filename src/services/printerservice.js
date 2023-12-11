import { api } from '../lib/api/config';

export async function getPrinters() {
  try {

    const response = await api.get('/printer/impressora');
    if(response.status !== 200) {
      return { type: 'error', data: response.data};
    }
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
}

export async function getPadrao(id) {
  try {
    const response = await api.get(`/printer/padrao/${id}`);
    if(response.status !== 200) {
      return { type: 'error', data: response.data};
    }
    return { type: 'success', data: response.data };
  } catch (error) {
    return { type: 'error', error };
  }
}

export async function togglePattern(id, status) {
  const data = {
    id,
    status
  };

  try {
    const response = await api.patch(`/printer/padrao/toggle/${id}`, data);
    if(response.status !== 200) {
      return { type: 'error', data: response.data };
    }
    return { type: 'success', data: response.data };
  } catch (error) {
    return { type: 'error', error };
  }
}

export async function getPadroes() {
  try {
    const response = await api.get('/printer/padrao');
    if(response.status !== 200) {
      return { type: 'error', data: response.data};
    }
    return { type: 'success', data: response.data };
  } catch (error) {
    return { type: 'error', error };
  }
}

export async function togglePrinter(id, status) {
  const data = {
    id,
    status
  }

  try {
    const response = await api.patch(`/printer/impressora/desativar/${id}`, data);
    if(response.status !== 200) {
      return { type: 'error', data: response.data};
    }
    return { type: 'success', data: response.data };
  } catch (error) {
    return { type: 'error', error };
  }
}

export const createImpressora = async (printer) => {
  try {
    const response = await api.post('/printer/impressora/create', printer);
    if(response.status !== 201) {
      return { type: 'error', data: response.data};
    }
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};

export const editImpressora = async (printer) => {
  try {
    const data = {
      ip: printer.ip,
      padrao_id: printer.padrao_id,
      numeroSerie: printer.numeroSerie,
      codigoLocadora: printer.codigoLocadora,
      contadorInstalacao: printer.contadorInstalacao,    
      dataInstalacao: printer.dataInstalacao,
      contadorRetiradas: printer.contadorRetiradas,
      dataContadorRetirada: printer.dataContadorRetirada,
      ultimoContador: printer.ultimoContador,
      dataUltimoContador: printer.dataUltimoContador,
      unidadeId: printer.unidadeId,
    }
    const response = await api.patch(`/printer/impressora/${printer.id}`, data);
    if(response.status !== 200) {
      return { type: 'error', data: response.data};
    }
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};

export const createPadraoImpressora = async (printerPattern) => {
  try {
    const response = await api.post('/printer/padrao/create', printerPattern);
    if(response.status !== 201) {
      return { type: 'error', data: response.data};
    }
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};
