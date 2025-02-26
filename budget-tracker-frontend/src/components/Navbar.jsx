"use client"; // ✅ Client Component Required

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">Budget Tracker</h1>
      <div className="flex gap-4">
        <Link href="/" className="text-white">🏠 Home</Link>
        <Link href="/dashboard" className="text-white">📊 Dashboard</Link>
        {user ? (
          <button onClick={logout} className="text-red-500">Logout</button>
        ) : (
          <Link href="/login" className="text-green-400">Login</Link>
        )}
      </div>
    </nav>
  );
}
