import { api } from "../lib/api/config";

export async function login(email, password) {
  const data = {
    email: email,
    senha: password,
  };

  try {
      const response = await api.post('/login', data);
      return response.data.token;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return {type: 'error', error}; 
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
      const response = await api.post('/user/change-password', data, {headers});
      return response;
  } catch(error) {
    console.log('Erro ao trocar de senha', error)
    return {type: 'error', error}; 
  }
}
