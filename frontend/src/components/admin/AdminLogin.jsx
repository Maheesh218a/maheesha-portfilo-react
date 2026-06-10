import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem('adminAuth', 'true');
      navigate('/admin/panel');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Authentication failed.');
    } finally {
      setLoading(false);
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
          
          <div className="text-center mb-8 mt-4">
            <h2 className="font-display text-3xl font-black text-white mb-2 tracking-tight">
              Admin <span className="gradient-text">Access</span>
            </h2>
            <p className="text-textSecondary text-sm font-mono">
              Secure Firebase Authentication
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
