import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific HTTP errors
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Handle not found
          console.error('Resource not found');
          break;
        default:
          console.error('Server error:', error.response.data);
      }
    } else if (error.request) {
      // Handle network errors
      console.error('Network error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Error handler utility
const handleApiError = (error) => {
  const errorMessage = error.response?.data?.message || error.message;
  throw new Error(errorMessage);
};

export const photoService = {
  getPhotos: async () => {
    try {
      const response = await api.get('/photos');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
  getUserPhotos: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/photos`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
  uploadPhoto: async (data) => {
    try {
      const response = await api.post('/photos', data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
  deletePhoto: async (photoId) => {
    try {
      const response = await api.delete(`/photos/${photoId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

export const userService = {
  getUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
  getUserDetails: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
  updateUser: async (userId, data) => {
    try {
      const response = await api.put(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
}; 