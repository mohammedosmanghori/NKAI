import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Volume2, 
  RotateCcw, 
  Award, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DayLesson, SourceLanguage, LearnerProgress } from '../types';
import { SEVEN_DAY_LESSONS } from '../data/sevenDayLessons';
import { playKannadaSpeech } from '../utils/audio';
import { getStoredProgress, saveStoredProgress, logActivity } from '../utils/storage';

interface SevenDayCourseProps {
  sourceLanguage: SourceLanguage;
  initialDay?: number;
  onLessonCompleted?: (day: number) => void;
}

export const SevenDayCourse: React.FC<SevenDayCourseProps> = ({
  sourceLanguage,
  initialDay = 1,
  onLessonCompleted
}) => {
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz'>('lesson');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [progress, setProgress] = useState<LearnerProgress>(getStoredProgress());

  useEffect(() => {
    if (initialDay && initialDay >= 1 && initialDay <= 7) {
      setSelectedDay(initialDay);
    }
  }, [initialDay]);

  useEffect(() => {
    // Reset quiz state when switching day
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setScore(null);
    setActiveTab('lesson');
  }, [selectedDay]);

  const currentLesson: DayLesson = SEVEN_DAY_LESSONS.find(l => l.day === selectedDay) || SEVEN_DAY_LESSONS[0];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    currentLesson.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / currentLesson.quiz.length) * 100);
    setScore(calculatedScore);
    setIsQuizSubmitted(true);

    if (calculatedScore >= 50) {
      // Fire confetti celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      // Update stored progress
      const p = getStoredProgress();
      if (!p.completedLessons.includes(selectedDay)) {
        p.completedLessons.push(selectedDay);
      }
      p.lessonScores[selectedDay] = calculatedScore;
      saveStoredProgress(p);
      setProgress(p);

      logActivity(
        `Day ${selectedDay} Completed`,
        `Passed quiz with ${calculatedScore}% score`,
        'lesson'
      );

      if (onLessonCompleted) onLessonCompleted(selectedDay);
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setScore(null);
  };

  const isCompleted = progress.completedLessons.includes(selectedDay);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          <span>Structured Beginner Curriculum</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          Seven-Day Kannada Path
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto">
          From zero to confident basic conversations in one week. Master polite greetings, numbers, autos, dining, and daily social phrases.
        </p>
      </div>

      {/* 7 Days Progress Track Bar */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Your 7-Day Journey:
          </span>
          <span className="text-xs font-bold text-amber-800">
            {progress.completedLessons.length} of 7 Days Completed
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {SEVEN_DAY_LESSONS.map(lesson => {
            const isDayDone = progress.completedLessons.includes(lesson.day);
            const isSelected = selectedDay === lesson.day;

            return (
              <button
                key={lesson.day}
                onClick={() => setSelectedDay(lesson.day)}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-sm'
                    : isDayDone
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-white border-[#E2DBD0] text-[#64748B] hover:bg-[#FAF7F2]'
                }`}
              >
                <span className="text-[10px] font-bold uppercase">Day</span>
                <span className="text-base sm:text-lg font-extrabold">{lesson.day}</span>
                {isDayDone && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lesson Details Container */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        {/* Day Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-[#E8E2D6]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                Day {currentLesson.day}
              </span>
              <span className="font-kannada font-bold text-sm text-[#E11D48]">
                {currentLesson.titleKannada}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-1">
              {currentLesson.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              <strong>Objective:</strong> {currentLesson.objective}
            </p>
          </div>

          {/* Toggle between Lesson Content & Quiz */}
          <div className="flex items-center bg-[#EAE4D8] p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('lesson')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'lesson' ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#64748B]'
              }`}
            >
              📖 Lesson Guide
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'quiz' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#64748B]'
              }`}
            >
              ✍️ Quiz ({currentLesson.quiz.length} Qs)
            </button>
          </div>
        </div>

        {/* Tab 1: Lesson Content */}
        {activeTab === 'lesson' && (
          <div className="space-y-6">
            {currentLesson.lessonContent.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="font-bold text-base text-[#0F172A]">{section.heading}</h4>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {section.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {section.examples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-4 rounded-2xl bg-white border border-[#E8E2D6] space-y-1 shadow-xs hover:border-[#D97706]/60 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <h5 className="font-kannada text-2xl font-bold text-[#0F172A]">
                            {ex.kannada}
                          </h5>
                          <button
                            onClick={() => playKannadaSpeech(ex.kannada)}
                            className="p-1.5 rounded-lg text-[#E11D48] hover:bg-[#FFF1F2]"
                            title="Listen"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs font-mono font-bold text-[#D97706] mt-0.5">
                          {ex.transliteration}
                        </p>
                        <p className="text-xs font-semibold text-[#475569] mt-1">
                          {sourceLanguage === 'hi' ? ex.meaningHi : ex.meaningEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-[#E8E2D6] flex justify-end">
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#D97706] hover:opacity-95 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Take Day {currentLesson.day} Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Quiz */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            {currentLesson.quiz.map((q, qIdx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-white border border-[#E8E2D6] space-y-3">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Question {qIdx + 1}:
                </span>
                <p className="font-bold text-sm sm:text-base text-[#0F172A]">
                  {sourceLanguage === 'hi' && q.questionHi ? q.questionHi : q.question}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = quizAnswers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correctIndex;

                    let btnStyle = 'border-[#E2DBD0] bg-[#FAF7F2] hover:bg-white text-[#0F172A]';
                    if (isSelected && !isQuizSubmitted) {
                      btnStyle = 'border-[#E11D48] bg-[#FFF1F2] text-[#E11D48] font-bold ring-2 ring-[#E11D48]/30';
                    } else if (isQuizSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-bold';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={isQuizSubmitted}
                        className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on submit */}
                {isQuizSubmitted && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-0.5">
                    <span className="font-bold block">💡 Explanation:</span>
                    <span>{sourceLanguage === 'hi' && q.explanationHi ? q.explanationHi : q.explanation}</span>
                  </div>
                )}
              </div>
            ))}

            {/* Quiz Submit Bar */}
            <div className="pt-4 border-t border-[#E8E2D6] flex flex-wrap items-center justify-between gap-3">
              {score !== null ? (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800 font-extrabold text-sm">
                    Score: {score}%
                  </div>
                  <span className="text-xs font-semibold text-[#475569]">
                    {score >= 50 ? '🎉 Fantastic! You mastered this lesson.' : 'Keep practising and retry!'}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-[#64748B]">
                  Answer all questions above to test your recall.
                </span>
              )}

              <div className="flex items-center gap-2">
                {isQuizSubmitted ? (
                  <button
                    onClick={handleRetakeQuiz}
                    className="px-4 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold text-[#475569] flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length < currentLesson.quiz.length}
                    className="px-6 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-sm disabled:opacity-50 transition-all"
                  >
                    Submit Answers
                  </button>
                )}

                {isQuizSubmitted && selectedDay < 7 && (
                  <button
                    onClick={() => setSelectedDay(selectedDay + 1)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#D97706] text-white text-xs font-bold shadow-sm"
                  >
                    Next Day →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
