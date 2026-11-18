import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { OnboardingModal } from './components/OnboardingModal';
import { HomeDashboard } from './components/HomeDashboard';
import { TranslatorSection } from './components/TranslatorSection';
import { ConversationalTutor } from './components/ConversationalTutor';
import { InteractiveWritingLab } from './components/InteractiveWritingLab';
import { SurvivalMode } from './components/SurvivalMode';
import { SevenDayCourse } from './components/SevenDayCourse';
import { SayWhatYouMean } from './components/SayWhatYouMean';
import { MemoryCoach } from './components/MemoryCoach';
import { RegionalExplorer } from './components/RegionalExplorer';
import { CameraReaderOCR } from './components/CameraReaderOCR';
import { PronunciationPractice } from './components/PronunciationPractice';
import { PhrasebookSection } from './components/PhrasebookSection';
import { ProgressSection } from './components/ProgressSection';
import { SettingsSection } from './components/SettingsSection';
import { AuthModal } from './components/AuthModal';
import { UserProfile, SourceLanguage, LearnerProgress, RegisteredUser } from './types';
import { 
  getStoredProfile, 
  saveStoredProfile, 
  getStoredProgress, 
  defaultProfile,
  getCurrentUser,
  logoutUser
} from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [progress, setProgress] = useState<LearnerProgress>(getStoredProgress());
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [translatorInitialQuery, setTranslatorInitialQuery] = useState<string>('');
  const [courseInitialDay, setCourseInitialDay] = useState<number>(1);

  // Initialize profile & progress on first mount
  useEffect(() => {
    const saved = getStoredProfile();
    const currentUser = getCurrentUser();
    if (currentUser) {
      saved.isLoggedIn = true;
      saved.name = currentUser.name;
      saved.email = currentUser.email;
      saved.phone = currentUser.phone;
    }
    setProfile(saved);
    setProgress(getStoredProgress());

    if (!saved.onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthInitialMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (user: RegisteredUser) => {
    const saved = getStoredProfile();
    setProfile(saved);
    setProgress(getStoredProgress());
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    logoutUser();
    const saved = getStoredProfile();
    setProfile(saved);
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
    saveStoredProfile(updated);
  };

  const handleCompleteOnboarding = (updated: UserProfile) => {
    handleUpdateProfile(updated);
    setShowOnboarding(false);
  };

  const handleChangeSourceLanguage = (lang: SourceLanguage) => {
    const updated: UserProfile = { ...profile, sourceLanguage: lang };
    handleUpdateProfile(updated);
  };

  const handleQuickTranslateFromHome = (text: string) => {
    setTranslatorInitialQuery(text);
    setCurrentTab('translate');
  };

  const handleNavigate = (tab: string, params?: any) => {
    if (tab === 'course' && params?.day) {
      setCourseInitialDay(params.day);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const refreshProgress = () => {
    setProgress(getStoredProgress());
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F172A] flex flex-col font-sans selection:bg-[#F59E0B]/20 selection:text-[#92400E] w-full max-w-full overflow-x-hidden relative">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleNavigate}
        sourceLanguage={profile.sourceLanguage}
        onChangeSourceLanguage={handleChangeSourceLanguage}
        streakDays={progress.streakDays}
        onOpenOnboarding={() => setShowOnboarding(true)}
        profile={profile}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Learning Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 lg:pb-12">
        {currentTab === 'home' && (
          <HomeDashboard
            profile={profile}
            progress={progress}
            onNavigate={handleNavigate}
            onQuickTranslate={handleQuickTranslateFromHome}
          />
        )}

        {currentTab === 'translate' && (
          <TranslatorSection
            sourceLanguage={profile.sourceLanguage}
            onChangeSourceLanguage={handleChangeSourceLanguage}
            initialQuery={translatorInitialQuery}
            onPhraseSaved={refreshProgress}
          />
        )}

        {currentTab === 'speak' && (
          <ConversationalTutor
            sourceLanguage={profile.sourceLanguage}
            userLevel={profile.level}
          />
        )}

        {currentTab === 'write' && (
          <InteractiveWritingLab
            sourceLanguage={profile.sourceLanguage}
            onCharacterMastered={refreshProgress}
          />
        )}

        {currentTab === 'survival' && (
          <SurvivalMode
            sourceLanguage={profile.sourceLanguage}
            onPhraseSaved={refreshProgress}
          />
        )}

        {currentTab === 'course' && (
          <SevenDayCourse
            sourceLanguage={profile.sourceLanguage}
            initialDay={courseInitialDay}
            onLessonCompleted={refreshProgress}
          />
        )}

        {currentTab === 'say-what-you-mean' && (
          <SayWhatYouMean
            sourceLanguage={profile.sourceLanguage}
            onPhraseSaved={refreshProgress}
          />
        )}

        {currentTab === 'revision' && (
          <MemoryCoach
            sourceLanguage={profile.sourceLanguage}
          />
        )}

        {currentTab === 'explore' && (
          <RegionalExplorer
            sourceLanguage={profile.sourceLanguage}
          />
        )}

        {currentTab === 'ocr' && (
          <CameraReaderOCR
            sourceLanguage={profile.sourceLanguage}
            onPhraseSaved={refreshProgress}
          />
        )}

        {currentTab === 'pronunciation' && (
          <PronunciationPractice
            sourceLanguage={profile.sourceLanguage}
          />
        )}

        {currentTab === 'phrasebook' && (
          <PhrasebookSection
            sourceLanguage={profile.sourceLanguage}
            onLaunchFlashcards={() => handleNavigate('revision')}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressSection sourceLanguage={profile.sourceLanguage} />
        )}

        {currentTab === 'settings' && (
          <SettingsSection
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onRestartOnboarding={() => setShowOnboarding(true)}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={handleNavigate}
        sourceLanguage={profile.sourceLanguage}
      />

      {/* Onboarding Personalization Flow */}
      {showOnboarding && (
        <OnboardingModal
          initialProfile={profile}
          onComplete={handleCompleteOnboarding}
          onClose={() => setShowOnboarding(false)}
          onOpenAuth={handleOpenAuth}
        />
      )}

      {/* Authentication & Registration Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authInitialMode}
        onSuccess={handleAuthSuccess}
        currentProfile={profile}
      />
    </div>
  );
}
