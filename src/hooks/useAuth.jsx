// hooks/useAuth.js
import React, { createContext, useContext, useState, useEffect } from 'react';

import { authService } from "../service/auth";


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on app start
        const token = localStorage.getItem('token');
        const savedAdmin = localStorage.getItem('admin');

        if (token && savedAdmin) {
            setAdmin(JSON.parse(savedAdmin));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            if (response.data.status) {
                // const { token, admin } = response.data.data;
                const token = response.data.jwt; // 👈 directly jwt
                const admin = {fullName: "Tushar" }; // temporary, since backend doesn't send admin
                localStorage.setItem('token', token);
                localStorage.setItem('admin', JSON.stringify(admin));
                setAdmin(admin);
                setIsAuthenticated(true);
                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        setAdmin(null);
        setIsAuthenticated(false);
    };

    const value = {
        admin,
        isAuthenticated,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};