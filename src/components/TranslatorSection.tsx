import React, { useState, useEffect } from 'react';
import { 
  Languages, 
  ArrowRightLeft, 
  Mic, 
  MicOff, 
  Volume2, 
  Copy, 
  Check, 
  Bookmark, 
  Share2, 
  Sparkles, 
  BookOpen, 
  Info, 
  RotateCcw,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { SourceLanguage, TranslationResult } from '../types';
import { playKannadaSpeech, isSpeechRecognitionSupported, startSpeechRecognition } from '../utils/audio';
import { addSavedPhrase } from '../utils/storage';
import { getT } from '../utils/i18n';
import { localTranslate, cleanQuery } from '../utils/localTranslator';

interface TranslatorSectionProps {
  sourceLanguage: SourceLanguage;
  onChangeSourceLanguage: (lang: SourceLanguage) => void;
  initialQuery?: string;
  onPhraseSaved?: () => void;
}

export const TranslatorSection: React.FC<TranslatorSectionProps> = ({
  sourceLanguage,
  onChangeSourceLanguage,
  initialQuery,
  onPhraseSaved
}) => {
  const [inputText, setInputText] = useState(initialQuery || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [copiedKannada, setCopiedKannada] = useState(false);
  const [copiedTranslit, setCopiedTranslit] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);

  const t = getT(sourceLanguage);
  const isHi = sourceLanguage === 'hi';

  // Example phrase chips based on language
  const examplePhrases = sourceLanguage === 'hi' ? [
    'नो पार्किंग (वाहन खड़ा करना मना है)',
    'प्रवेश निषेध (नो एंट्री)',
    'बस स्टॉप कहाँ है?',
    'यह कितने का है?',
    'नमस्ते, आप कैसे हैं?',
    'कृतज्ञता / धन्यवाद (Krutajnate)',
    'शिवाजीनगर की ओर (बस बोर्ड)',
    'एक मसाला डोसा और कॉफ़ी दीजिए'
  ] : [
    'No parking signboard',
    'No entry / One way',
    'Where is the bus stop?',
    'How much does this cost?',
    'Hello, how are you?',
    'Gratitude / Thank you (Krutajnate)',
    'Towards Shivajinagar (Bus route)',
    'One masala dosa and filter coffee please'
  ];

  useEffect(() => {
    if (initialQuery) {
      setInputText(initialQuery);
      handleTranslate(initialQuery);
    }
  }, [initialQuery]);

  const handleTranslate = async (textToTranslate?: string, mode: 'standard' | 'natural' | 'polite' = 'standard') => {
    const text = (textToTranslate !== undefined ? textToTranslate : inputText).trim();
    if (!text) {
      setErrorMsg(sourceLanguage === 'hi' ? 'कृपया अनुवाद करने के लिए कुछ लिखें।' : 'Please enter text to translate.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setIsSaved(false);

    // 1. Try server API with strict timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sourceLang: sourceLanguage,
          mode
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.kannada_text) {
          setResult(data);
          setIsLoading(false);
          return;
        }
      }
    } catch (err: any) {
      console.warn('Backend API translation unavailable, using verified local translator:', err?.message || err);
    }

    // 2. Seamless instant local linguistic translation fallback
    try {
      const localData = localTranslate(text, sourceLanguage, mode);
      setResult(localData);
    } catch (localErr: any) {
      console.error('Translation failed:', localErr);
      setErrorMsg(sourceLanguage === 'hi' ? 'अनुवाद करने में असमर्थ। कृपया पुनः प्रयास करें।' : 'Could not translate. Please verify your query.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeechInput = () => {
    if (isListening) return;

    if (!isSpeechRecognitionSupported()) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or an Android browser.');
      return;
    }

    setIsListening(true);
    const recognition = startSpeechRecognition({
      lang: sourceLanguage === 'hi' ? 'hi-IN' : 'en-US',
      onResult: (transcript) => {
        setInputText(transcript);
        handleTranslate(transcript);
        setIsListening(false);
      },
      onError: (err) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  const handlePlayAudio = (kannadaText: string) => {
    setIsPlayingAudio(true);
    playKannadaSpeech(kannadaText, {
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const handleCopy = (text: string, type: 'kannada' | 'translit') => {
    navigator.clipboard.writeText(text);
    if (type === 'kannada') {
      setCopiedKannada(true);
      setTimeout(() => setCopiedKannada(false), 2000);
    } else {
      setCopiedTranslit(true);
      setTimeout(() => setCopiedTranslit(false), 2000);
    }
  };

  const handleSaveToPhrasebook = () => {
    if (!result) return;
    addSavedPhrase({
      kannada: result.kannada_text,
      transliteration: result.transliteration,
      english: sourceLanguage === 'en' ? inputText : result.source_language_meaning,
      hindi: sourceLanguage === 'hi' ? inputText : result.source_language_meaning,
      category: 'Translator',
      folder: 'Essentials'
    });
    setIsSaved(true);
    if (onPhraseSaved) onPhraseSaved();
  };

  const handleShare = async () => {
    if (!result) return;
    const shareText = `${result.kannada_text}\n(${result.transliteration})\n${result.source_language_meaning}\n- Learned via Namma Kannada AI`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kannada Translation',
          text: shareText
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Copied translation to clipboard for sharing!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
          <span>{isHi ? 'AI कन्नड़ अनुवाद प्रणाली' : 'Intelligent Kannada Translation Engine'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          {isHi ? 'हिंदी से कन्नड़ अनुवादक' : 'English to Kannada Translator'}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto">
          {t.translator.subtitle}
        </p>
      </div>

      {/* Main Translation Card */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
        {/* Source Language Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D6] mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">{isHi ? 'स्रोत:' : 'Source:'}</span>
            <div className="flex items-center bg-[#EAE4D8] p-0.5 rounded-xl border border-[#DDD6C8] text-xs font-bold">
              <button
                type="button"
                onClick={() => onChangeSourceLanguage('en')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  sourceLanguage === 'en' ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#64748B]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => onChangeSourceLanguage('hi')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  sourceLanguage === 'hi' ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#64748B]'
                }`}
              >
                हिंदी (Hindi)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="text-[#D97706]">ಕನ್ನಡ (Kannada)</span>
          </div>
        </div>

        {/* Input Text Area */}
        <div className="relative">
          <textarea
            rows={3}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleTranslate();
              }
            }}
            placeholder={
              isHi
                ? 'यहाँ हिंदी में वाक्य लिखें (उदा: "बस स्टैंड कहाँ है?", "कृपया पानी दीजिए")...'
                : 'Type a sentence in English (e.g., "Where is the bus stop?", "Please give water")...'
            }
            className="w-full bg-[#FAF7F2] border border-[#E2DBD0] rounded-2xl p-4 pr-24 text-sm sm:text-base text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706] resize-none"
          />

          {inputText && (
            <button
              type="button"
              onClick={() => {
                setInputText('');
                setResult(null);
              }}
              className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] px-2.5 py-1 bg-white/95 hover:bg-slate-100 rounded-lg border border-[#E2DBD0] shadow-2xs transition-colors"
              title={isHi ? 'साफ़ करें' : 'Clear input text'}
            >
              <X className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>{t.clear}</span>
            </button>
          )}
        </div>

        {/* Action Controls & Voice Mic */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeechInput}
              disabled={isListening}
              className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all ${
                isListening
                  ? 'bg-rose-100 border-rose-300 text-rose-700 animate-pulse'
                  : 'bg-white border-[#E2DBD0] text-[#475569] hover:bg-[#FAF7F2]'
              }`}
              title={isHi ? 'बोलकर टाइप करें' : 'Voice Input'}
            >
              {isListening ? <MicOff className="w-4 h-4 text-rose-600" /> : <Mic className="w-4 h-4 text-[#D97706]" />}
              <span>{isListening ? t.listening : (isHi ? 'बोलकर लिखें' : 'Voice Input')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleTranslate()}
              disabled={isLoading || !inputText.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#D97706] hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-md disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.translator.translatingBtn}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.home.translateBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Example Chips */}
        <div className="mt-4 pt-3 border-t border-[#E8E2D6]/70">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-2">
            {t.translator.quickExamples}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {examplePhrases.map((phrase, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(phrase);
                  handleTranslate(phrase);
                }}
                className="px-3 py-1 bg-white border border-[#E2DBD0] hover:border-[#D97706] hover:bg-[#FFFBEB] text-[#475569] hover:text-[#92400E] rounded-xl text-xs transition-colors"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error state */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] text-xs sm:text-sm flex items-start gap-3">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">{errorMsg}</p>
            <p className="text-xs text-rose-700/80">
              Tip: You can click any of the curated sample phrase chips above to explore verified Kannada translations instantly!
            </p>
          </div>
        </div>
      )}

      {/* Structured Result Display */}
      {result && (
        <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in">
          {/* Top Banner with Provider & Mode */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6]">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                result.isLiveAI 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                {result.isLiveAI ? <Zap className="w-3 h-3 text-emerald-600" /> : <ShieldCheck className="w-3 h-3 text-amber-600" />}
                <span>{result.isLiveAI ? 'Live Gemini AI' : 'Curated Verified Knowledge Base'}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#EAE4D8] transition-colors"
                title="Share Translation"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleSaveToPhrasebook}
                className={`p-2 rounded-xl transition-colors ${
                  isSaved
                    ? 'text-amber-600 bg-amber-50 font-bold'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#EAE4D8]'
                }`}
                title={isSaved ? 'Saved in Phrasebook' : 'Save to Phrasebook'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Main Kannada Output & Roman Transliteration */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-kannada text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-relaxed">
                  {result.kannada_text}
                </h3>
                <p className="text-base sm:text-lg font-mono font-bold text-[#D97706] mt-1">
                  {result.transliteration}
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">
                  {isHi ? 'हिंदी में अर्थ: ' : 'Meaning: '}{result.source_language_meaning}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 pt-1">
                <button
                  type="button"
                  onClick={() => handlePlayAudio(result.kannada_text)}
                  disabled={isPlayingAudio}
                  className="p-3 rounded-2xl bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-sm transition-all"
                  title={isHi ? 'कन्नड़ उच्चारण सुनें' : 'Hear Kannada Pronunciation'}
                >
                  <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quick Copy Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleCopy(result.kannada_text, 'kannada')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#475569] hover:bg-[#FAF7F2] transition-colors"
              >
                {copiedKannada ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKannada ? (isHi ? 'कन्नड़ लिपि कॉपी हो गई!' : 'Copied Kannada!') : (isHi ? 'कन्नड़ लिपि कॉपी करें' : 'Copy Kannada Script')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy(result.transliteration, 'translit')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#475569] hover:bg-[#FAF7F2] transition-colors"
              >
                {copiedTranslit ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTranslit ? (isHi ? 'रोमन उच्चारण कॉपी हो गया!' : 'Copied Roman!') : (isHi ? 'रोमन उच्चारण कॉपी करें' : 'Copy Transliteration')}</span>
              </button>
            </div>
          </div>

          {/* Word-by-Word Breakdown */}
          {result.word_breakdown && result.word_breakdown.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-[#E8E2D6]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                {t.translator.wordBreakdown}:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {result.word_breakdown.map((w, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white border border-[#E8E2D6] space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-kannada font-bold text-base text-[#0F172A]">{w.kannada}</span>
                      <span className="text-[11px] font-mono font-semibold text-[#D97706]">{w.transliteration}</span>
                    </div>
                    <p className="text-xs text-[#64748B]">{w.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grammar & Sentence Structure */}
          {result.grammar_explanation && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>{isHi ? 'वाक्य रचना और व्याकरण सुझाव:' : 'Sentence Structure & Grammar Note:'}</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                {result.grammar_explanation}
              </p>
            </div>
          )}

          {/* Everyday Context & Tips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {result.usage_context && (
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E2D6] space-y-1">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">{isHi ? 'प्राकृतिक बोलचाल प्रयोग:' : 'Natural Usage:'}</span>
                <p className="text-xs text-[#0F172A]">{result.usage_context}</p>
              </div>
            )}

            {result.learning_tip && (
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E2D6] space-y-1">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">💡 {isHi ? 'सीखने का सुझाव:' : "Learner's Tip:"}</span>
                <p className="text-xs text-[#0F172A]">{result.learning_tip}</p>
              </div>
            )}
          </div>

          {/* Interactive Variation Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#E8E2D6]">
            <button
              type="button"
              onClick={() => setShowExplanationModal(true)}
              className="px-3.5 py-2 rounded-xl bg-[#F1ECE4] hover:bg-[#EAE4D8] text-xs font-bold text-[#0F172A] transition-colors flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{isHi ? 'इस अनुवाद को समझें' : 'Explain This Translation'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleTranslate(inputText, 'natural')}
              className="px-3.5 py-2 rounded-xl bg-[#F1ECE4] hover:bg-[#EAE4D8] text-xs font-bold text-[#0F172A] transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>{isHi ? 'स्वाभाविक बोलचाल रूप' : 'Make It More Natural'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleTranslate(inputText, 'polite')}
              className="px-3.5 py-2 rounded-xl bg-[#F1ECE4] hover:bg-[#EAE4D8] text-xs font-bold text-[#0F172A] transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isHi ? 'विनम्र / आदरणीय रूप' : 'Polite Version'}</span>
            </button>
          </div>

          {/* Polite Variant or Alternative Phrase display */}
          {(result.polite_variant || result.alternative_phrase) && (
            <div className="space-y-2 pt-2">
              {result.polite_variant && (
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/50 text-xs">
                  <span className="font-bold text-emerald-800">{isHi ? 'विनम्र / औपचारिक विकल्प: ' : 'Polite / Formal Alternative: '}</span>
                  <span className="text-emerald-900 font-kannada">{result.polite_variant}</span>
                </div>
              )}
              {result.alternative_phrase && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-700">{isHi ? 'बोलचाल का अन्य विकल्प: ' : 'Colloquial Alternate: '}</span>
                  <span className="text-slate-800 font-kannada">{result.alternative_phrase}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Explanation Deep Dive Modal */}
      {showExplanationModal && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D97706]" />
                <h3 className="font-bold text-base text-[#0F172A]">{isHi ? 'भाषा व व्याकरण विश्लेषण' : 'Linguistic Analysis'}</h3>
              </div>
              <button
                onClick={() => setShowExplanationModal(false)}
                className="p-1 rounded-lg hover:bg-[#EAE4D8] text-[#64748B]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#475569] leading-relaxed">
              <p>
                <strong>{isHi ? 'वाक्य संरचना:' : 'Sentence Structure:'}</strong> {isHi ? 'अंग्रेज़ी (SVO) के विपरीत, कन्नड़ हिंदी की तरह कर्ता-कर्म-क्रिया (SOV) क्रम का पालन करती है।' : 'Unlike English (Subject-Verb-Object), Kannada follows Subject-Object-Verb (SOV) order, very similar to Hindi.'}
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 font-mono text-xs text-amber-900">
                {result.kannada_text} → {result.transliteration}
              </div>
              <p>
                {result.grammar_explanation || (isHi ? 'इस वाक्य में क्रिया कर्ता के लिंग, वचन और आदर के अनुसार बदलती है।' : 'In this phrase, verbs agree with the subject in gender, number, and respect level.')}
              </p>
              <p>
                <strong>{isHi ? 'उच्चारण नियम:' : 'Pronunciation Key:'}</strong> {isHi ? 'कन्नड़ में ह्रस्व (अ, इ, उ, ए, ओ) और दीर्घ (आ, ई, ऊ, ए, ओ) स्वरों का स्पष्ट भेद होता है। दीर्घ स्वर पर बल देने से कन्नड़ स्वाभाविक लगती है।' : 'Kannada vowels distinguish short sounds (a, i, u, e, o) from long sounds (ā, ī, ū, ē, ō). Emphasizing the long vowel marks authentic Kannada pronunciation!'}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8E2D6] flex justify-end">
              <button
                onClick={() => setShowExplanationModal(false)}
                className="px-5 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold"
              >
                {isHi ? 'समझ आ गया' : 'Got it'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
