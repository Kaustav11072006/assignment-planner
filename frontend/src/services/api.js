// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  // Fallback to localhost if the vite environment file variable is not found
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

// Axios Request Interceptor
// Automatically checks localStorage and attaches your JWT Bearer Token to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;