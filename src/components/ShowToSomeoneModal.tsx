import React, { useState } from 'react';
import { X, Volume2, Maximize2, Moon, Sun } from 'lucide-react';
import { playKannadaSpeech } from '../utils/audio';
import { SourceLanguage } from '../types';

interface ShowToSomeoneModalProps {
  kannada: string;
  transliteration: string;
  english: string;
  hindi: string;
  contextTip?: string;
  sourceLanguage?: SourceLanguage;
  onClose: () => void;
}

export const ShowToSomeoneModal: React.FC<ShowToSomeoneModalProps> = ({
  kannada,
  transliteration,
  english,
  hindi,
  contextTip,
  sourceLanguage = 'en',
  onClose
}) => {
  const [isDark, setIsDark] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isHi = sourceLanguage === 'hi';

  const handlePlayAudio = () => {
    setIsPlaying(true);
    playKannadaSpeech(kannada, {
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className={`w-full max-w-2xl rounded-3xl p-6 sm:p-10 shadow-2xl border transition-colors flex flex-col justify-between my-auto max-h-[90vh] overflow-y-auto scrollbar-thin ${
          isDark 
            ? 'bg-[#0B0F19] text-white border-slate-800' 
            : 'bg-[#FFFBEB] text-[#0F172A] border-[#FDE68A]'
        }`}
      >
        {/* Top bar with quick instructions & theme switcher */}
        <div className="flex items-center justify-between border-b pb-4 border-current/10">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#E11D48] animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase text-current/70">
              {isHi ? 'ऑटो चालक / दुकानदार / नागरिक को दिखाएं' : 'Show To Auto Driver / Shopkeeper / Passerby'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl hover:bg-current/10 transition-colors"
              title="Toggle Contrast"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-current/10 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center: Massive Kannada Text */}
        <div className="py-8 my-auto text-center space-y-4">
          <h1 className="font-kannada text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-wide select-all">
            {kannada}
          </h1>

          <p className="text-lg sm:text-2xl font-bold tracking-wide text-current/80 font-mono">
            {transliteration}
          </p>

          <div className="flex items-center justify-center gap-4 text-sm sm:text-base font-medium text-current/70 pt-2">
            <span>{english}</span>
            <span>•</span>
            <span className="font-serif">{hindi}</span>
          </div>

          {contextTip && (
            <p className="text-xs text-current/60 max-w-md mx-auto pt-2 italic">
              💡 {contextTip}
            </p>
          )}
        </div>

        {/* Bottom bar controls */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-current/10">
          <button
            onClick={handlePlayAudio}
            disabled={isPlaying}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition-all ${
              isPlaying
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-[#E11D48] hover:bg-[#BE123C] text-white'
            }`}
          >
            <Volume2 className="w-5 h-5" />
            <span>{isPlaying ? (isHi ? 'ऑडियो बज रहा है...' : 'Playing Sound...') : (isHi ? 'ज़ोर से सुनाएं' : 'Play Loud Audio')}</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-2xl bg-current/10 hover:bg-current/20 text-current text-sm font-bold transition-colors"
          >
            {isHi ? 'हो गया' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
