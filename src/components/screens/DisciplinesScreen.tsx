import React, { useState, useMemo } from 'react';
import { Discipline, ScreenType } from '../../types';
import { playTapSound } from '../../utils/audio';

interface DisciplinesScreenProps {
  disciplines: Discipline[];
  onOpenCreateRoom: () => void;
  onOpenStudyGroup: (groupTitle: string, discipline: string, online: string, topic: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string, icon?: string, iconColor?: string) => void;
}

export const DisciplinesScreen: React.FC<DisciplinesScreenProps> = ({
  disciplines,
  onOpenCreateRoom,
  onOpenStudyGroup,
  onNavigate,
  onShowToast
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'exatas' | 'biologicas' | 'humanas'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTopics = ['#PréCálculo', '#GenéticaENEM', '#IdadeMédia', '#Termodinâmica', '#QuímicaOrgânica'];

  const filteredDisciplines = useMemo(() => {
    return disciplines.filter((d) => {
      const matchesCategory = activeFilter === 'all' || d.category === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || d.name.toLowerCase().includes(q) || d.topics.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [disciplines, activeFilter, searchQuery]);

  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-28 gap-4 max-w-md mx-auto">
      {/* Gamified Active Community Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-blue-600 p-4 text-white shadow-md shadow-blue-700/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <span
                className="material-symbols-outlined text-[24px] text-emerald-300"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Comunidade Ativa</span>
              </div>
              <p className="text-[15px] font-bold leading-tight text-white">1.240 estudantes conectados</p>
            </div>
          </div>
          <span className="rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
            +45 XP Hoje
          </span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-3">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-slate-400 pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar matéria, tópico ou sala..."
            className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-100 text-slate-900 placeholder:text-slate-400 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-blue-600 focus:shadow-sm outline-none border border-transparent focus:border-blue-600"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Limpar busca"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 h-6 w-6 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Area Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => {
              playTapSound();
              setActiveFilter('all');
            }}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all active:scale-95 ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-blue-600/25'
                : 'bg-slate-100 text-slate-600 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">apps</span>
            Todas
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              setActiveFilter('exatas');
            }}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all active:scale-95 ${
              activeFilter === 'exatas'
                ? 'bg-blue-600 text-white shadow-blue-600/25'
                : 'bg-slate-100 text-slate-600 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">calculate</span>
            Exatas
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              setActiveFilter('biologicas');
            }}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all active:scale-95 ${
              activeFilter === 'biologicas'
                ? 'bg-blue-600 text-white shadow-blue-600/25'
                : 'bg-slate-100 text-slate-600 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">biotech</span>
            Biológicas
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              setActiveFilter('humanas');
            }}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all active:scale-95 ${
              activeFilter === 'humanas'
                ? 'bg-blue-600 text-white shadow-blue-600/25'
                : 'bg-slate-100 text-slate-600 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">history_edu</span>
            Humanas
          </button>
        </div>
      </div>

      {/* Trending Topics Ribbon */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-orange-600">
            <span className="material-symbols-outlined text-[15px] text-orange-500">trending_up</span>
            Mais Buscados
          </span>
          <span className="text-slate-400">Atualizado há 12m</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[11px]">
          {trendingTopics.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                playTapSound();
                setSearchQuery(tag.replace('#', ''));
              }}
              className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 font-semibold cursor-pointer hover:bg-slate-200 transition-colors active:scale-95"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Disciplines Cards List */}
      <div className="space-y-3.5">
        {filteredDisciplines.map((d) => (
          <article
            key={d.id}
            className="discipline-card relative flex flex-col rounded-2xl bg-white p-4 shadow-sm border border-slate-200/80 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${d.bgLightClass} ${d.colorClass}`}>
                  <span className="material-symbols-outlined text-[24px]">{d.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-[16px] font-bold text-slate-900 leading-snug">{d.name}</h2>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{d.topics}</p>
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <span className={`material-symbols-outlined text-[17px] ${d.colorClass}`}>groups</span>
                <span>{d.activeRooms} salas ativas</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="material-symbols-outlined text-[17px] text-emerald-600">person_pin_circle</span>
                <span>{d.onlineCount} online</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Progresso Geral</span>
                <span className={`font-bold ${d.colorClass}`}>{d.progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${d.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="mt-3 pt-2.5 flex items-center justify-between gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  playTapSound();
                  if (d.id === 'fisica') {
                    onNavigate('sala-estudo');
                  } else {
                    onOpenStudyGroup(
                      `Grupo de Estudo: ${d.name}`,
                      d.name,
                      `${d.onlineCount} online`,
                      `Conectando à sala ao vivo (${d.activeRooms} salas ativas). Bons estudos!`
                    );
                  }
                }}
                className="shrink-0 flex items-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 px-3 py-2 text-xs font-bold text-white shadow-sm shadow-blue-600/20 active:scale-95 transition-all w-full justify-center"
              >
                <span>Ver grupo</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </article>
        ))}

        {/* Empty State */}
        {filteredDisciplines.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white border border-slate-200">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-2">
              <span className="material-symbols-outlined text-[32px]">menu_book</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Nenhuma disciplina encontrada</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Tente buscar por termos mais genéricos ou mude o filtro de área acadêmica.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 rounded-xl bg-blue-600 px-4 py-2 text-xs text-white font-bold shadow-md shadow-blue-600/20 active:scale-95"
            >
              Ver todas as disciplinas
            </button>
          </div>
        )}
      </div>

      {/* Friendly Study Room Creation Banner */}
      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-100/90 to-amber-50 p-4 shadow-sm border border-orange-200/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
            <span className="material-symbols-outlined text-[22px]">group_add</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 leading-tight">Não achou sua turma?</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Crie um grupo de estudo agora mesmo.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            playTapSound();
            onOpenCreateRoom();
          }}
          className="shrink-0 rounded-xl bg-orange-500 hover:bg-orange-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-orange-500/30 active:scale-95 transition-transform"
        >
          Criar Sala
        </button>
      </div>
    </div>
  );
};
