import React, { useState } from 'react';
import { UserProfile, ScreenType } from '../../types';
import { ASSETS } from '../../data/mockData';
import { playTapSound, playSuccessChime } from '../../utils/audio';

interface AuthScreenProps {
  onLoginSuccess: (user: Partial<UserProfile>) => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string, icon?: string, iconColor?: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLoginSuccess,
  onNavigate,
  onShowToast
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [studyArea, setStudyArea] = useState('');
  const [email, setEmail] = useState('sofia.mendes@escola.br');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      playSuccessChime();
      const updatedUser: Partial<UserProfile> = {
        name: authMode === 'register' && name ? name : 'Sofia Mendes',
        email: email || 'sofia.mendes@escola.br',
        studyArea: authMode === 'register' && studyArea ? studyArea : 'Ensino Médio / Pré-Vestibular',
        isLoggedIn: true
      };
      onLoginSuccess(updatedUser);
      onShowToast(
        authMode === 'register'
          ? 'Conta criada! +150 XP de Boas-Vindas creditados 🎉'
          : 'Conectado com sucesso! Bem-vinda de volta.',
        'check_circle',
        'text-emerald-400'
      );
      onNavigate('inicio');
    }, 600);
  };

  const handleSocialLogin = (provider: 'Google' | 'Apple') => {
    playTapSound();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      playSuccessChime();
      onLoginSuccess({
        name: 'Sofia Mendes',
        email: 'sofia.mendes@gmail.com',
        isLoggedIn: true
      });
      onShowToast(`Conectado via ${provider} com sucesso!`, 'verified', 'text-blue-400');
      onNavigate('inicio');
    }, 500);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-6 pb-12 min-h-screen">
      {/* Decorative backdrop glow */}
      <div className="relative pt-4 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-blue-100/60 blur-3xl pointer-events-none"></div>
        <div className="absolute top-8 -right-10 w-44 h-44 rounded-full bg-orange-100/50 blur-3xl pointer-events-none"></div>

        {/* Logo Card */}
        <div className="relative mb-3 flex items-center justify-center p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
          <img
            alt="Logo Conecta Estudo"
            src={ASSETS.logo}
            className="w-14 h-14 object-contain rounded-xl"
          />
        </div>

        {/* Small Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-2">
          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider">Rede Acadêmica & Gamificada</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Conecta Estudo
        </h1>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed mt-1">
          Aprenda junto, vá mais longe. Encontre grupos de estudo e impulsione suas notas.
        </p>

        {/* Social Proof Avatars */}
        <div className="flex items-center gap-2.5 mt-3 mb-1">
          <div className="flex -space-x-1.5">
            <img className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-white shadow-sm" alt="Estudante" src={ASSETS.students.peer4} />
            <img className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-white shadow-sm" alt="Estudante" src={ASSETS.students.peer5} />
            <img className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-white shadow-sm" alt="Estudante" src={ASSETS.students.peer6} />
          </div>
          <p className="text-xs text-slate-600 font-medium">
            <span className="text-blue-600 font-bold">+18.400</span> estudantes conectados
          </p>
        </div>
      </div>

      {/* Tabs: Entrar vs Cadastrar */}
      <div className="mt-4">
        <div className="bg-slate-200/70 rounded-2xl p-1 flex shadow-inner">
          <button
            type="button"
            onClick={() => {
              playTapSound();
              setAuthMode('login');
            }}
            className={`flex-1 py-2 text-center rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              authMode === 'login'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">login</span>
            <span>Entrar</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              setAuthMode('register');
            }}
            className={`flex-1 py-2 text-center rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              authMode === 'register'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">person_add</span>
            <span>Cadastrar</span>
          </button>
        </div>
      </div>

      {/* Auth Form Card */}
      <div className="mt-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 transition-all">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Register-only fields */}
          {authMode === 'register' && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">Nome completo</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                    badge
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Lucas Mendes Silva"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-slate-900 text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">Área de interesse / Série</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                    school
                  </span>
                  <input
                    type="text"
                    value={studyArea}
                    onChange={(e) => setStudyArea(e.target.value)}
                    placeholder="Ex: Ensino Médio, Medicina, T.I."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-slate-900 text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700">E-mail estudantil ou pessoal</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@escola.br"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-slate-900 text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Senha</label>
              {authMode === 'login' && (
                <button
                  type="button"
                  onClick={() => onShowToast('Link de recuperação enviado para seu e-mail!', 'mail')}
                  className="text-[11px] text-blue-600 font-semibold hover:underline"
                >
                  Esqueceu a senha?
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 text-slate-900 text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 flex items-center justify-center p-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Welcome Gamification Perk */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-emerald-900 leading-tight">Bônus de Boas-Vindas</span>
              <span className="text-[11px] text-emerald-700 truncate">Ganhe +150 XP e Badge Pioneiro ao entrar hoje!</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                <span>Conectando...</span>
              </>
            ) : (
              <>
                <span>{authMode === 'login' ? 'Entrar no Conecta Estudo' : 'Criar Minha Conta Grátis'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-slate-200"></div>
          <span className="px-3 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            ou continue com
          </span>
          <div className="flex-grow h-px bg-slate-200"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="flex items-center justify-center gap-2 min-h-[42px] py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 active:scale-[0.98] transition-all"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.67v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.16z" fill="#4285F4"></path>
              <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
              <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z" fill="#FBBC05"></path>
              <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('Apple')}
            className="flex items-center justify-center gap-2 min-h-[42px] py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 active:scale-[0.98] transition-all"
          >
            <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.6-0.74 1.01-1.76.9-2.78-.87.04-1.92.58-2.54 1.31-.55.63-.99 1.66-.86 2.65.98.08 1.95-.49 2.5-1.18z"></path>
            </svg>
            <span>Apple</span>
          </button>
        </div>
      </div>

      {/* Footnote & Verified Badge */}
      <div className="mt-4 flex flex-col items-center text-center">
        <p className="text-[11px] text-slate-500 max-w-xs leading-normal">
          Ao continuar, você concorda com os <a href="#termos" onClick={(e) => { e.preventDefault(); onShowToast('Exibindo Termos de Uso', 'info'); }} className="text-blue-600 font-semibold underline">Termos de Uso</a> e a <a href="#privacidade" onClick={(e) => { e.preventDefault(); onShowToast('Exibindo Política de Privacidade', 'info'); }} className="text-blue-600 font-semibold underline">Política de Privacidade</a> do Conecta Estudo.
        </p>
        <div className="mt-2.5 flex items-center justify-center gap-1.5 text-slate-500">
          <span className="material-symbols-outlined text-[15px] text-emerald-600">verified_user</span>
          <span className="text-[11px] font-medium">Ambiente seguro verificado para estudantes</span>
        </div>
      </div>
    </div>
  );
};
