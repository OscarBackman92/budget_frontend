"use client"; // Required for Next.js Client Components
import { createContext, useState, useEffect } from "react";
import { loginUser, logoutUser } from "@/app/utils/api"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
      setUser({ loggedIn: true });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      setToken(response.data.access);
      setUser({ loggedIn: true });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    logoutUser();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
