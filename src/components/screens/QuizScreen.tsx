import React, { useState } from 'react';
import { QuizQuestion, ScreenType } from '../../types';
import { ASSETS } from '../../data/mockData';
import { playTapSound, playSuccessChime, playCompleteFanfare } from '../../utils/audio';

interface QuizScreenProps {
  questions: QuizQuestion[];
  onFinishQuiz: (results: { score: number; correctCount: number; wrongCount: number; timeSpent: string; xpEarned: number }) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenPeerHelp: () => void;
  onShowToast: (msg: string, icon?: string, iconColor?: string) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  onFinishQuiz,
  onNavigate,
  onOpenPeerHelp,
  onShowToast
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [answeredState, setAnsweredState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const currentQ = questions[currentIdx] || questions[0];
  const selectedOptionId = selectedAnswers[currentIdx];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  const handleSelect = (optionId: string) => {
    if (isVerifying) return;
    playTapSound();
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optionId }));
    setAnsweredState('idle');
  };

  const handleConfirm = () => {
    if (!selectedOptionId) {
      onShowToast('Selecione uma alternativa antes de confirmar!', 'info', 'text-amber-400');
      return;
    }

    setIsVerifying(true);
    const isCorrect = selectedOptionId === currentQ.correctOptionId;

    setTimeout(() => {
      setIsVerifying(false);
      if (isCorrect) {
        setAnsweredState('correct');
        playSuccessChime();
        onShowToast('Correto! +10 XP', 'check_circle', 'text-emerald-400');
      } else {
        setAnsweredState('wrong');
        onShowToast(`Incorreto. A resposta correta era ${currentQ.correctOptionId}.`, 'error', 'text-rose-400');
      }

      setTimeout(() => {
        if (currentIdx + 1 < totalQuestions) {
          setCurrentIdx((prev) => prev + 1);
          setAnsweredState('idle');
        } else {
          // Finish quiz
          playCompleteFanfare();
          let correct = 0;
          questions.forEach((q, idx) => {
            const ans = selectedAnswers[idx] || (idx === currentIdx ? selectedOptionId : '');
            if (ans === q.correctOptionId) {
              correct++;
            }
          });
          const score = Math.round((correct / totalQuestions) * 100);
          onFinishQuiz({
            score,
            correctCount: correct,
            wrongCount: totalQuestions - correct,
            timeSpent: '03:45',
            xpEarned: 50
          });
        }
      }, 1100);
    }, 500);
  };

  const handleSkip = () => {
    playTapSound();
    onShowToast('Questão pulada.', 'redo', 'text-slate-400');
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx((prev) => prev + 1);
      setAnsweredState('idle');
    } else {
      handleConfirm();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-16 pb-28 min-h-screen">
      {/* Progress & Gamification Stats */}
      <section className="pt-2 mb-3">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-slate-900 font-bold text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Questão {currentIdx + 1} de {totalQuestions}
          </span>
          <span className="text-slate-500 font-medium text-xs">{progressPercent}% concluído</span>
        </div>

        {/* Dynamic Segmented Progress Bar */}
        <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden flex gap-1 p-0.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                i <= currentIdx ? 'bg-blue-600' : 'bg-transparent'
              }`}
            ></div>
          ))}
        </div>
      </section>

      {/* Statement Card */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm mb-3 transition-all">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold text-[11px] uppercase tracking-wide">
              <span className="material-symbols-outlined text-[14px]">biotech</span>
              {currentQ.topic}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
              {currentQ.difficulty}
            </span>
          </div>

          <button
            type="button"
            aria-label="Favoritar questão"
            onClick={() => {
              playTapSound();
              setIsBookmarked(!isBookmarked);
              onShowToast(isBookmarked ? 'Questão desmarcada' : 'Questão salva para revisão!', 'bookmark');
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isBookmarked ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
          </button>
        </div>

        <h2 className="text-[15px] sm:text-[16px] font-bold text-slate-900 leading-snug tracking-tight">
          {currentQ.statement}
        </h2>

        {/* Optional Micrograph Illustration */}
        {currentQ.illustrationUrl && (
          <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-100 mt-3 border border-slate-200/60 shadow-inner">
            <img
              src={currentQ.illustrationUrl}
              alt="Micrografia ilustrativa"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">zoom_in</span>
              Micrografia 3D ilustrativa
            </div>
          </div>
        )}
      </section>

      {/* Options (A, B, C, D) */}
      <section className="flex flex-col gap-2.5 mb-3" role="radiogroup">
        {currentQ.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let containerClasses =
            'quiz-option cursor-pointer bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200 hover:border-slate-300 shadow-sm flex items-center justify-between transition-all duration-150 active:scale-[0.99]';
          let badgeClasses =
            'w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-sm shrink-0 transition-colors';
          let textClasses = 'text-xs sm:text-sm font-medium text-slate-800 leading-snug';

          if (isSelected) {
            if (answeredState === 'correct') {
              containerClasses =
                'quiz-option cursor-pointer bg-emerald-50 rounded-2xl p-3.5 sm:p-4 border-2 border-emerald-600 shadow-md flex items-center justify-between transition-all duration-150';
              badgeClasses =
                'w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm';
              textClasses = 'text-xs sm:text-sm font-bold text-emerald-950 leading-snug';
            } else if (answeredState === 'wrong') {
              containerClasses =
                'quiz-option cursor-pointer bg-rose-50 rounded-2xl p-3.5 sm:p-4 border-2 border-rose-600 shadow-md flex items-center justify-between transition-all duration-150';
              badgeClasses =
                'w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm';
              textClasses = 'text-xs sm:text-sm font-bold text-rose-950 leading-snug';
            } else {
              containerClasses =
                'quiz-option cursor-pointer bg-blue-50/70 rounded-2xl p-3.5 sm:p-4 border-2 border-blue-600 shadow-sm flex items-center justify-between transition-all duration-150';
              badgeClasses =
                'w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm';
              textClasses = 'text-xs sm:text-sm font-bold text-blue-900 leading-snug';
            }
          }

          return (
            <div
              key={option.id}
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(option.id)}
              className={containerClasses}
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className={badgeClasses}>{option.letter}</div>
                <span className={textClasses}>{option.text}</span>
              </div>

              <div className="shrink-0 flex items-center justify-center">
                {isSelected ? (
                  <span
                    className={`material-symbols-outlined text-[22px] ${
                      answeredState === 'correct'
                        ? 'text-emerald-600'
                        : answeredState === 'wrong'
                        ? 'text-rose-600'
                        : 'text-blue-600'
                    }`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300"></div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Peer Collaboration Banner */}
      <section className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-sm mb-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex -space-x-1.5 shrink-0">
              <img
                src={ASSETS.students.peer1}
                alt="Colega"
                className="w-6 h-6 rounded-full object-cover ring-1 ring-white"
              />
              <img
                src={ASSETS.students.peer2}
                alt="Colega"
                className="w-6 h-6 rounded-full object-cover ring-1 ring-white"
              />
              <img
                src={ASSETS.students.peer3}
                alt="Colega"
                className="w-6 h-6 rounded-full object-cover ring-1 ring-white"
              />
            </div>
            <span className="text-[11px] font-medium text-slate-600 truncate">
              <strong className="text-slate-900">3 colegas</strong> online neste quiz
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              playTapSound();
              onOpenPeerHelp();
            }}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-600 font-bold text-xs flex items-center gap-1 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[15px]">help_outline</span>
            <span>Dica & Ajuda</span>
          </button>
        </div>
      </section>

      {/* Bottom Sticky Action Bar */}
      <footer className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(11,28,48,0.06)] px-4 py-3 pb-safe">
        <div className="max-w-md mx-auto flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleSkip}
            className="h-12 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center transition-colors shrink-0 active:scale-95"
          >
            Pular
          </button>

          <button
            type="button"
            disabled={isVerifying}
            onClick={handleConfirm}
            className={`flex-1 h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
              answeredState === 'correct'
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25'
            }`}
          >
            {isVerifying ? (
              <>
                <span className="material-symbols-outlined text-[19px] animate-spin">progress_activity</span>
                <span>Verificando...</span>
              </>
            ) : answeredState === 'correct' ? (
              <>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span>Correto! Avançando...</span>
              </>
            ) : (
              <>
                <span>Confirmar Resposta</span>
                <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};
