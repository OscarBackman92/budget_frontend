"use client";
import { createContext, useState, useEffect } from "react";
import { loginUser as apiLoginUser, logoutUser } from "../utils/api"; // ✅ Correct import

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleLogin = async (credentials) => {
    console.log("📤 Attempting Login with:", credentials); // ✅ Debugging log
    try {
      const data = await apiLoginUser(credentials);
      console.log("✅ Login Success! Token:", data.access); // ✅ Log received token
      setUser({ token: data.access });
    } catch (error) {
      console.error("❌ Login API Error:", error);
      throw error; // Re-throw to be caught in SignIn.jsx
    }
  };

  const handleLogout = () => {
    console.log("🔴 Logging out user...");
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}> 
      {children}
    </AuthContext.Provider>
  );
}
