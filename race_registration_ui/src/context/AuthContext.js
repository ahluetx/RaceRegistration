// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    setUser({ userId: userData.userId });
    fetchUserProfile(userData.token); // Fetch user profile after login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // You can implement additional logout logic here
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const userData = await response.json();
      setUser(userData); // Set the user data
      if (userData.profilePicture) {
        setProfilePic(userData.profilePicture);
      }
    } catch (error) {
      console.error('Profile Fetch Error:', error);
      // Handle error, e.g., redirect to login
    }
  };

  // The context value that will be supplied to any descendants of this component.
  const contextValue = {
    user,
    profilePic,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
