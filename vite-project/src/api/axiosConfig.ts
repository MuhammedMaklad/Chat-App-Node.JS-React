import axios from "axios";
import cookieServices from "../services/cookieServices";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`,
  timeout: 20000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // Add any default headers here
  },
})

// Add request interceptors (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config (e.g., add an authorization token)
    const token = cookieServices.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptors (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors (e.g., redirect to login on 401)
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized access
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;