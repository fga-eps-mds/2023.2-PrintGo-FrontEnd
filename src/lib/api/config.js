import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.PRINT_GO_API_GATEWAY_URL,
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});
