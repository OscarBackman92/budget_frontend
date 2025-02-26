"use client"; // ✅ Ensures it's a Client Component

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Logo / Title */}
      <h1 className="text-white text-xl font-bold">Budget Tracker</h1>

      {/* Navigation Links */}
      <div className="space-x-4">
        <Link href="/" className="text-gray-300 hover:text-white">🏠 Home</Link>
        <Link href="/dashboard" className="text-gray-300 hover:text-white">📊 Dashboard</Link>
      </div>

      {/* Dark Mode Toggle */}
      <DarkModeToggle />
    </nav>
  );
}
