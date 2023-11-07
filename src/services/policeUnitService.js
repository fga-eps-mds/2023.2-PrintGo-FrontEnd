import { api } from '../lib/api/config';

export const getPoliceUnits = async () => {
  try {
    const response = await api.get('/policeUnit');
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};