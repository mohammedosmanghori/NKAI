/**
 * Audio synthesis and speech recognition utilities
 */

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

let preferredVoice: SpeechSynthesisVoice | null = null;

// Initialize and select the best Kannada or Indian English voice
export function getKannadaVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  // 1. Direct Kannada voice
  const knVoice = voices.find(v => v.lang.startsWith('kn') || v.lang.toLowerCase().includes('kannada'));
  if (knVoice) return knVoice;

  // 2. Hindi or Indian English voice which handles Devanagari/Indic phonetics well
  const indicVoice = voices.find(v => v.lang.startsWith('hi') || v.lang === 'en-IN' || v.name.toLowerCase().includes('india'));
  if (indicVoice) return indicVoice;

  // 3. Fallback to first available
  return voices[0] || null;
}

let currentAudio: HTMLAudioElement | null = null;

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    preferredVoice = getKannadaVoice();
  };
}

// Fallback to browser SpeechSynthesis if network audio is unavailable
function playWebSpeech(text: string, options: SpeechOptions = {}) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (options.onError) options.onError('Speech synthesis not supported in this browser.');
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    // Workaround for Chrome/WebKit speech synthesis bug where long text or pauses freeze
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = preferredVoice || getKannadaVoice();
    if (voice) {
      utterance.voice = voice;
    }
    // Set appropriate lang tag
    utterance.lang = voice?.lang?.startsWith('kn') ? voice.lang : (voice?.lang?.startsWith('hi') ? 'hi-IN' : 'kn-IN');
    utterance.rate = options.rate || 0.85;
    utterance.pitch = options.pitch || 1.0;

    let hasEnded = false;
    const safeEnd = () => {
      if (!hasEnded) {
        hasEnded = true;
        if (options.onEnd) options.onEnd();
      }
    };

    utterance.onend = safeEnd;
    utterance.onerror = (e) => {
      console.warn('Speech synthesis utterance error:', e);
      safeEnd();
      if (options.onError) options.onError(e);
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('SpeechSynthesis failed:', err);
    if (options.onEnd) options.onEnd();
    if (options.onError) options.onError(err);
    return false;
  }
}

export function playKannadaSpeech(text: string, options: SpeechOptions = {}) {
  if (!text || typeof text !== 'string') {
    if (options.onEnd) options.onEnd();
    return false;
  }

  stopKannadaSpeech();

  // Strip emojis, symbols and bracketed annotations for clear audio pronunciation
  const cleanText = text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .trim();

  if (!cleanText) {
    if (options.onEnd) options.onEnd();
    return false;
  }

  try {
    const audioUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&lang=kn`;
    const audio = new Audio();
    currentAudio = audio;
    audio.preload = 'auto';
    audio.src = audioUrl;

    let fallbackTriggered = false;
    const triggerFallback = () => {
      if (!fallbackTriggered) {
        fallbackTriggered = true;
        currentAudio = null;
        playWebSpeech(cleanText, options);
      }
    };

    audio.onended = () => {
      currentAudio = null;
      if (options.onEnd) options.onEnd();
    };

    audio.onerror = () => {
      triggerFallback();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Audio play exception, attempting Web Speech fallback:', err);
        triggerFallback();
      });
    }

    return true;
  } catch (err) {
    console.warn('Failed to initialize Audio, falling back to Web Speech:', err);
    return playWebSpeech(cleanText, options);
  }
}

export function stopKannadaSpeech() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {}
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

// Check if browser supports speech recognition
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition
  );
}

// Speech recognition helper
export function startSpeechRecognition({
  lang = 'en-US',
  onResult,
  onError,
  onEnd
}: {
  lang?: string;
  onResult: (transcript: string) => void;
  onError?: (error: any) => void;
  onEnd?: () => void;
}) {
  if (!isSpeechRecognitionSupported()) {
    if (onError) onError(new Error('Speech recognition not supported in this browser.'));
    return null;
  }

  const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognitionConstructor();
  recognition.lang = lang;
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  recognition.start();
  return recognition;
}
