import { api } from '../lib/api/config';

export const createLotacao = async (lotacoa) => {
  try {
    const response = await api.post('/lotacao/create', lotacoa);
    return {type: 'success', data:response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};

export const getLotacoes = async () => {
  try {
    const response = await api.get('/lotacao');
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};