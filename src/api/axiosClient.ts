import axios from "axios";

const axiosClient = axios.create({
  baseURL: '/api', //viene del proxy en vite.config
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request (agrega el bearer token al header auth)
//los interceptores se utilizan antes o después de una petición HTTP
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de response (errores globales)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;