import React from 'react';
import { ScreenType, UserProfile } from '../types';
import { ASSETS } from '../data/mockData';
import { playTapSound } from '../utils/audio';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
  user: UserProfile;
  quizTimeRemaining?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenSearch,
  onOpenNotifications,
  user,
  quizTimeRemaining = 0
}) => {
  if (currentScreen === 'auth') {
    return null;
  }

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Header for Active Quiz Screen
  if (currentScreen === 'quiz') {
    return (
      <header className="fixed top-0 inset-x-0 z-50 pt-safe bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_10px_rgba(11,28,48,0.03)]">
        <div className="h-14 px-4 flex items-center justify-between max-w-md mx-auto">
          {/* Close button */}
          <button
            type="button"
            aria-label="Sair do quiz"
            onClick={() => {
              playTapSound();
              if (window.confirm('Deseja realmente sair do quiz? O seu progresso atual será mantido.')) {
                onNavigate('inicio');
              }
            }}
            className="w-10 h-10 -ml-1 flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>

          {/* Central Title */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Biologia • Ensino Médio</span>
            <h1 className="text-[15px] font-bold text-slate-900 leading-tight">Quiz: Biologia Celular</h1>
          </div>

          {/* Timer & XP Badge */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-900 text-[12px] font-semibold">
              <span className="material-symbols-outlined text-[15px] text-blue-600">timer</span>
              <span className="font-mono text-[12px]">{formatTimer(quizTimeRemaining)}</span>
            </div>
            <div className="hidden xs:flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
              <span className="material-symbols-outlined text-[13px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span>+50 XP</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Header for Stack Screens with Back button (Sala de Estudo, Resultado do Quiz)
  if (currentScreen === 'sala-estudo' || currentScreen === 'resultado-quiz') {
    const title = currentScreen === 'sala-estudo' ? 'Sala De Estudo' : 'Resultado do Quiz';
    return (
      <header className="fixed top-0 inset-x-0 z-40 pt-safe bg-[#f8f9ff]/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="h-14 px-4 flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              aria-label="Voltar"
              onClick={() => {
                playTapSound();
                onNavigate(currentScreen === 'resultado-quiz' ? 'inicio' : 'conteudos');
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full text-slate-700 hover:bg-slate-200/50 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <img
              alt="Conecta Estudo Logo"
              src={ASSETS.logo}
              className="h-7 w-auto object-contain shrink-0"
            />
            <h1 className="font-bold text-base text-slate-900 truncate">{title}</h1>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('auth')}
            title="Ver perfil / conta"
            className="flex items-center shrink-0 active:scale-95 transition-transform"
          >
            <img
              alt="Perfil"
              src={user.avatar}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20"
            />
          </button>
        </div>
      </header>
    );
  }

  // Header for Main Tab Screens (Início, Disciplinas, Conteúdos, Progresso)
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'inicio': return 'Início';
      case 'disciplinas': return 'Disciplinas';
      case 'conteudos': return 'Conteúdos';
      case 'progresso': return 'Progresso & Métricas';
      default: return 'Conecta Estudo';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 pt-safe bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-md mx-auto">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <img
            alt="Conecta Estudo Logo"
            src={ASSETS.logo}
            className="h-8 w-auto object-contain shrink-0 cursor-pointer active:scale-95 transition-transform"
            onClick={() => onNavigate('inicio')}
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-orange-600 leading-none uppercase tracking-wide">
              Conecta Estudo
            </span>
            <h1 className="text-base font-bold text-slate-900 truncate">
              {getScreenTitle()}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            aria-label="Buscar"
            onClick={() => {
              playTapSound();
              onOpenSearch?.();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-200/60 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            type="button"
            aria-label="Notificações"
            onClick={() => {
              playTapSound();
              onOpenNotifications?.();
            }}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-200/60 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          </button>

          <button
            type="button"
            aria-label="Perfil"
            onClick={() => {
              playTapSound();
              onNavigate('progresso');
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-transform"
          >
            <img
              alt="Foto de perfil"
              src={user.avatar}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
