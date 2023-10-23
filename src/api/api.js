import axios from 'axios';

export async function login(email, password) {
  const data = {
    email: email,
    senha: password,
  };

  try {
    const response = await axios.post('http://localhost:3001/user/login', data);
    return response.data.token;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}