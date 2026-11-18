import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  PenTool, 
  RotateCcw, 
  Volume2, 
  Check, 
  Sparkles, 
  Eye, 
  BookOpen, 
  HelpCircle,
  Award,
  Grid,
  List,
  Search,
  CheckCircle2
} from 'lucide-react';
import { AlphabetCharacter, SourceLanguage } from '../types';
import { 
  KANNADA_VOWELS, 
  KANNADA_CONSONANTS, 
  KANNADA_ALL_LETTERS,
  KANNADA_NUMERALS, 
  KANNADA_COMBINATIONS 
} from '../data/alphabetData';
import { playKannadaSpeech } from '../utils/audio';
import { getStoredProgress, saveStoredProgress, logActivity } from '../utils/storage';

interface InteractiveWritingLabProps {
  sourceLanguage: SourceLanguage;
  onCharacterMastered?: (char: string) => void;
}

export const InteractiveWritingLab: React.FC<InteractiveWritingLabProps> = ({
  sourceLanguage,
  onCharacterMastered
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'vowels' | 'consonants' | 'numerals' | 'combinations'>('all');
  const [consonantVarga, setConsonantVarga] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'scroll' | 'grid'>('scroll');
  const [selectedChar, setSelectedChar] = useState<AlphabetCharacter>(KANNADA_VOWELS[0]);
  const [showGuideOverlay, setShowGuideOverlay] = useState(true);
  const [brushColor, setBrushColor] = useState('#E11D48');
  const [brushWidth, setBrushWidth] = useState(12);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [practisedList, setPractisedList] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  // Load progress
  useEffect(() => {
    const progress = getStoredProgress();
    setPractisedList(progress.practisedCharacters || []);
  }, []);

  // Update selected character when category changes
  useEffect(() => {
    if (activeCategory === 'all') setSelectedChar(KANNADA_ALL_LETTERS[0]);
    else if (activeCategory === 'vowels') setSelectedChar(KANNADA_VOWELS[0]);
    else if (activeCategory === 'consonants') setSelectedChar(KANNADA_CONSONANTS[0]);
    else if (activeCategory === 'numerals') setSelectedChar(KANNADA_NUMERALS[0]);
    else if (activeCategory === 'combinations') setSelectedChar(KANNADA_COMBINATIONS[0]);
  }, [activeCategory]);

  // Reset and redraw canvas on char change
  useEffect(() => {
    clearCanvas();
  }, [selectedChar]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setShowCelebration(false);
  };

  // High-DPI canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushWidth;
    setHasDrawn(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handlePlayAudio = () => {
    playKannadaSpeech(selectedChar.audioText);
  };

  const handleMarkAsPractised = () => {
    const char = selectedChar.kannada;
    if (!practisedList.includes(char)) {
      const updated = [...practisedList, char];
      setPractisedList(updated);
      const progress = getStoredProgress();
      progress.practisedCharacters = updated;
      saveStoredProgress(progress);
      logActivity('Character Practised', `Traced character "${char}" (${selectedChar.transliteration})`, 'writing');
      if (onCharacterMastered) onCharacterMastered(char);
    }
    setShowCelebration(true);
  };

  const baseList = useMemo(() => {
    if (activeCategory === 'all') return KANNADA_ALL_LETTERS;
    if (activeCategory === 'vowels') return KANNADA_VOWELS;
    if (activeCategory === 'consonants') {
      if (consonantVarga === 'all') return KANNADA_CONSONANTS;
      return KANNADA_CONSONANTS.filter(c => c.varga && c.varga.toLowerCase().includes(consonantVarga.toLowerCase()));
    }
    if (activeCategory === 'numerals') return KANNADA_NUMERALS;
    return KANNADA_COMBINATIONS;
  }, [activeCategory, consonantVarga]);

  const currentCategoryList = useMemo(() => {
    if (!searchQuery.trim()) return baseList;
    const q = searchQuery.toLowerCase().trim();
    return baseList.filter(
      item =>
        item.kannada.includes(q) ||
        item.transliteration.toLowerCase().includes(q) ||
        item.englishPhonetic.toLowerCase().includes(q) ||
        item.hindiEquivalent.toLowerCase().includes(q) ||
        item.exampleWord.kannada.includes(q)
    );
  }, [baseList, searchQuery]);

  const isCurrentMastered = practisedList.includes(selectedChar.kannada);

  const isHi = sourceLanguage === 'hi';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-bold">
          <PenTool className="w-3.5 h-3.5 text-indigo-600" />
          <span>{isHi ? 'सम्पूर्ण कन्नड़ वर्णमाला लेखन लैब (ಅ से ಳ)' : 'Full Kannada Varnamale Writing Lab (ಅ to ಳ)'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          {isHi ? 'कन्नड़ वर्णमाला & अक्षर लेखन प्रयोगशाला' : 'Interactive Kannada Alphabet & Writing Lab'}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto">
          {isHi
            ? 'कन्नड़ वर्णमाला के प्रत्येक अक्षर को—सभी 14 स्वर, 2 योगवाह (ಅಂ, ಅಃ), 34 व्यंजन (ಕ से ಳ), और अंक—अपनी उंगली, माउस या स्टाइलस से कैनवास पर लिखने का अभ्यास करें।'
            : 'Trace every single letter of the complete Kannada alphabet—all 14 vowels, 2 yogavāhakas (ಅಂ, ಅಃ), 34 consonants (ಕ to ಳ), and numerals—with your finger, mouse, or stylus.'}
        </p>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-[#F1ECE4]/80 p-1.5 rounded-2xl border border-[#E2DBD0] max-w-xl mx-auto text-xs font-bold">
        {[
          { id: 'all', label: isHi ? `पूरी वर्णमाला (${KANNADA_ALL_LETTERS.length})` : `Full Varnamale (${KANNADA_ALL_LETTERS.length})` },
          { id: 'vowels', label: isHi ? `स्वर & योगवाह (${KANNADA_VOWELS.length})` : `Vowels & Yogavāhaka (${KANNADA_VOWELS.length})` },
          { id: 'consonants', label: isHi ? `व्यंजन (${KANNADA_CONSONANTS.length})` : `Consonants (${KANNADA_CONSONANTS.length})` },
          { id: 'numerals', label: isHi ? 'अंक (೦-೧೦)' : 'Numbers (೦-೧೦)' },
          { id: 'combinations', label: isHi ? 'संयुक्त अक्षर (ಒತ್ತಕ್ಷರಗಳು)' : 'Combinations' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id as any);
              setConsonantVarga('all');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeCategory === cat.id
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sub-Filters for Consonants */}
      {activeCategory === 'consonants' && (
        <div className="flex flex-wrap items-center justify-center gap-1 bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E8E2D6] max-w-2xl mx-auto text-[11px] font-semibold">
          <span className="text-[#64748B] font-bold px-2">Varga:</span>
          {[
            { id: 'all', label: 'All 34' },
            { id: 'velar', label: 'ಕ-ವರ್ಗ' },
            { id: 'palatal', label: 'ಚ-ವರ್ಗ' },
            { id: 'retroflex', label: 'ಟ-ವರ್ಗ' },
            { id: 'dental', label: 'ತ-ವರ್ಗ' },
            { id: 'labial', label: 'ಪ-ವರ್ಗ' },
            { id: 'avargiya', label: 'ಯ-ಳ (ಅವರ್ಗೀಯ)' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setConsonantVarga(f.id)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                consonantVarga === f.id
                  ? 'bg-[#D97706] text-white font-bold'
                  : 'text-[#475569] hover:bg-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Character Selector Grid & Toolbar */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
              Select Character to Trace:
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {currentCategoryList.filter(c => practisedList.includes(c.kannada)).length} / {currentCategoryList.length} Practised
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Find letter (e.g., ka, am)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="text-xs bg-white border border-[#E2DBD0] rounded-xl pl-7 pr-3 py-1 text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#D97706] w-36 sm:w-44"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
            </div>

            {/* View Mode Toggle */}
            <button
              onClick={() => setViewMode(viewMode === 'scroll' ? 'grid' : 'scroll')}
              className="p-1.5 rounded-xl border border-[#E2DBD0] bg-white text-[#64748B] hover:text-[#0F172A] transition-colors"
              title={viewMode === 'scroll' ? 'Switch to Full Grid View' : 'Switch to Horizontal Scroll'}
            >
              {viewMode === 'scroll' ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Character List: Horizontal Scroll or Full Grid */}
        <div
          className={
            viewMode === 'scroll'
              ? 'flex gap-2 overflow-x-auto pb-2 scrollbar-thin'
              : 'grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-60 overflow-y-auto p-1 scrollbar-thin'
          }
        >
          {currentCategoryList.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500 w-full">
              No character found matching "{searchQuery}".
            </div>
          ) : (
            currentCategoryList.map(item => {
              const isSelected = selectedChar.id === item.id;
              const isDone = practisedList.includes(item.kannada);
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedChar(item)}
                  className={`relative flex flex-col items-center justify-center min-w-[64px] h-[72px] px-2 py-1 rounded-2xl border shrink-0 transition-all ${
                    isSelected
                      ? 'border-[#E11D48] bg-[#FFF1F2] ring-2 ring-[#E11D48]/30 shadow-xs'
                      : 'border-[#E2DBD0] bg-white hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span className="font-kannada font-bold text-2xl text-[#0F172A] leading-tight">
                    {item.kannada}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#D97706] mt-0.5 truncate max-w-[56px] text-center">
                    {item.transliteration}
                  </span>
                  {item.subType === 'yogavahaka' && (
                    <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1 rounded-sm mt-0.5">
                      ಯೋಗ
                    </span>
                  )}
                  {isDone && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main Canvas Tracing Stage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Canvas Area */}
        <div className="md:col-span-2 bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6] mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Tracing Canvas</span>
              <button
                onClick={() => setShowGuideOverlay(!showGuideOverlay)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1 transition-all ${
                  showGuideOverlay
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-white text-[#64748B] border-[#E2DBD0]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showGuideOverlay ? 'Guide: Visible' : 'Guide: Hidden'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearCanvas}
                className="px-3 py-1.5 rounded-xl border border-[#CBD5E1] bg-white hover:bg-[#FAF7F2] text-xs font-bold text-[#475569] flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear & Retry</span>
              </button>
            </div>
          </div>

          {/* Interactive Tracing Board with Background Guideline Overlay */}
          <div className="relative w-full aspect-square max-h-[380px] mx-auto bg-white rounded-3xl border-2 border-dashed border-[#CBD5E1] overflow-hidden select-none touch-none shadow-inner flex items-center justify-center p-4">
            {/* Guide Character Overlay - Font size smoothly scaled to prevent going out of box */}
            {showGuideOverlay && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 select-none p-4">
                <span
                  className={`font-kannada font-extrabold text-[#0F172A] leading-none select-none text-center ${
                    selectedChar.kannada.length > 2
                      ? 'text-[100px] sm:text-[130px]'
                      : selectedChar.kannada.length > 1
                        ? 'text-[130px] sm:text-[160px]'
                        : 'text-[180px] sm:text-[220px]'
                  }`}
                >
                  {selectedChar.kannada}
                </span>
              </div>
            )}

            {/* Tracing Crosshair alignment lines */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="w-full h-1/2 border-b border-slate-600 border-dashed" />
              <div className="h-full w-1/2 border-r border-slate-600 border-dashed" />
            </div>

            {/* HTML5 Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            />

            {!hasDrawn && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 bg-slate-900/60 backdrop-blur-md rounded-full text-[11px] text-white font-medium">
                Draw or trace with finger / stylus / mouse
              </div>
            )}
          </div>

          {/* Brush Controls & Mark Practised */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-4 border-t border-[#E8E2D6]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#64748B]">Ink Color:</span>
              {['#E11D48', '#D97706', '#2563EB', '#0F172A'].map(color => (
                <button
                  key={color}
                  onClick={() => setBrushColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    brushColor === color ? 'scale-125 ring-2 ring-offset-2 ring-[#0F172A]' : 'opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleMarkAsPractised}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 ${
                isCurrentMastered
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-gradient-to-r from-[#E11D48] to-[#D97706] hover:opacity-95 text-white'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isCurrentMastered ? 'Practised & Mastered ✓' : 'Mark as Practised'}</span>
            </button>
          </div>
        </div>

        {/* Right: Character Info & Associated Vocabulary Card */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                    Character Reference
                  </span>
                  {selectedChar.subType === 'yogavahaka' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full">
                      ಯೋಗವಾಹಕ (Yogavāhaka)
                    </span>
                  )}
                  {selectedChar.varga && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
                      {selectedChar.varga}
                    </span>
                  )}
                </div>
                <h3 className="font-kannada text-5xl font-extrabold text-[#0F172A] mt-1">
                  {selectedChar.kannada}
                </h3>
                <p className="text-sm font-mono font-bold text-[#D97706] mt-0.5">
                  {selectedChar.transliteration}
                  {selectedChar.kannada === 'ಅಂ' && ' • Anusvāra (ಅನುಸ್ವಾರ)'}
                  {selectedChar.kannada === 'ಅಃ' && ' • Visarga (ವಿಸರ್ಗ)'}
                </p>
              </div>

              <button
                onClick={handlePlayAudio}
                className="p-3 rounded-2xl bg-[#FFF1F2] text-[#E11D48] hover:bg-[#FFE4E6] transition-colors"
                title="Pronounce Character"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs border-t border-[#E8E2D6] pt-3">
              <div>
                <span className="text-[#64748B] font-semibold">Phonetic Sound: </span>
                <span className="text-[#0F172A] font-bold">{selectedChar.englishPhonetic}</span>
              </div>
              <div>
                <span className="text-[#64748B] font-semibold">Hindi Equivalent: </span>
                <span className="text-[#0F172A] font-bold font-serif">{selectedChar.hindiEquivalent}</span>
              </div>
              {selectedChar.strokeHint && (
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 mt-2">
                  <span className="font-bold block mb-0.5">Stroke Guide:</span>
                  <span>{selectedChar.strokeHint}</span>
                </div>
              )}
            </div>
          </div>

          {/* Associated Vocabulary Card */}
          <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#E11D48] uppercase tracking-wider">
                Example Vocabulary Word
              </span>
              <BookOpen className="w-4 h-4 text-[#64748B]" />
            </div>

            <div>
              <h4 className="font-kannada text-2xl font-bold text-[#0F172A]">
                {selectedChar.exampleWord.kannada}
              </h4>
              <p className="text-xs font-mono font-bold text-[#D97706]">
                {selectedChar.exampleWord.transliteration}
              </p>
              <p className="text-xs font-semibold text-[#0F172A] mt-1">
                {sourceLanguage === 'hi' ? selectedChar.exampleWord.meaningHi : selectedChar.exampleWord.meaningEn}
              </p>
            </div>

            <button
              onClick={() => playKannadaSpeech(selectedChar.exampleWord.kannada)}
              className="w-full py-2 px-3 rounded-xl bg-[#F1ECE4] hover:bg-[#EAE4D8] text-xs font-bold text-[#0F172A] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Volume2 className="w-4 h-4 text-[#D97706]" />
              <span>Listen to Word</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
