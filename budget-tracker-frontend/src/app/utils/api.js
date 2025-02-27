import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// ✅ Create API instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Helper function to get token from localStorage
const getAuthToken = () => localStorage.getItem("access_token");

// ✅ Fix loginUser URL to match Django's `urls.py`
export const loginUser = async (credentials) => {
  const url = "api/auth/token/"; // ✅ Corrected to match Django's `urls.py`
  console.log("📤 Sending login request to:", `${API_URL}/${url}`);
  console.log("📝 Credentials:", credentials);

  try {
    const response = await api.post(url, credentials);

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

// ✅ Ensure `registerUser` function is exported
export const registerUser = async (userData) => {
  const url = "auth/registration/"; // ✅ Matches Django's `urls.py`
  console.log("📡 Sending registration request to:", `${API_URL}/${url}`);
  
  try {
    const response = await api.post(url, userData);
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
  const url = "api/transactions/";
  console.log(`📡 Fetching transactions from: ${API_URL}/${url}`);

  try {
    const token = localStorage.getItem("access_token"); // ✅ Get the token
    if (!token) {
      console.error("❌ No auth token found, user is not authenticated.");
      throw new Error("Unauthorized: No token available");
    }

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Include token in the request
      },
    });

    console.log("✅ Transactions fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching transactions:", error.response?.data || error.message);
    throw error;
  }
};


export const addTransaction = async (transactionData) => {
  const url = "api/transactions/";
  console.log("📤 Sending new transaction:", transactionData); // ✅ Log request

  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Unauthorized: No token available");
    }

    const response = await api.post(url, transactionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Transaction added:", response.data); // ✅ Log successful response
    return response.data;
  } catch (error) {
    console.error("❌ Error adding transaction:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteTransaction = async (transactionId) => {
  const url = `api/transactions/${transactionId}/`;
  console.log(`🗑️ Deleting transaction: ${url}`);

  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Unauthorized: No token available");

    await api.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(`✅ Transaction ${transactionId} deleted.`);
  } catch (error) {
    console.error("❌ Error deleting transaction:", error);
    throw error;
  }
};
