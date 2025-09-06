// providers/AuthProvider.tsx
'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedUser = jwtDecode<User>(storedToken);
        setUser(decodedUser);
        setToken(storedToken);
      } catch (error) {
        // Invalid token, remove it
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    const decodedUser = jwtDecode<User>(newToken);
    localStorage.setItem('token', newToken);
    setUser(decodedUser);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}