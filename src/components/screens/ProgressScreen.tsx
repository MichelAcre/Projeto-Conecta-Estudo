import React, { useState } from 'react';
import { ScreenType, UserProfile } from '../../types';
import { ASSETS } from '../../data/mockData';
import { playTapSound } from '../../utils/audio';

interface ProgressScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenType) => void;
  onOpenStudyGroup: (groupTitle: string, discipline: string, online: string, topic: string) => void;
  onShowToast: (msg: string, icon?: string, iconColor?: string) => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  user,
  onNavigate,
  onOpenStudyGroup,
  onShowToast
}) => {
  const [period, setPeriod] = useState<'semana' | 'mes' | 'ano'>('semana');

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-20 pb-28 gap-4">
      {/* Subheader & Streak Pill */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">Painel do Aluno</span>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">Seu Desempenho</h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-800 shadow-sm border border-orange-200/60">
          <span
            className="material-symbols-outlined text-[18px] text-orange-500"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <span className="text-xs font-bold">12 dias ativos</span>
        </div>
      </div>

      {/* Segmented Time Switcher */}
      <div className="w-full p-1 rounded-xl bg-slate-200/70 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            playTapSound();
            setPeriod('semana');
          }}
          className={`flex-1 py-1.5 text-center rounded-lg text-xs transition-all duration-200 ${
            period === 'semana'
              ? 'bg-white text-blue-700 shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900 font-semibold'
          }`}
        >
          Esta Semana
        </button>
        <button
          type="button"
          onClick={() => {
            playTapSound();
            setPeriod('mes');
          }}
          className={`flex-1 py-1.5 text-center rounded-lg text-xs transition-all duration-200 ${
            period === 'mes'
              ? 'bg-white text-blue-700 shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900 font-semibold'
          }`}
        >
          Este Mês
        </button>
        <button
          type="button"
          onClick={() => {
            playTapSound();
            setPeriod('ano');
          }}
          className={`flex-1 py-1.5 text-center rounded-lg text-xs transition-all duration-200 ${
            period === 'ano'
              ? 'bg-white text-blue-700 shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900 font-semibold'
          }`}
        >
          Geral 2024
        </button>
      </div>

      {/* Hero Visual Metrics 3-Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Card 1: Horas */}
        <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
            <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              timer
            </span>
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900 block leading-tight">28.5h</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Estudadas</span>
          </div>
          <div className="flex items-center gap-0.5 mt-2 text-emerald-600 text-[10px] font-bold">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>+14% sem.</span>
          </div>
        </div>

        {/* Card 2: Quizzes */}
        <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-2">
            <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              quiz
            </span>
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900 block leading-tight">42</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Quizzes feitos</span>
          </div>
          <div className="flex items-center gap-0.5 mt-2 text-orange-600 text-[10px] font-bold">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span>86% acerto</span>
          </div>
        </div>

        {/* Card 3: Resumos */}
        <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-blue-600 mb-2">
            <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_stories
            </span>
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900 block leading-tight">14</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Resumos lidos</span>
          </div>
          <div className="flex items-center gap-0.5 mt-2 text-blue-600 text-[10px] font-bold">
            <span className="material-symbols-outlined text-[14px]">task_alt</span>
            <span>Concluídos</span>
          </div>
        </div>
      </div>

      {/* Ritmo de Dedicação Diária (Interactive Bar Chart) */}
      <div className="w-full p-4 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h3 className="text-sm font-bold text-slate-900">Ritmo de Dedicação Diária</h3>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            Média: 4.1h/dia
          </span>
        </div>

        {/* Bar Chart Visualization */}
        <div className="relative w-full pt-3 pb-1">
          <div className="flex items-end justify-between gap-1.5 h-32 px-1">
            {[
              { day: 'Seg', hours: '3.5h', height: '50%', isPeak: false },
              { day: 'Ter', hours: '4.0h', height: '60%', isPeak: false },
              { day: 'Qua', hours: '4.2h', height: '65%', isPeak: false },
              { day: 'Qui', hours: '5.8h', height: '95%', isPeak: true },
              { day: 'Sex', hours: '5.0h', height: '78%', isPeak: false },
              { day: 'Sáb', hours: '3.0h', height: '45%', isPeak: false },
              { day: 'Dom', hours: '2.0h', height: '30%', isPeak: false },
            ].map((col) => (
              <div key={col.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                <span className="text-[10px] text-slate-500 font-medium">{col.hours}</span>
                <div
                  className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${
                    col.isPeak
                      ? 'bg-gradient-to-t from-blue-700 to-blue-500 shadow-md shadow-blue-600/30'
                      : 'bg-slate-200 group-hover:bg-blue-200'
                  }`}
                  style={{ height: col.height }}
                ></div>
                <span className={`text-xs ${col.isPeak ? 'text-blue-700 font-bold' : 'text-slate-500 font-medium'}`}>
                  {col.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Domínio por Disciplina */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Domínio por Disciplina</h3>
          <button
            type="button"
            onClick={() => onNavigate('disciplinas')}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Ver todas
          </button>
        </div>

        {/* Matemática */}
        <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <span className="material-symbols-outlined text-[18px]">calculate</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Matemática</h4>
                <span className="text-[11px] text-slate-500">Em foco: Geometria Analítica</span>
              </div>
            </div>
            <span className="text-sm font-bold text-blue-600">78%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 mt-1 overflow-hidden">
            <div className="h-full rounded-full bg-blue-600" style={{ width: '78%' }}></div>
          </div>
        </div>

        {/* Biologia */}
        <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <span className="material-symbols-outlined text-[18px]">eco</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Biologia</h4>
                <span className="text-[11px] text-emerald-700 font-semibold">Nível Avançado</span>
              </div>
            </div>
            <span className="text-sm font-bold text-emerald-600">92%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 mt-1 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-600" style={{ width: '92%' }}></div>
          </div>
        </div>

        {/* História */}
        <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">História</h4>
                <span className="text-[11px] text-orange-700 font-semibold">Necessita Reforço • Grupos sugeridos</span>
              </div>
            </div>
            <span className="text-sm font-bold text-orange-600">65%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 mt-1 overflow-hidden">
            <div className="h-full rounded-full bg-orange-500" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>

      {/* Recomendações e Monitoria Callout Card */}
      <div className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 shadow-sm border border-slate-300/80 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <span className="material-symbols-outlined text-[24px]">group</span>
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] uppercase font-bold text-orange-700">Reforço Recomendado</span>
            <p className="text-xs text-slate-800 leading-snug">
              Seu desempenho em <strong className="text-orange-700 font-bold">História</strong> precisa de reforço. O grupo{' '}
              <span className="font-bold">História Geral ENEM</span> está com monitoria ao vivo hoje!
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-300/60">
          <div className="flex items-center -space-x-1.5">
            <img src={ASSETS.students.peer4} alt="Membro" className="w-7 h-7 rounded-full object-cover ring-2 ring-white shadow-sm" />
            <img src={ASSETS.students.peer5} alt="Membro" className="w-7 h-7 rounded-full object-cover ring-2 ring-white shadow-sm" />
            <img src={ASSETS.students.peer6} alt="Membro" className="w-7 h-7 rounded-full object-cover ring-2 ring-white shadow-sm" />
            <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-700 text-[10px] flex items-center justify-center ring-2 ring-white font-bold">
              +18
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              playTapSound();
              onOpenStudyGroup(
                'História Geral ENEM',
                'História',
                '18 online',
                'Monitoria ao vivo de revisão sobre Brasil República e Revoluções.'
              );
            }}
            className="h-9 px-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1 transition-transform active:scale-95 shadow-sm"
          >
            <span>Ver grupo</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Metas em Andamento */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Metas em Andamento</h3>
          <button
            type="button"
            onClick={() => onShowToast('Nova meta customizada em breve!', 'flag')}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Nova meta
          </button>
        </div>

        {/* Meta 1: ENEM 2024 */}
        <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined text-[18px]">flag</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Meta ENEM 2024</h4>
                <span className="text-[11px] text-slate-500">Plano Geral de Estudos</span>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600">75%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-blue-600" style={{ width: '75%' }}></div>
          </div>
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Faltam 42 tópicos da matriz</span>
            <span className="text-emerald-700 font-semibold">Dentro do prazo</span>
          </div>
        </div>

        {/* Meta 2: Desafio Semanal XP */}
        <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  bolt
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Desafio Semanal em Grupos</h4>
                <span className="text-[11px] text-slate-500">Conquiste 500 XP em salas</span>
              </div>
            </div>
            <span className="text-xs font-bold text-orange-600">380 / 500 XP</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-orange-500" style={{ width: '76%' }}></div>
          </div>
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>120 XP restantes</span>
            <span className="text-orange-700 font-semibold">Termina em 2 dias</span>
          </div>
        </div>
      </div>

      {/* Top 5% Banner */}
      <div className="p-3.5 rounded-2xl bg-blue-50/80 flex items-center gap-3 border border-blue-200/60">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[20px]">military_tech</span>
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-xs font-bold text-slate-900">Você está no Top 5% da semana!</h5>
          <p className="text-[11px] text-slate-600 truncate">
            Continue nesse ritmo para desbloquear o selo Mestre da Disciplina.
          </p>
        </div>
      </div>
    </div>
  );
};
