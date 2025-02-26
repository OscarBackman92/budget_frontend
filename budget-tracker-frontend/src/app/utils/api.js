import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Helper function to get token from localStorage
const getAuthToken = () => localStorage.getItem("access_token");

// ✅ Ensure `loginUser` function is exported
export const loginUser = async (credentials) => {
  console.log("📤 Sending login request to:", `${API_URL}/auth/token/`);
  console.log("📝 Credentials:", credentials);

  try {
    const response = await api.post("/auth/token/", credentials);
    
    if (response.data.access) {
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      console.log("✅ Login successful, tokens stored.");
    }

    return response.data;
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (userData) => {
  const url = `${API_URL}/auth/registration/`;  // ✅ Corrected endpoint
  console.log("📡 Sending registration request to:", url);
  try {
    const response = await api.post("/auth/registration/", userData);
    return response.data;
  } catch (error) {
    console.error("❌ Registration error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Ensure `logoutUser` function is exported
export const logoutUser = () => {
  console.log("🔴 Logging out user and clearing tokens...");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const fetchTransactions = async () => {
  console.log(`📡 Fetching transactions from: ${API_URL}/transactions/`);
  const response = await api.get("/transactions/");
  console.log("✅ Transactions fetched:", response.data);
  return response.data;
};

// ✅ Add a new transaction (Requires Authentication)
export const addTransaction = async (transactionData) => {
  console.log("📤 Sending new transaction:", transactionData);

  try {
    const token = getAuthToken();

    if (!token) {
      console.error("❌ No auth token found, user is not authenticated.");
      throw new Error("Unauthorized: No token available");
    }

    const response = await api.post("/transactions/", transactionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Transaction added:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding transaction:", error.response?.data || error.message);
    throw error;
  }
};
