import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  Check, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  User, 
  Bot, 
  Lightbulb,
  AlertCircle
} from 'lucide-react';
import { SourceLanguage, ConversationMessage } from '../types';
import { playKannadaSpeech, isSpeechRecognitionSupported, startSpeechRecognition } from '../utils/audio';
import { getT } from '../utils/i18n';

interface ConversationalTutorProps {
  sourceLanguage: SourceLanguage;
  userLevel: string;
}

const SCENARIOS = [
  { id: 'auto', title: 'Talking to an Auto Driver', kannada: 'ಆಟೋ ಚಾಲಕರೊಂದಿಗೆ ಮಾತುಕತೆ', icon: '🛺', starter: 'ಎಲ್ಲಿಗೆ ಹೋಗ್ಬೇಕು ಸರ್?' },
  { id: 'food', title: 'Ordering Food in a Restaurant', kannada: 'ಹೋಟೆಲ್‌ನಲ್ಲಿ ಊಟ ಆರ್ಡರ್', icon: '☕', starter: 'ನಮಸ್ಕಾರ, ತಿಂಡಿಗೆ ಏನು ಬೇಕು?' },
  { id: 'intro', title: 'Introducing Yourself', kannada: 'ಪರಿಚಯ ಮಾಡಿಕೊಳ್ಳುವುದು', icon: '🤝', starter: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಹೆಸರೇನು?' },
  { id: 'shopping', title: 'Shopping at Market', kannada: 'ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಖರೀದಿ', icon: '🛍️', starter: 'ಬನ್ನಿ ಸರ್, ತರಕಾರಿ ಎಷ್ಟು ಬೇಕು?' },
  { id: 'directions', title: 'Asking for Directions', kannada: 'ದಾರಿ ಕೇಳುವುದು', icon: '🧭', starter: 'ಹೇಳಿ, ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗ್ಬೇಕು?' },
  { id: 'bus', title: 'Travelling by Bus', kannada: 'ಬಸ್ ಪ್ರಯಾಣ', icon: '🚌', starter: 'ಯಾವ ಸ್ಟಾಪ್‌ಗೆ ಟಿಕೆಟ್ ಬೇಕು?' },
  { id: 'college', title: 'College Conversations', kannada: 'ಕಾಲೇಜು ಮಾತುಕತೆ', icon: '🎓', starter: 'ಹೇಯ್! ಇವತ್ತು ಕ್ಲಾಸ್ ಇದೆಯಾ?' },
  { id: 'work', title: 'Workplace Conversations', kannada: 'ಕಚೇರಿ ಮಾತುಕತೆ', icon: '💼', starter: 'ನಮಸ್ಕಾರ, ಇವತ್ತಿನ ಮೀಟಿಂಗ್ ರೆಡಿನಾ?' },
  { id: 'hospital', title: 'Visiting a Hospital', kannada: 'ಆಸ್ಪತ್ರೆ ಭೇಟಿ', icon: '🏥', starter: 'ನಮಸ್ಕಾರ, ನಿಮಗೆ ಏನು ಸಮಸ್ಯೆ ಆಗಿದೆ?' },
  { id: 'gov', title: 'Government Office Info', kannada: 'ಸರ್ಕಾರಿ ಕಚೇರಿ ಮಾಹಿತಿ', icon: '🏛️', starter: 'ಯಾವ ಕೆಲಸಕ್ಕಾಗಿ ಅರ್ಜಿ ತಂದಿದ್ದೀರಿ?' }
];

export const ConversationalTutor: React.FC<ConversationalTutorProps> = ({
  sourceLanguage,
  userLevel
}) => {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0].id);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate'>(
    userLevel === 'intermediate' ? 'intermediate' : 'beginner'
  );
  const [isImmersionMode, setIsImmersionMode] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [revealedTranslationIds, setRevealedTranslationIds] = useState<Record<string, boolean>>({});

  const isHi = sourceLanguage === 'hi';
  const t = getT(sourceLanguage);

  const getScenarioTitle = (sc: typeof SCENARIOS[0]) => {
    if (!isHi) return sc.title;
    switch (sc.id) {
      case 'auto': return 'ऑटो चालक से बातचीत';
      case 'food': return 'होटल में खाना ऑर्डर करना';
      case 'intro': return 'अपना परिचय देना';
      case 'shopping': return 'बाज़ार में खरीदारी';
      case 'directions': return 'रास्ता पूछना';
      case 'bus': return 'बस यात्रा';
      case 'college': return 'कॉलेज में बातचीत';
      case 'work': return 'कार्यालय में बातचीत';
      case 'hospital': return 'अस्पताल में बातचीत';
      case 'gov': return 'सरकारी दफ्तर में पूछताछ';
      default: return sc.title;
    }
  };

  // Initialize scenario
  useEffect(() => {
    restartScenario(selectedScenario);
  }, [selectedScenario, sourceLanguage]);

  const restartScenario = (scenarioId: string) => {
    const sc = SCENARIOS.find(s => s.id === scenarioId) || SCENARIOS[0];
    const initialTutorMsg: ConversationMessage = {
      id: `msg-${Date.now()}`,
      role: 'tutor',
      text: sc.starter,
      transliteration: getStarterTransliteration(sc.id),
      meaning: getStarterMeaning(sc.id, sourceLanguage),
      explanation: 'Opening prompt from your conversational partner.',
      suggestedResponses: getStarterSuggestions(sc.id, sourceLanguage),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initialTutorMsg]);
    setRevealedTranslationIds({});
  };

  function getStarterTransliteration(id: string): string {
    switch (id) {
      case 'auto': return 'Ellige hōgbēku sir?';
      case 'food': return 'Namaskāra, tiṇḍige ēnu bēku?';
      case 'intro': return 'Namaskāra! Nimma hesarēnu?';
      case 'shopping': return 'Banni sir, tarakāri eṣṭu bēku?';
      case 'directions': return 'Hēḷi, nīvu ellige hōgbēku?';
      default: return 'Namaskāra! Hēgiddīri?';
    }
  }

  function getStarterMeaning(id: string, lang: SourceLanguage): string {
    if (lang === 'hi') {
      switch (id) {
        case 'auto': return 'कहाँ जाना है सर?';
        case 'food': return 'नमस्ते, नाश्ते में क्या चाहिए?';
        case 'intro': return 'नमस्ते! आपका नाम क्या है?';
        case 'shopping': return 'आइए सर, सब्ज़ी कितनी चाहिए?';
        case 'directions': return 'बताइए, आपको कहाँ जाना है?';
        default: return 'नमस्ते! आप कैसे हैं?';
      }
    }
    switch (id) {
      case 'auto': return 'Where do you need to go, sir?';
      case 'food': return 'Hello, what would you like for snacks/tiffin?';
      case 'intro': return 'Hello! What is your name?';
      case 'shopping': return 'Welcome sir, how many vegetables do you need?';
      case 'directions': return 'Tell me, where do you need to head?';
      default: return 'Hello! How are you?';
    }
  }

  function getStarterSuggestions(id: string, lang: SourceLanguage) {
    if (id === 'auto') {
      return [
        { kannada: 'ಮೆಜೆಸ್ಟಿಕ್ ಹೋಗ್ಬೇಕು, ಮೀಟರ್ ಹಾಕಿ.', transliteration: 'Majestic hōgbēku, meter hāki.', meaning: lang === 'hi' ? 'मैजेस्टिक जाना है, मीटर लगाइए।' : 'Want to go to Majestic, put meter.' },
        { kannada: 'ಇಂದಿರಾನಗರಕ್ಕೆ ಎಷ್ಟು ಆಗುತ್ತೆ?', transliteration: 'Indiranagar-kke eṣṭu āgutte?', meaning: lang === 'hi' ? 'इंदिरानगर का कितना होगा?' : 'How much will it be to Indiranagar?' }
      ];
    }
    if (id === 'food') {
      return [
        { kannada: 'ಒಂದು ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ಕಾಫಿ ಕೊಡಿ.', transliteration: 'Ondu masāle dōse mattu kāphi koḍi.', meaning: lang === 'hi' ? 'एक मसाला डोसा और कॉफ़ी दीजिए।' : 'One masala dosa and coffee please.' },
        { kannada: 'ಖಾರ ಕಡಿಮೆ ಮಾಡಿ.', transliteration: 'Khāra kaḍime māḍi.', meaning: lang === 'hi' ? 'तीखा कम रखिए।' : 'Make it less spicy.' }
      ];
    }
    return [
      { kannada: 'ನನ್ನ ಹೆಸರು...', transliteration: 'Nanna hesaru...', meaning: lang === 'hi' ? 'मेरा नाम...' : 'My name is...' },
      { kannada: 'ನಾನು ಆರಾಮಾಗಿದ್ದೇನೆ.', transliteration: 'Nānu ārāmāgiddēne.', meaning: lang === 'hi' ? 'मैं ठीक हूँ।' : 'I am fine.' }
    ];
  }

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ConversationMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: SCENARIOS.find(s => s.id === selectedScenario)?.title,
          message: text,
          history: newHistory.map(m => ({ role: m.role, text: m.text })),
          languagePreference: sourceLanguage,
          difficulty
        })
      });

      const data = await response.json();

      const tutorMsg: ConversationMessage = {
        id: `tutor-${Date.now()}`,
        role: 'tutor',
        text: data.kannada_reply,
        transliteration: data.transliteration,
        meaning: data.meaning,
        explanation: data.explanation,
        correction: data.correction,
        suggestedResponses: data.suggested_responses,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, tutorMsg]);
      // Speak tutor response
      playKannadaSpeech(data.kannada_reply);
    } catch (err) {
      console.warn('Chat API unavailable, using local tutor fallback:', err);
      const isAuto = selectedScenario === 'auto';
      const fallbackReply: ConversationMessage = {
        id: `tutor-${Date.now()}`,
        role: 'tutor',
        text: isAuto ? 'ಸರಿ ಸರ್, ಬನ್ನಿ ಕೂತ್ಕೊಳ್ಳಿ. ಮೀಟರ್ ಹಾಕ್ತೀನಿ.' : 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಮಾತನ್ನು ಕೇಳಿ ಸಂತೋಷವಾಯಿತು.',
        transliteration: isAuto ? 'Sari sir, banni kootkolli. Meter haaktini.' : 'Namaskāra! Nimma mātannu kēḷi santōṣavāyitu.',
        meaning: isAuto 
          ? (isHi ? 'ठीक है सर, आइए बैठिए। मीटर लगाता हूँ।' : 'Okay sir, please have a seat. I will turn on the meter.') 
          : (isHi ? 'नमस्ते! आपकी बात सुनकर प्रसन्नता हुई।' : 'Hello! Glad to hear from you.'),
        explanation: 'Authentic conversational reply.',
        suggestedResponses: [
          { kannada: 'ಧನ್ಯವಾದಗಳು ಅಣ್ಣ!', transliteration: 'Dhanyavādagaḷu anna!', meaning: isHi ? 'धन्यवाद भैया!' : 'Thank you brother!' },
          { kannada: 'ಇಲ್ಲಿಂದ ಎಷ್ಟು ದೂರ ಇದೆ?', transliteration: 'Illinda eṣṭu dūra ide?', meaning: isHi ? 'यहाँ से कितनी दूर है?' : 'How far is it from here?' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackReply]);
      playKannadaSpeech(fallbackReply.text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeechInput = () => {
    if (isListening) return;

    if (!isSpeechRecognitionSupported()) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    setIsListening(true);
    startSpeechRecognition({
      lang: sourceLanguage === 'hi' ? 'hi-IN' : 'en-US',
      onResult: (transcript) => {
        setInputMessage(transcript);
        setIsListening(false);
      },
      onError: () => setIsListening(false),
      onEnd: () => setIsListening(false)
    });
  };

  const toggleReveal = (id: string) => {
    setRevealedTranslationIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-[#B45309] border border-amber-200 rounded-full text-xs font-bold">
          <MessageSquare className="w-3.5 h-3.5 text-[#B45309]" />
          <span>{isHi ? 'वास्तविक बोलचाल का संवाद अभ्यास' : 'Real-World Spoken Roleplay Practice'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          {isHi ? 'कन्नड़ संभाषण शिक्षक' : 'Spoken Kannada Conversation Practice'}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto">
          {isHi ? 'ऑटो चालकों, दुकानदारों, वेटर और मित्रों के साथ वास्तविक परिस्थितियों में संवाद का अभ्यास करें। कन्नड़ सुनें और स्वाभाविक उत्तर प्राप्त करें।' : 'Roleplay authentic daily situations with local auto drivers, shopkeepers, servers, and friends. Hear spoken Kannada and get natural response suggestions.'}
        </p>
      </div>

      {/* Scenario Picker Carousel */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-4 shadow-sm">
        <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-2 px-1">
          {isHi ? 'अभ्यास के लिए परिस्थिति चुनें:' : 'Select Practice Scenario:'}
        </span>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {SCENARIOS.map(sc => {
            const isSelected = selectedScenario === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenario(sc.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                    : 'bg-white border-[#E2DBD0] text-[#475569] hover:bg-[#FAF7F2]'
                }`}
              >
                <span>{sc.icon}</span>
                <span>{getScenarioTitle(sc)}</span>
              </button>
            );
          })}
        </div>

        {/* Practice Mode Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-[#E8E2D6] text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#64748B]">{isHi ? 'मोड:' : 'Mode:'}</span>
            <button
              onClick={() => setIsImmersionMode(!isImmersionMode)}
              className={`px-3 py-1 rounded-xl border font-bold flex items-center gap-1.5 transition-all ${
                isImmersionMode
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              {isImmersionMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isImmersionMode ? (isHi ? 'पूर्ण कन्नड़ मोड (अनुवाद छिपा)' : 'Immersion (Hidden English/Hindi)') : (isHi ? 'शिक्षण मोड (अनुवाद दृश्यमान)' : 'Learning (Translations Visible)')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => restartScenario(selectedScenario)}
              className="p-1.5 text-[#64748B] hover:text-[#0F172A] rounded-lg hover:bg-[#EAE4D8] flex items-center gap-1"
              title={isHi ? 'संवाद पुनः शुरू करें' : 'Restart Conversation'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">{t.tutor.restartScenario}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-4 sm:p-6 shadow-md min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-1">
          {messages.map(msg => {
            const isTutor = msg.role === 'tutor';
            const isRevealed = !isImmersionMode || revealedTranslationIds[msg.id];

            const scObj = SCENARIOS.find(s => s.id === selectedScenario) || SCENARIOS[0];

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isTutor ? 'justify-start' : 'justify-end'}`}
              >
                {isTutor && (
                  <div className="w-9 h-9 rounded-2xl bg-amber-100 border border-amber-300 text-lg flex items-center justify-center shrink-0 shadow-xs">
                    {scObj.icon}
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 space-y-2 ${
                  isTutor 
                    ? 'bg-white border border-[#E2DBD0] text-[#0F172A] shadow-xs' 
                    : 'bg-[#0F172A] text-white shadow-xs'
                }`}>
                  {isTutor && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#D97706] mb-1">
                      <span>{getScenarioTitle(scObj)}</span>
                      <span className="text-[#94A3B8]">•</span>
                      <span className="text-[#64748B] font-normal">{scObj.kannada}</span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <p className="font-kannada text-lg sm:text-xl font-bold leading-relaxed">
                      {msg.text}
                    </p>
                    {isTutor && (
                      <button
                        onClick={() => playKannadaSpeech(msg.text)}
                        className="p-1.5 rounded-lg text-[#E11D48] hover:bg-[#FFF1F2] shrink-0"
                        title={t.listen}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Transliteration and Meaning */}
                  {isTutor && msg.transliteration && (
                    <div className="space-y-1 pt-1 border-t border-slate-100">
                      {isRevealed ? (
                        <>
                          <p className="text-xs font-mono font-bold text-[#D97706]">
                            {msg.transliteration}
                          </p>
                          <p className="text-xs text-[#64748B]">
                            {msg.meaning}
                          </p>
                        </>
                      ) : (
                        <button
                          onClick={() => toggleReveal(msg.id)}
                          className="text-[11px] font-bold text-[#D97706] hover:underline flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>{isHi ? 'लिप्यंतरण और अर्थ देखने के लिए टैप करें' : 'Tap to reveal transliteration & meaning'}</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Gentle Mistake Correction Alert if available */}
                  {msg.correction && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">{isHi ? 'सहायक सुझाव: ' : 'Helpful Tip: '}</span>
                        <span>{msg.correction}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end text-[10px] text-slate-400">
                    {msg.timestamp}
                  </div>
                </div>

                {!isTutor && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-white border border-[#E2DBD0] rounded-2xl w-fit">
              <div className="w-2 h-2 rounded-full bg-[#E11D48] animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[#D97706] animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-[#E11D48] animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-[#64748B] font-medium ml-1">{isHi ? 'शिक्षक उत्तर तैयार कर रहा है...' : 'Tutor is formulating response...'}</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips from the last tutor message */}
        {messages.length > 0 && messages[messages.length - 1].role === 'tutor' && messages[messages.length - 1].suggestedResponses && (
          <div className="pt-3 border-t border-[#E8E2D6] mt-3">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1.5">
              {isHi ? 'सुझाए गए उत्तर (भेजने के लिए टैप करें):' : 'Suggested Responses (Tap to send):'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {messages[messages.length - 1].suggestedResponses?.map((sug: any, idx: number) => {
                const kannadaText = typeof sug === 'string' ? sug : (sug.kannada || '');
                const meaningText = typeof sug === 'string' ? '' : (sug.meaning || '');
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(kannadaText)}
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-left transition-colors"
                  >
                    <span className="font-kannada font-bold text-xs text-[#0F172A] block">{kannadaText}</span>
                    {meaningText && <span className="text-[10px] text-[#64748B]">{meaningText}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="pt-4 mt-3 border-t border-[#E8E2D6]">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleSpeechInput}
              disabled={isListening}
              className={`p-3 rounded-2xl border transition-colors ${
                isListening
                  ? 'bg-rose-100 border-rose-300 text-rose-600 animate-pulse'
                  : 'bg-white border-[#E2DBD0] text-[#64748B] hover:text-[#0F172A]'
              }`}
              title={isHi ? 'बोलकर टाइप करें' : 'Voice Input'}
            >
              {isListening ? <MicOff className="w-5 h-5 text-rose-600" /> : <Mic className="w-5 h-5 text-[#D97706]" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder={
                sourceLanguage === 'hi'
                  ? 'कन्नड़, हिंदी या अंग्रेज़ी में उत्तर लिखें...'
                  : 'Reply in Kannada (or type in English/Hindi)...'
              }
              className="flex-1 bg-white border border-[#E2DBD0] rounded-2xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D97706]/40"
            />

            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-3 bg-gradient-to-r from-[#E11D48] to-[#D97706] hover:opacity-95 text-white rounded-2xl shadow-sm disabled:opacity-50 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
