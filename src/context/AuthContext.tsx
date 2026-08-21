import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/seedData';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  register: (data: Partial<User>) => Promise<boolean>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default active user is Ram K. (Farmer) to match the reference image
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('kisanlink_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return INITIAL_USERS[0]; // Ram K. (Farmer)
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('kisanlink_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kisanlink_user');
    }
  }, [user]);

  const login = async (email: string, role?: UserRole): Promise<boolean> => {
    try {
      const res = await api.login(email, role);
      if (res.user) {
        setUser(res.user);
        return true;
      }
      return false;
    } catch {
      const matched = INITIAL_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) ||
        INITIAL_USERS.find((u) => u.role === role) ||
        INITIAL_USERS[0];
      setUser(matched);
      return true;
    }
  };

  const register = async (data: Partial<User>): Promise<boolean> => {
    try {
      const res = await api.register(data);
      if (res.user) {
        setUser(res.user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoRole = (targetRole: UserRole) => {
    const matched = INITIAL_USERS.find((u) => u.role === targetRole) || INITIAL_USERS[0];
    setUser(matched);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'farmer',
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchDemoRole,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
