import { api } from '../lib/api/config';

export const getUnidades = async () => {
  try {
    const response = await api.get('/schedular/workstations');
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};