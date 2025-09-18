'use client'; // This is a client component because it's interactive

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Import our Supabase client

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Error signing up: ${error.message}`);
    } else {
      setMessage('Signup successful! Please check your email to verify.');
    }
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Error signing in: ${error.message}`);
    } else {
      setMessage('Sign in successful! Redirecting...');
      // In a real app, you would redirect the user here.
      // window.location.href = '/'; 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center font-serif">Enter the Temple</h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex space-x-4">
          <button onClick={handleSignIn} className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Sign In
          </button>
          <button onClick={handleSignUp} className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">
            Sign Up
          </button>
        </div>

        {message && <p className="text-center text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
}

