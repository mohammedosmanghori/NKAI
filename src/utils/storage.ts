import { UserProfile, SavedPhrase, LearnerProgress, Flashcard, RegisteredUser, OtpRecord } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'namma_kannada_profile',
  PHRASEBOOK: 'namma_kannada_phrasebook',
  PROGRESS: 'namma_kannada_progress',
  FLASHCARDS: 'namma_kannada_flashcards',
  RECENT_SEARCHES: 'namma_kannada_recent_searches',
  COMMUNITY_EXPRESSIONS: 'namma_kannada_community_expr',
  USERS: 'namma_kannada_users',
  CURRENT_USER: 'namma_kannada_current_user',
  ACTIVE_OTP: 'namma_kannada_active_otp'
};

export const defaultProfile: UserProfile = {
  sourceLanguage: 'en',
  level: 'beginner',
  purpose: 'everyday',
  dailyGoalMinutes: 10,
  onboardingCompleted: false,
  createdAt: new Date().toISOString()
};

export const defaultProgress: LearnerProgress = {
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: [],
  lessonScores: {},
  practisedCharacters: ['ಅ', 'ಆ', 'ಕ'],
  reviewsCompleted: 0,
  weakWordIds: [],
  recentActivities: [
    {
      id: 'act-1',
      title: 'Welcome to Namma Kannada AI',
      description: 'Started journey to learn conversational Kannada',
      timestamp: new Date().toISOString(),
      type: 'lesson'
    }
  ]
};

export const initialSavedPhrases: SavedPhrase[] = [
  {
    id: 'phrase-1',
    kannada: 'ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಿ?',
    transliteration: 'Namaskāra, nīvu hēgiddīri?',
    english: 'Hello, how are you?',
    hindi: 'नमस्ते, आप कैसे हैं?',
    category: 'Greetings',
    folder: 'Essentials',
    savedAt: new Date().toISOString(),
    tags: ['Daily', 'Polite']
  },
  {
    id: 'phrase-2',
    kannada: 'ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?',
    transliteration: 'Bus nildāṇa ellide?',
    english: 'Where is the bus stop?',
    hindi: 'बस स्टॉप कहाँ है?',
    category: 'Transport',
    folder: 'Travel',
    savedAt: new Date().toISOString(),
    tags: ['Commute', 'Direction']
  },
  {
    id: 'phrase-3',
    kannada: 'ಒಂದು ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ಕಾಫಿ ಕೊಡಿ.',
    transliteration: 'Ondu masāle dōse mattu kāphi koḍi.',
    english: 'Give one masala dosa and coffee please.',
    hindi: 'एक मसाला डोसा और कॉफ़ी दीजिए।',
    category: 'Food',
    folder: 'Dining',
    savedAt: new Date().toISOString(),
    tags: ['Restaurant']
  },
  {
    id: 'phrase-4',
    kannada: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ ಅಣ್ಣ.',
    transliteration: 'Svalpa kaḍime māḍi aṇṇa.',
    english: 'Reduce the price a little bit, brother.',
    hindi: 'थोड़ा कम कीजिए भैया।',
    category: 'Shopping',
    folder: 'Essentials',
    savedAt: new Date().toISOString(),
    tags: ['Bargaining']
  }
];

export const initialFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    kannada: 'ಊಟ',
    transliteration: 'Oota',
    meaningEn: 'Meal / Lunch or Dinner',
    meaningHi: 'भोजन / खाना',
    example: 'ಊಟ ಆಯ್ತಾ? (Oota aaytha? - Had food?)',
    repetitions: 1,
    interval: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString()
  },
  {
    id: 'fc-2',
    kannada: 'ಹೌದು',
    transliteration: 'Haudu',
    meaningEn: 'Yes',
    meaningHi: 'हाँ',
    example: 'ಹೌದು, ನಾನು ಬರುತ್ತೇನೆ. (Haudu, nānu baruttēne. - Yes, I will come.)',
    repetitions: 2,
    interval: 2,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString()
  },
  {
    id: 'fc-3',
    kannada: 'ಇಲ್ಲ',
    transliteration: 'Illa',
    meaningEn: 'No / Not there',
    meaningHi: 'नहीं / नहीं है',
    example: 'ನನಗೆ ಗೊತ್ತಿಲ್ಲ. (Nanage gottilla. - I do not know.)',
    repetitions: 0,
    interval: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString()
  },
  {
    id: 'fc-4',
    kannada: 'ದಯವಿಟ್ಟು',
    transliteration: 'Dayaviṭṭu',
    meaningEn: 'Please',
    meaningHi: 'कृपया',
    example: 'ದಯವಿಟ್ಟು ಬನ್ನಿ. (Dayaviṭṭu banni. - Please come in.)',
    repetitions: 1,
    interval: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString()
  },
  {
    id: 'fc-5',
    kannada: 'ಧನ್ಯವಾದ',
    transliteration: 'Dhanyavāda',
    meaningEn: 'Thank you',
    meaningHi: 'धन्यवाद',
    example: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು. (Tumbā dhanyavādagaḷu.)',
    repetitions: 1,
    interval: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString()
  },
  {
    id: 'fc-6',
    kannada: 'ಎಷ್ಟು?',
    transliteration: 'Eṣṭu?',
    meaningEn: 'How much?',
    meaningHi: 'कितना?',
    example: 'ಇದು ಎಷ್ಟು? (Idu eṣṭu? - How much is this?)',
    repetitions: 0,
    interval: 0,
    easeFactor: 2.3,
    nextReviewDate: new Date().toISOString()
  }
];

export function getStoredProfile(): UserProfile {
  if (typeof window === 'undefined') return defaultProfile;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function saveStoredProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.warn('Failed to save profile to localStorage', e);
  }
}

export function getStoredProgress(): LearnerProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!data) return defaultProgress;
    const progress: LearnerProgress = JSON.parse(data);

    // Update streak logic
    const today = new Date().toISOString().split('T')[0];
    const lastActive = progress.lastActiveDate;
    if (lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastActive === yesterday) {
        progress.streakDays += 1;
      } else if (lastActive < yesterday) {
        progress.streakDays = 1; // reset streak if skipped
      }
      progress.lastActiveDate = today;
      saveStoredProgress(progress);
    }
    return progress;
  } catch {
    return defaultProgress;
  }
}

export function saveStoredProgress(progress: LearnerProgress): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.warn('Failed to save progress to localStorage', e);
  }
}

export function logActivity(title: string, description: string, type: LearnerProgress['recentActivities'][0]['type']) {
  const current = getStoredProgress();
  const newActivity = {
    id: `act-${Date.now()}`,
    title,
    description,
    timestamp: new Date().toISOString(),
    type
  };
  current.recentActivities = [newActivity, ...current.recentActivities.slice(0, 19)];
  saveStoredProgress(current);
}

export function getStoredPhrases(): SavedPhrase[] {
  if (typeof window === 'undefined') return initialSavedPhrases;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PHRASEBOOK);
    return data ? JSON.parse(data) : initialSavedPhrases;
  } catch {
    return initialSavedPhrases;
  }
}

export function saveStoredPhrases(phrases: SavedPhrase[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PHRASEBOOK, JSON.stringify(phrases));
  } catch (e) {
    console.warn('Failed to save phrasebook', e);
  }
}

export function addSavedPhrase(phrase: Omit<SavedPhrase, 'id' | 'savedAt'>): SavedPhrase {
  const list = getStoredPhrases();
  // Check if already saved
  const existing = list.find(p => p.kannada === phrase.kannada);
  if (existing) return existing;

  const newPhrase: SavedPhrase = {
    ...phrase,
    id: `phrase-${Date.now()}`,
    savedAt: new Date().toISOString(),
    folder: phrase.folder || 'Essentials'
  };
  const updated = [newPhrase, ...list];
  saveStoredPhrases(updated);
  logActivity('Phrase Saved', `Saved "${phrase.transliteration}" to phrasebook`, 'translate');
  return newPhrase;
}

export function removeSavedPhrase(id: string): void {
  const list = getStoredPhrases();
  const filtered = list.filter(p => p.id !== id);
  saveStoredPhrases(filtered);
}

export function getStoredFlashcards(): Flashcard[] {
  if (typeof window === 'undefined') return initialFlashcards;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FLASHCARDS);
    return data ? JSON.parse(data) : initialFlashcards;
  } catch {
    return initialFlashcards;
  }
}

export function saveStoredFlashcards(cards: Flashcard[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(cards));
  } catch (e) {
    console.warn('Failed to save flashcards', e);
  }
}

// Spaced Repetition Rating: 'forgot' | 'difficult' | 'remembered' | 'easy'
export function updateFlashcardReview(cardId: string, rating: 'forgot' | 'difficult' | 'remembered' | 'easy') {
  const cards = getStoredFlashcards();
  const card = cards.find(c => c.id === cardId);
  if (!card) return;

  let { repetitions, interval, easeFactor } = card;

  if (rating === 'forgot') {
    repetitions = 0;
    interval = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    card.isWeak = true;
  } else if (rating === 'difficult') {
    repetitions += 1;
    interval = Math.max(1, Math.round(interval * 1.2));
    easeFactor = Math.max(1.3, easeFactor - 0.15);
    card.isWeak = true;
  } else if (rating === 'remembered') {
    repetitions += 1;
    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 3;
    else interval = Math.round(interval * easeFactor);
    card.isWeak = false;
  } else if (rating === 'easy') {
    repetitions += 1;
    if (repetitions === 1) interval = 2;
    else if (repetitions === 2) interval = 5;
    else interval = Math.round(interval * easeFactor * 1.3);
    easeFactor = Math.min(3.0, easeFactor + 0.15);
    card.isWeak = false;
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  card.repetitions = repetitions;
  card.interval = interval;
  card.easeFactor = easeFactor;
  card.nextReviewDate = nextDate.toISOString();
  card.lastRating = rating;

  saveStoredFlashcards(cards);

  // Update learner progress
  const progress = getStoredProgress();
  progress.reviewsCompleted += 1;
  if (card.isWeak && !progress.weakWordIds.includes(card.id)) {
    progress.weakWordIds.push(card.id);
  } else if (!card.isWeak) {
    progress.weakWordIds = progress.weakWordIds.filter(id => id !== card.id);
  }
  saveStoredProgress(progress);
}

// ==========================================
// User Authentication & Registration System
// ==========================================

export function getRegisteredUsers(): RegisteredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveRegisteredUsers(users: RegisteredUser[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (e) {
    console.warn('Failed to save registered users', e);
  }
}

export function getCurrentUser(): RegisteredUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: RegisteredUser | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      // Sync into current profile
      const prof = getStoredProfile();
      const updatedProf: UserProfile = {
        ...prof,
        name: user.name,
        email: user.email,
        phone: user.phone,
        sourceLanguage: user.sourceLanguage || prof.sourceLanguage,
        level: user.level || prof.level,
        purpose: user.purpose || prof.purpose,
        dailyGoalMinutes: user.dailyGoalMinutes || prof.dailyGoalMinutes,
        onboardingCompleted: true,
        isLoggedIn: true
      };
      saveStoredProfile(updatedProf);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      const prof = getStoredProfile();
      saveStoredProfile({ ...prof, isLoggedIn: false });
    }
  } catch (e) {
    console.warn('Failed to set current user', e);
  }
}

export function normalizeIdentifier(val: string): { type: 'email' | 'phone'; normalized: string } {
  const trimmed = val.trim();
  if (trimmed.includes('@')) {
    return { type: 'email', normalized: trimmed.toLowerCase() };
  }
  // Digits only for phone numbers
  const digits = trimmed.replace(/\D/g, '');
  return { type: 'phone', normalized: digits };
}

export function registerUser(details: {
  name: string;
  phone: string;
  email: string;
  password?: string;
  sourceLanguage?: UserProfile['sourceLanguage'];
  level?: UserProfile['level'];
  purpose?: UserProfile['purpose'];
  dailyGoalMinutes?: UserProfile['dailyGoalMinutes'];
}): { success: boolean; user?: RegisteredUser; error?: string } {
  const { name, phone, email, password } = details;

  if (!name.trim()) return { success: false, error: 'Full name is required.' };
  if (!phone.trim()) return { success: false, error: 'Phone number is required.' };
  if (!email.trim() || !email.includes('@')) return { success: false, error: 'A valid email address is required.' };
  if (!password || password.length < 4) return { success: false, error: 'Password must be at least 4 characters long.' };

  const phoneNorm = normalizeIdentifier(phone).normalized;
  const emailNorm = normalizeIdentifier(email).normalized;

  const users = getRegisteredUsers();
  const existing = users.find(
    u => normalizeIdentifier(u.email).normalized === emailNorm || normalizeIdentifier(u.phone).normalized === phoneNorm
  );

  if (existing) {
    return { 
      success: false, 
      error: 'An account with this email or phone number already exists. Please log in.' 
    };
  }

  const newUser: RegisteredUser = {
    id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    password: password.trim(),
    sourceLanguage: details.sourceLanguage || 'en',
    level: details.level || 'beginner',
    purpose: details.purpose || 'everyday',
    dailyGoalMinutes: details.dailyGoalMinutes || 10,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveRegisteredUsers(users);
  setCurrentUser(newUser);

  logActivity('Account Created', `Welcome ${newUser.name}! Registered with ${newUser.email}`, 'lesson');

  return { success: true, user: newUser };
}

export function loginWithPassword(identifier: string, password: string): { success: boolean; user?: RegisteredUser; error?: string } {
  if (!identifier.trim()) return { success: false, error: 'Please enter your email or phone number.' };
  if (!password) return { success: false, error: 'Please enter your password.' };

  const { normalized } = normalizeIdentifier(identifier);
  const users = getRegisteredUsers();

  const user = users.find(u => {
    const uEmail = normalizeIdentifier(u.email).normalized;
    const uPhone = normalizeIdentifier(u.phone).normalized;
    return uEmail === normalized || uPhone === normalized;
  });

  if (!user) {
    return { success: false, error: 'No account found with this email or phone. Please register first.' };
  }

  if (user.password !== password.trim()) {
    return { success: false, error: 'Incorrect password. Try again or generate an OTP to log in.' };
  }

  setCurrentUser(user);
  logActivity('Signed In', `Welcome back, ${user.name}!`, 'lesson');

  return { success: true, user };
}

export function generateOtp(identifier: string): { success: boolean; otp?: string; error?: string; targetType?: 'email' | 'phone'; expiresAt?: number } {
  if (!identifier.trim()) {
    return { success: false, error: 'Please enter your email address or phone number.' };
  }

  const { type, normalized } = normalizeIdentifier(identifier);
  if (type === 'phone' && normalized.length < 6) {
    return { success: false, error: 'Please enter a valid phone number (at least 6 digits).' };
  }
  if (type === 'email' && !identifier.includes('.')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  // 6-digit numeric OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins

  try {
    const record: OtpRecord = {
      identifier: normalized,
      otp,
      expiresAt
    };
    localStorage.setItem(STORAGE_KEYS.ACTIVE_OTP, JSON.stringify(record));
  } catch {}

  return {
    success: true,
    otp,
    targetType: type,
    expiresAt
  };
}

export function verifyOtp(identifier: string, enteredOtp: string): { success: boolean; user?: RegisteredUser; error?: string; isNewUser?: boolean } {
  if (!enteredOtp || enteredOtp.trim().length < 4) {
    return { success: false, error: 'Please enter the 6-digit OTP code.' };
  }

  const { normalized, type } = normalizeIdentifier(identifier);

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_OTP);
    if (!raw) {
      return { success: false, error: 'No active OTP request found. Please click Generate OTP.' };
    }

    const record: OtpRecord = JSON.parse(raw);
    if (record.identifier !== normalized) {
      return { success: false, error: 'OTP was requested for a different email/number. Please generate a new OTP.' };
    }

    if (Date.now() > record.expiresAt) {
      return { success: false, error: 'This OTP has expired. Please generate a new code.' };
    }

    if (record.otp !== enteredOtp.trim()) {
      return { success: false, error: 'Invalid verification code. Please check and re-enter.' };
    }

    // OTP verified! Clear used OTP
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_OTP);

    // Look for existing registered user
    const users = getRegisteredUsers();
    let user = users.find(u => {
      const uEmail = normalizeIdentifier(u.email).normalized;
      const uPhone = normalizeIdentifier(u.phone).normalized;
      return uEmail === normalized || uPhone === normalized;
    });

    let isNewUser = false;
    if (!user) {
      // Auto-create basic registered profile for OTP user
      isNewUser = true;
      const autoName = type === 'email' ? identifier.split('@')[0] : `Learner ${normalized.slice(-4)}`;
      user = {
        id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: autoName.charAt(0).toUpperCase() + autoName.slice(1),
        email: type === 'email' ? identifier.trim() : `${normalized}@kannadacompanion.app`,
        phone: type === 'phone' ? identifier.trim() : '',
        sourceLanguage: 'en',
        level: 'beginner',
        purpose: 'everyday',
        dailyGoalMinutes: 10,
        createdAt: new Date().toISOString()
      };
      users.push(user);
      saveRegisteredUsers(users);
    }

    setCurrentUser(user);
    logActivity('OTP Verified', `Signed in successfully via instant OTP`, 'lesson');

    return { success: true, user, isNewUser };
  } catch (e: any) {
    return { success: false, error: e.message || 'OTP verification failed' };
  }
}

export function logoutUser(): void {
  setCurrentUser(null);
}

