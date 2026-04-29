'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Both name and email are required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Store in sessionStorage to carry to the form
    sessionStorage.setItem('patient_entry', JSON.stringify({ name: name.trim(), email: email.trim() }));
    router.push('/form');
  };

  return (
    <div className="page-root" style={{ justifyContent: 'center' }}>
      <header className="page-header" style={{ position: 'absolute', width: '100%', top: 0 }}>
        <div className="header-brand">MyGastro<span>.Ai</span></div>
        <div className="header-tag">Patient Portal</div>
      </header>

      <main className="page-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 80 }}>
        <div className="step-card" style={{ maxWidth: 440, width: '100%' }}>
          <div className="step-card-head" style={{ textAlign: 'center', padding: '32px 28px 24px' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '16px', background: 'rgba(59,130,246,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', color: '#3b82f6', fontSize: 28
            }}>
              👋
            </div>
            <h1 className="step-title" style={{ fontSize: 22, marginBottom: 8 }}>Welcome!</h1>
            <p className="step-subtitle" style={{ fontSize: 14 }}>
              Please enter your name and email to begin your IBD intake form.
            </p>
          </div>

          <div className="step-body" style={{ padding: '0 28px 32px' }}>
            {error && (
              <div className="ferr" style={{ marginBottom: 16, padding: '10px 12px', background: 'var(--error-bg)', borderRadius: 'var(--radius-sm)' }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleStart} className="fg" style={{ gap: 16 }}>
              <div className="fg">
                <label htmlFor="name">Full Name<span className="req">*</span></label>
                <input
                  id="name"
                  type="text"
                  className="fi"
                  placeholder="e.g. Jane Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div className="fg">
                <label htmlFor="email">Email Address<span className="req">*</span></label>
                <input
                  id="email"
                  type="email"
                  className="fi"
                  placeholder="patient@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit" style={{ width: '100%', justifyContent: 'center', marginTop: 8, padding: '12px 24px' }}>
                Begin Intake Form
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
