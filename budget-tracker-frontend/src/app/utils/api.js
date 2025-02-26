import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"; 

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Ensure `loginUser` function is exported
export const loginUser = async (credentials) => {
  console.log("📡 Sending login request to:", `${API_URL}/auth/token/`);
  console.log("📝 Credentials:", credentials);

  try {
    const response = await api.post("/auth/token/", credentials);
    console.log("✅ API Response:", response.data);

    if (response.data.access) {
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
    }

    return response.data;
  } catch (error) {
    console.error("❌ Login Request Failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Ensure `registerUser` function is exported
export const registerUser = async (userData) => {
  console.log("📡 Sending registration request to:", `${API_URL}/auth/registration/`);
  const response = await api.post("/auth/registration/", userData);
  return response.data;
};

// ✅ Ensure `logoutUser` function is exported
export const logoutUser = () => {
  console.log("🔴 Logging out user and clearing tokens...");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
