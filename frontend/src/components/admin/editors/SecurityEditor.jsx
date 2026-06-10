import React, { useState } from 'react';
import AlertMessage from '../AlertMessage';
import { auth } from '../../../firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const SecurityEditor = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

  const handleChangePassword = async () => {
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

    const user = auth.currentUser;
    if (!user) {
      setAlert({ show: true, message: 'You must be logged in to change your password.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      // Re-authenticate user with old password
      const credential = EmailAuthProvider.credential(user.email, formData.oldPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, formData.newPassword);
      
      setAlert({ show: true, message: 'Password changed successfully! Next time you log in, use your new password.', type: 'success' });
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        setAlert({ show: true, message: 'Incorrect old password.', type: 'error' });
      } else {
        setAlert({ show: true, message: 'Failed to change password: ' + err.message, type: 'error' });
      }
    } finally {
      setLoading(false);
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
        <div className="space-y-6">
          <h3 className="text-lg font-display font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400" /> Change Firebase Password
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
            onClick={handleChangePassword}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 font-semibold border border-red-500/20 hover:bg-red-500/20 transition-all"
          >
            {loading ? 'Processing...' : 'Change Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityEditor;
