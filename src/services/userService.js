import { api } from '../lib/api/config';

export const createUser = async (user) => {
  try {
    const response = await api.post('/user/create', user);
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};

export const updateUser = async (user, id) => {
  try {
    const response = await api.patch(`/user/${id}`, user)
    return { type: 'success', data: response.data}
  } catch (error) {
    return { type: 'error', error}
  }
}

export const getUsers = async () => {
  try {
    const response = await api.get('/user/');
    return response.data;
  } catch (error) {
    return { type: 'error', error };
  }
}

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch(error) {
    return { type: 'error', error };
  }
};

export const forgottenPassword = async (email) => {
  try {
    const response = await api.post('/user/forgotten-password', email);
    if(response.status !== 201) {
      return { type: 'error', error: "Erro não foi possível enviar email!"};
    }

    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }

};

export const recoverPassword = async (data) => {
  try {
    const response = await api.post('/user/recover-password', data );
    console.log(response.body);
    if(response.status !== 201) {
      return { type: 'error', error: "Erro não foi possível enviar email!"};
    }

    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    return { type: 'error', error };
  }
}