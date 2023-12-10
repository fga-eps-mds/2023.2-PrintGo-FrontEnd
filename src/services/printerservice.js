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
    const response = await api.patch(`/printer/impressora/${id}`, data);
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
  }

  try {
    const response = await api.patch(`/printer/padrao/${id}`, data);
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
    console.log(response);
    if(response.status !== 201) {
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
    console.log(response);
    if(response.status !== 201) {
      return { type: 'error', data: response.data};
    }
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};
