export type ScreenType = 
  | 'inicio' 
  | 'disciplinas' 
  | 'conteudos' 
  | 'quiz' 
  | 'resultado-quiz' 
  | 'progresso' 
  | 'sala-estudo' 
  | 'auth';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  streakDays: number;
  level: number;
  xpToday: number;
  totalXp: number;
  focusMinutesToday: number;
  focusMinutesGoal: number;
  studyArea: string;
  isLoggedIn: boolean;
}

export interface Discipline {
  id: string;
  name: string;
  icon: string;
  topics: string;
  category: 'exatas' | 'biologicas' | 'humanas';
  activeRooms: number;
  onlineCount: number;
  progress: number;
  colorClass: string;
  bgLightClass: string;
  isFavorite?: boolean;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectCategory: 'exatas' | 'biologicas' | 'humanas';
  category: 'resumos' | 'mapas' | 'flashcards';
  format: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  rating: number;
  downloads: number;
  progress: number;
  progressLabel: string;
  progressIcon: string;
  isFavorite: boolean;
  studyRoomTopic?: string;
}

export interface QuizQuestion {
  id: number;
  statement: string;
  subject: string;
  topic: string;
  difficulty: 'Fácil' | 'Média' | 'Difícil';
  illustrationUrl?: string;
  options: {
    id: string;
    letter: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  userSelectedOptionId?: string;
  hint: string;
}

export interface PeerComment {
  id: string;
  authorInitials: string;
  authorName: string;
  text: string;
  avatarColorClass: string;
  textColorClass: string;
}
