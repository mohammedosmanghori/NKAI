export type SourceLanguage = 'en' | 'hi';
export type UserLevel = 'beginner' | 'basic' | 'intermediate';
export type LearningPurpose = 'travel' | 'college' | 'work' | 'everyday' | 'family' | 'culture';
export type DailyGoalMinutes = 5 | 10 | 15 | 20;

export interface UserProfile {
  name?: string;
  email?: string;
  phone?: string;
  isLoggedIn?: boolean;
  sourceLanguage: SourceLanguage;
  level: UserLevel;
  purpose: LearningPurpose;
  dailyGoalMinutes: DailyGoalMinutes;
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  sourceLanguage: SourceLanguage;
  level: UserLevel;
  purpose: LearningPurpose;
  dailyGoalMinutes: DailyGoalMinutes;
  createdAt: string;
}

export interface OtpRecord {
  identifier: string;
  otp: string;
  expiresAt: number;
}

export interface WordBreakdownItem {
  kannada: string;
  transliteration: string;
  meaning: string;
}

export interface TranslationResult {
  kannada_text: string;
  transliteration: string;
  source_language_meaning: string;
  word_breakdown?: WordBreakdownItem[];
  grammar_explanation?: string;
  usage_context?: string;
  polite_variant?: string | null;
  alternative_phrase?: string | null;
  learning_tip?: string | null;
  isLiveAI?: boolean;
  provider?: string;
}

export interface SavedPhrase {
  id: string;
  kannada: string;
  transliteration: string;
  english: string;
  hindi: string;
  category: string;
  notes?: string;
  savedAt: string;
  folder?: string;
  tags?: string[];
}

export interface AlphabetCharacter {
  id: string;
  category: 'vowel' | 'consonant' | 'combination' | 'numeral' | 'word';
  kannada: string;
  transliteration: string;
  englishPhonetic: string;
  hindiEquivalent: string;
  audioText: string;
  exampleWord: {
    kannada: string;
    transliteration: string;
    meaningEn: string;
    meaningHi: string;
  };
  strokeHint?: string;
  numeralValue?: number;
  subType?: 'swara' | 'yogavahaka' | 'vargiya' | 'avargiya';
  varga?: string;
}

export interface SurvivalPhrase {
  id: string;
  category: string;
  kannada: string;
  transliteration: string;
  english: string;
  hindi: string;
  isEmergency?: boolean;
  contextTip?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionHi?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationHi?: string;
}

export interface DayLesson {
  day: number;
  title: string;
  titleKannada: string;
  objective: string;
  lessonContent: {
    heading: string;
    description: string;
    examples: Array<{
      kannada: string;
      transliteration: string;
      meaningEn: string;
      meaningHi: string;
    }>;
  }[];
  quiz: QuizQuestion[];
}

export interface RegionalExpressionItem {
  id: string;
  region: 'bengaluru' | 'mysuru' | 'north_karnataka' | 'coastal';
  regionName: string;
  expression: string;
  transliteration: string;
  meaningEn: string;
  meaningHi: string;
  contextOfUse: string;
  alternativeVerified?: string;
  isVerified: boolean;
  submittedBy?: string;
  usageNote: string;
}

export interface Flashcard {
  id: string;
  kannada: string;
  transliteration: string;
  meaningEn: string;
  meaningHi: string;
  example?: string;
  // Spaced repetition fields
  repetitions: number;
  interval: number; // in days
  easeFactor: number;
  nextReviewDate: string; // ISO date
  lastRating?: 'forgot' | 'difficult' | 'remembered' | 'easy';
  isWeak?: boolean;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'tutor';
  text: string;
  transliteration?: string;
  meaning?: string;
  explanation?: string;
  correction?: string | null;
  suggestedResponses?: Array<{
    kannada: string;
    transliteration: string;
    meaning: string;
  }>;
  timestamp: string;
}

export interface LearnerProgress {
  streakDays: number;
  lastActiveDate: string;
  completedLessons: number[];
  lessonScores: Record<number, number>;
  practisedCharacters: string[];
  reviewsCompleted: number;
  weakWordIds: string[];
  recentActivities: {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    type: 'translate' | 'writing' | 'lesson' | 'quiz' | 'flashcard' | 'conversation';
  }[];
}
