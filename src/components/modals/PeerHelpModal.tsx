import React, { useState } from 'react';
import { PeerComment } from '../../types';
import { playTapSound, playSuccessChime } from '../../utils/audio';

interface PeerHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  hint: string;
  questionNumber?: number;
  initialComments: PeerComment[];
  onAddComment: (text: string) => void;
}

export const PeerHelpModal: React.FC<PeerHelpModalProps> = ({
  isOpen,
  onClose,
  hint,
  questionNumber = 3,
  initialComments,
  onAddComment
}) => {
  const [commentText, setCommentText] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    playSuccessChime();
    onAddComment(commentText);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex flex-col justify-end animate-in fade-in">
      <div className="bg-white rounded-t-3xl p-5 border-t border-slate-200 shadow-2xl max-h-[82vh] overflow-y-auto max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">lightbulb</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Dica & Ajuda Colaborativa</h3>
              <p className="text-xs text-slate-500">Questão {questionNumber} • Discussão da turma</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { playTapSound(); onClose(); }}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Academic Hint */}
        <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 mb-4">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-blue-600 text-[20px] shrink-0 mt-0.5">school</span>
            <div>
              <span className="font-bold text-xs text-slate-900 block">Dica de Estudo Conecta:</span>
              <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                {hint}
              </p>
            </div>
          </div>
        </div>

        {/* Classmate comments */}
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Comentários dos Colegas Online ({initialComments.length})
        </h4>

        <div className="flex flex-col gap-2 mb-4 max-h-48 overflow-y-auto pr-1">
          {initialComments.map((comment) => (
            <div key={comment.id} className="p-3 rounded-xl bg-slate-50 flex items-start gap-2.5 border border-slate-100">
              <div className={`w-7 h-7 rounded-full ${comment.avatarColorClass} ${comment.textColorClass} font-bold flex items-center justify-center text-[10px] shrink-0`}>
                {comment.authorInitials}
              </div>
              <div className="flex flex-col text-xs min-w-0">
                <span className="font-bold text-slate-800">{comment.authorName}</span>
                <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">"{comment.text}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add comment input */}
        <form onSubmit={handleSend} className="flex items-center gap-2 pt-1 border-t border-slate-100">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Envie uma dica ou dúvida aos colegas..."
            className="flex-1 h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs outline-none focus:bg-white focus:border-blue-600 transition-all"
          />
          <button
            type="submit"
            className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>

        <button
          type="button"
          onClick={() => { playTapSound(); onClose(); }}
          className="w-full mt-3 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center transition-colors"
        >
          Voltar ao Quiz
        </button>
      </div>
    </div>
  );
};
