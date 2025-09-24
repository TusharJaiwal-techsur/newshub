// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


// Add request interceptor to include JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log("API Request Token:", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;