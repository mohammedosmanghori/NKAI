import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  Flame, 
  BookOpen, 
  ShieldAlert, 
  MessageSquare, 
  BrainCircuit, 
  Volume2, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { UserProfile, LearnerProgress } from '../types';
import { playKannadaSpeech } from '../utils/audio';
import { getT } from '../utils/i18n';

interface HomeDashboardProps {
  profile: UserProfile;
  progress: LearnerProgress;
  onNavigate: (tab: string, params?: any) => void;
  onQuickTranslate: (text: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  profile,
  progress,
  onNavigate,
  onQuickTranslate
}) => {
  const [quickInput, setQuickInput] = useState('');
  const [playingWord, setPlayingWord] = useState(false);
  const t = getT(profile.sourceLanguage);
  const isHi = profile.sourceLanguage === 'hi';

  // Daily Kannada Word of the Day (rotates based on day of month)
  const dayIndex = new Date().getDate() % 5;
  const wordsOfDay = [
    {
      kannada: 'ಸ್ನೇಹ',
      transliteration: 'Snēha',
      meaningEn: 'Friendship / Affection',
      meaningHi: 'मित्रता / स्नेह',
      sentence: 'ನಮ್ಮ ಸ್ನೇಹ ಚಿರಕಾಲ ಇರಲಿ. (May our friendship last forever.)'
    },
    {
      kannada: 'ಸಂತೋಷ',
      transliteration: 'Santōṣa',
      meaningEn: 'Happiness / Joy',
      meaningHi: 'खुशी / प्रसन्नता',
      sentence: 'ನಿಮಗೆ ಹಬ್ಬದ ಸಂತೋಷ! (Wishing you festival joy!)'
    },
    {
      kannada: 'ಕೃತಜ್ಞತೆ',
      transliteration: 'Krutajnate (Kru · tag · nya · te)',
      meaningEn: 'Gratitude / Deep Thankfulness',
      meaningHi: 'कृतज्ञता / आभार (ज्ञ की ध्वनि)',
      sentence: 'ನನ್ನ ಹೃತ್ಪೂರ್ವಕ ಕೃತಜ್ಞತೆಗಳು. (My heartfelt gratitude.)'
    },
    {
      kannada: 'ಶಾಂತಿ',
      transliteration: 'Shānti',
      meaningEn: 'Peace / Tranquility',
      meaningHi: 'शांति',
      sentence: 'ಮನಸ್ಸಿನಲ್ಲಿ ಶಾಂತಿ ಇರಲಿ. (Let there be peace in mind.)'
    },
    {
      kannada: 'ಬೆಳಕು',
      transliteration: 'Beḷaku',
      meaningEn: 'Light / Dawn',
      meaningHi: 'रोशनी / प्रकाश',
      sentence: 'ಮನೆಯಲ್ಲಿ ಜ್ಞಾನದ ಬೆಳಕು ಬೆಳಗಲಿ. (Let light of knowledge shine.)'
    }
  ];
  const currentWord = wordsOfDay[dayIndex];

  // Daily recommendation based on level & purpose
  const getDailyRecommendation = () => {
    if (progress.completedLessons.length === 0) {
      return {
        title: isHi ? 'दिन 1 शुरू करें: अभिवादन और कन्नड़ स्वर' : 'Start Day 1: Greetings & Kannada Vowels',
        desc: isHi ? 'दैनिक विनम्र अभिवादन और कन्नड़ के मूलभूत स्वर (ಸ್ವರಗಳು) सीखें।' : 'Learn polite daily greetings and foundational Kannada vowel sounds (ಸ್ವರಗಳು).',
        actionLabel: isHi ? 'दिन 1 पाठ शुरू करें' : 'Start Day 1 Lesson',
        tab: 'course',
        params: { day: 1 }
      };
    }
    const nextDay = Math.min(7, Math.max(...progress.completedLessons) + 1);
    return {
      title: isHi ? `दिन ${nextDay} जारी रखें: 7-दिवसीय कोर्स` : `Continue Day ${nextDay}: Seven-Day Path`,
      desc: isHi ? 'व्यावहारिक वाक्यों और इंटरैक्टिव क्विज़ अभ्यास के साथ अपनी समझ को गहरा करें।' : 'Build on your foundation with practical phrases and interactive quiz practice.',
      actionLabel: isHi ? `दिन ${nextDay} शुरू करें` : `Start Day ${nextDay}`,
      tab: 'course',
      params: { day: nextDay }
    };
  };

  const recommendation = getDailyRecommendation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    onQuickTranslate(quickInput.trim());
  };

  const handlePlayWord = () => {
    setPlayingWord(true);
    playKannadaSpeech(currentWord.kannada, {
      onEnd: () => setPlayingWord(false),
      onError: () => setPlayingWord(false)
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#E11D48]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-20 w-48 h-48 bg-[#F59E0B]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-amber-300 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'ನಮಸ್ಕಾರ (Namaskāra) • नम्मा कन्नड़ AI में आपका स्वागत है' : 'ನಮಸ್ಕಾರ (Namaskāra) • Welcome to Namma Kannada AI'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? 'स्वाभाविक रूप से कन्नड़ सीखें, रोज़ाना एक नए वाक्य के साथ।' : 'Learn Kannada naturally, one everyday phrase at a time.'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isHi
              ? 'हिंदी माध्यम से सरल और स्वाभाविक कन्नड़ सीखिए - अनुवाद, बोलचाल, अक्षर लेखन और वास्तविक परिस्थितियाँ।'
              : 'Master conversational Kannada tailored for English speakers - translation, auto conversations, writing lab, and survival phrases.'}
          </p>

          {/* Quick Search Translate Box */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="relative flex items-center">
              <input
                type="text"
                value={quickInput}
                onChange={e => setQuickInput(e.target.value)}
                placeholder={
                  isHi
                    ? 'हिंदी में टाइप करें: "बस स्टॉप कहाँ है?", "कितने का है?"...'
                    : 'Type in English: "Where is the bus stop?", "Water please"...'
                }
                className="w-full bg-white/95 text-[#0F172A] placeholder:text-slate-400 rounded-2xl py-3.5 pl-11 pr-24 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-md transition-all"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                {t.home.translateBtn}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Action Highlights Grid: Continue Learning & Daily Word */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Continue Learning Card */}
        <div className="md:col-span-2 bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 shadow-xs hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  {isHi ? 'दैनिक सीखने की सिफारिश' : 'Daily Learning Recommendation'}
                </span>
              </div>
              <span className="text-xs font-semibold text-[#64748B]">
                {progress.completedLessons.length} / 7 {isHi ? 'पूर्ण' : 'Completed'}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#0F172A]">{recommendation.title}</h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 leading-relaxed">
              {recommendation.desc}
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-[#E8E2D6] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{isHi ? `दैनिक लक्ष्य: ${profile.dailyGoalMinutes} मिनट / दिन` : `Goal: ${profile.dailyGoalMinutes} mins / day`}</span>
            </div>

            <button
              onClick={() => onNavigate(recommendation.tab, recommendation.params)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-xs transition-all"
            >
              <span>{recommendation.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Word of the Day Card */}
        <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E11D48]">
                {t.home.wordOfDayBadge}
              </span>
              <button
                onClick={handlePlayWord}
                disabled={playingWord}
                className="p-1.5 rounded-lg bg-[#FFF1F2] text-[#E11D48] hover:bg-[#FFE4E6] transition-colors"
                title={t.listen}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-2">
              <h4 className="font-kannada text-3xl font-extrabold text-[#0F172A]">
                {currentWord.kannada}
              </h4>
              <p className="text-xs font-mono font-bold text-[#92400E] mt-0.5">
                {currentWord.transliteration}
              </p>
              <p className="text-xs font-semibold text-[#0F172A] mt-1">
                {isHi ? currentWord.meaningHi : currentWord.meaningEn}
              </p>
              <p className="text-[11px] text-[#64748B] mt-2 italic border-l-2 border-[#E11D48]/40 pl-2">
                "{currentWord.sentence}"
              </p>
              {currentWord.kannada === 'ಕೃತಜ್ಞತೆ' && (
                <div className="mt-2 p-2 bg-amber-50 rounded-xl border border-amber-200 text-[10px] text-amber-900 leading-snug">
                  💡 <strong>{isHi ? 'लिपि सुझाव:' : 'Script Tip:'}</strong> {isHi ? 'अक्षर' : 'The letter'} <strong>ಜ್ಞ</strong> {isHi ? 'का उच्चारण "jna / gya" होता है, ठीक हिंदी के' : 'is pronounced "jna / gya", exactly like Hindi'} <strong>ज्ञ</strong> {isHi ? 'की तरह (कृतज्ञता)।' : 'in कृतज्ञता.'}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-[#E8E2D6] flex justify-end">
            <button
              onClick={() => onNavigate('write')}
              className="text-xs font-bold text-[#0F172A] hover:text-[#E11D48] inline-flex items-center gap-1"
            >
              <span>{isHi ? 'इसे लिखने का अभ्यास करें' : 'Practise writing this'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Launchpad: Survival Mode, Conversational Tutor, Tracing Lab */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1-Tap Survival Mode */}
        <div 
          onClick={() => onNavigate('survival')}
          className="bg-white/90 border border-[#E8E2D6] rounded-3xl p-5 cursor-pointer hover:border-rose-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md">
              {isHi ? '1-टैप तैयार' : '1-Tap Ready'}
            </span>
          </div>
          <h4 className="font-bold text-sm text-[#0F172A]">{t.nav.survival}</h4>
          <p className="text-xs text-[#64748B] mt-1">
            {isHi ? 'ऑटो, बस, होटल और आपातकालीन वाक्य तुरंत सुनने या दिखाने के लिए तैयार।' : 'Autos, buses, street food & emergency sentences ready to show or play.'}
          </p>
          <div className="mt-3 text-xs font-bold text-rose-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>{isHi ? 'वाक्य देखें' : 'Explore phrases'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Conversational Tutor Practice */}
        <div 
          onClick={() => onNavigate('speak')}
          className="bg-white/90 border border-[#E8E2D6] rounded-3xl p-5 cursor-pointer hover:border-amber-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
              {isHi ? 'AI शिक्षक' : 'AI Tutor'}
            </span>
          </div>
          <h4 className="font-bold text-sm text-[#0F172A]">{t.nav.speak}</h4>
          <p className="text-xs text-[#64748B] mt-1">
            {isHi ? 'होटल में खाना ऑर्डर करना, ड्राइवर से बात करना और कन्नड़ में परिचय देना।' : 'Roleplay ordering food, talking to drivers, and introductions in Kannada.'}
          </p>
          <div className="mt-3 text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>{isHi ? 'बातचीत शुरू करें' : 'Start conversation'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Tracing Lab */}
        <div 
          onClick={() => onNavigate('write')}
          className="bg-white/90 border border-[#E8E2D6] rounded-3xl p-5 cursor-pointer hover:border-indigo-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md">
              {isHi ? 'कैनवास अभ्यास' : 'Interactive Canvas'}
            </span>
          </div>
          <h4 className="font-bold text-sm text-[#0F172A]">{t.nav.write}</h4>
          <p className="text-xs text-[#64748B] mt-1">
            {isHi ? 'उंगली या माउस से कन्नड़ स्वर, व्यंजन और अंकों को लिखने का अभ्यास करें।' : 'Trace Kannada vowels, consonants & numerals with touch or mouse.'}
          </p>
          <div className="mt-3 text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>{isHi ? 'राइटिंग लैब खोलें' : 'Open writing lab'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Memory Revision Alert & Weekly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Smart Revision card */}
        <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 shadow-xs flex items-center justify-between">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0F172A]">{t.nav.revision}</h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                {progress.weakWordIds.length > 0
                  ? (isHi ? `आज आपके दोहराव के लिए ${progress.weakWordIds.length} कठिन शब्द निर्धारित हैं।` : `You have ${progress.weakWordIds.length} weak words scheduled for review today.`)
                  : (isHi ? 'फ्लैशकार्ड्स और ऑडियो पहचान अभ्यासों के साथ अपनी याददाश्त परखें।' : 'Test your recall with flashcards and audio recognition exercises.')}
              </p>
              <button
                onClick={() => onNavigate('revision')}
                className="mt-3 text-xs font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1"
              >
                <span>{isHi ? 'दोहराव शुरू करें' : 'Launch review drill'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Real Learning Progress summary */}
        <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 shadow-xs flex items-center justify-between">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0F172A]">{isHi ? 'आपकी सीखने की स्थिति' : 'Your Learning Stats'}</h4>
              <div className="flex items-center gap-4 mt-2 text-xs font-semibold text-[#475569]">
                <span>🔥 {t.streakDays(progress.streakDays)}</span>
                <span>✍️ {progress.practisedCharacters.length} {isHi ? 'अक्षर सीखे' : 'Letters Traced'}</span>
                <span>🧠 {progress.reviewsCompleted} {isHi ? 'रिवीजन' : 'Reviews'}</span>
              </div>
              <button
                onClick={() => onNavigate('progress')}
                className="mt-3 text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
              >
                <span>{isHi ? 'पूरी प्रगति रिपोर्ट देखें' : 'View full progress report'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
