import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Flame, 
  PenTool, 
  BookOpen, 
  Bookmark, 
  BrainCircuit, 
  Award, 
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';
import { LearnerProgress, SourceLanguage } from '../types';
import { getStoredProgress, getStoredPhrases } from '../utils/storage';
import { getT } from '../utils/i18n';

interface ProgressSectionProps {
  sourceLanguage?: SourceLanguage;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({ sourceLanguage = 'en' }) => {
  const [progress, setProgress] = useState<LearnerProgress>(getStoredProgress());
  const [savedPhrasesCount, setSavedPhrasesCount] = useState(getStoredPhrases().length);
  const t = getT(sourceLanguage);

  useEffect(() => {
    setProgress(getStoredProgress());
    setSavedPhrasesCount(getStoredPhrases().length);
  }, []);

  const totalAlphabetCount = 15 + 15 + 10 + 4; // Vowels + Core Consonants + Numbers + Combos
  const alphabetPercent = Math.min(100, Math.round((progress.practisedCharacters.length / totalAlphabetCount) * 100));
  const lessonsPercent = Math.round((progress.completedLessons.length / 7) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-bold">
          <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
          <span>{sourceLanguage === 'hi' ? 'प्रमाणित प्रगति विवरण' : 'Verified Learner Metrics'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          {t.progress.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto">
          {t.progress.subtitle}
        </p>
      </div>

      {/* Top 4 Metric Rings */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748B] uppercase">{t.progress.streakTitle}</span>
            <div className="p-2 rounded-xl bg-red-50 text-red-600">
              <Flame className="w-4 h-4 fill-red-600" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">{progress.streakDays}</div>
            <p className="text-[11px] text-[#64748B] font-medium">{t.progress.streakSub}</p>
          </div>
        </div>

        {/* 7-Day Curriculum */}
        <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748B] uppercase">{t.progress.courseTitle}</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">{progress.completedLessons.length} / 7</div>
            <p className="text-[11px] text-[#64748B] font-medium">{lessonsPercent}% {sourceLanguage === 'hi' ? 'पूर्ण' : 'Complete'}</p>
          </div>
        </div>

        {/* Characters Practised */}
        <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748B] uppercase">{t.progress.alphabetTitle}</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <PenTool className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">{progress.practisedCharacters.length}</div>
            <p className="text-[11px] text-[#64748B] font-medium">{t.progress.alphabetSub}</p>
          </div>
        </div>

        {/* Saved Phrases */}
        <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748B] uppercase">{t.progress.savedTitle}</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">{savedPhrasesCount}</div>
            <p className="text-[11px] text-[#64748B] font-medium">{t.progress.savedSub}</p>
          </div>
        </div>
      </div>

      {/* Quiz Performance by Day */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-[#0F172A]">{sourceLanguage === 'hi' ? '7-दिवसीय क्विज़ प्रदर्शन' : 'Seven-Day Quiz Performance'}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map(day => {
            const isDone = progress.completedLessons.includes(day);
            const score = progress.lessonScores[day];

            return (
              <div
                key={day}
                className={`p-3 rounded-2xl border text-center space-y-1 ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                    : 'bg-white border-[#E2DBD0] text-[#64748B]'
                }`}
              >
                <span className="text-[10px] font-bold uppercase block">{sourceLanguage === 'hi' ? `दिन ${day}` : `Day ${day}`}</span>
                <span className="text-lg font-extrabold block">
                  {score !== undefined ? `${score}%` : isDone ? (sourceLanguage === 'hi' ? 'पूर्ण' : 'Done') : '—'}
                </span>
                <span className="text-[10px] font-medium block">
                  {isDone ? (sourceLanguage === 'hi' ? 'उत्तीर्ण' : 'Passed') : (sourceLanguage === 'hi' ? 'शेष' : 'Pending')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Recent Learner Activity Log */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[#0F172A]">{sourceLanguage === 'hi' ? 'हाल की सीखने की गतिविधियां' : 'Recent Activity Log'}</h3>
          <span className="text-xs text-[#64748B]">{sourceLanguage === 'hi' ? 'स्थानीय रूप से सहेजा गया' : 'Saved locally'}</span>
        </div>

        <div className="space-y-2.5">
          {progress.recentActivities.map(act => (
            <div
              key={act.id}
              className="p-3.5 rounded-2xl bg-white border border-[#E8E2D6] flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-bold text-[#0F172A] block">{act.title}</span>
                <span className="text-[#64748B] text-[11px]">{act.description}</span>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0">
                {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
