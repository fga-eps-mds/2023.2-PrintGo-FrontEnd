import axios from 'axios';

const API_URL = "http://localhost:8001";
//const API_URL = "https://2023-2-print-go-printer-service.vercel.app";

export async function getPrinters() {
  try {

    const response = await axios.get(`${API_URL}/impressora`);
    return { type: 'success', data: response.data};
  } catch (error) {
    return { type: 'error', error };
  }
}

export async function getPadrao(id) {
  try {
    const response = await axios.get(`${API_URL}/padrao/${id}`);
    return { type: 'success', data: response.data };
  } catch (error) {
    return { type: 'error', error };
  }
}

export async function togglePrinter(id, status) {
  const data = {
    id,
    status
  }

  try {
    const response = await axios.patch(`${API_URL}/impressora`, data);
    return { type: 'success', data: response.data };
  } catch (error) {
    return { type: 'error', error };
  }
}