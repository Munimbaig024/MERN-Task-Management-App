import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
});

// Attach Bearer token automatically to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('taskflow_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
