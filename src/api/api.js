import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;

export async function login(email, password) {
  const data = {
    email: email,
    senha: password,
  };

  try {

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      const response = await axios.post(`${API_URL}:${API_PORT}/user/login`, data);
      return response.data.token;
    } else {
      const response = await axios.post(`${API_URL}/user/login`, data);
      return response.data.token;
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}

export async function changePassword(newPassword, newPasswordConfirmation) {
  const token = localStorage.getItem('jwt')

  const headers = {
    'Authorization': token
  }

  const data = {
    novaSenha: newPassword,
    confirmacaoNovaSenha: newPasswordConfirmation,
  }

  try {

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      const response = await axios.post(`${API_URL}:${API_PORT}/user/change-password`, data, {headers});
      return response;
    } else {
      const response = await axios.post(`${API_URL}/user/change-password`, data, {headers});
      return response;
    }
  } catch(error) {
    console.log('Erro ao trocar de senha', error)
    throw error
  }
}