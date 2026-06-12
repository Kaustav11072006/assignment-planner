// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Run on initial application mount to check for an existing valid token
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          // Attach token to Axios defaults for immediate out-of-the-box usage
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Failed to parse cached user session structural details:", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Handle Authentication Logic
  const login = async (email, password) => {
    try {
      // OAuth2 request specifications inside FastAPI require data inside URLSearchParams / Form Data
      const formData = new URLSearchParams();
      formData.append('username', email); // FastAPI maps login lookup username targeting fields
      formData.append('password', password);

      const response = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      
      // Configure default Axios header context configuration pipelines
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      // Package up user details object structure 
      const userData = { email };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error("Authentication validation crash event intercepted:", error);
      const errorMessage = error.response?.data?.detail || "Invalid credential matches.";
      return { success: false, error: errorMessage };
    }
  };

  // Handle Registration Layout logic pipelines
  const register = async (email, password) => {
    try {
      await api.post('/auth/register', { email, password });
      // Automatically pipe into standard login flow sequence upon clean registration completion
      return await login(email, password);
    } catch (error) {
      console.error("Account provision routine collision:", error);
      const errorMessage = error.response?.data?.detail || "Registration processing failed.";
      return { success: false, error: errorMessage };
    }
  };

  // Clear session footprints completely
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};