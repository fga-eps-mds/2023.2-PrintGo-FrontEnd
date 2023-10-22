import { api } from '../lib/api/config';

export const createUser = async (user) => {
  try {
    const response = await api.post('/user/create', user);
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};
