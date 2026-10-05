/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenType, UserProfile, Discipline, ContentItem, QuizQuestion, PeerComment } from './types';
import {
  INITIAL_USER,
  DISCIPLINES_DATA,
  CONTENTS_DATA,
  BIOLOGY_QUIZ_QUESTIONS,
  PEER_HELP_COMMENTS,
  ASSETS
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { HomeScreen } from './components/screens/HomeScreen';
import { DisciplinesScreen } from './components/screens/DisciplinesScreen';
import { StudyRoomScreen } from './components/screens/StudyRoomScreen';
import { ContentsScreen } from './components/screens/ContentsScreen';
import { QuizScreen } from './components/screens/QuizScreen';
import { QuizResultScreen } from './components/screens/QuizResultScreen';
import { ProgressScreen } from './components/screens/ProgressScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { CreateRoomModal } from './components/modals/CreateRoomModal';
import { UploadMaterialModal } from './components/modals/UploadMaterialModal';
import { ShareModal } from './components/modals/ShareModal';
import { PeerHelpModal } from './components/modals/PeerHelpModal';
import { StudyGroupModal } from './components/modals/StudyGroupModal';
import { toggleSound, isSoundEnabled, playTapSound } from './utils/audio';

export default function App() {
  // Navigation & State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('inicio');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [disciplines, setDisciplines] = useState<Discipline[]>(DISCIPLINES_DATA);
  const [contents, setContents] = useState<ContentItem[]>(CONTENTS_DATA);
  const [questions, setQuestions] = useState<QuizQuestion[]>(BIOLOGY_QUIZ_QUESTIONS);
  const [peerComments, setPeerComments] = useState<PeerComment[]>(PEER_HELP_COMMENTS);
  const [soundOn, setSoundOn] = useState(true);

  // Quiz active state
  const [quizTimer, setQuizTimer] = useState(105);
  const [quizResults, setQuizResults] = useState({
    score: 80,
    correctCount: 4,
    wrongCount: 1,
    timeSpent: '03:45',
    xpEarned: 50
  });

  // Toast
  const [toast, setToast] = useState<{ message: string | null; icon?: string; color?: string }>({
    message: null
  });

  // Modals state
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [isUploadMaterialOpen, setIsUploadMaterialOpen] = useState(false);
  const [shareModalState, setShareModalState] = useState<{ isOpen: boolean; title: string; text?: string }>({
    isOpen: false,
    title: ''
  });
  const [isPeerHelpOpen, setIsPeerHelpOpen] = useState(false);
  const [studyGroupModalState, setStudyGroupModalState] = useState<{
    isOpen: boolean;
    groupTitle: string;
    discipline: string;
    online: string;
    topic: string;
  }>({
    isOpen: false,
    groupTitle: '',
    discipline: '',
    online: '',
    topic: ''
  });

  // Sound toggle sync
  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  // Timer countdown when on 'quiz' screen
  useEffect(() => {
    if (currentScreen !== 'quiz') return;
    const interval = setInterval(() => {
      setQuizTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentScreen]);

  // Toast helper
  const showToast = (message: string, icon = 'check_circle', color = 'text-emerald-400') => {
    setToast({ message, icon, color });
    setTimeout(() => {
      setToast({ message: null });
    }, 2400);
  };

  // Handlers
  const handleNavigate = (screen: ScreenType) => {
    if (screen === 'quiz') {
      setQuizTimer(105);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoomCreated = (roomName: string, discipline: string) => {
    showToast(`Sala "${roomName}" criada com sucesso! +30 XP`, 'check_circle', 'text-emerald-400');
    setUser((prev) => ({
      ...prev,
      xpToday: prev.xpToday + 30,
      totalXp: prev.totalXp + 30
    }));
    // Open this new group
    setStudyGroupModalState({
      isOpen: true,
      groupTitle: roomName,
      discipline,
      online: '1 online (Você)',
      topic: 'Sessão aberta recentemente para resolução de exercícios.'
    });
  };

  const handleMaterialUploaded = (title: string, subject: string, type: string) => {
    const newItem: ContentItem = {
      id: `user-${Date.now()}`,
      title,
      description: `Material compartilhado por ${user.name} na disciplina de ${subject}. Anotações e resolução comentada.`,
      subject,
      subjectCategory: subject === 'Biologia' ? 'biologicas' : subject === 'História' ? 'humanas' : 'exatas',
      category: type as 'resumos' | 'mapas' | 'flashcards',
      format: type === 'resumos' ? 'Guia PDF' : type === 'mapas' ? 'Mapa Mental' : 'Flashcards',
      authorName: user.name,
      authorRole: 'Criador(a) Ativo(a)',
      authorAvatar: user.avatar,
      rating: 5.0,
      downloads: 1,
      progress: 0,
      progressLabel: 'Recém publicado',
      progressIcon: 'upload_file',
      isFavorite: false
    };

    setContents([newItem, ...contents]);
    setUser((prev) => ({
      ...prev,
      xpToday: prev.xpToday + 50,
      totalXp: prev.totalXp + 50
    }));
    showToast('Material publicado com sucesso! +50 XP ganhos 🎉', 'upload_file', 'text-blue-400');
  };

  const handleToggleFavoriteContent = (id: string) => {
    setContents((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.isFavorite;
          showToast(next ? 'Salvo nos seus favoritos!' : 'Removido dos favoritos', 'favorite');
          return { ...item, isFavorite: next };
        }
        return item;
      })
    );
  };

  const handleFinishQuiz = (results: {
    score: number;
    correctCount: number;
    wrongCount: number;
    timeSpent: string;
    xpEarned: number;
  }) => {
    setQuizResults(results);
    setUser((prev) => ({
      ...prev,
      xpToday: prev.xpToday + results.xpEarned,
      totalXp: prev.totalXp + results.xpEarned
    }));
    setCurrentScreen('resultado-quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddPeerComment = (text: string) => {
    const newComment: PeerComment = {
      id: String(Date.now()),
      authorInitials: 'SM',
      authorName: user.name,
      text,
      avatarColorClass: 'bg-blue-100',
      textColorClass: 'text-blue-700'
    };
    setPeerComments([...peerComments, newComment]);
    showToast('Comentário enviado aos colegas!', 'chat', 'text-blue-400');
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0b1c30] flex flex-col items-center justify-start select-none">
      {/* Quick Screen Quick-Switcher Bar (Convenient for previewing all user screens instantly) */}
      <div className="w-full bg-[#0b1c30] text-slate-300 py-2 px-3 text-xs flex items-center justify-between shadow-md z-50 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          <img src={ASSETS.logo} alt="Logo" className="w-5 h-5 rounded" />
          <span className="font-bold text-white tracking-wide">Conecta Estudo</span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">• Navegação Rápida:</span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'inicio' as ScreenType, label: 'Início' },
            { id: 'disciplinas' as ScreenType, label: 'Disciplinas' },
            { id: 'sala-estudo' as ScreenType, label: 'Sala de Estudo' },
            { id: 'conteudos' as ScreenType, label: 'Conteúdos' },
            { id: 'quiz' as ScreenType, label: 'Quiz Ativo' },
            { id: 'resultado-quiz' as ScreenType, label: 'Resultado' },
            { id: 'progresso' as ScreenType, label: 'Painel/Progresso' },
            { id: 'auth' as ScreenType, label: 'Login/Cadastro' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playTapSound();
                handleNavigate(item.id);
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-all ${
                currentScreen === item.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          {/* Audio toggle button */}
          <button
            onClick={() => {
              const next = toggleSound();
              setSoundOn(next);
              showToast(next ? 'Sons ativados' : 'Sons desativados', next ? 'volume_up' : 'volume_off');
            }}
            title={soundOn ? 'Desativar sons' : 'Ativar sons'}
            className="w-7 h-7 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <span className="material-symbols-outlined text-[16px]">
              {soundOn ? 'volume_up' : 'volume_off'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Responsive Mobile Frame Container */}
      <div className="w-full max-w-md min-h-[92vh] bg-[#f8f9ff] flex flex-col relative shadow-2xl sm:my-3 sm:rounded-3xl overflow-hidden border border-slate-200/80">
        {/* Adaptive Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          user={user}
          quizTimeRemaining={quizTimer}
          onOpenSearch={() => {
            if (currentScreen !== 'disciplinas' && currentScreen !== 'conteudos') {
              handleNavigate('disciplinas');
            }
          }}
          onOpenNotifications={() => {
            showToast('Você tem 3 novos grupos sugeridos e 1 simulado pendente!', 'notifications', 'text-amber-400');
          }}
        />

        {/* Screen Routing */}
        <main className="flex-1 flex flex-col">
          {currentScreen === 'inicio' && (
            <HomeScreen
              user={user}
              onNavigate={handleNavigate}
              onOpenCreateRoom={() => setIsCreateRoomOpen(true)}
              onOpenStudyGroup={(groupTitle, discipline, online, topic) => {
                setStudyGroupModalState({
                  isOpen: true,
                  groupTitle,
                  discipline,
                  online,
                  topic
                });
              }}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'disciplinas' && (
            <DisciplinesScreen
              disciplines={disciplines}
              onOpenCreateRoom={() => setIsCreateRoomOpen(true)}
              onOpenStudyGroup={(groupTitle, discipline, online, topic) => {
                setStudyGroupModalState({
                  isOpen: true,
                  groupTitle,
                  discipline,
                  online,
                  topic
                });
              }}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'sala-estudo' && (
            <StudyRoomScreen
              onNavigate={handleNavigate}
              onOpenStudyGroup={(groupTitle, discipline, online, topic) => {
                setStudyGroupModalState({
                  isOpen: true,
                  groupTitle,
                  discipline,
                  online,
                  topic
                });
              }}
              onOpenShare={(title) => setShareModalState({ isOpen: true, title })}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'conteudos' && (
            <ContentsScreen
              contents={contents}
              onNavigate={handleNavigate}
              onOpenUploadModal={() => setIsUploadMaterialOpen(true)}
              onOpenStudyGroup={(groupTitle, discipline, online, topic) => {
                setStudyGroupModalState({
                  isOpen: true,
                  groupTitle,
                  discipline,
                  online,
                  topic
                });
              }}
              onOpenShare={(title) => setShareModalState({ isOpen: true, title })}
              onToggleFavorite={handleToggleFavoriteContent}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'quiz' && (
            <QuizScreen
              questions={questions}
              onFinishQuiz={handleFinishQuiz}
              onNavigate={handleNavigate}
              onOpenPeerHelp={() => setIsPeerHelpOpen(true)}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'resultado-quiz' && (
            <QuizResultScreen
              score={quizResults.score}
              correctCount={quizResults.correctCount}
              wrongCount={quizResults.wrongCount}
              timeSpent={quizResults.timeSpent}
              xpEarned={quizResults.xpEarned}
              onNavigate={handleNavigate}
              onOpenShare={(title, text) => setShareModalState({ isOpen: true, title, text })}
              onShowToast={showToast}
              onRetakeQuiz={() => {
                handleNavigate('quiz');
              }}
            />
          )}

          {currentScreen === 'progresso' && (
            <ProgressScreen
              user={user}
              onNavigate={handleNavigate}
              onOpenStudyGroup={(groupTitle, discipline, online, topic) => {
                setStudyGroupModalState({
                  isOpen: true,
                  groupTitle,
                  discipline,
                  online,
                  topic
                });
              }}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'auth' && (
            <AuthScreen
              onLoginSuccess={(updatedUser) => {
                setUser((prev) => ({ ...prev, ...updatedUser }));
              }}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Bottom Tab Bar */}
        <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />
      </div>

      {/* Modals & Dialogs */}
      <CreateRoomModal
        isOpen={isCreateRoomOpen}
        onClose={() => setIsCreateRoomOpen(false)}
        onRoomCreated={handleRoomCreated}
      />

      <UploadMaterialModal
        isOpen={isUploadMaterialOpen}
        onClose={() => setIsUploadMaterialOpen(false)}
        onMaterialUploaded={handleMaterialUploaded}
      />

      <ShareModal
        isOpen={shareModalState.isOpen}
        title={shareModalState.title}
        shareText={shareModalState.text}
        onClose={() => setShareModalState({ isOpen: false, title: '' })}
        onCopied={() => showToast('Link copiado para a área de transferência!', 'content_copy')}
      />

      <PeerHelpModal
        isOpen={isPeerHelpOpen}
        onClose={() => setIsPeerHelpOpen(false)}
        hint="Lembre-se da teoria da endossimbiose serial: mitocôndrias possuem dupla membrana, DNA circular e ribossomos próprios para síntese de ATP."
        initialComments={peerComments}
        onAddComment={handleAddPeerComment}
      />

      <StudyGroupModal
        isOpen={studyGroupModalState.isOpen}
        groupTitle={studyGroupModalState.groupTitle}
        discipline={studyGroupModalState.discipline}
        onlineCount={studyGroupModalState.online}
        topic={studyGroupModalState.topic}
        onClose={() => setStudyGroupModalState({ isOpen: false, groupTitle: '', discipline: '', online: '', topic: '' })}
        onJoin={() => {
          showToast(`Conectado à sala "${studyGroupModalState.groupTitle}"! Bons estudos.`, 'meeting_room', 'text-blue-400');
          handleNavigate('sala-estudo');
        }}
      />

      {/* Floating Global Toast */}
      <Toast message={toast.message} icon={toast.icon} iconColor={toast.color} />
    </div>
  );
}
