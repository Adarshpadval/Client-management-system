import axios from 'axios';

const API_URL = 'http://localhost:3000/api/clients/';

export const getClients = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data); // Add this to check the response
    return response.data.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error; 
  }
};

export const createClient = async (clientData) => {
  try {
    console.log(clientData);
    const response = await axios.post(API_URL, clientData);
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error; 
  }
};

export const updateClient = async (clientId, clientData) => {
  try {
    const response = await axios.put(`${API_URL}${clientId}`, clientData);
    return response.data.data;
  } catch (error) {
    console.error('Error updating client:', error);
    throw error; 
  }
};

export const deleteClient = async (clientId) => {
  try {
    const response = await axios.delete(`${API_URL}${clientId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error; 
  }
};

export const getClientById = async (clientId) => {
  try {
    console.log("cl id",clientId);
    const response = await axios.get(`${API_URL}${clientId}`);
    console.log("response",response);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching client by ID:', error);
    throw error; 
  }
};
