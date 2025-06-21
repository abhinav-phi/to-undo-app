import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const savedUser = localStorage.getItem('to-undo-user');
    return {
      user: savedUser ? JSON.parse(savedUser) : null,
      isAuthenticated: !!savedUser
    };
  });

  const [showAuth, setShowAuth] = useState(!authState.isAuthenticated);

  useEffect(() => {
    if (authState.user) {
      localStorage.setItem('to-undo-user', JSON.stringify(authState.user));
    } else {
      localStorage.removeItem('to-undo-user');
    }
  }, [authState.user]);

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('to-undo-users') || '{}');
    const user = users[username];
    
    if (user && user.password === password) {
      const userData: User = {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: new Date(user.createdAt)
      };
      
      setAuthState({
        user: userData,
        isAuthenticated: true
      });
      setShowAuth(false);
      return true;
    }
    return false;
  };

  const signup = (username: string, password: string, email?: string): boolean => {
    const users = JSON.parse(localStorage.getItem('to-undo-users') || '{}');
    
    if (users[username]) {
      return false; // User already exists
    }

    const newUser = {
      id: crypto.randomUUID(),
      username,
      password,
      email,
      createdAt: new Date().toISOString()
    };

    users[username] = newUser;
    localStorage.setItem('to-undo-users', JSON.stringify(users));

    const userData: User = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: new Date(newUser.createdAt)
    };

    setAuthState({
      user: userData,
      isAuthenticated: true
    });
    setShowAuth(false);
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });
    setShowAuth(true);
  };

  return {
    ...authState,
    showAuth,
    setShowAuth,
    login,
    signup,
    logout
  };
};