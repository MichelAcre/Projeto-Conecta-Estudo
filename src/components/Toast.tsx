import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
  iconColor?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle', iconColor = 'text-emerald-400' }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      <div className="bg-[#141d23] text-white px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-semibold max-w-xs sm:max-w-md text-center border border-slate-700/50">
        <span className={`material-symbols-outlined text-[18px] ${iconColor}`}>
          {icon}
        </span>
        <span className="truncate">{message}</span>
      </div>
    </div>
  );
};
