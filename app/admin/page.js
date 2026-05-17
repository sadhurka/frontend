'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Sends password payload to POST /api/auth/login via api wrapper
      const response = await api.login(password);
      
      // Persist the signed JWT token in local storage
      localStorage.setItem('admin_token', response.token);
      
      // Force navigation back to home page and refresh stateful elements
      router.push('/');
      router.refresh();
    } catch (err) {
      // Captures backend 401 error message ("Invalid admin password")
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main 
      className="page" 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '75vh' 
      }}
    >
      <div className="form-card" style={{ width: '100%', maxWidth: '420px' }}>
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 className="page-title">Admin Access</h1>
          <p className="page-sub">Authenticate to post and manage trade jobs</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">
              Enter Admin Password <span className="req">*</span>
            </label>
            <input
              id="admin-password"
              type="password"
              className={`input ${error ? 'error' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              required
            />
            {error && <p className="err-msg">{error}</p>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} 
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Login As Admin'}
          </button>
        </form>
      </div>
    </main>
  );
}