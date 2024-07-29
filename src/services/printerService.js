import { api } from '../lib/api/config';

//printer:
export async function getPrinters() {
  try {

    const response = await api.get('/printer');
    if(response.status !== 200) {
      return { type: 'error', data: response.data};
    }
    return { type: 'success', data: response.data.data };
  } catch (error) {
    return { type: 'error', error };
  }
}

export async function getPrinterById(id) {
  try {
      const response = await api.get(`/printer/${id}`);
      if (response.status !== 200) {
          return { type: 'error', data: response.data };
      }
      return { type: 'success', data: response.data };
  } catch (error) {
      return { type: 'error', error };
  }
}

export async function getLocalizacao() {
  try {

    const response = await api.get('/printer/location');
    if(response.status !== 201) {
      return { type: 'error', data: response.data};
    }
    return response.data;
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
    const response = await api.post('/printer/', printer);
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
