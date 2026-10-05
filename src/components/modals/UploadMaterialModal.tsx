import React, { useState } from 'react';
import { playTapSound, playSuccessChime } from '../../utils/audio';

interface UploadMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMaterialUploaded: (title: string, subject: string, type: string) => void;
}

export const UploadMaterialModal: React.FC<UploadMaterialModalProps> = ({
  isOpen,
  onClose,
  onMaterialUploaded
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Matemática');
  const [type, setType] = useState('resumos');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      playSuccessChime();
      onMaterialUploaded(title, subject, type);
      setTitle('');
      setFileName('');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-4 border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">upload_file</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Enviar Material</h3>
              <p className="text-xs text-slate-500">Ajude colegas e ganhe +50 XP</p>
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Título do Material</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Resumo Fórmulas de Eletrostática"
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Disciplina</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-11 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              >
                <option value="Matemática">Matemática</option>
                <option value="Biologia">Biologia</option>
                <option value="História">História</option>
                <option value="Física">Física</option>
                <option value="Química">Química</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Tipo de Formato</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-11 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              >
                <option value="resumos">Resumo em PDF</option>
                <option value="mapas">Mapa Mental</option>
                <option value="flashcards">Flashcards</option>
              </select>
            </div>
          </div>

          {/* Simulated File Upload Drag & Drop */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Arquivo (PDF, PNG ou PPTX)</label>
            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-[26px] text-blue-600 mb-1">cloud_upload</span>
              <span className="text-xs font-bold text-slate-700">
                {fileName || 'Toque para selecionar arquivo'}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">Tamanho máx: 25 MB</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.pptx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFileName(file.name);
                }}
              />
            </label>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800">
            <span className="material-symbols-outlined text-emerald-600 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span>Anotações verificadas ganham selo de <strong>Top Colaborador</strong>!</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => { playTapSound(); onClose(); }}
              className="h-11 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 active:scale-95 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              {isUploading ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span>Publicar Material</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
