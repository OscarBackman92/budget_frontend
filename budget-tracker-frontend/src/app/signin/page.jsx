"use client"; 
import { useState, useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext"; 
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // ✅ Use `login` (matches AuthContext)
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Submitting login form...");
    console.log("📝 Form Data:", formData);

    if (!login) {
      console.error("❌ login function is missing from AuthContext!");
      return;
    }

    try {
      await login(formData);
      console.log("✅ Login successful! Redirecting to dashboard...");
      router.push("/dashboard");
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}
