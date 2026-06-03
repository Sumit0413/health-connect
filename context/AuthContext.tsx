import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { router } from 'expo-router';

// Adjust this to your backend IP. Since Android emulator uses 10.0.2.2, and iOS uses localhost. 
// But if testing on physical device, use the local IPv4 address (e.g., 192.168.29.130).
export const API_URL = 'http://localhost:5000/api';

type UserRole = 'patient' | 'doctor' | null;

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on startup
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          // Verify token and get user profile
          const response = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        }
      } catch (error) {
        console.log("No token or invalid token");
        // Clear token if invalid
        await SecureStore.deleteItemAsync('userToken');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadToken();
  }, []);

  const login = async (token: string, userData: User) => {
    await SecureStore.setItemAsync('userToken', token);
    setUser(userData);
    router.replace('/(tabs)');
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role || null, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
