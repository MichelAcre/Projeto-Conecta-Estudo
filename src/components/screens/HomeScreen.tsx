import React from 'react';
import { ScreenType, UserProfile } from '../../types';
import { ASSETS } from '../../data/mockData';
import { playTapSound } from '../../utils/audio';

interface HomeScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenType) => void;
  onOpenCreateRoom: () => void;
  onOpenStudyGroup: (groupTitle: string, discipline: string, online: string, topic: string) => void;
  onShowToast: (msg: string, icon?: string, iconColor?: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  onNavigate,
  onOpenCreateRoom,
  onOpenStudyGroup,
  onShowToast
}) => {
  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-28 gap-5 max-w-md mx-auto">
      {/* 1. Saudação Clara e Status Integrado */}
      <section className="pt-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Quinta-feira, 24 de Outubro</span>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-1.5 tracking-tight">
              Olá, {user.name.split(' ')[0]}! <span className="inline-block animate-bounce">👋</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 shadow-sm border border-orange-200/50">
              <span
                className="material-symbols-outlined text-[18px] text-orange-500"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span className="text-xs font-bold">{user.streakDays} dias</span>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
              NV. {user.level}
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRIORIDADE 1: Card de Destaque Unificado - Progresso, Meta Diária e XP */}
      <section>
        <div
          onClick={() => {
            playTapSound();
            onNavigate('progresso');
          }}
          className="cursor-pointer group relative overflow-hidden rounded-2xl bg-white p-4 shadow-[0_4px_16px_-2px_rgba(55,66,250,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] border border-slate-200/80 flex flex-col gap-3 hover:border-blue-300 transition-all active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">timer</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Meta Diária de Foco</h3>
                <p className="text-xs text-slate-500">
                  Faltam apenas {user.focusMinutesGoal - user.focusMinutesToday} min para o objetivo!
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-blue-600">
                {user.focusMinutesToday}
                <span className="text-xs text-slate-500 font-normal">/{user.focusMinutesGoal} min</span>
              </span>
              <span className="block text-[11px] text-slate-400 font-semibold">{user.xpToday.toLocaleString()} XP hoje</span>
            </div>
          </div>
          {/* Progress Bar Track */}
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-700 ease-out"
              style={{ width: `${Math.round((user.focusMinutesToday / user.focusMinutesGoal) * 100)}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* 3. PRIORIDADE 2: Atividades que Precisam de Atenção Imediata */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>Em Andamento</span>
          </h3>
        </div>

        {/* Card de Monitoria Ativa Agora */}
        <article className="rounded-2xl bg-white p-4 shadow-[0_4px_16px_-2px_rgba(55,66,250,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] border border-slate-200/80 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  4 online
                </span>
                <span className="text-[11px] text-blue-600 font-semibold">• Exatas</span>
              </div>
              <h4 className="font-bold text-base text-slate-900">Cálculo & Álgebra UFRJ</h4>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Monitor Lucas está resolvendo dúvidas da Lista 4: Derivadas Parciais e Teorema de Green.
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <div className="flex -space-x-2">
              <img
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white shadow-sm"
                alt="Estudante"
                src={ASSETS.students.peer1}
              />
              <img
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white shadow-sm"
                alt="Estudante"
                src={ASSETS.students.peer2}
              />
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold ring-2 ring-white shadow-sm">
                +2
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                playTapSound();
                onOpenStudyGroup(
                  'Cálculo & Álgebra UFRJ',
                  'Matemática',
                  '4 online',
                  'Monitor Lucas está resolvendo dúvidas da Lista 4: Derivadas Parciais e Teorema de Green.'
                );
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_14px_rgba(17,26,228,0.22)] active:scale-95 transition-all"
            >
              <span>Ver grupo</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </article>

        {/* Alerta Rápido de Quiz Pendente / Revisão Recomendada */}
        <div className="rounded-2xl bg-orange-50/80 p-3.5 border border-orange-200/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">Quiz Diário Pendente</h4>
              <p className="text-[11px] text-orange-700 font-medium truncate">Física Mecânica & Newton • +60 XP</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playTapSound();
              onNavigate('quiz');
            }}
            className="px-4 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shrink-0 active:scale-95 transition-all shadow-sm"
          >
            Jogar
          </button>
        </div>
      </section>

      {/* 4. PRIORIDADE 3: Acesso Rápido (Quick Actions Grid) */}
      <section className="flex flex-col gap-2.5">
        <h3 className="text-sm font-bold text-slate-900">Acesso Rápido</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              playTapSound();
              onNavigate('disciplinas');
            }}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3 hover:bg-slate-50 active:scale-95 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">menu_book</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Disciplinas</p>
              <p className="text-[11px] text-slate-500">6 ativas</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              onNavigate('conteudos');
            }}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3 hover:bg-slate-50 active:scale-95 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">folder_open</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Biblioteca</p>
              <p className="text-[11px] text-slate-500">Resumos & PDFs</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              onNavigate('quiz');
            }}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3 hover:bg-slate-50 active:scale-95 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">quiz</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Quizzes</p>
              <p className="text-[11px] text-slate-500">Simulados</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              onOpenCreateRoom();
            }}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3 hover:bg-slate-50 active:scale-95 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">group_add</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Criar Grupo</p>
              <p className="text-[11px] text-slate-500">Estudo conjunto</p>
            </div>
          </button>
        </div>
      </section>

      {/* 5. Seção Secundária: Resumos Recomendados com Visual Leve e Equilibrado */}
      <section className="flex flex-col gap-2.5 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Resumos Recomendados</h3>
          <button
            type="button"
            onClick={() => {
              playTapSound();
              onNavigate('conteudos');
            }}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Ver biblioteca
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {/* Item 1 */}
          <div
            onClick={() => {
              playTapSound();
              onNavigate('sala-estudo');
            }}
            className="cursor-pointer p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-blue-300 transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <span className="material-symbols-outlined text-[22px]">description</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">Fórmulas Termodinâmica I</h4>
                <span className="text-[11px] text-slate-500 truncate block">Prof. Gabriel • PDF (2.4 MB)</span>
              </div>
            </div>
            <button
              type="button"
              aria-label="Baixar resumo"
              onClick={(e) => {
                e.stopPropagation();
                playTapSound();
                onShowToast('Download concluído: Fórmulas Termodinâmica I', 'download_done');
              }}
              className="w-9 h-9 rounded-full bg-slate-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shrink-0 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>
          </div>

          {/* Item 2 */}
          <div
            onClick={() => {
              playTapSound();
              onNavigate('sala-estudo');
            }}
            className="cursor-pointer p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-blue-300 transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                <span className="material-symbols-outlined text-[22px]">psychology</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">Mapas Mentais: Mitose e Meiose</h4>
                <span className="text-[11px] text-slate-500 truncate block">Mariana Costa • 14 slides</span>
              </div>
            </div>
            <button
              type="button"
              aria-label="Baixar mapa mental"
              onClick={(e) => {
                e.stopPropagation();
                playTapSound();
                onShowToast('Download concluído: Mapas Mentais Mitose', 'download_done');
              }}
              className="w-9 h-9 rounded-full bg-slate-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shrink-0 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
