"use client";

import { Menu, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="w-6 h-6" />
        </button>

        <Link href="/">
          <h1 className="text-xl font-bold tracking-wider cursor-pointer">Gi-Me-To-Ple!!!</h1>
        </Link>

        <Search className="w-6 h-6" />
      </header>

      {/* Burger Menu */}
      {menuOpen && (
        <div className="bg-blue-900 p-4 rounded mb-6">
          <Link href="/login" className="block text-center bg-blue-700 px-4 py-2 rounded hover:bg-blue-600 w-full">
            Login / Register
          </Link>
        </div>
      )}
    </>
  );
}
