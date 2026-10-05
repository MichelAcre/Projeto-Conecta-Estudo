import React from 'react';
import { ScreenType } from '../types';
import { playTapSound } from '../utils/audio';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  // Hide on auth, quiz active, or result screen to let full screen attention take over
  if (currentScreen === 'auth' || currentScreen === 'quiz' || currentScreen === 'resultado-quiz' || currentScreen === 'sala-estudo') {
    return null;
  }

  const navItems = [
    { id: 'inicio' as ScreenType, label: 'Início', icon: 'home' },
    { id: 'disciplinas' as ScreenType, label: 'Disciplinas', icon: 'menu_book' },
    { id: 'conteudos' as ScreenType, label: 'Conteúdos', icon: 'folder' },
    { id: 'progresso' as ScreenType, label: 'Quiz', icon: 'insights' },
    { id: 'auth' as ScreenType, label: 'Perfil', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(17,26,228,0.06)]">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-1">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id || (item.id === 'progresso' && (currentScreen as ScreenType) === 'quiz');

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                playTapSound();
                onNavigate(item.id);
              }}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-all duration-150 active:scale-95 ${
                isActive ? 'text-[#111ae4] font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"
                }}
              >
                {item.icon}
              </span>
              <span className="text-[11px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
