import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Clock, 
  Compass, 
  Trash2, 
  Download, 
  RotateCcw, 
  Check, 
  Volume2,
  Sparkles,
  Shield
} from 'lucide-react';
import { UserProfile, SourceLanguage, UserLevel, LearningPurpose, DailyGoalMinutes } from '../types';
import { defaultProgress } from '../utils/storage';

interface SettingsSectionProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onRestartOnboarding: () => void;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
  onLogout?: () => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  profile,
  onUpdateProfile,
  onRestartOnboarding,
  onOpenAuth,
  onLogout
}) => {
  const [sourceLang, setSourceLang] = useState<SourceLanguage>(profile.sourceLanguage);
  const [level, setLevel] = useState<UserLevel>(profile.level);
  const [purpose, setPurpose] = useState<LearningPurpose>(profile.purpose);
  const [dailyMinutes, setDailyMinutes] = useState<DailyGoalMinutes>(profile.dailyGoalMinutes);
  const [speechRate, setSpeechRate] = useState<number>(0.85);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    const updated: UserProfile = {
      ...profile,
      sourceLanguage: sourceLang,
      level,
      purpose,
      dailyGoalMinutes: dailyMinutes
    };
    onUpdateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportData = () => {
    const allData = {
      profile,
      exportedAt: new Date().toISOString(),
      localStorageDump: { ...localStorage }
    };
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namma-kannada-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your learning progress and streaks? This cannot be undone.')) {
      localStorage.removeItem('namma_kannada_progress');
      localStorage.removeItem('namma_kannada_flashcards');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 border border-slate-300 rounded-full text-xs font-bold">
          <SettingsIcon className="w-3.5 h-3.5 text-slate-600" />
          <span>Personalisation & Data Controls</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          Preferences & Settings
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Adjust your explanation language, daily goals, audio playback speed, and data management.
        </p>
      </div>

      {/* Account & Profile Card */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E11D48] to-[#D97706] text-white flex items-center justify-center font-bold text-sm">
              {profile.isLoggedIn && profile.name ? profile.name.charAt(0).toUpperCase() : '👤'}
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0F172A]">
                {profile.isLoggedIn && profile.name ? profile.name : 'Guest Learner'}
              </h3>
              <p className="text-xs text-[#64748B]">
                {profile.isLoggedIn ? (profile.email || profile.phone) : 'Using local guest session'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {profile.isLoggedIn ? (
              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-700 transition-colors"
              >
                Log Out / Switch
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onOpenAuth && onOpenAuth('login')}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#D97706] hover:opacity-95 text-white text-xs font-bold shadow-2xs transition-all"
              >
                Register / Sign In
              </button>
            )}
          </div>
        </div>

        {profile.isLoggedIn ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E2D6]">
              <span className="text-[#64748B] block text-[11px] font-semibold">Registered Name:</span>
              <span className="font-bold text-[#0F172A] text-sm">{profile.name}</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E2D6]">
              <span className="text-[#64748B] block text-[11px] font-semibold">Mobile Number:</span>
              <span className="font-bold text-[#0F172A] text-sm">{profile.phone || 'Not provided'}</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E2D6]">
              <span className="text-[#64748B] block text-[11px] font-semibold">Email:</span>
              <span className="font-bold text-[#0F172A] text-sm truncate block">{profile.email || 'Not provided'}</span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3">
            <div>
              <span className="font-bold block">Save Your Learning History</span>
              <span>Register with your name, phone, email and password or log in via OTP to sync your daily streak and progress.</span>
            </div>
            <button
              type="button"
              onClick={() => onOpenAuth && onOpenAuth('register')}
              className="shrink-0 px-3 py-1.5 bg-[#D97706] text-white rounded-xl font-bold shadow-2xs hover:bg-[#B45309]"
            >
              Register Free
            </button>
          </div>
        )}
      </div>

      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        {/* Source Language */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
            Explanation & Transliteration Language:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSourceLang('en')}
              className={`p-3.5 rounded-2xl border text-left font-bold text-xs sm:text-sm transition-all ${
                sourceLang === 'en'
                  ? 'border-[#E11D48] bg-[#FFF1F2] text-[#E11D48] ring-2 ring-[#E11D48]/30 shadow-xs'
                  : 'border-[#E8E2D6] bg-white text-[#0F172A]'
              }`}
            >
              🇬🇧 English (Default)
            </button>
            <button
              type="button"
              onClick={() => setSourceLang('hi')}
              className={`p-3.5 rounded-2xl border text-left font-bold text-xs sm:text-sm transition-all ${
                sourceLang === 'hi'
                  ? 'border-[#E11D48] bg-[#FFF1F2] text-[#E11D48] ring-2 ring-[#E11D48]/30 shadow-xs'
                  : 'border-[#E8E2D6] bg-white text-[#0F172A]'
              }`}
            >
              🇮🇳 हिंदी (Hindi)
            </button>
          </div>
        </div>

        {/* Learning Level */}
        <div className="space-y-2 pt-2 border-t border-[#E8E2D6]">
          <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
            Current Kannada Proficiency:
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'beginner', label: 'Beginner' },
              { id: 'basic', label: 'Basic' },
              { id: 'intermediate', label: 'Intermediate' }
            ].map(l => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLevel(l.id as UserLevel)}
                className={`p-3 rounded-2xl border text-center text-xs font-bold transition-all ${
                  level === l.id
                    ? 'border-[#0F172A] bg-[#0F172A] text-white shadow-xs'
                    : 'border-[#E8E2D6] bg-white text-[#64748B]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Time Goal */}
        <div className="space-y-2 pt-2 border-t border-[#E8E2D6]">
          <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
            Daily Practice Target:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15, 20].map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setDailyMinutes(m as DailyGoalMinutes)}
                className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                  dailyMinutes === m
                    ? 'border-[#D97706] bg-amber-50 text-[#92400E] ring-2 ring-[#D97706]/30'
                    : 'border-[#E8E2D6] bg-white text-[#64748B]'
                }`}
              >
                {m} mins
              </button>
            ))}
          </div>
        </div>

        {/* Audio Speech Speed Slider */}
        <div className="space-y-2 pt-2 border-t border-[#E8E2D6]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Speech Synthesis Speed:
            </label>
            <span className="text-xs font-mono font-bold text-[#0F172A]">
              {speechRate.toFixed(2)}x (Recommended: 0.85x)
            </span>
          </div>
          <input
            type="range"
            min="0.6"
            max="1.2"
            step="0.05"
            value={speechRate}
            onChange={e => setSpeechRate(parseFloat(e.target.value))}
            className="w-full accent-[#E11D48]"
          />
        </div>

        {/* Save button */}
        <div className="pt-4 border-t border-[#E8E2D6] flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-gradient-to-r from-[#E11D48] to-[#D97706] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            <span>{savedSuccess ? 'Settings Saved!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Guest Mode & Backup Data Card */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Local Storage & Guest Mode</span>
        </h3>
        <p className="text-xs text-[#64748B] leading-relaxed">
          Namma Kannada AI works seamlessly in guest mode. All your streak records, phrasebook additions, writing history, and flashcard schedules are stored safely in your browser.
        </p>

        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <button
            onClick={handleExportData}
            className="px-4 py-2 rounded-xl bg-white border border-[#CBD5E1] text-xs font-bold text-[#0F172A] hover:bg-[#FAF7F2] flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Export Progress (JSON)</span>
          </button>

          <button
            onClick={onRestartOnboarding}
            className="px-4 py-2 rounded-xl bg-white border border-[#CBD5E1] text-xs font-bold text-[#0F172A] hover:bg-[#FAF7F2] flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>Redo Onboarding Setup</span>
          </button>

          <button
            onClick={handleResetProgress}
            className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 hover:bg-rose-100 flex items-center gap-1.5 ml-auto"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>Reset All Learning Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
