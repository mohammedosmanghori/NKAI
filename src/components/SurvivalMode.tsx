import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Volume2, 
  Bookmark, 
  Copy, 
  Check, 
  Maximize2, 
  AlertTriangle,
  Sparkles,
  Filter
} from 'lucide-react';
import { SurvivalPhrase, SourceLanguage } from '../types';
import { SURVIVAL_CATEGORIES, SURVIVAL_PHRASES } from '../data/survivalPhrases';
import { playKannadaSpeech } from '../utils/audio';
import { addSavedPhrase } from '../utils/storage';
import { ShowToSomeoneModal } from './ShowToSomeoneModal';
import { getT } from '../utils/i18n';

interface SurvivalModeProps {
  sourceLanguage: SourceLanguage;
  onPhraseSaved?: () => void;
}

export const SurvivalMode: React.FC<SurvivalModeProps> = ({
  sourceLanguage,
  onPhraseSaved
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [showToSomeonePhrase, setShowToSomeonePhrase] = useState<SurvivalPhrase | null>(null);

  const t = getT(sourceLanguage);
  const isHi = sourceLanguage === 'hi';

  const getCategoryLabel = (cat: string) => {
    if (!isHi) return cat;
    switch (cat) {
      case 'Transport': return 'परिवहन / ऑटो & बस';
      case 'Restaurants': return 'होटल & खान-पान';
      case 'Shopping': return 'खरीदारी';
      case 'Directions': return 'दिशाएं & रास्ता';
      case 'College': return 'कॉलेज & छात्र';
      case 'Workplace': return 'कार्यालय';
      case 'Healthcare': return 'स्वास्थ्य & अस्पताल';
      case 'Accommodation': return 'आवास / कमरा';
      case 'Government Offices': return 'सरकारी दफ्तर';
      case 'Emergencies': return 'आपातकालीन';
      default: return cat;
    }
  };

  const filteredPhrases = SURVIVAL_PHRASES.filter(phrase => {
    const matchesCategory = selectedCategory === 'All' || phrase.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      phrase.kannada.toLowerCase().includes(query) ||
      phrase.transliteration.toLowerCase().includes(query) ||
      phrase.english.toLowerCase().includes(query) ||
      phrase.hindi.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleCopy = (phrase: SurvivalPhrase) => {
    const textToCopy = `${phrase.kannada} (${phrase.transliteration}) - ${isHi ? phrase.hindi : phrase.english}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (phrase: SurvivalPhrase) => {
    addSavedPhrase({
      kannada: phrase.kannada,
      transliteration: phrase.transliteration,
      english: phrase.english,
      hindi: phrase.hindi,
      category: phrase.category,
      folder: 'Survival'
    });
    setSavedIds(prev => ({ ...prev, [phrase.id]: true }));
    if (onPhraseSaved) onPhraseSaved();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>{isHi ? 'वास्तविक परिस्थितियां • त्वरित उपयोग' : 'Real Situations • Immediate Access'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          {t.survival.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto">
          {t.survival.subtitle}
        </p>
      </div>

      {/* Emergency Disclaimer Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          {isHi ? (
            <><strong>आपातकालीन सूचना:</strong> कर्नाटक में तत्काल आपातकालीन सहायता के लिए डायल करें: <strong>112</strong> (पुलिस / सभी आपात सेवाएं), <strong>108</strong> (एम्बुलेंस), या <strong>101</strong> (फायर ब्रिगेड)। यह ऐप बातचीत में सहायता के लिए है।</>
          ) : (
            <><strong>Emergency notice:</strong> For immediate emergency assistance in Karnataka, dial <strong>112</strong> (Police/All-in-One), <strong>108</strong> (Ambulance), or <strong>101</strong> (Fire). This tool assists with communication and does not replace emergency services.</>
          )}
        </span>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={
              isHi
                ? 'खोजें: "बस", "मीटर", "दवा", "खाना", "कितना"...'
                : 'Search phrases: "bus", "meter", "dosa", "police", "bill"...'
            }
            className="w-full bg-white border border-[#E2DBD0] rounded-2xl py-3 pl-10 pr-4 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-700"
            >
              {t.clear}
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-white border border-[#E2DBD0] text-[#64748B] hover:bg-[#FAF7F2]'
            }`}
          >
            {isHi ? `सभी श्रेणियां (${SURVIVAL_PHRASES.length})` : `All Categories (${SURVIVAL_PHRASES.length})`}
          </button>
          {SURVIVAL_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#E11D48] text-white shadow-xs'
                    : 'bg-white border border-[#E2DBD0] text-[#64748B] hover:bg-[#FAF7F2]'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.map(phrase => {
          const isCopied = copiedId === phrase.id;
          const isSaved = savedIds[phrase.id];

          return (
            <div
              key={phrase.id}
              className={`bg-[#FFFDF9] border rounded-3xl p-5 shadow-xs transition-all flex flex-col justify-between ${
                phrase.isEmergency
                  ? 'border-red-300 bg-red-50/20 hover:border-red-400'
                  : 'border-[#E8E2D6] hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    phrase.isEmergency ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {phrase.category}
                  </span>

                  {/* Top quick actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setShowToSomeonePhrase(phrase)}
                      className="px-2 py-1 rounded-lg bg-amber-100 text-amber-800 text-[10px] font-bold hover:bg-amber-200 transition-colors flex items-center gap-1"
                      title={isHi ? 'बड़ी स्क्रीन पर किसी को दिखाएं' : 'Show large on screen to another person'}
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>{isHi ? 'दिखाएं' : 'Show to Someone'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-kannada text-2xl font-bold text-[#0F172A] leading-normal">
                    {phrase.kannada}
                  </h3>
                  <p className="text-xs font-mono font-bold text-[#D97706] mt-0.5">
                    {phrase.transliteration}
                  </p>
                  <p className="text-xs font-semibold text-[#0F172A] mt-1.5">
                    {sourceLanguage === 'hi' ? phrase.hindi : phrase.english}
                  </p>
                  {phrase.contextTip && (
                    <p className="text-[11px] text-[#64748B] mt-1 italic">
                      💡 {phrase.contextTip}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom bar controls */}
              <div className="flex items-center justify-between gap-2 pt-4 mt-3 border-t border-[#E8E2D6]/70">
                <button
                  onClick={() => playKannadaSpeech(phrase.kannada)}
                  className="p-2 rounded-xl bg-[#FFF1F2] text-[#E11D48] hover:bg-[#FFE4E6] transition-colors"
                  title={t.listen}
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(phrase)}
                    className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#FAF7F2] transition-colors"
                    title={isHi ? 'कॉपी करें' : 'Copy phrase'}
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleSave(phrase)}
                    className={`p-2 rounded-xl transition-colors ${
                      isSaved
                        ? 'text-amber-600 bg-amber-50 font-bold'
                        : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#FAF7F2]'
                    }`}
                    title={isSaved ? (isHi ? 'सहेजा गया' : 'Saved in Phrasebook') : (isHi ? 'वाक्यांश संग्रह में सहेजें' : 'Save to Phrasebook')}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredPhrases.length === 0 && (
          <div className="col-span-2 p-8 text-center bg-[#FFFDF9] rounded-3xl border border-[#E8E2D6] space-y-2">
            <p className="text-sm font-bold text-[#0F172A]">{isHi ? 'कोई वाक्य नहीं मिला' : 'No matching phrases found'}</p>
            <p className="text-xs text-[#64748B]">{isHi ? 'कृपया "बस", "मीटर", "पानी", या "दवा" जैसे शब्द खोजें।' : 'Try searching for keywords like "bus", "meter", "water", or "dosa".'}</p>
          </div>
        )}
      </div>

      {/* Show to Someone Big Modal */}
      {showToSomeonePhrase && (
        <ShowToSomeoneModal
          kannada={showToSomeonePhrase.kannada}
          transliteration={showToSomeonePhrase.transliteration}
          english={showToSomeonePhrase.english}
          hindi={showToSomeonePhrase.hindi}
          contextTip={showToSomeonePhrase.contextTip}
          sourceLanguage={sourceLanguage}
          onClose={() => setShowToSomeonePhrase(null)}
        />
      )}
    </div>
  );
};
