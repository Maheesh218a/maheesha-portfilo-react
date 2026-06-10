import React, { useState } from 'react';
import AlertMessage from '../AlertMessage';

const SecurityEditor = () => {
  const [step, setStep] = useState(1); // 1 = request, 2 = verify
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

  const handleRequest = async () => {
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setAlert({ show: true, message: 'All fields are required.', type: 'error' });
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setAlert({ show: true, message: 'New passwords do not match.', type: 'error' });
      return;
    }
    if (formData.newPassword.length < 8) {
      setAlert({ show: true, message: 'New password must be at least 8 characters.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        })
      });
      const data = await res.json();
      if (res.ok) {
        setAlert({ show: true, message: data.message, type: 'success' });
        setStep(2);
      } else {
        setAlert({ show: true, message: data.error, type: 'error' });
      }
    } catch (err) {
      setAlert({ show: true, message: 'Failed to connect to server.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setAlert({ show: true, message: 'Please enter the 6-digit OTP.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpString })
      });
      const data = await res.json();
      if (res.ok) {
        setAlert({ show: true, message: 'Password changed successfully!', type: 'success' });
        setStep(1);
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setOtp(['', '', '', '', '', '']);
      } else {
        setAlert({ show: true, message: data.error, type: 'error' });
      }
    } catch (err) {
      setAlert({ show: true, message: 'Failed to connect to server.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <AlertMessage 
        message={alert.show ? alert.message : ''} 
        type={alert.type} 
        onClose={() => setAlert({ ...alert, show: false })} 
      />

      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h2 className="text-2xl font-display font-bold text-red-400">Security Settings</h2>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 max-w-md">
        {step === 1 ? (
          <div className="space-y-6">
            <h3 className="text-lg font-display font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400" /> Change Password
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-textSecondary uppercase mb-1 block">Old Password</label>
                <input
                  type="password"
                  value={formData.oldPassword}
                  onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-sm focus:border-red-400/50 outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="text-xs font-mono text-textSecondary uppercase mb-1 block">New Password</label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-sm focus:border-red-400/50 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-textSecondary uppercase mb-1 block">Re-type New Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-sm focus:border-red-400/50 outline-none transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleRequest}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 font-semibold border border-red-500/20 hover:bg-red-500/20 transition-all"
            >
              {loading ? 'Processing...' : 'Change Password'}
            </button>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <h3 className="text-lg font-display font-semibold text-[#00d4ff]">Verify Email OTP</h3>
            <p className="text-xs text-textSecondary font-mono">
              We've sent a 6-digit verification code to your email. Enter it below to confirm your password change.
            </p>

            <div className="flex justify-center gap-3 my-6">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-14 text-center bg-black/40 border border-white/10 rounded-xl font-display text-xl text-[#00ff88] focus:border-[#00ff88]/50 outline-none transition-colors"
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl bg-white/5 text-textSecondary font-semibold hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleVerify}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-[#00ff88]/10 text-[#00ff88] font-semibold border border-[#00ff88]/20 hover:bg-[#00ff88]/20 transition-all"
              >
                {loading ? 'Verifying...' : 'Verify & Save'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityEditor;
