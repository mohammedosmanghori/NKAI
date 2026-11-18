import React from 'react';
import { Sparkles, Flame, Volume2, Globe2, BookOpen, User, LogIn } from 'lucide-react';
import { SourceLanguage, UserProfile } from '../types';
import { getT } from '../utils/i18n';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  sourceLanguage: SourceLanguage;
  onChangeSourceLanguage: (lang: SourceLanguage) => void;
  streakDays: number;
  onOpenOnboarding: () => void;
  profile: UserProfile;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  sourceLanguage,
  onChangeSourceLanguage,
  streakDays,
  onOpenOnboarding,
  profile,
  onOpenAuth
}) => {
  const t = getT(sourceLanguage);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'translate', label: t.nav.translate },
    { id: 'speak', label: t.nav.speak },
    { id: 'write', label: t.nav.write },
    { id: 'survival', label: t.nav.survival },
    { id: 'course', label: t.nav.course },
    { id: 'revision', label: t.nav.revision },
    { id: 'explore', label: t.nav.explore },
    { id: 'ocr', label: t.nav.ocr },
    { id: 'phrasebook', label: t.nav.phrasebook },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D6] px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E11D48] via-[#F59E0B] to-[#D97706] p-0.5 shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#FAF7F2] rounded-[10px] flex items-center justify-center font-bold text-lg text-[#E11D48] font-kannada">
              ಕ
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-[#0F172A]">
                NAMMA KANNADA
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] rounded-md tracking-wider">
                AI
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] font-medium hidden sm:block">
              {t.appSlogan}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F1ECE4]/80 p-1 rounded-xl border border-[#E2DBD0]">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right side controls: Streak, Language Switcher, Settings */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak */}
          <div 
            onClick={() => onSelectTab('progress')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] rounded-xl text-xs font-bold cursor-pointer hover:bg-[#FEE2E2] transition-colors"
            title="Daily Learning Streak"
          >
            <Flame className="w-4 h-4 fill-[#DC2626]" />
            <span>{t.streakDays(streakDays)}</span>
          </div>

          {/* Source Language Switcher (EN / HI) */}
          <div className="flex items-center bg-[#EAE4D8] p-0.5 rounded-xl border border-[#DDD6C8] text-xs font-bold">
            <button
              onClick={() => onChangeSourceLanguage('en')}
              className={`px-2 py-1 rounded-lg transition-all ${
                sourceLanguage === 'en'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onChangeSourceLanguage('hi')}
              className={`px-2 py-1 rounded-lg transition-all ${
                sourceLanguage === 'hi'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* User Account or Sign In / Register button */}
          {profile.isLoggedIn && profile.name ? (
            <button
              onClick={() => onSelectTab('settings')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-[#FAF7F2] border border-[#E2DBD0] rounded-xl text-xs font-bold text-[#0F172A] shadow-2xs transition-colors"
              title={`Logged in as ${profile.name}`}
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#E11D48] to-[#D97706] text-white flex items-center justify-center text-[10px] uppercase font-black">
                {profile.name.charAt(0)}
              </div>
              <span className="hidden sm:inline max-w-[85px] truncate">{profile.name}</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#D97706] hover:opacity-95 text-white text-xs font-bold shadow-2xs transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.loginRegister}</span>
              <span className="sm:hidden">{t.login}</span>
            </button>
          )}

          {/* Settings / Customize profile */}
          <button
            onClick={() => onSelectTab('settings')}
            className="p-2 text-[#475569] hover:text-[#0F172A] hover:bg-[#EAE4D8] rounded-xl transition-colors"
            title={t.settings}
          >
            <span className="sr-only">{t.settings}</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
