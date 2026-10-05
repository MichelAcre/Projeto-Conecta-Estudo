import React, { useState } from 'react';
import { playTapSound, playSuccessChime } from '../../utils/audio';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoomCreated: (name: string, discipline: string) => void;
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose, onRoomCreated }) => {
  const [roomName, setRoomName] = useState('');
  const [discipline, setDiscipline] = useState('Matemática');
  const [topic, setTopic] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    playSuccessChime();
    onRoomCreated(roomName, discipline);
    setRoomName('');
    setTopic('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-4 border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">group_add</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Criar Nova Sala</h3>
              <p className="text-xs text-slate-500">Estude ao vivo com seus colegas</p>
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
            <label className="text-xs font-semibold text-slate-700 block mb-1">Nome da Sala</label>
            <input
              type="text"
              required
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Ex: Grupo de Dúvidas Cálculo 1"
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Disciplina</label>
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            >
              <option value="Matemática">Matemática</option>
              <option value="Biologia">Biologia</option>
              <option value="História">História</option>
              <option value="Física">Física</option>
              <option value="Química">Química</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Tópico ou Lista de Exercícios</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Teorema de Green e Derivadas"
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 flex items-center gap-2.5 text-xs text-orange-800">
            <span className="material-symbols-outlined text-orange-600 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span>Ganhe <strong>+30 XP</strong> ao moderar uma sessão de estudo!</span>
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
              className="h-11 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Abrir Sala</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
