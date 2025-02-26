"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">Budget Tracker</h1>
      <div className="space-x-4">
        <Link href="/" className="text-white">Home</Link>
        {user ? (
          <>
            <Link href="/dashboard" className="text-white">Dashboard</Link>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link href="/signin" className="text-white">Sign In</Link>
            <Link href="/signup" className="text-white">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
