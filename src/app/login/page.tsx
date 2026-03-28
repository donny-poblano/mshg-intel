'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/');
      router.refresh();
    } else {
      setError('Invalid password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--navy)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4" style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%', backgroundColor: 'rgba(244, 168, 29, 0.15)' }}>
            <svg className="w-8 h-8" style={{ color: 'var(--gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--cream)', fontFamily: 'Roboto Condensed, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Real Dough Intel</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--cream-muted)' }}>Marketing Analytics Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl p-6 shadow-2xl" style={{ backgroundColor: 'rgba(235, 229, 211, 0.08)', border: '1px solid rgba(235, 229, 211, 0.15)' }}>
          <label className="block text-sm font-medium mb-2 font-label" style={{ color: 'var(--cream-muted)' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors"
            style={{ backgroundColor: 'rgba(235, 229, 211, 0.05)', border: '1px solid rgba(235, 229, 211, 0.2)', color: 'var(--cream)' }}
            placeholder="Enter dashboard password"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 font-semibold transition-all disabled:opacity-50 btn-dough"
            style={{ backgroundColor: 'var(--gold)', color: 'var(--navy)' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--cream-muted)' }}>Real Dough Pizza Co.</p>
      </div>
    </div>
  );
}
