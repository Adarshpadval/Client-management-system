import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users/';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

