"use client";
import { useState } from "react";
import { registerUser } from "@/app/utils/api";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [formData, setFormData] = useState({ username: "", password1: "", password2: "" });
  const [error, setError] = useState("");
  const router = useRouter(); // ✅ Redirect after signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      router.push("/signin"); // ✅ Redirect to sign-in page
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" placeholder="Username"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
        <input type="password" name="password1" placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, password1: e.target.value })} required />
        <input type="password" name="password2" placeholder="Confirm Password"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, password2: e.target.value })} required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}
