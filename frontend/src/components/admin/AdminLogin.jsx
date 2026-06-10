import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Login, 2: OTP
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server connection failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('adminAuth', 'true');
        navigate('/admin/panel');
      } else {
        setError(data.error || 'Verification failed');
      }
    } catch (err) {
      setError('Server connection failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Allow pasting
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split('');
      for (let i = 0; i < pasted.length; i++) {
        if (index + i < 6) newOtp[index + i] = pasted[i];
      }
      setOtp(newOtp);
      const focusIndex = Math.min(index + pasted.length, 5);
      inputRefs.current[focusIndex].focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#080c10] flex items-center justify-center p-6 relative overflow-hidden" style={{ cursor: 'auto' }}>
      <div className="noise-overlay" />
      
      {/* Background Glows */}
      <div 
        className="fixed top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
      />
      <div 
        className="fixed top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card p-8 rounded-3xl relative overflow-hidden shadow-2xl border border-white/10">
          <div 
            className="absolute top-0 left-0 right-0 h-1" 
            style={{ background: 'linear-gradient(90deg, #00d4ff, #7c3aed)' }}
          />
          
          {step === 1 ? (
            <>
              <div className="text-center mb-8 mt-4">
                <h2 className="font-display text-3xl font-black text-white mb-2 tracking-tight">
                  Admin <span className="gradient-text">Access</span>
                </h2>
                <p className="text-textSecondary text-sm font-mono">
                  Authenticate to manage portfolio
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono text-textSecondary mb-2 uppercase tracking-wider">
                    Secure Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-textSecondary/30 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-all font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-textSecondary mb-2 uppercase tracking-wider">
                    Passphrase
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-textSecondary/30 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-all font-mono text-sm tracking-widest"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-mono text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl font-display font-bold text-white transition-all duration-300 relative group overflow-hidden mt-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.8), rgba(124,58,237,0.8))',
                    boxShadow: '0 0 20px rgba(0,212,255,0.2)'
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? 'Authenticating...' : 'Initialize Connection'}
                  </span>
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8 mt-4">
                <div className="w-16 h-16 mx-auto bg-black/50 rounded-full flex items-center justify-center mb-4 border border-[#00ff88]/30 shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                  <span className="text-2xl">🔒</span>
                </div>
                <h2 className="font-display text-2xl font-black text-white mb-2">
                  Identity <span className="text-[#00ff88]">Verification</span>
                </h2>
                <p className="text-textSecondary text-xs font-mono leading-relaxed px-4">
                  Secure terminal access initiated.<br/>
                  An authorization code has been dispatched to your secure channel.
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-8">
                <div className="flex justify-center gap-3 sm:gap-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength={6}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-10 h-12 sm:w-12 sm:h-14 bg-black/60 border border-white/20 rounded-xl text-center text-xl font-bold text-[#00ff88] focus:outline-none focus:border-[#00ff88] focus:shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all font-mono"
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-mono text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl font-display font-bold text-black transition-all duration-300 relative group overflow-hidden shadow-[0_0_20px_rgba(0,255,136,0.2)] hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]"
                  style={{ background: '#00ff88' }}
                >
                  <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? 'Verifying...' : 'Verify & Enter Terminal'}
                  </span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-xs font-mono text-textSecondary hover:text-white transition-colors mt-4"
                >
                  Cancel Authentication
                </button>
              </form>
            </>
          )}
        </div>
        
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/')}
            className="text-xs font-mono text-textSecondary hover:text-[#00d4ff] transition-colors"
          >
            ← Terminate Session & Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
