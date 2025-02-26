import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// ✅ Attach token if available
const getAuthToken = () => (typeof window !== "undefined" ? localStorage.getItem("access_token") : null);

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Add `loginUser` function
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/token/", credentials);
    if (response.data.access) {
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// ✅ Add `logoutUser` function
export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// ✅ Ensure `fetchTransactions` exists
export const fetchTransactions = async () => {
  try {
    const response = await api.get("/transactions/");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export default api;
