import React, { useState, useRef } from 'react';
import { 
  Mic, 
  Square, 
  Play, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { SourceLanguage } from '../types';
import { playKannadaSpeech } from '../utils/audio';

interface PronunciationPracticeProps {
  sourceLanguage: SourceLanguage;
}

const PRONUNCIATION_DRILLS = [
  {
    id: 'pr-1',
    kannada: 'ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಿ?',
    transliteration: 'Na-mas-kā-ra, nī-vu hē-gid-dī-ri?',
    meaningEn: 'Hello, how are you?',
    meaningHi: 'नमस्ते, आप कैसे हैं?',
    stressTip: 'Stress the long vowels: "-kā-" in Namaskāra and "-dī-" at the end of hēgiddīri.'
  },
  {
    id: 'pr-2',
    kannada: 'ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?',
    transliteration: 'Bus nil-dā-ṇa el-li-de?',
    meaningEn: 'Where is the bus stop?',
    meaningHi: 'बस स्टॉप कहाँ है?',
    stressTip: 'The retroflex "ṇ" in nildāṇa has the tongue curled back slightly to touch the roof of the mouth.'
  },
  {
    id: 'pr-3',
    kannada: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ ಅಣ್ಣ.',
    transliteration: 'Sval-pa ka-ḍi-me mā-ḍi aṇ-ṇa.',
    meaningEn: 'Please reduce the price a little, brother.',
    meaningHi: 'थोड़ा कम कीजिए भैया।',
    stressTip: 'Keep "Svalpa" soft, and soften "māḍi" with polite inflection.'
  },
  {
    id: 'pr-4',
    kannada: 'ಊಟ ಆಯ್ತಾ?',
    transliteration: 'Oo-ṭa aay-thā?',
    meaningEn: 'Did you have food?',
    meaningHi: 'खाना खा लिया क्या?',
    stressTip: 'Start with a deep long "Oo-", with a warm rising tone on "-thā?".'
  },
  {
    id: 'pr-5',
    kannada: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು!',
    transliteration: 'Tum-bā dhan-ya-vā-da-ga-ḷu!',
    meaningEn: 'Thank you very much!',
    meaningHi: 'बहुत-बहुत धन्यवाद!',
    stressTip: 'Notice the retroflex "ḷ" in "-gaḷu" (gull-oo) curling gently backwards.'
  }
];

export const PronunciationPractice: React.FC<PronunciationPracticeProps> = ({ sourceLanguage }) => {
  const [selectedDrill, setSelectedDrill] = useState(PRONUNCIATION_DRILLS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingReference, setIsPlayingReference] = useState(false);
  const [isPlayingUser, setIsPlayingUser] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayReference = () => {
    setIsPlayingReference(true);
    playKannadaSpeech(selectedDrill.kannada, {
      onEnd: () => setIsPlayingReference(false),
      onError: () => setIsPlayingReference(false)
    });
  };

  const startRecording = async () => {
    setMicError(null);
    setRecordedAudioUrl(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err: any) {
      console.warn('Microphone permission error:', err);
      setMicError('Could not access microphone. Please grant permission in your browser address bar.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePlayUserAudio = () => {
    if (!recordedAudioUrl) return;
    setIsPlayingUser(true);
    const audio = new Audio(recordedAudioUrl);
    userAudioPlayerRef.current = audio;
    audio.onended = () => setIsPlayingUser(false);
    audio.onerror = () => setIsPlayingUser(false);
    audio.play();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold">
          <Mic className="w-3.5 h-3.5 text-blue-600" />
          <span>Acoustic Comparison & Ear Training</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          Pronunciation Practice Lab
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto">
          Listen to native Kannada reference speech, record your own voice, and compare them side-by-side to hone your Dravidian cadence.
        </p>
      </div>

      {/* Drill Selector */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-4 shadow-xs">
        <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-2 px-1">
          Choose a phrase to practise:
        </span>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {PRONUNCIATION_DRILLS.map(drill => {
            const isSelected = selectedDrill.id === drill.id;
            return (
              <button
                key={drill.id}
                onClick={() => {
                  setSelectedDrill(drill);
                  setRecordedAudioUrl(null);
                  setMicError(null);
                }}
                className={`p-3 rounded-2xl border text-left shrink-0 max-w-[200px] transition-all ${
                  isSelected
                    ? 'border-[#E11D48] bg-[#FFF1F2] ring-2 ring-[#E11D48]/30 shadow-xs'
                    : 'border-[#E2DBD0] bg-white hover:bg-[#FAF7F2]'
                }`}
              >
                <span className="font-kannada font-bold text-sm text-[#0F172A] block truncate">
                  {drill.kannada}
                </span>
                <span className="text-[10px] text-[#64748B] block truncate mt-0.5">
                  {sourceLanguage === 'hi' ? drill.meaningHi : drill.meaningEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Pronunciation Studio Card */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
        <div className="text-center space-y-2">
          <h3 className="font-kannada text-4xl sm:text-5xl font-extrabold text-[#0F172A] leading-relaxed">
            {selectedDrill.kannada}
          </h3>
          <p className="text-lg font-mono font-bold text-[#D97706]">
            {selectedDrill.transliteration}
          </p>
          <p className="text-sm font-semibold text-[#64748B]">
            {sourceLanguage === 'hi' ? selectedDrill.meaningHi : selectedDrill.meaningEn}
          </p>
        </div>

        {/* Phonetic Stress Tip */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-900 max-w-xl mx-auto space-y-1">
          <span className="font-bold block">💡 Phonetic Guide & Stress Cue:</span>
          <span>{selectedDrill.stressTip}</span>
        </div>

        {/* Side-by-side Dual Audio Player Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {/* Step 1: Reference Audio */}
          <div className="p-5 rounded-3xl bg-white border border-[#E8E2D6] text-center space-y-3 flex flex-col items-center justify-between shadow-xs">
            <div>
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                1. Reference Pronunciation
              </span>
              <p className="text-[11px] text-slate-400 mt-1">Native cadence & tempo</p>
            </div>

            <button
              onClick={handlePlayReference}
              disabled={isPlayingReference}
              className={`p-4 rounded-full shadow-md transition-all ${
                isPlayingReference
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-[#E11D48] hover:bg-[#BE123C] text-white'
              }`}
              title="Play Reference"
            >
              <Volume2 className="w-6 h-6" />
            </button>

            <span className="text-xs font-bold text-[#0F172A]">
              {isPlayingReference ? 'Playing...' : 'Play Reference'}
            </span>
          </div>

          {/* Step 2: User Voice Recording */}
          <div className="p-5 rounded-3xl bg-white border border-[#E8E2D6] text-center space-y-3 flex flex-col items-center justify-between shadow-xs">
            <div>
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                2. Your Voice Recording
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                {recordedAudioUrl ? 'Recording ready to review' : 'Record and compare'}
              </p>
            </div>

            {!isRecording ? (
              <button
                onClick={startRecording}
                className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all group"
                title="Record your voice"
              >
                <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md animate-pulse"
                title="Stop recording"
              >
                <Square className="w-6 h-6" />
              </button>
            )}

            <span className="text-xs font-bold text-[#0F172A]">
              {isRecording ? 'Recording... (Tap to stop)' : 'Tap to Record'}
            </span>
          </div>
        </div>

        {/* Playback Comparison when User has recorded */}
        {recordedAudioUrl && (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 max-w-xl mx-auto flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="font-bold text-xs text-emerald-900 block">Your Recording is Ready</span>
                <span className="text-[11px] text-emerald-700">Listen back and compare your tempo</span>
              </div>
            </div>

            <button
              onClick={handlePlayUserAudio}
              disabled={isPlayingUser}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isPlayingUser ? 'Playing...' : 'Play My Voice'}</span>
            </button>
          </div>
        )}

        {micError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 max-w-xl mx-auto">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{micError}</span>
          </div>
        )}
      </div>
    </div>
  );
};
