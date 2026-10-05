import React from 'react';
import { ASSETS } from '../../data/mockData';
import { playTapSound, playSuccessChime } from '../../utils/audio';

interface StudyGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupTitle?: string;
  discipline?: string;
  onlineCount?: number | string;
  topic?: string;
  onJoin: () => void;
}

export const StudyGroupModal: React.FC<StudyGroupModalProps> = ({
  isOpen,
  onClose,
  groupTitle = 'Cálculo & Álgebra UFRJ',
  discipline = 'Matemática',
  onlineCount = '4 online',
  topic = 'Monitor Lucas está resolvendo dúvidas da Lista 4: Derivadas Parciais e Teorema de Green.',
  onJoin
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-4 border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">groups</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">{discipline}</span>
              <h3 className="text-base font-bold text-slate-900 truncate">{groupTitle}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { playTapSound(); onClose(); }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-800">Sala Ao Vivo</span>
          </div>
          <span className="text-xs text-emerald-700 font-semibold">{onlineCount}</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {topic}
        </p>

        {/* Participants in room */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Estudantes Conectados Agora
          </span>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <img src={ASSETS.students.peer1} alt="Aluno" className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm" />
              <img src={ASSETS.students.peer2} alt="Aluno" className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm" />
              <img src={ASSETS.students.peer3} alt="Aluno" className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm" />
              <img src={ASSETS.students.peer4} alt="Aluno" className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm" />
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center justify-center ring-2 ring-white shadow-sm">
                +2
              </div>
            </div>
            <span className="text-xs text-slate-500 font-medium ml-1">Áudio & Chat liberados</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => { playTapSound(); onClose(); }}
            className="h-11 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 active:scale-95 transition-all"
          >
            Depois
          </button>
          <button
            type="button"
            onClick={() => {
              playSuccessChime();
              onJoin();
              onClose();
            }}
            className="h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Entrar na Sala</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
