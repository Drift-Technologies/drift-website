'use client';
import { useState } from 'react';
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Subscription failed');
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#E0E0E0] text-[#333333] px-8 pt-8 font-[family-name:var(--font-geist-sans)]">
      <Image
        src="/drift_logo.png"
        alt="Drift Logo"
        width={300}
        height={75}
        priority
        className="mb-2"
      />
      <main className="flex flex-col items-center flex-grow gap-8 text-center pb-8">
        <h1 className="text-5xl font-bold">Arriving Soon</h1>
        <p className="max-w-md text-lg">
          We will be launching Drift, the future of transit payments, very soon. Add your email
          below and be among the first to know when we officially launch.
        </p>
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#333333]"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-[#333333] text-white p-3 rounded-r-md hover:bg-[#4A4A4A] font-semibold"
          >
            {status === 'loading' ? 'SENDING...' : 'SUBMIT'}
          </button>
        </form>
        {status === 'success' && (
          <p className="text-green-600">Thanks for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600">Something went wrong. Please try again.</p>
        )}
      </main>
      <footer className="w-full text-center py-4">
        <p className="text-xs text-[#555555]">Drift Technologies</p>
        <p className="text-xs text-[#555555]">2025</p>
      </footer>
    </div>
  );
}
