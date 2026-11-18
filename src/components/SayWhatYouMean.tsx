import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  Bookmark, 
  Copy, 
  Check, 
  BookOpen, 
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Send
} from 'lucide-react';
import { SourceLanguage } from '../types';
import { playKannadaSpeech } from '../utils/audio';
import { addSavedPhrase } from '../utils/storage';

interface SayWhatYouMeanProps {
  sourceLanguage: SourceLanguage;
  onPhraseSaved?: () => void;
}

export const SayWhatYouMean: React.FC<SayWhatYouMeanProps> = ({
  sourceLanguage,
  onPhraseSaved
}) => {
  const [intention, setIntention] = useState('');
  const [context, setContext] = useState('auto_rickshaw');
  const [tone, setTone] = useState<'polite' | 'casual' | 'firm' | 'friendly' | 'street_smart'>('polite');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const contextOptions = [
    { id: 'auto_rickshaw', label: '🛺 Auto Rickshaw / Taxi' },
    { id: 'restaurant', label: '☕ Restaurant / Cafe' },
    { id: 'shopping', label: '🛍️ Street Shopping' },
    { id: 'office', label: '💼 Office / Coworkers' },
    { id: 'neighborhood', label: '🏘️ Neighbors & Landlord' },
    { id: 'bus_metro', label: '🚌 BMTC Bus / Metro' }
  ];

  const toneOptions = [
    { id: 'polite', label: 'Polite & Respectful' },
    { id: 'friendly', label: 'Warm & Friendly' },
    { id: 'street_smart', label: 'Bengaluru Street-Smart' },
    { id: 'firm', label: 'Direct & Firm' },
    { id: 'casual', label: 'Casual / Peer' }
  ];

  const exampleIntentions = sourceLanguage === 'hi' ? [
    'ऑटो वाले से कहें कि अगले स्टॉप पर रोक दीजिए।',
    'होटल में कहें कि कॉफ़ी में चीनी थोड़ी कम रखिए।',
    'दुकानदार से थोड़ा डिस्काउंट माँगिए।'
  ] : [
    'Ask the auto driver to stop at the next bus stop politely.',
    'Ask the restaurant server to make the food less spicy.',
    'Tell the shopkeeper that the price is too high and request a discount.'
  ];

  const handleGenerate = async (intentToUse?: string) => {
    const text = (intentToUse || intention).trim();
    if (!text) return;

    setIsLoading(true);
    setResult(null);
    setIsSaved(false);

    try {
      const response = await fetch('/api/say-what-you-mean', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intention: text,
          context: contextOptions.find(c => c.id === context)?.label,
          tone,
          language: sourceLanguage
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Say-what-you-mean error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${result.kannada_text} (${result.transliteration}) - ${result.meaning}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    addSavedPhrase({
      kannada: result.kannada_text,
      transliteration: result.transliteration,
      english: sourceLanguage === 'en' ? intention : result.meaning,
      hindi: sourceLanguage === 'hi' ? intention : result.meaning,
      category: 'Say What You Mean',
      folder: 'Essentials'
    });
    setIsSaved(true);
    if (onPhraseSaved) onPhraseSaved();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-[#E11D48] border border-rose-200 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
          <span>Intent-Based Kannada Formulator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          "Say What You Mean"
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto">
          Describe what you want to achieve in plain English or Hindi. We will give you the most culturally nuanced, contextually fitting Kannada phrasing.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 shadow-md space-y-5">
        <div>
          <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
            1. Describe what you want to say or achieve:
          </label>
          <textarea
            rows={3}
            value={intention}
            onChange={e => setIntention(e.target.value)}
            placeholder={
              sourceLanguage === 'hi'
                ? 'उदा: "ऑटो वाले से कहना है कि आगे से दाएँ मुड़कर रोक दीजिए"...'
                : 'e.g. "I want to ask the auto driver to turn right ahead and stop near the gate"...'
            }
            className="w-full bg-[#FAF7F2] border border-[#E2DBD0] rounded-2xl p-4 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 resize-none"
          />
        </div>

        {/* Context Selector */}
        <div>
          <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
            2. Choose the Setting / Context:
          </label>
          <div className="flex flex-wrap gap-2">
            {contextOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setContext(opt.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  context === opt.id
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                    : 'bg-white border-[#E2DBD0] text-[#64748B] hover:bg-[#FAF7F2]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desired Tone Selector */}
        <div>
          <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
            3. Desired Tone:
          </label>
          <div className="flex flex-wrap gap-2">
            {toneOptions.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTone(t.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  tone === t.id
                    ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-xs'
                    : 'bg-white border-[#E2DBD0] text-[#64748B] hover:bg-[#FAF7F2]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8E2D6]">
          <div className="flex flex-wrap gap-1.5 text-xs">
            <span className="text-[11px] font-semibold text-[#64748B] self-center mr-1">Examples:</span>
            {exampleIntentions.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIntention(ex);
                  handleGenerate(ex);
                }}
                className="px-2.5 py-1 bg-white border border-[#E2DBD0] rounded-lg text-[11px] text-[#64748B] hover:text-[#92400E] hover:border-[#D97706]"
              >
                {ex.slice(0, 32)}...
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleGenerate()}
            disabled={isLoading || !intention.trim()}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#D97706] hover:opacity-95 text-white text-xs font-bold shadow-md disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Formulating Kannada...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Formulate Phrase</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Formulated Result */}
      {result && (
        <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
              Culturally Authentic Formulated Phrase
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#FAF7F2]"
                title="Copy"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={handleSave}
                className={`p-2 rounded-xl ${isSaved ? 'text-amber-600' : 'text-[#64748B]'}`}
                title="Save"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600' : ''}`} />
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-kannada text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-relaxed">
                  {result.kannada_text}
                </h3>
                <p className="text-base sm:text-lg font-mono font-bold text-[#D97706] mt-1">
                  {result.transliteration}
                </p>
                <p className="text-sm font-semibold text-[#0F172A] mt-1">
                  {result.meaning}
                </p>
              </div>

              <button
                onClick={() => playKannadaSpeech(result.kannada_text)}
                className="p-3 rounded-2xl bg-[#E11D48] text-white hover:bg-[#BE123C] shadow-sm shrink-0"
                title="Listen to phrase"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Explanation & Cultural Tip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#E8E2D6]">
            {result.explanation && (
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E2D6] space-y-1">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                  Why this works:
                </span>
                <p className="text-xs text-[#0F172A]">{result.explanation}</p>
              </div>
            )}

            {result.cultural_tip && (
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  💡 Cultural & Etiquette Tip:
                </span>
                <p className="text-xs">{result.cultural_tip}</p>
              </div>
            )}
          </div>

          {result.polite_variant && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
              <strong>Extra Polite Alternative: </strong>
              <span className="font-kannada font-bold">{result.polite_variant}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
