import React, { useEffect } from 'react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onCancel} />
      
      <div className="relative glass-card p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-200">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-[50px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00d4ff]/20 rounded-full blur-[50px] -z-10 pointer-events-none" />
        
        <h3 className="text-2xl font-display font-bold text-white mb-2">{title}</h3>
        <p className="text-sm font-mono text-textSecondary mb-8">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl font-mono text-sm border border-white/10 hover:bg-white/5 transition-colors text-white/80"
          >
            No, Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] bg-gradient-to-r from-red-600 to-rose-500 border border-red-500/50"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
