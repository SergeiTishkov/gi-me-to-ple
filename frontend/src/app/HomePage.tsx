'use client'

import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { CrowdfundingRequest } from "@gi-me-to-ple/shared/types/CrowdfundingRequest";

type HomePageProps = {
  requests: CrowdfundingRequest[]
}

export function HomePage({ requests }: HomePageProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="text-xl font-bold tracking-wider">Gi-Me-To-Ple!!!</h1>

        <Search className="w-6 h-6" />
      </header>

      {/* Burger Menu */}
      {menuOpen && (
        <div className="bg-blue-900 p-4 rounded mb-6">
          <button className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600 w-full">Login / Register</button>
        </div>
      )}

      {/* Crowdfunding Cards */}
      <main className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-blue-800 rounded-xl p-4 shadow-lg space-y-2">
            <h2 className="text-lg font-semibold">{req.title}</h2>
            <p className="text-sm text-blue-300">⏱ {req.timer}</p>
            <p className="text-sm">
              <span className="font-medium">${req.gathered}</span> / ${req.goal}
            </p>
            <p className="text-sm text-blue-200">{req.description}</p>
          </div>
        ))}

        {requests.length === 0 && <p className="text-center text-blue-300">Loading requests...</p>}
      </main>
    </>
  );
}
