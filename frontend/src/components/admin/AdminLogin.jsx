import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin/panel');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative" style={{ cursor: 'auto' }}>
      <div className="noise-overlay" />
      
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 right-0 h-1" 
            style={{ background: 'linear-gradient(90deg, #00d4ff, #7c3aed)' }}
          />
          
          <div className="text-center mb-8 mt-4">
            <h2 className="font-display text-3xl font-black text-textPrimary mb-2">
              Admin <span className="gradient-text">Access</span>
            </h2>
            <p className="text-textSecondary text-sm font-mono">
              Manage your portfolio content
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-textSecondary mb-2 uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                placeholder="admin"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textSecondary/50 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-all font-body"
                disabled
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-textSecondary mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textSecondary/50 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-all font-body"
                disabled
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl font-display font-bold text-white transition-all duration-300 relative group overflow-hidden mt-4"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Enter Admin Panel
              </span>
            </button>
            <p className="text-center text-xs text-textSecondary/50 font-mono mt-4">
              (Database connection disabled. Click to enter directly.)
            </p>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/')}
            className="text-sm font-mono text-textSecondary hover:text-accent transition-colors"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
