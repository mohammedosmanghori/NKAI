import React, { useState } from 'react';
import { Sparkles, Globe, Compass, Clock, CheckCircle2, X } from 'lucide-react';
import { UserProfile, SourceLanguage, UserLevel, LearningPurpose, DailyGoalMinutes } from '../types';

interface OnboardingModalProps {
  initialProfile: UserProfile;
  onComplete: (profile: UserProfile) => void;
  onClose: () => void;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  initialProfile,
  onComplete,
  onClose,
  onOpenAuth
}) => {
  const [step, setStep] = useState(1);
  const [sourceLang, setSourceLang] = useState<SourceLanguage>(initialProfile.sourceLanguage);
  const [level, setLevel] = useState<UserLevel>(initialProfile.level);
  const [purpose, setPurpose] = useState<LearningPurpose>(initialProfile.purpose);
  const [dailyMinutes, setDailyMinutes] = useState<DailyGoalMinutes>(initialProfile.dailyGoalMinutes);

  const handleFinish = () => {
    const updated: UserProfile = {
      sourceLanguage: sourceLang,
      level,
      purpose,
      dailyGoalMinutes: dailyMinutes,
      onboardingCompleted: true,
      createdAt: initialProfile.createdAt || new Date().toISOString()
    };
    onComplete(updated);
  };

  const handleSkip = () => {
    const updated: UserProfile = {
      ...initialProfile,
      sourceLanguage: sourceLang,
      onboardingCompleted: true
    };
    onComplete(updated);
  };

  const isHi = sourceLang === 'hi';

  // Prevent background scrolling while modal is active, cleanly restore when closed
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleSkip();
      }}
    >
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl relative overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col">
        {/* Subtle decorative flag color bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#F59E0B]" />

        {/* Top Header with Step indicator and Dismiss X */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === step ? 'w-8 bg-[#E11D48]' : s < step ? 'w-4 bg-[#F59E0B]' : 'w-4 bg-[#E2DBD0]'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#64748B]">
              {isHi ? `चरण ${step} / 4` : `Step ${step} of 4`}
            </span>
            <button
              type="button"
              onClick={handleSkip}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-1"
              title={isHi ? 'छोड़ें' : 'Skip setup'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Step Content */}
        <div className="overflow-y-auto flex-1 pr-1 py-1 space-y-4 scrollbar-thin">
          {/* Step 1: Language */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                  {isHi ? 'भाषा चयन' : 'Language Choice'}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                  {isHi ? 'आप कौन सी भाषा सबसे बेहतर समझते हैं?' : 'What language do you understand best?'}
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  {isHi ? 'हम आपके लिए कन्नड़ के अर्थ और व्याख्या उसी भाषा में प्रदान करेंगे।' : 'We will provide Kannada transliterations and explanations tailored for you.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSourceLang('en')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    sourceLang === 'en'
                      ? 'border-[#E11D48] bg-[#FFF1F2] ring-2 ring-[#E11D48]/30 shadow-sm'
                      : 'border-[#E8E2D6] bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="text-2xl mb-2">🇬🇧</div>
                  <div className="font-bold text-[#0F172A]">English</div>
                  <div className="text-xs text-[#64748B]">Explanations in English</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSourceLang('hi')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    sourceLang === 'hi'
                      ? 'border-[#E11D48] bg-[#FFF1F2] ring-2 ring-[#E11D48]/30 shadow-sm'
                      : 'border-[#E8E2D6] bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="text-2xl mb-2">🇮🇳</div>
                  <div className="font-bold text-[#0F172A]">हिंदी (Hindi)</div>
                  <div className="text-xs text-[#64748B]">हिंदी में अर्थ और व्याकरण</div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Kannada Level */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                  {isHi ? 'प्रारंभिक स्तर' : 'Your Baseline'}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                  {isHi ? 'आपका वर्तमान कन्नड़ स्तर क्या है?' : 'What is your current Kannada level?'}
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  {isHi ? 'यह हमें आपके लिए सबसे उपयुक्त पाठ और वाक्य सुझाने में मदद करता है।' : 'This helps us recommend the right starting phrases and lessons.'}
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'beginner', title: isHi ? 'बिलकुल शुरुआती (Beginner)' : 'Complete Beginner', desc: isHi ? 'कन्नड़ में नए हैं। अभी पढ़ना या बोलना नहीं आता।' : 'New to Kannada. Cannot read or speak yet.' },
                  { id: 'basic', title: isHi ? 'बुनियादी (कुछ शब्द जानते हैं)' : 'Basic / Can speak a few words', desc: isHi ? '"ಊಟ", "ಗೊತ್ತಿಲ್ಲ", "ಬನ್ನಿ" जैसे कुछ शब्द जानते हैं।' : 'Know a few words like "Oota", "Gottilla", "Banni".' },
                  { id: 'intermediate', title: isHi ? 'मध्यम (बातचीत समझ सकते हैं)' : 'Intermediate', desc: isHi ? 'बुनियादी बातचीत समझ लेते हैं, धाराप्रवाह बोलना चाहते हैं।' : 'Can understand basic conversations, want fluency.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLevel(opt.id as UserLevel)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      level === opt.id
                        ? 'border-[#E11D48] bg-[#FFF1F2] ring-2 ring-[#E11D48]/30 shadow-sm'
                        : 'border-[#E8E2D6] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm text-[#0F172A]">{opt.title}</h4>
                      <p className="text-xs text-[#64748B]">{opt.desc}</p>
                    </div>
                    {level === opt.id && <CheckCircle2 className="w-5 h-5 text-[#E11D48]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Purpose */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                  {isHi ? 'सीखने का उद्देश्य' : 'Your Motivation'}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                  {isHi ? 'आप कन्नड़ क्यों सीखना चाहते हैं?' : 'Why do you want to learn Kannada?'}
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  {isHi ? 'हम आपके काम आने वाली रोजमर्रा की शब्दावली पर ध्यान देंगे।' : 'We will highlight relevant real-world vocabulary for you.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {[
                  { id: 'everyday', label: isHi ? 'दैनिक जीवन & शहर' : 'Everyday Life & City', desc: isHi ? 'ऑटो, दुकानें & पड़ोसी' : 'Autos, shops & neighbors' },
                  { id: 'work', label: isHi ? 'नौकरी & ऑफिस' : 'Work & Office', desc: isHi ? 'सहकर्मी & नेटवर्किंग' : 'Colleagues & networking' },
                  { id: 'college', label: isHi ? 'कॉलेज & पढ़ाई' : 'College & Studies', desc: isHi ? 'कैंपस & सहपाठी' : 'Campus & classmates' },
                  { id: 'travel', label: isHi ? 'कर्नाटक यात्रा' : 'Travel Karnataka', desc: isHi ? 'मैसूर, हम्पी, कूर्ग' : 'Mysuru, Hampi, Coorg' },
                  { id: 'family', label: isHi ? 'परिवार & मित्र' : 'Family & Friends', desc: isHi ? 'रिश्तेदार & दोस्त' : 'Partner & relatives' },
                  { id: 'culture', label: isHi ? 'संस्कृति & सिनेमा' : 'Culture & Cinema', desc: isHi ? 'साहित्य, गीत & फ़िल्में' : 'Literature, songs & movies' }
                ].map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPurpose(p.id as LearningPurpose)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      purpose === p.id
                        ? 'border-[#E11D48] bg-[#FFF1F2] ring-2 ring-[#E11D48]/30 shadow-sm'
                        : 'border-[#E8E2D6] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <h4 className="font-bold text-xs text-[#0F172A]">{p.label}</h4>
                    <p className="text-[10px] text-[#64748B]">{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Daily Goal */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                  {isHi ? 'दैनिक समय' : 'Daily Commitment'}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                  {isHi ? 'रोजाना कितना समय अभ्यास कर सकते हैं?' : 'How much time can you practise daily?'}
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  {isHi ? 'रोजाना 5-10 मिनट का ध्यानपूर्वक अभ्यास भी धाराप्रवाह बना देता है।' : 'Even 5-10 focused minutes every day builds conversational fluency.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { minutes: 5, label: isHi ? '5 मिनट' : '5 Minutes', desc: isHi ? 'त्वरित अभ्यास' : 'Casual bite-sized drill' },
                  { minutes: 10, label: isHi ? '10 मिनट' : '10 Minutes', desc: isHi ? 'सुझाया गया लक्ष्य' : 'Recommended routine' },
                  { minutes: 15, label: isHi ? '15 मिनट' : '15 Minutes', desc: isHi ? 'तेज सीखने का मार्ग' : 'Fast conversational track' },
                  { minutes: 20, label: isHi ? '20 मिनट' : '20 Minutes', desc: isHi ? 'गहन अभ्यास' : 'Deep immersion practice' }
                ].map(g => (
                  <button
                    key={g.minutes}
                    type="button"
                    onClick={() => setDailyMinutes(g.minutes as DailyGoalMinutes)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      dailyMinutes === g.minutes
                        ? 'border-[#E11D48] bg-[#FFF1F2] ring-2 ring-[#E11D48]/30 shadow-sm'
                        : 'border-[#E8E2D6] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-sm text-[#0F172A]">
                      <Clock className="w-4 h-4 text-[#D97706]" />
                      {g.label}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-1">{g.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between gap-3 pt-4 mt-2 border-t border-[#E8E2D6] shrink-0">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-xs font-bold text-[#475569] hover:bg-[#F1ECE4]"
            >
              {isHi ? 'पीछे' : 'Back'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSkip}
              className="px-3 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
            >
              {isHi ? 'सीधे ऐप पर जाएं' : 'Skip to app'}
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              className="px-6 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-sm transition-all"
            >
              {isHi ? 'अगला कदम' : 'Next Step'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#D97706] hover:opacity-95 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isHi ? 'कन्नड़ सीखना शुरू करें' : 'Start Learning Kannada'}</span>
            </button>
          )}
        </div>

        {onOpenAuth && (
          <div className="pt-2.5 mt-2 border-t border-[#E8E2D6] text-center text-xs text-[#64748B] shrink-0">
            <span>{isHi ? 'पहले से खाता है? ' : 'Already have an account? '}</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuth('login');
              }}
              className="font-bold text-[#E11D48] hover:underline"
            >
              {isHi ? 'पासवर्ड या OTP से लॉगिन करें' : 'Log In with Password or OTP'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
