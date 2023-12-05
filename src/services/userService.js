import { api } from '../lib/api/config';

export const createUser = async (user) => {
  try {
    const response = await api.post('/user/create', user);
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/user/${user.id}`);
    return response.data;
  } catch(error) {
    return { type: 'error', error };
  }
};

export const forgottenPassword = async (email) => {
  try {
    const response = await api.post('/user/esqueceu-senha', email);
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};