import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Search, 
  Volume2, 
  Trash2, 
  Copy, 
  Check, 
  FolderPlus, 
  Sparkles, 
  Folder,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SavedPhrase, SourceLanguage } from '../types';
import { getStoredPhrases, saveStoredPhrases, removeSavedPhrase } from '../utils/storage';
import { playKannadaSpeech } from '../utils/audio';

interface PhrasebookSectionProps {
  sourceLanguage: SourceLanguage;
  onLaunchFlashcards?: () => void;
}

export const PhrasebookSection: React.FC<PhrasebookSectionProps> = ({
  sourceLanguage,
  onLaunchFlashcards
}) => {
  const [phrases, setPhrases] = useState<SavedPhrase[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setPhrases(getStoredPhrases());
  }, []);

  const folders = ['All', ...Array.from(new Set(phrases.map(p => p.folder || 'Essentials')))];

  const filteredPhrases = phrases.filter(p => {
    const matchesFolder = selectedFolder === 'All' || (p.folder || 'Essentials') === selectedFolder;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesFolder;

    const matchesSearch =
      p.kannada.toLowerCase().includes(q) ||
      p.transliteration.toLowerCase().includes(q) ||
      p.english.toLowerCase().includes(q) ||
      p.hindi.toLowerCase().includes(q);

    return matchesFolder && matchesSearch;
  });

  const handleDelete = (id: string) => {
    removeSavedPhrase(id);
    setPhrases(getStoredPhrases());
  };

  const handleCopy = (phrase: SavedPhrase) => {
    navigator.clipboard.writeText(`${phrase.kannada} (${phrase.transliteration}) - ${phrase.english}`);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-800 border border-orange-200 rounded-full text-xs font-bold">
          <Bookmark className="w-3.5 h-3.5 text-orange-600" />
          <span>Personal Pocket Kannada Library</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          My Kannada Phrasebook
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto">
          Your saved phrases from translator, survival mode, and custom lessons. Organised neatly into folders for quick revision.
        </p>
      </div>

      {/* Search and Folders Bar */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search your saved phrases..."
              className="w-full bg-white border border-[#E2DBD0] rounded-2xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {onLaunchFlashcards && (
            <button
              onClick={onLaunchFlashcards}
              className="px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Review as Flashcards</span>
            </button>
          )}
        </div>

        {/* Folder Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {folders.map(f => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedFolder === f
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white border border-[#E2DBD0] text-[#64748B] hover:bg-[#FAF7F2]'
              }`}
            >
              {f === 'All' ? `All Saved (${phrases.length})` : f}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.map(phrase => {
          const isCopied = copiedId === phrase.id;
          return (
            <div
              key={phrase.id}
              className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
                    {phrase.folder || 'Essentials'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(phrase.savedAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-kannada text-2xl font-bold text-[#0F172A]">
                  {phrase.kannada}
                </h3>
                <p className="text-xs font-mono font-bold text-[#D97706] mt-0.5">
                  {phrase.transliteration}
                </p>
                <p className="text-xs font-semibold text-[#0F172A] mt-1.5">
                  {sourceLanguage === 'hi' ? phrase.hindi : phrase.english}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E2D6]/70 flex items-center justify-between">
                <button
                  onClick={() => playKannadaSpeech(phrase.kannada)}
                  className="p-2 rounded-xl bg-[#FFF1F2] text-[#E11D48] hover:bg-[#FFE4E6] transition-colors"
                  title="Hear Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(phrase)}
                    className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#FAF7F2]"
                    title="Copy"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(phrase.id)}
                    className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                    title="Remove from phrasebook"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredPhrases.length === 0 && (
          <div className="col-span-2 p-8 text-center bg-white rounded-3xl border border-[#E8E2D6] space-y-2">
            <p className="font-bold text-sm text-[#0F172A]">No saved phrases yet in this folder</p>
            <p className="text-xs text-[#64748B]">
              Tap the bookmark icon on any translation or survival card to save it here for offline access!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
