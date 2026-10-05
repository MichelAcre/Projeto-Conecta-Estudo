import React, { useState } from 'react';
import { ScreenType } from '../../types';
import { ASSETS } from '../../data/mockData';
import { playTapSound, playSuccessChime } from '../../utils/audio';

interface StudyRoomScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenStudyGroup: (groupTitle: string, discipline: string, online: string, topic: string) => void;
  onOpenShare: (title: string) => void;
  onShowToast: (msg: string, icon?: string, iconColor?: string) => void;
}

export const StudyRoomScreen: React.FC<StudyRoomScreenProps> = ({
  onNavigate,
  onOpenStudyGroup,
  onOpenShare,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'resumo' | 'duvidas'>('resumo');
  const [isFavorited, setIsFavorited] = useState(true);
  const [newDoubt, setNewDoubt] = useState('');
  const [doubts, setDoubts] = useState([
    {
      id: 'd1',
      author: 'Mariana Fontes',
      avatar: ASSETS.students.peer1,
      time: 'Há 2h',
      question: 'Por que na Terceira Lei o par de ação e reação nunca se anula no mesmo corpo?',
      hasAnswer: true,
      answerAuthor: 'Prof. Lucas',
      answerText: 'Exatamente porque as forças atuam em corpos distintos! Para haver anulação de forças num somatório vetorial, elas precisariam estar aplicadas simultaneamente sobre a mesma massa de prova.',
      likes: 5
    },
    {
      id: 'd2',
      author: 'Rodrigo Prado',
      avatar: ASSETS.students.peer2,
      time: 'Há 4h',
      question: 'Alguém tem o macete da decomposição trigonométrica com o seno e cosseno para o plano inclinado? Sempre confundo.',
      hasAnswer: false,
      likes: 3
    }
  ]);

  const handleSendDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoubt.trim()) return;
    playSuccessChime();
    setDoubts([
      {
        id: String(Date.now()),
        author: 'Você (Sofia)',
        avatar: ASSETS.userSofia,
        time: 'Agora mesmo',
        question: newDoubt,
        hasAnswer: false,
        likes: 0
      },
      ...doubts
    ]);
    setNewDoubt('');
    onShowToast('Dúvida publicada na sala de estudo!', 'forum', 'text-blue-400');
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-18 pb-28 min-h-screen">
      {/* 1. Identificação do Conteúdo e Tags */}
      <div className="pt-2 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
              <span className="material-symbols-outlined text-[15px]">menu_book</span>
              Física I
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              18 min leitura • Resumo Oficial
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Favoritar"
              onClick={() => {
                playTapSound();
                setIsFavorited(!isFavorited);
                onShowToast(isFavorited ? 'Removido dos favoritos' : 'Salvo nos seus favoritos!', 'favorite');
              }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
                isFavorited ? 'text-rose-600 bg-rose-50' : 'text-slate-500 bg-slate-100 hover:text-slate-800'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>

            <button
              type="button"
              aria-label="Compartilhar"
              onClick={() => {
                playTapSound();
                onOpenShare('Resumo Completo: Leis de Newton & Dinâmica');
              }}
              className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playTapSound();
                onShowToast('Download concluído: Leis de Newton (1.8MB)', 'download_done');
              }}
              className="inline-flex items-center gap-1 h-9 px-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-all active:scale-95 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>PDF</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-1">
          Resumo Completo: Leis de Newton & Dinâmica
        </h2>
      </div>

      {/* 2. Progresso do Estudante em Evidência */}
      <div className="mt-3 p-3.5 rounded-2xl bg-white border border-blue-100 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-blue-700 font-bold">
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            Seu Progresso de Estudo
          </span>
          <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md font-mono">65% concluído</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: '65%' }}></div>
        </div>
      </div>

      {/* 3. Author Info */}
      <div className="mt-3 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-slate-200/70 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            alt="Prof. Lucas Silveira"
            src={ASSETS.profLucas}
            className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
          />
          <div className="flex flex-col min-w-0 leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-900 truncate">Prof. Lucas Silveira</span>
              <span
                className="material-symbols-outlined text-[15px] text-emerald-600"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <span className="text-[11px] text-slate-500 truncate">Monitor de Física Mecânica</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playTapSound();
            onOpenStudyGroup(
              'Mecânica Clássica & Exercícios',
              'Física',
              '6 online',
              'Discutindo lista de exercícios 03 e tirando dúvidas de vetores.'
            );
          }}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-2.5 py-1.5 rounded-lg active:scale-95 transition-all"
        >
          <span>Grupo</span>
          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        </button>
      </div>

      {/* 4. Sala em Andamento Banner */}
      <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200/60 flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div className="text-xs text-slate-700 truncate">
            <span className="font-semibold text-slate-900">Sala em andamento:</span> 6 alunos conectados
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            playTapSound();
            onOpenStudyGroup(
              'Mecânica Clássica & Exercícios',
              'Física',
              '6 online',
              'Discutindo lista de exercícios 03 e tirando dúvidas de vetores.'
            );
          }}
          className="shrink-0 text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-0.5 border border-blue-300 rounded-lg px-2.5 py-1 bg-white shadow-2xs active:scale-95"
        >
          Ver grupo
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      {/* 5. Tabs: Conteúdo Didático vs Dúvidas da Turma */}
      <div className="mt-4 border-b border-slate-200 flex gap-6">
        <button
          type="button"
          onClick={() => {
            playTapSound();
            setActiveTab('resumo');
          }}
          className={`pb-2.5 text-sm flex items-center gap-1.5 transition-colors ${
            activeTab === 'resumo'
              ? 'font-bold text-blue-700 border-b-2 border-blue-600'
              : 'font-semibold text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">article</span>
          Conteúdo Didático
        </button>

        <button
          type="button"
          onClick={() => {
            playTapSound();
            setActiveTab('duvidas');
          }}
          className={`pb-2.5 text-sm flex items-center gap-1.5 transition-colors ${
            activeTab === 'duvidas'
              ? 'font-bold text-blue-700 border-b-2 border-blue-600'
              : 'font-semibold text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">forum</span>
          Dúvidas da Turma ({doubts.length + 12})
        </button>
      </div>

      {/* Tab 1: Conteúdo Didático */}
      {activeTab === 'resumo' && (
        <div className="flex flex-col gap-4 mt-4">
          {/* Seção 1: Inércia */}
          <article className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Primeira Lei de Newton (Inércia)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Todo corpo continua em seu estado de repouso ou de movimento retilíneo uniforme a menos que seja compelido a mudar esse estado por forças aplicadas sobre ele. A inércia depende diretamente da massa do objeto.
            </p>
            <div className="mt-1 p-2.5 rounded-lg bg-slate-50 font-mono text-xs text-slate-800 font-semibold text-center border border-slate-200">
              ∑ F = 0 ⇒ a = 0 (v = constante)
            </div>
          </article>

          {/* Seção 2: Segunda Lei e Diagrama */}
          <article className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Segunda Lei da Dinâmica</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A taxa de variação da quantidade de movimento é proporcional à força resultante aplicada e se produz na direção da linha reta na qual essa força atua.
            </p>

            {/* Fórmula em destaque */}
            <div className="bg-blue-50/70 border border-blue-200/70 rounded-xl p-3 flex items-center justify-center gap-3">
              <span className="font-mono text-base font-bold text-blue-900 tracking-wide">F_res = m · a</span>
              <span className="text-[11px] text-blue-600 font-medium">(N = kg · m/s²)</span>
            </div>

            {/* Diagrama Vetorial Interativo SVG */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center">
              <span className="text-[11px] font-semibold text-slate-500 self-start mb-2">
                Diagrama de Corpo Livre (Bloco em Plano Inclinado):
              </span>
              <svg className="w-full max-w-[280px] h-32" fill="none" viewBox="0 0 280 120">
                {/* Inclined Plane */}
                <polygon fill="#dae4ed" opacity="0.6" points="20,105 260,105 260,35"></polygon>
                <line stroke="#757588" strokeWidth="2" x1="20" x2="260" y1="105" y2="35"></line>
                {/* Block */}
                <rect fill="#3742fa" height="30" rx="4" transform="rotate(-16, 140, 70)" width="40" x="120" y="55"></rect>
                {/* Normal Force */}
                <line stroke="#00542a" strokeLinecap="round" strokeWidth="2.5" x1="140" x2="152" y1="70" y2="30"></line>
                <polygon fill="#00542a" points="152,30 148,36 156,36"></polygon>
                <text fill="#00542a" fontSize="10" fontWeight="bold" x="156" y="32">N⃗</text>
                {/* Gravity Force */}
                <line stroke="#ba1a1a" strokeLinecap="round" strokeWidth="2.5" x1="140" x2="140" y1="70" y2="112"></line>
                <polygon fill="#ba1a1a" points="140,112 136,104 144,104"></polygon>
                <text fill="#ba1a1a" fontSize="10" fontWeight="bold" x="146" y="112">P⃗</text>
                {/* Friction Force */}
                <line stroke="#994700" strokeLinecap="round" strokeWidth="2.5" x1="140" x2="102" y1="70" y2="82"></line>
                <polygon fill="#994700" points="102,82 108,86 109,78"></polygon>
                <text fill="#994700" fontSize="10" fontWeight="bold" x="82" y="92">f⃗_at</text>
              </svg>
            </div>
          </article>

          {/* Seção 3: Exemplo Resolvido */}
          <article className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Exemplo Prático Resolvido</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Fixação
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Um bloco de massa <strong className="text-slate-800">m = 5 kg</strong> desliza sobre um plano inclinado a <strong className="text-slate-800">θ = 30°</strong> sem atrito (g = 10 m/s²). Calcule a aceleração do bloco ao longo da rampa.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Componente tangencial do peso:</span>
                <span className="font-mono font-medium text-slate-800">P_x = m · g · sen(30°)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Força resultante no eixo da rampa:</span>
                <span className="font-mono font-medium text-slate-800">F_res = 5 · 10 · 0,5 = 25 N</span>
              </div>
              <div className="pt-1.5 border-t border-slate-200 flex justify-between items-center text-blue-900 font-bold">
                <span>Aceleração obtida (a = F / m):</span>
                <span className="font-mono text-sm px-2 py-0.5 rounded bg-blue-100/70 text-blue-800">a = 5,0 m/s²</span>
              </div>
            </div>
          </article>

          {/* Sobre este Grupo de Estudo */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <span className="material-symbols-outlined text-blue-600 text-[20px]">groups</span>
                <span>Sobre este Grupo de Estudo</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold">
                Nível Intermediário
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Reuniões diárias com resolução conjunta de exercícios de Engenharia Física. Monitores dedicados online de segunda a sexta às 18h.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400">Total de Membros</span>
                <span className="text-sm font-bold text-slate-800">148 alunos</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[11px] text-slate-400">Média de Desempenho</span>
                <span className="text-sm font-bold text-emerald-600">88% aprovação</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Dúvidas da Turma */}
      {activeTab === 'duvidas' && (
        <div className="flex flex-col gap-3 mt-4">
          {/* Post doubt form */}
          <form onSubmit={handleSendDoubt} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-800">Ficou com alguma dúvida nessa parte?</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDoubt}
                onChange={(e) => setNewDoubt(e.target.value)}
                placeholder="Pergunte aos colegas e monitores..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold active:scale-95 transition-all flex items-center justify-center shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </form>

          {/* List of doubts */}
          {doubts.map((d) => (
            <div key={d.id} className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={d.avatar} alt={d.author} className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200" />
                  <span className="text-xs font-bold text-slate-800">{d.author}</span>
                </div>
                <span className="text-[11px] text-slate-400">{d.time}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {d.question}
              </p>

              {d.hasAnswer && d.answerText && (
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex flex-col gap-1.5 ml-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                        <span className="material-symbols-outlined text-[13px]">check_circle</span>
                        Resposta Correta
                      </span>
                      <span className="text-xs font-bold text-slate-800">{d.answerAuthor}</span>
                    </div>
                    <span className="text-emerald-700 text-[11px] font-bold">+45 XP</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {d.answerText}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 6. Bottom Sticky Action Bar */}
      <footer className="fixed bottom-0 inset-x-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200/80 z-40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-md mx-auto flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              playTapSound();
              onOpenStudyGroup(
                'Mecânica Clássica & Exercícios',
                'Física',
                '6 online',
                'Discutindo lista de exercícios 03 e tirando dúvidas de vetores.'
              );
            }}
            className="h-12 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-blue-600">group</span>
            <span>Ver grupo</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              onNavigate('quiz');
            }}
            className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
            <span>Fazer Quiz do Conteúdo (+50 XP)</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
