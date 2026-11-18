import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Plus, 
  Layers, 
  ArrowRight,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { Flashcard, SourceLanguage } from '../types';
import { 
  getStoredFlashcards, 
  saveStoredFlashcards, 
  updateFlashcardReview, 
  getStoredProgress,
  logActivity
} from '../utils/storage';
import { playKannadaSpeech } from '../utils/audio';

interface MemoryCoachProps {
  sourceLanguage: SourceLanguage;
}

export const MemoryCoach: React.FC<MemoryCoachProps> = ({ sourceLanguage }) => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<'standard' | 'listen' | 'weak_only'>('standard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKannada, setNewKannada] = useState('');
  const [newTranslit, setNewTranslit] = useState('');
  const [newEnglish, setNewEnglish] = useState('');
  const [newHindi, setNewHindi] = useState('');

  useEffect(() => {
    loadCards();
  }, [mode]);

  const loadCards = () => {
    const all = getStoredFlashcards();
    if (mode === 'weak_only') {
      const weak = all.filter(c => c.isWeak || c.repetitions === 0);
      setCards(weak.length > 0 ? weak : all);
    } else {
      setCards(all);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const currentCard = cards[currentIndex] || cards[0];

  const handleRate = (rating: 'forgot' | 'difficult' | 'remembered' | 'easy') => {
    if (!currentCard) return;
    updateFlashcardReview(currentCard.id, rating);
    logActivity('Vocabulary Reviewed', `Reviewed "${currentCard.kannada}" (${rating})`, 'flashcard');

    // Next card
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      // Loop or finish
      loadCards();
    }
  };

  const handleAddNewCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKannada.trim() || !newEnglish.trim()) return;

    const newCard: Flashcard = {
      id: `fc-custom-${Date.now()}`,
      kannada: newKannada.trim(),
      transliteration: newTranslit.trim() || newKannada.trim(),
      meaningEn: newEnglish.trim(),
      meaningHi: newHindi.trim() || newEnglish.trim(),
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString()
    };

    const updated = [newCard, ...getStoredFlashcards()];
    saveStoredFlashcards(updated);
    setCards(updated);
    setShowAddModal(false);
    setNewKannada('');
    setNewTranslit('');
    setNewEnglish('');
    setNewHindi('');
  };

  const weakCount = cards.filter(c => c.isWeak).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-bold">
          <BrainCircuit className="w-3.5 h-3.5 text-purple-600" />
          <span>Spaced Repetition & Recall Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          Memory Coach & Smart Revision
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto">
          Retain Kannada vocabulary permanently. Rate your recall from "Forgot" to "Easy" to optimize future review intervals.
        </p>
      </div>

      {/* Control Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFFDF9] border border-[#E8E2D6] p-3 rounded-2xl shadow-xs">
        <div className="flex items-center gap-1.5 bg-[#F1ECE4] p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setMode('standard')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === 'standard' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#64748B]'
            }`}
          >
            All Cards ({cards.length})
          </button>
          <button
            onClick={() => setMode('listen')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === 'listen' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#64748B]'
            }`}
          >
            🎧 Ear Training Mode
          </button>
          <button
            onClick={() => setMode('weak_only')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === 'weak_only' ? 'bg-rose-600 text-white shadow-xs' : 'text-[#64748B]'
            }`}
          >
            ⚡ Weak Words ({weakCount})
          </button>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-1.5 rounded-xl bg-white border border-[#CBD5E1] text-xs font-bold text-[#0F172A] hover:bg-[#FAF7F2] flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#E11D48]" />
          <span>Add Custom Word</span>
        </button>
      </div>

      {/* Main Flashcard Stage */}
      {currentCard ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B] px-2">
            <span>Card {currentIndex + 1} of {cards.length}</span>
            {currentCard.isWeak && (
              <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                Marked for Review
              </span>
            )}
          </div>

          {/* Flip Flashcard */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[300px] bg-white border border-[#E8E2D6] rounded-3xl p-8 sm:p-12 shadow-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-slate-300 transition-all select-none relative group"
          >
            <div className="absolute top-4 right-4 text-xs font-semibold text-slate-400 group-hover:text-slate-600 flex items-center gap-1">
              <span>{isFlipped ? 'Tap to hide' : 'Tap to reveal meaning'}</span>
            </div>

            {/* Front of card */}
            {!isFlipped ? (
              <div className="space-y-4">
                {mode === 'listen' ? (
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        playKannadaSpeech(currentCard.kannada);
                      }}
                      className="p-5 rounded-3xl bg-[#FFF1F2] text-[#E11D48] hover:bg-[#FFE4E6] shadow-sm inline-block animate-pulse"
                    >
                      <Volume2 className="w-8 h-8" />
                    </button>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                      Listen and identify the Kannada word
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-kannada text-5xl sm:text-6xl font-extrabold text-[#0F172A]">
                      {currentCard.kannada}
                    </h3>
                    <p className="text-base font-mono font-bold text-[#D97706]">
                      {currentCard.transliteration}
                    </p>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        playKannadaSpeech(currentCard.kannada);
                      }}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] inline-flex items-center gap-1.5 text-xs font-bold"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Hear Pronunciation</span>
                    </button>
                  </>
                )}
              </div>
            ) : (
              /* Back of card */
              <div className="space-y-4 animate-in fade-in">
                <h3 className="font-kannada text-4xl sm:text-5xl font-extrabold text-[#0F172A]">
                  {currentCard.kannada}
                </h3>
                <p className="text-sm font-mono font-bold text-[#D97706]">
                  {currentCard.transliteration}
                </p>
                <div className="text-xl sm:text-2xl font-bold text-[#0F172A] pt-2">
                  {sourceLanguage === 'hi' ? currentCard.meaningHi : currentCard.meaningEn}
                </div>
                {currentCard.example && (
                  <p className="text-xs text-[#64748B] italic max-w-sm pt-2">
                    Example: "{currentCard.example}"
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Self-Assessment 4 Buttons */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block text-center">
              How well did you remember this?
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleRate('forgot')}
                className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-800 font-bold text-xs flex flex-col items-center gap-1 transition-all"
              >
                <span>❌ Forgot</span>
                <span className="text-[10px] font-normal text-rose-600">Review today</span>
              </button>

              <button
                onClick={() => handleRate('difficult')}
                className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 font-bold text-xs flex flex-col items-center gap-1 transition-all"
              >
                <span>⚠️ Difficult</span>
                <span className="text-[10px] font-normal text-amber-700">Review tomorrow</span>
              </button>

              <button
                onClick={() => handleRate('remembered')}
                className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-900 font-bold text-xs flex flex-col items-center gap-1 transition-all"
              >
                <span>👍 Remembered</span>
                <span className="text-[10px] font-normal text-blue-700">In 3 days</span>
              </button>

              <button
                onClick={() => handleRate('easy')}
                className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex flex-col items-center gap-1 transition-all"
              >
                <span>⭐ Easy</span>
                <span className="text-[10px] font-normal text-emerald-700">In 5+ days</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-3xl border border-[#E8E2D6] space-y-2">
          <p className="font-bold text-sm text-[#0F172A]">No words in this review category</p>
          <button
            onClick={() => setMode('standard')}
            className="px-4 py-2 bg-[#0F172A] text-white text-xs font-bold rounded-xl"
          >
            Switch to All Flashcards
          </button>
        </div>
      )}

      {/* Add Custom Word Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6]">
              <h3 className="font-bold text-base text-[#0F172A]">Add Word to Memory Deck</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-[#EAE4D8] text-[#64748B]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewCard} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#64748B] mb-1">Kannada Word (ಕನ್ನಡ):</label>
                <input
                  type="text"
                  required
                  value={newKannada}
                  onChange={e => setNewKannada(e.target.value)}
                  placeholder="e.g. ದೋಸೆ, ನಮಸ್ಕಾರ"
                  className="w-full bg-white border border-[#E2DBD0] rounded-xl px-3 py-2 text-sm text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#64748B] mb-1">Roman Transliteration:</label>
                <input
                  type="text"
                  value={newTranslit}
                  onChange={e => setNewTranslit(e.target.value)}
                  placeholder="e.g. Dose, Namaskara"
                  className="w-full bg-white border border-[#E2DBD0] rounded-xl px-3 py-2 text-sm text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#64748B] mb-1">English Meaning:</label>
                <input
                  type="text"
                  required
                  value={newEnglish}
                  onChange={e => setNewEnglish(e.target.value)}
                  placeholder="e.g. Savory crepe, Greetings"
                  className="w-full bg-white border border-[#E2DBD0] rounded-xl px-3 py-2 text-sm text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#64748B] mb-1">Hindi Meaning (Optional):</label>
                <input
                  type="text"
                  value={newHindi}
                  onChange={e => setNewHindi(e.target.value)}
                  placeholder="e.g. डोसा, नमस्ते"
                  className="w-full bg-white border border-[#E2DBD0] rounded-xl px-3 py-2 text-sm text-[#0F172A]"
                />
              </div>

              <div className="pt-4 border-t border-[#E8E2D6] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#64748B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold"
                >
                  Save to Deck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
