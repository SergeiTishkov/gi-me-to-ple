"use client";

import { useState, useEffect } from "react";
import { User } from "@gi-me-to-ple/shared/types/User";
import { Header } from "@/components/header";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { Wallet } from "lucide-react";

const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || "";

export default function LoginPage() {
  const router = useRouter();
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, { credentials: "include" });
        if (res.ok) {
          const user: User = await res.json();
          setAccount(user.address);
        }
      } catch (error) {
        console.error("Could not check login status:", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    if (!window.ethereum) {
      setMessage("Please install MetaMask to continue.");
      setLoading(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      setMessage("Fetching challenge...");
      const nonceRes = await fetch(`${API_BASE_URL}/api/auth/nonce?address=${userAddress}`, { credentials: "include" });
      if (!nonceRes.ok) {
        const errorData = await nonceRes.json();
        throw new Error(errorData.message || "Failed to get nonce from server.");
      }
      const { nonce } = await nonceRes.json();

      setMessage("Please sign the message in MetaMask...");
      const signature = await signer.signMessage(nonce);

      setMessage("Verifying signature...");
      const verifyRes = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: userAddress, signature }),
        credentials: "include",
      });

      if (verifyRes.ok) {
        setMessage("Login successful! Redirecting...");
        setAccount(userAddress);
        router.push("/");
      } else {
        const errorData = await verifyRes.json();
        throw new Error(errorData.message || "Verification failed.");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      // Check for user rejection error
      if (error.code === 4001) {
        setMessage("You rejected the request in MetaMask.");
      } else {
        setMessage(error.message || "An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center pt-8">
        <div className="bg-blue-800 rounded-xl p-8 shadow-lg w-full max-w-md text-white">
          <h2 className="text-2xl font-semibold text-center mb-4">Join Gi-Me-To-Ple!!!</h2>
          <p className="text-center text-blue-300 mb-6">
            Connect your wallet to sign in and start your crowdfunding journey.
          </p>

          {account ? (
            <div className="text-center bg-blue-900 p-4 rounded-lg">
              <p className="font-semibold">Connected As:</p>
              <p className="text-sm text-blue-300 break-all">{account}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-700 flex items-center justify-center gap-3 px-4 py-3 rounded-md hover:bg-blue-600 font-semibold tracking-wide transition-colors duration-200 disabled:bg-blue-900 disabled:cursor-not-allowed"
              >
                <Wallet className="w-6 h-6" />
                <span>{loading ? message : "Connect Wallet & Sign In"}</span>
              </button>
              {message && !loading && (
                <p className="text-center text-sm text-yellow-300 bg-yellow-900/30 p-2 rounded-md">{message}</p>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
