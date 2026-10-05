import React from 'react';
import { playTapSound } from '../../utils/audio';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  shareText?: string;
  onCopied: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  shareText,
  onCopied
}) => {
  if (!isOpen) return null;

  const defaultText = shareText || `Confira "${title}" no Conecta Estudo! A rede onde aprendemos juntos 🚀`;

  const handleCopyLink = () => {
    playTapSound();
    navigator.clipboard?.writeText?.(window.location.href);
    onCopied();
    onClose();
  };

  const handleWhatsApp = () => {
    playTapSound();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(defaultText + '\n' + window.location.href)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-4 border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-[20px]">share</span>
            Compartilhar
          </h3>
          <button
            type="button"
            onClick={() => { playTapSound(); onClose(); }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{title}</h4>
          <p className="text-xs text-slate-500 mt-1">
            Convide seus amigos e colegas de turma para estudar e comparar resultados!
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 active:scale-95 transition-all"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-blue-600">content_copy</span>
              Copiar Link Direto
            </span>
            <span className="text-[11px] text-slate-400">Copiar</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md shadow-emerald-600/20"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Compartilhar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};
