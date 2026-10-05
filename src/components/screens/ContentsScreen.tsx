import React, { useState, useMemo } from 'react';
import { ContentItem, ScreenType } from '../../types';
import { playTapSound } from '../../utils/audio';

interface ContentsScreenProps {
  contents: ContentItem[];
  onNavigate: (screen: ScreenType) => void;
  onOpenUploadModal: () => void;
  onOpenStudyGroup: (groupTitle: string, discipline: string, online: string, topic: string) => void;
  onOpenShare: (title: string) => void;
  onToggleFavorite: (id: string) => void;
  onShowToast: (msg: string, icon?: string, iconColor?: string) => void;
}

export const ContentsScreen: React.FC<ContentsScreenProps> = ({
  contents,
  onNavigate,
  onOpenUploadModal,
  onOpenStudyGroup,
  onOpenShare,
  onToggleFavorite,
  onShowToast
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'resumos' | 'mapas' | 'flashcards' | 'favoritos'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState('Todas');
  const [minRating, setMinRating] = useState<number>(0);

  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      // Category filter
      if (activeFilter === 'favoritos' && !item.isFavorite) return false;
      if (activeFilter !== 'all' && activeFilter !== 'favoritos' && item.category !== activeFilter) return false;

      // Subject filter
      if (subjectFilter !== 'Todas' && item.subject !== subjectFilter) return false;

      // Rating filter
      if (minRating > 0 && item.rating < minRating) return false;

      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.subject.toLowerCase().includes(q) ||
          item.authorName.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [contents, activeFilter, subjectFilter, minRating, searchQuery]);

  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-32 gap-4 max-w-md mx-auto">
      {/* Top Banner: Acervo & Redes de Apoio */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-blue-600 p-4 text-white shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px] text-white">folder_shared</span>
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-tight">Acervo & Redes de Apoio</h2>
                <p className="text-xs text-blue-100 leading-none mt-0.5">Anotações verificadas da comunidade</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar & Advanced Filter Toggle */}
      <section className="flex flex-col gap-2.5">
        <div className="relative flex items-center w-full">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar mapas, resumos, autores ou temas..."
            className="w-full h-11 pl-10 pr-12 rounded-xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-all"
          />
          <button
            type="button"
            aria-label="Filtros avançados"
            onClick={() => {
              playTapSound();
              setShowAdvancedFilters(!showAdvancedFilters);
            }}
            className={`absolute right-2 w-8 h-8 flex items-center justify-center rounded-lg transition-all active:scale-95 ${
              showAdvancedFilters ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>

        {/* Collapsible Advanced Filters Drawer */}
        {showAdvancedFilters && (
          <div className="flex flex-col gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Refinar Descoberta</span>
              <button
                type="button"
                onClick={() => {
                  setSubjectFilter('Todas');
                  setMinRating(0);
                  setSearchQuery('');
                }}
                className="text-[11px] font-semibold text-blue-600 hover:underline"
              >
                Limpar tudo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-500">Disciplina</label>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full h-9 px-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none"
                >
                  <option value="Todas">Todas as matérias</option>
                  <option value="Matemática">Matemática</option>
                  <option value="Biologia">Biologia</option>
                  <option value="História">História</option>
                  <option value="Física">Física</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-500">Nível / Ano</label>
                <select className="w-full h-9 px-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none">
                  <option>Todos os anos</option>
                  <option>Ensino Médio / ENEM</option>
                  <option>1º Ano Graduação</option>
                  <option>Ciclo Básico</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-500">Avaliação mínima</label>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                {[4.8, 4.5, 4.0].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setMinRating(minRating === star ? 0 : star)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shrink-0 transition-all ${
                      minRating === star
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>{star}+</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Horizontal Scrolling Category Chips */}
      <section className="pt-1">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => {
              playTapSound();
              setActiveFilter('all');
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 shadow-sm flex items-center gap-1.5 transition-all active:scale-95 ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-blue-600/20'
                : 'bg-slate-100 text-slate-600 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">apps</span>
            Todos
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              setActiveFilter('resumos');
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all active:scale-95 ${
              activeFilter === 'resumos'
                ? 'bg-blue-600 text-white shadow-blue-600/20'
                : 'bg-slate-100 text-slate-600 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
            Resumos em PDF
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              setActiveFilter('mapas');
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all active:scale-95 ${
              activeFilter === 'mapas'
                ? 'bg-blue-600 text-white shadow-blue-600/20'
                : 'bg-slate-100 text-slate-600 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">hub</span>
            Mapas Mentais
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              setActiveFilter('flashcards');
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all active:scale-95 ${
              activeFilter === 'flashcards'
                ? 'bg-blue-600 text-white shadow-blue-600/20'
                : 'bg-slate-100 text-slate-600 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">style</span>
            Flashcards
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              setActiveFilter('favoritos');
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all active:scale-95 ${
              activeFilter === 'favoritos'
                ? 'bg-blue-600 text-white shadow-blue-600/20'
                : 'bg-slate-100 text-slate-600 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-rose-500" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            Favoritos
          </button>
        </div>
      </section>

      {/* Results Count & Active Status */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900">Recursos em Alta</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">
            {filteredContents.length} materiais
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-500 text-xs">
          <span className="material-symbols-outlined text-[16px]">sort</span>
          <span>Mais baixados</span>
        </div>
      </div>

      {/* Resource Feed / Cards Grid */}
      <div className="flex flex-col gap-3.5">
        {filteredContents.map((item) => (
          <article
            key={item.id}
            className="content-card relative flex flex-col rounded-2xl bg-white border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Header: Category + Tag + Actions */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 ${
                    item.subjectCategory === 'exatas'
                      ? 'bg-blue-100 text-blue-700'
                      : item.subjectCategory === 'biologicas'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {item.subject}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
                  {item.format}
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  aria-label="Favoritar material"
                  onClick={() => {
                    playTapSound();
                    onToggleFavorite(item.id);
                  }}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-transform active:scale-90 ${
                    item.isFavorite
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-slate-400 hover:text-rose-500 bg-slate-100'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: item.isFavorite ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>

                <button
                  type="button"
                  aria-label="Compartilhar"
                  onClick={() => {
                    playTapSound();
                    onOpenShare(item.title);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:text-blue-600 bg-slate-100 transition-transform active:scale-90"
                >
                  <span className="material-symbols-outlined text-[17px]">share</span>
                </button>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="font-bold text-[16px] text-slate-900 leading-snug tracking-tight">
              {item.title}
            </h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            {/* Progress Bar */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[15px] text-blue-600">
                    {item.progressIcon}
                  </span>
                  Progresso de estudo
                </span>
                <span className="font-bold text-blue-600">{item.progressLabel}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Metadata: Author, Rating, Downloads */}
            <div className="flex items-center justify-between mt-3 text-slate-500 text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <img
                  src={item.authorAvatar}
                  alt={item.authorName}
                  className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                />
                <span className="font-bold text-slate-800 truncate">{item.authorName}</span>
                <span className="text-[11px] text-orange-600 font-medium truncate">• {item.authorRole}</span>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span className="text-slate-900">{item.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-0.5 text-slate-400">
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  <span>{item.downloads}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  playTapSound();
                  if (item.id === 'c4') {
                    onNavigate('sala-estudo');
                  } else {
                    onOpenStudyGroup(
                      item.studyRoomTopic || `Grupo de Estudo: ${item.subject}`,
                      item.subject,
                      '5 online',
                      `Tirando dúvidas sobre ${item.title}`
                    );
                  }
                }}
                className="h-10 px-3 rounded-xl bg-white border border-slate-200 text-blue-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 active:scale-95 transition-all shadow-2xs"
              >
                <span className="material-symbols-outlined text-[16px]">forum</span>
                <span>Ver grupo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playTapSound();
                  if (item.category === 'flashcards') {
                    onNavigate('quiz');
                  } else {
                    onNavigate('sala-estudo');
                    onShowToast(`Acessando: ${item.title}`, 'visibility', 'text-blue-400');
                  }
                }}
                className="h-10 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-blue-600/20 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {item.category === 'flashcards' ? 'play_arrow' : 'download'}
                </span>
                <span>{item.category === 'flashcards' ? 'Estudar' : 'Baixar PDF'}</span>
              </button>
            </div>
          </article>
        ))}

        {filteredContents.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white border border-slate-200">
            <span className="material-symbols-outlined text-[36px] text-slate-300 mb-2">folder_off</span>
            <h4 className="text-sm font-bold text-slate-800">Nenhum material encontrado</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Tente redefinir a busca ou remover os filtros aplicados para ver todos os conteúdos.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setSubjectFilter('Todas');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB): Enviar meu Material */}
      <div className="fixed bottom-20 right-4 z-40 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => {
            playTapSound();
            onOpenUploadModal();
          }}
          className="group flex items-center gap-2 pl-4 pr-5 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xs shadow-xl shadow-orange-500/30 active:scale-95 hover:scale-105 transition-all duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px] text-white">upload_file</span>
          </div>
          <span className="tracking-tight">Enviar meu Material</span>
        </button>
      </div>
    </div>
  );
};
