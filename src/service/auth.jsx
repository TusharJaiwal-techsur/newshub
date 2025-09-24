// services/auth.js
import api from './api';

export const authService = {
    login: (credentials) => {
        return api.post('/auth/login', credentials);
    },

    logout: () => {
        return api.post('/auth/logout');
    },

    getProfile: () => {
        return api.get('/auth/profile');
    },

    updateProfile: (profile) => {
        return api.put('/auth/profile', profile);
    },

    getStats: () => {
        return api.get('/auth/views');
    }
};