import React, { useEffect, useState } from 'react';

const AlertMessage = ({ message, type = 'error', onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // wait for fade out
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const isError = type === 'error';
  
  return (
    <div className={`fixed top-6 right-6 z-50 transition-all duration-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className={`relative overflow-hidden p-4 rounded-xl shadow-2xl backdrop-blur-md border flex items-center gap-3 min-w-[300px]
        ${isError ? 'bg-red-500/10 border-red-500/30' : 'bg-[#00ff88]/10 border-[#00ff88]/30'}
      `}>
        {/* Glow behind */}
        <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-16 h-16 rounded-full blur-xl opacity-20 pointer-events-none
          ${isError ? 'bg-red-500' : 'bg-[#00ff88]'}
        `} />
        
        <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0
          ${isError ? 'bg-red-500/20 text-red-400' : 'bg-[#00ff88]/20 text-[#00ff88]'}
        `}>
          {isError ? '✕' : '✓'}
        </div>
        
        <div className="flex-1">
          <h4 className={`font-display font-bold text-sm ${isError ? 'text-red-400' : 'text-[#00ff88]'}`}>
            {isError ? 'Action Failed' : 'Success'}
          </h4>
          <p className="text-xs font-mono text-white/80 mt-0.5">{message}</p>
        </div>

        <button onClick={() => setIsVisible(false)} className="text-white/50 hover:text-white transition-colors p-1">
          ✕
        </button>
      </div>
    </div>
  );
};

export default AlertMessage;
