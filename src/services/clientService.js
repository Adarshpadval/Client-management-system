import axios from 'axios';

const API_URL = 'http://localhost:3000/api/clients/';

export const getClients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClientById = async (clientId) => {
  try {
    const response = await axios.get(`${API_URL}${clientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createClient = async (clientData) => {
  try {
    const response = await axios.post(API_URL, clientData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add other client-related API functions here
