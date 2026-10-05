import React, { useState } from 'react';
import { ScreenType } from '../../types';
import { playTapSound, playSuccessChime } from '../../utils/audio';

interface QuizResultScreenProps {
  score: number;
  correctCount: number;
  wrongCount: number;
  timeSpent: string;
  xpEarned: number;
  onNavigate: (screen: ScreenType) => void;
  onOpenShare: (title: string, text?: string) => void;
  onShowToast: (msg: string, icon?: string, iconColor?: string) => void;
  onRetakeQuiz: () => void;
}

export const QuizResultScreen: React.FC<QuizResultScreenProps> = ({
  score = 80,
  correctCount = 4,
  wrongCount = 1,
  timeSpent = '03:45',
  xpEarned = 50,
  onNavigate,
  onOpenShare,
  onShowToast,
  onRetakeQuiz
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showRetakeConfirm, setShowRetakeConfirm] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);

  const handleContinue = () => {
    playTapSound();
    setIsContinuing(true);
    setTimeout(() => {
      setIsContinuing(false);
      onShowToast('🚀 Avançando para o próximo módulo: Divisão Celular!', 'school', 'text-blue-400');
      onNavigate('inicio');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-18 pb-24 gap-4">
      {/* 1. Hero Celebration Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-md">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-6 -top-6 w-32 h-32 rounded-full bg-white/5 blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner ring-1 ring-white/30">
            <span
              className="material-symbols-outlined text-amber-300 text-[32px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              emoji_events
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold tracking-wider text-white mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Quiz Finalizado • Biologia Celular
          </span>

          <h2 className="text-2xl font-bold tracking-tight text-white">Excelente Desempenho! 🎉</h2>
          <p className="text-xs text-blue-100 mt-1 max-w-xs font-normal">
            Você superou a média do grupo e garantiu novos pontos para sua jornada.
          </p>

          <div className="mt-4 pt-3 border-t border-white/20 w-full flex items-center justify-center gap-2">
            <span className="text-[36px] font-extrabold leading-none tracking-tight">{score}%</span>
            <div className="text-left text-blue-100 text-xs font-medium leading-tight pl-2 border-l border-white/25">
              <span className="text-white font-bold block text-xs">
                {correctCount} de {correctCount + wrongCount}
              </span>
              Questões corretas
            </div>
          </div>
        </div>
      </div>

      {/* 2. Card de Desempenho e Métricas */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Resumo das Questões</h3>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            Aprovado com Louvor
          </span>
        </div>

        {/* Segmented Progress Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="grid grid-cols-5 gap-1.5 w-full h-2.5 rounded-full overflow-hidden bg-slate-100 p-0.5">
            <div className="bg-emerald-500 rounded-full h-full"></div>
            <div className="bg-emerald-500 rounded-full h-full"></div>
            <div className="bg-emerald-500 rounded-full h-full"></div>
            <div className="bg-emerald-500 rounded-full h-full"></div>
            <div className="bg-amber-500 rounded-full h-full"></div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 px-0.5">
            <span>Progresso do Teste</span>
            <span className="font-semibold text-slate-700">
              {correctCount} acertos / {wrongCount} revisão
            </span>
          </div>
        </div>

        {/* Key Metrics 4-Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Acertos</span>
              <span className="text-sm font-bold text-slate-900">{correctCount} Questões</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/60">
              <span className="material-symbols-outlined text-[20px]">error</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Erros</span>
              <span className="text-sm font-bold text-slate-900">{wrongCount} Questão</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Tempo Total</span>
              <span className="text-sm font-bold text-slate-900">{timeSpent}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">XP Ganho</span>
              <span className="text-sm font-bold text-amber-600">+{xpEarned} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Insights & Pontos de Atenção */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Pontos de Atenção</h3>
          <span className="material-symbols-outlined text-slate-400 text-[20px]">insights</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
            <span
              className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-emerald-800">Ponto Forte</span>
              <p className="text-slate-700 font-normal mt-0.5">Citologia e Organelas Celulares (100% de precisão)</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-amber-600 text-[20px] shrink-0 mt-0.5">lightbulb</span>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-amber-800">Dica para Revisão</span>
              <p className="text-slate-700 font-normal mt-0.5">Transporte Ativo e Membrana Plasmática</p>
            </div>
          </div>
        </div>

        {/* Toggle Detailed Answers Accordion */}
        <button
          type="button"
          onClick={() => {
            playTapSound();
            setShowBreakdown(!showBreakdown);
          }}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-blue-600 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors mt-0.5 active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">
            {showBreakdown ? 'expand_less' : 'visibility'}
          </span>
          <span>{showBreakdown ? 'Ocultar Respostas Detalhadas' : 'Ver Respostas Detalhadas'}</span>
        </button>

        {showBreakdown && (
          <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100 animate-in fade-in">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Questão 1 • Mitocôndria</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">check</span> Correta
                </span>
              </div>
              <p className="text-xs text-slate-600">Sua resposta: <b>Mitocôndria</b>.</p>
              <p className="text-[11px] text-slate-500 italic bg-white p-2 rounded-lg border border-slate-100">
                Comentário: As mitocôndrias produzem ATP e contêm DNA circular e ribossomos próprios.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Questão 2 • Ribossomos</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">check</span> Correta
                </span>
              </div>
              <p className="text-xs text-slate-600">Sua resposta: <b>Ribossomos</b>.</p>
              <p className="text-[11px] text-slate-500 italic bg-white p-2 rounded-lg border border-slate-100">
                Comentário: Presentes em procariontes e eucariontes para síntese de proteínas.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Questão 3 • Membrana Plasmática</span>
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">close</span> Incorreta
                </span>
              </div>
              <p className="text-xs text-slate-600">Sua resposta: <span className="text-rose-600 line-through">Difusão simples</span></p>
              <p className="text-xs text-emerald-700 font-semibold">
                Gabarito: O transporte ativo move solutos contra o gradiente com consumo de ATP.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 4. Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-1">
        <button
          type="button"
          disabled={isContinuing}
          onClick={handleContinue}
          className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          {isContinuing ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
              <span>Carregando Próxima Etapa...</span>
            </>
          ) : (
            <>
              <span>Continuar Estudos</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              playTapSound();
              setShowRetakeConfirm(true);
            }}
            className="h-11 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">replay</span>
            <span>Refazer Quiz</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              onOpenShare(
                'Resultado do Quiz: Biologia Celular',
                `Acertei ${score}% (${correctCount}/5) no Quiz de Biologia Celular no Conecta Estudo! Venha testar seus conhecimentos 🚀`
              );
            }}
            className="h-11 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>Compartilhar</span>
          </button>
        </div>
      </div>

      {/* Retake Confirm Modal */}
      {showRetakeConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[26px]">replay</span>
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">Refazer este Quiz?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Uma nova tentativa será iniciada imediatamente para você fixar os conceitos.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowRetakeConfirm(false)}
                className="h-10 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 active:scale-95"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRetakeConfirm(false);
                  onRetakeQuiz();
                }}
                className="h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs active:scale-95"
              >
                Sim, Refazer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
