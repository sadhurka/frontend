'use client';

import './globals.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Re-verify login status when moving between pages
  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('admin_token'));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAdmin(false);
    router.push('/');
  };

  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <Link href="/" className="nav-brand">
            Global<span>TNA</span>
          </Link>
          <Link href="/" className="nav-link">Browse Jobs</Link>
          
          {isAdmin ? (
            <>
              <Link href="/jobs/new" className="nav-post">+ Post a Job</Link>
              <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '0.4rem 1rem', color: '#fff', fontSize: '0.85rem', cursor: 'pointer' }}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/admin" className="nav-link" style={{ marginLeft: 'auto' }}>Admin Login</Link>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}