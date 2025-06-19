'use client'

import { useState } from "react";
import { Header } from "@/components/header";
import { KeyRound, User, Mail } from "lucide-react";

type AuthMode = 'login' | 'register';

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  
  // State for all form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      // TODO: Add your authentication logic here
      console.log("Logging in with:", { email, password });
    } else {
      // TODO: Add your registration logic here
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Registering with:", { name, email, password });
    }
  };

  return (
    <>
      <Header />

      <main className="flex flex-col items-center justify-center pt-8">
        <div className="bg-blue-800 rounded-xl p-8 shadow-lg w-full max-w-md">
          {/* --- Auth Mode Toggle --- */}
          <div className="flex justify-center border-b border-blue-700 mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`w-1/2 py-3 font-semibold transition-colors duration-200 ${
                authMode === 'login' 
                  ? 'border-b-2 border-blue-400 text-white' 
                  : 'text-blue-300 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`w-1/2 py-3 font-semibold transition-colors duration-200 ${
                authMode === 'register' 
                  ? 'border-b-2 border-blue-400 text-white' 
                  : 'text-blue-300 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-6">
            {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* --- Name Input (Register Only) --- */}
            {authMode === 'register' && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-blue-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="bg-blue-900 border border-blue-700 rounded-md w-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            {/* --- Email Input --- */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-blue-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-blue-900 border border-blue-700 rounded-md w-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* --- Password Input --- */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-blue-300">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-blue-900 border border-blue-700 rounded-md w-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* --- Confirm Password Input (Register Only) --- */}
            {authMode === 'register' && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-blue-300">Confirm Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-blue-900 border border-blue-700 rounded-md w-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-700 mt-4 px-4 py-3 rounded-md hover:bg-blue-600 font-semibold tracking-wide transition-colors duration-200"
            >
              {authMode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}