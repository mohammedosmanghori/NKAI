import { SourceLanguage } from '../types';

export interface TranslationDictionary {
  appName: string;
  appSlogan: string;
  streakDays: (days: number) => string;
  loginRegister: string;
  login: string;
  register: string;
  logout: string;
  welcomeBack: string;
  settings: string;
  search: string;
  all: string;
  copy: string;
  copied: string;
  save: string;
  saved: string;
  listen: string;
  listening: string;
  share: string;
  showScreen: string;
  clear: string;
  done: string;
  cancel: string;
  submit: string;
  next: string;
  back: string;
  start: string;
  continue: string;
  loading: string;
  error: string;

  // Nav Tabs
  nav: {
    home: string;
    translate: string;
    speak: string;
    write: string;
    survival: string;
    course: string;
    revision: string;
    explore: string;
    ocr: string;
    phrasebook: string;
    progress: string;
    settings: string;
    more: string;
  };

  // BottomNav Descriptions
  drawer: {
    title: string;
    subtitle: string;
    courseDesc: string;
    intentDesc: string;
    pronceDesc: string;
    memoryDesc: string;
    exploreDesc: string;
    ocrDesc: string;
    phrasebookDesc: string;
    progressDesc: string;
    settingsDesc: string;
  };

  // Home Dashboard
  home: {
    dailyImmersionBadge: string;
    welcomeHeading: (name?: string) => string;
    welcomeSub: string;
    quickTranslatePlaceholder: string;
    translateBtn: string;
    wordOfDayBadge: string;
    meaningLabel: string;
    exampleLabel: string;
    listenPronunciation: string;
    dailyRecommendationBadge: string;
    modulesHeading: string;
    modulesSub: string;
    survivalScenariosHeading: string;
    survivalScenariosSub: string;
    autoFareTitle: string;
    autoFareDesc: string;
    coffeeTitle: string;
    coffeeDesc: string;
    routeTitle: string;
    routeDesc: string;
    emergencyTitle: string;
    emergencyDesc: string;
  };

  // Translator Section
  translator: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    translateBtn: string;
    translatingBtn: string;
    voiceTyping: string;
    quickExamples: string;
    standardMode: string;
    naturalMode: string;
    politeMode: string;
    authenticKannada: string;
    pronunciationTranslit: string;
    meaningInLang: string;
    wordBreakdown: string;
    grammarNote: string;
    politeVariant: string;
    alternativeSpoken: string;
    showFullscreen: string;
  };

  // Conversational Tutor
  tutor: {
    title: string;
    subtitle: string;
    beginner: string;
    intermediate: string;
    immersionOn: string;
    immersionOff: string;
    typePlaceholder: string;
    send: string;
    showMeaning: string;
    hideMeaning: string;
    aiThinking: string;
    restartScenario: string;
  };

  // Writing Lab
  writing: {
    title: string;
    subtitle: string;
    tabVowels: string;
    tabConsonants: string;
    tabNumerals: string;
    tabCombos: string;
    clearBoard: string;
    strokeHint: string;
    accuracyCheck: string;
    mastered: string;
    markMastered: string;
    strokeGuide: string;
    audioPronounce: string;
  };

  // Survival Mode
  survival: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    categories: {
      all: string;
      transport: string;
      restaurants: string;
      shopping: string;
      directions: string;
      college: string;
      workplace: string;
      healthcare: string;
      accommodation: string;
      gov: string;
      emergencies: string;
    };
  };

  // 7-Day Course
  course: {
    title: string;
    subtitle: string;
    day: (d: number) => string;
    lessonTab: string;
    quizTab: string;
    submitQuiz: string;
    scoreTitle: string;
    tryAgain: string;
    nextDayLesson: string;
  };

  // Say What You Mean
  intent: {
    title: string;
    subtitle: string;
    placeholder: string;
    contextLabel: string;
    toneLabel: string;
    generateBtn: string;
    generating: string;
    examples: string;
  };

  // Memory Coach
  memory: {
    title: string;
    subtitle: string;
    allCards: string;
    listeningMode: string;
    weakOnly: string;
    flipCard: string;
    forgot: string;
    difficult: string;
    remembered: string;
    easy: string;
    addCard: string;
  };

  // Regional Explorer
  regional: {
    title: string;
    subtitle: string;
    allRegions: string;
    bengaluru: string;
    mysuru: string;
    northKarnataka: string;
    coastal: string;
    contributeBtn: string;
  };

  // Camera OCR
  ocr: {
    title: string;
    subtitle: string;
    uploadTab: string;
    typeTab: string;
    exploreTab: string;
    uploadBoxTitle: string;
    uploadBoxSub: string;
    scanBtn: string;
    scanning: string;
  };

  // Phrasebook
  phrasebook: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    emptyTitle: string;
    emptySub: string;
    launchFlashcards: string;
  };

  // Progress
  progress: {
    title: string;
    subtitle: string;
    streakTitle: string;
    streakSub: string;
    alphabetTitle: string;
    alphabetSub: string;
    courseTitle: string;
    courseSub: string;
    savedTitle: string;
    savedSub: string;
    badgesTitle: string;
  };

  // Settings
  settingsSec: {
    title: string;
    subtitle: string;
    langLabel: string;
    langDesc: string;
    levelLabel: string;
    goalLabel: string;
    dailyTimeLabel: string;
    saveBtn: string;
    savedSuccess: string;
    resetProgress: string;
    exportData: string;
  };
}

export const translations: Record<SourceLanguage, TranslationDictionary> = {
  en: {
    appName: 'NAMMA KANNADA',
    appSlogan: 'Your Language • Your World • Your Kannada',
    streakDays: (days: number) => `${days}d streak`,
    loginRegister: 'Login / Register',
    login: 'Login',
    register: 'Register',
    logout: 'Log Out',
    welcomeBack: 'Welcome Back',
    settings: 'Settings',
    search: 'Search',
    all: 'All',
    copy: 'Copy',
    copied: 'Copied!',
    save: 'Save',
    saved: 'Saved',
    listen: 'Listen',
    listening: 'Listening...',
    share: 'Share',
    showScreen: 'Show Screen',
    clear: 'Clear',
    done: 'Done',
    cancel: 'Cancel',
    submit: 'Submit',
    next: 'Next',
    back: 'Back',
    start: 'Start',
    continue: 'Continue',
    loading: 'Loading...',
    error: 'An error occurred',

    nav: {
      home: 'Home',
      translate: 'Translate',
      speak: 'Speak Tutor',
      write: 'Write Lab',
      survival: 'Survival Mode',
      course: '7-Day Path',
      revision: 'Memory Coach',
      explore: 'Regional',
      ocr: 'Camera OCR',
      phrasebook: 'Phrasebook',
      progress: 'Progress',
      settings: 'Settings',
      more: 'More',
    },

    drawer: {
      title: 'All Learning Tools',
      subtitle: 'Select any specialized Kannada module',
      courseDesc: 'Step-by-step beginner program',
      intentDesc: 'Context & tone based intent',
      pronceDesc: 'Voice recording & compare',
      memoryDesc: 'Spaced repetition flashcards',
      exploreDesc: 'Bengaluru, Mysuru & Hubballi slang',
      ocrDesc: 'Translate Kannada signboards',
      phrasebookDesc: 'Your saved custom collection',
      progressDesc: 'Streaks, badges & quiz history',
      settingsDesc: 'Preferences, goals & reset',
    },

    home: {
      dailyImmersionBadge: 'DAILY KANNADA IMMERSION',
      welcomeHeading: (name?: string) => name ? `Welcome back, ${name}!` : 'Namaskara! Learn Kannada Today',
      welcomeSub: 'Learn spoken Kannada with native nuance, verified signage translations, and interactive writing.',
      quickTranslatePlaceholder: "Type in English or Hindi (e.g., 'Where is the bus stop?')",
      translateBtn: 'Translate to Kannada',
      wordOfDayBadge: 'WORD OF THE DAY',
      meaningLabel: 'Meaning',
      exampleLabel: 'Example in context',
      listenPronunciation: 'Listen Pronunciation',
      dailyRecommendationBadge: "TODAY'S RECOMMENDED LESSON",
      modulesHeading: 'Interactive Learning Labs',
      modulesSub: 'Immersive tools tailored for practical Bengaluru life & beyond',
      survivalScenariosHeading: 'Quick Survival Actions',
      survivalScenariosSub: 'Instant tap-and-speak for high-frequency daily situations',
      autoFareTitle: 'Auto Rickshaw Meter',
      autoFareDesc: 'Ask auto driver to run meter politely',
      coffeeTitle: 'Order Filter Coffee',
      coffeeDesc: 'Order traditional hot South Indian filter coffee',
      routeTitle: 'Ask for Bus Stop',
      routeDesc: 'Find nearest bus stop or metro station',
      emergencyTitle: 'Medical Emergency',
      emergencyDesc: 'Immediate help and hospital inquiry phrases',
    },

    translator: {
      title: 'Kannada Contextual Translator',
      subtitle: 'Translates everyday spoken English & Hindi into authentic Kannada with polite forms and word-by-word breakdown.',
      inputPlaceholder: 'Type English or Hindi text here... (or click the microphone to speak)',
      translateBtn: 'Translate Now',
      translatingBtn: 'Translating with AI...',
      voiceTyping: 'Voice Typing',
      quickExamples: 'Quick Real-World Examples:',
      standardMode: 'Standard Kannada',
      naturalMode: 'Natural Spoken',
      politeMode: 'Respectful / Polite',
      authenticKannada: 'Authentic Kannada Script',
      pronunciationTranslit: 'Pronunciation & Transliteration',
      meaningInLang: 'Meaning in English',
      wordBreakdown: 'Word-by-Word Breakdown',
      grammarNote: 'Grammar & Cultural Usage Note',
      politeVariant: 'Respectful / Polite Variant',
      alternativeSpoken: 'Alternative Spoken Variant',
      showFullscreen: 'Show Fullscreen to Someone',
    },

    tutor: {
      title: 'Conversational Kannada Tutor',
      subtitle: 'Roleplay realistic daily scenarios in Bengaluru, Mysuru and Karnataka.',
      beginner: 'Beginner (with hints)',
      intermediate: 'Intermediate',
      immersionOn: 'Immersion Mode: ON',
      immersionOff: 'Immersion Mode: OFF',
      typePlaceholder: 'Type your reply in Kannada, English or Hindi...',
      send: 'Send',
      showMeaning: 'Show Meaning',
      hideMeaning: 'Hide Meaning',
      aiThinking: 'Tutor is thinking...',
      restartScenario: 'Restart Scenario',
    },

    writing: {
      title: 'Interactive Kannada Writing Lab',
      subtitle: 'Master Kannada script (ಅಕ್ಷರಮಾಲೆ) with stroke-guided canvas tracing, pronunciation audio, and stroke count feedback.',
      tabVowels: 'Vowels (ಸ್ವರಗಳು - 15)',
      tabConsonants: 'Core Consonants (ವ್ಯಂಜನಗಳು - 34)',
      tabNumerals: 'Numerals (ಅಂಕಿಗಳು - 10)',
      tabCombos: 'Combinations (ಒತ್ತಕ್ಷರಗಳು)',
      clearBoard: 'Clear Board',
      strokeHint: 'Show Stroke Hint',
      accuracyCheck: 'Check Stroke Accuracy',
      mastered: 'Mastered ✓',
      markMastered: 'Mark as Mastered',
      strokeGuide: 'Stroke Direction Guide:',
      audioPronounce: 'Pronunciation Audio',
    },

    survival: {
      title: 'Survival Mode: Essential Kannada',
      subtitle: 'Emergency, daily commuting, ordering food, and hospital phrases ready for instant tap-to-speak and fullscreen display.',
      searchPlaceholder: 'Search in Kannada, English, or Hindi...',
      categories: {
        all: 'All',
        transport: 'Transport',
        restaurants: 'Restaurants',
        shopping: 'Shopping',
        directions: 'Directions',
        college: 'College',
        workplace: 'Workplace',
        healthcare: 'Healthcare',
        accommodation: 'Accommodation',
        gov: 'Government Offices',
        emergencies: 'Emergencies',
      },
    },

    course: {
      title: '7-Day Structured Kannada Course',
      subtitle: 'A carefully curated daily curriculum to take you from total newcomer to confident everyday conversationalist.',
      day: (d: number) => `Day ${d}`,
      lessonTab: 'Daily Lesson',
      quizTab: 'Knowledge Check Quiz',
      submitQuiz: 'Submit Quiz Answers',
      scoreTitle: 'Quiz Complete!',
      tryAgain: 'Retake Quiz',
      nextDayLesson: 'Proceed to Next Day',
    },

    intent: {
      title: 'Say What You Mean: Intent & Tone',
      subtitle: 'Speak with the right cultural nuance - Polite, Friendly, Professional, or Urgent.',
      placeholder: "What do you want to say? (e.g. 'Tell the auto driver to drop me at the signal politely')",
      contextLabel: 'Context / Setting:',
      toneLabel: 'Desired Tone:',
      generateBtn: 'Generate Kannada Expression',
      generating: 'Crafting phrase...',
      examples: 'Try these sample intents:',
    },

    memory: {
      title: 'Memory Coach: Spaced Repetition',
      subtitle: 'Test your recall with interactive flashcards. Master vocabulary faster with smart repetition.',
      allCards: 'All Flashcards',
      listeningMode: 'Listening Challenge',
      weakOnly: 'Need Practice Only',
      flipCard: 'Tap card to flip for meaning',
      forgot: 'Forgot',
      difficult: 'Hard',
      remembered: 'Good',
      easy: 'Easy',
      addCard: '+ Add Custom Card',
    },

    regional: {
      title: 'Karnataka Regional Dialects Explorer',
      subtitle: 'Explore authentic colloquial slang and regional nuances across Bengaluru, Mysuru, North Karnataka, and Coastal Karavali.',
      allRegions: 'All Regions',
      bengaluru: 'Bengaluru (ಬೆಂಗಳೂರು)',
      mysuru: 'Mysuru (ಮೈಸೂರು)',
      northKarnataka: 'North Karnataka (ಉತ್ತರ ಕರ್ನಾಟಕ)',
      coastal: 'Coastal Karnataka (ಕರಾವಳಿ)',
      contributeBtn: '+ Share Local Expression',
    },

    ocr: {
      title: 'Kannada Camera Signboard Reader',
      subtitle: 'Scan Karnataka street signboards, bus boards, and notices to get instant translation and audio pronunciation.',
      uploadTab: 'Upload & Scan Image',
      typeTab: 'Type Board Text',
      exploreTab: 'Browse Real Signboards',
      uploadBoxTitle: 'Upload or Capture Signboard Image',
      uploadBoxSub: 'Supports street boards, bus boards, BBMP notices & metro signage',
      scanBtn: 'Read & Translate Signboard',
      scanning: 'Scanning Signboard with OCR...',
    },

    phrasebook: {
      title: 'My Kannada Phrasebook',
      subtitle: 'Your personal library of bookmarked translations and essential survival phrases.',
      searchPlaceholder: 'Search your saved phrases...',
      emptyTitle: 'No saved phrases yet',
      emptySub: 'Star translations or save phrases from Survival Mode to review them anytime.',
      launchFlashcards: 'Practice in Memory Coach',
    },

    progress: {
      title: 'Your Learning Progress',
      subtitle: 'Track your daily streak, alphabet stroke mastery, completed curriculum days, and vocabulary retention history.',
      streakTitle: 'Streak',
      streakSub: 'Consecutive Days',
      alphabetTitle: 'Alphabet Mastery',
      alphabetSub: 'Characters Traced',
      courseTitle: '7-Day Curriculum',
      courseSub: 'Lessons Completed',
      savedTitle: 'Vocabulary Bank',
      savedSub: 'Saved Phrases',
      badgesTitle: 'Earned Achievements & Badges',
    },

    settingsSec: {
      title: 'App Preferences & Personalization',
      subtitle: 'Customize your learning experience, daily targets, and manage your account.',
      langLabel: 'App Explanation & UI Language',
      langDesc: 'Choose your language for explanations, UI buttons and meanings (Kannada remains original)',
      levelLabel: 'Your Kannada Proficiency Level',
      goalLabel: 'Primary Learning Goal',
      dailyTimeLabel: 'Daily Commitment Target',
      saveBtn: 'Save Preferences',
      savedSuccess: 'Settings saved successfully!',
      resetProgress: 'Reset Learning Progress',
      exportData: 'Export Learning Data',
    },
  },

  hi: {
    appName: 'ನಮ್ಮ KANNADA',
    appSlogan: 'आपकी भाषा • आपकी दुनिया • आपकी कन्नड़',
    streakDays: (days: number) => `${days} दिन स्ट्रीक`,
    loginRegister: 'लॉगिन / रजिस्टर',
    login: 'लॉगिन',
    register: 'रजिस्टर',
    logout: 'लॉग आउट',
    welcomeBack: 'वापसी पर स्वागत है',
    settings: 'सेटिंग्स',
    search: 'खोजें',
    all: 'सभी',
    copy: 'कॉपी करें',
    copied: 'कॉपी हो गया!',
    save: 'सहेजें',
    saved: 'सहेजा गया',
    listen: 'सुनें',
    listening: 'सुन रहे हैं...',
    share: 'साझा करें',
    showScreen: 'दिखाएं',
    clear: 'साफ़ करें',
    done: 'हो गया',
    cancel: 'रद्द करें',
    submit: 'जमा करें',
    next: 'आगे',
    back: 'पीछे',
    start: 'शुरू करें',
    continue: 'जारी रखें',
    loading: 'लोड हो रहा है...',
    error: 'कोई त्रुटि हुई',

    nav: {
      home: 'होम',
      translate: 'अनुवाद',
      speak: 'बोलना सीखें',
      write: 'लिखना सीखें',
      survival: 'सर्वाइवल मोड',
      course: '7-दिवसीय कोर्स',
      revision: 'मेमोरी कोच',
      explore: 'क्षेत्रीय भाषा',
      ocr: 'कैमरा स्कैनर',
      phrasebook: 'वाक्यांश संग्रह',
      progress: 'प्रगति',
      settings: 'सेटिंग्स',
      more: 'और अधिक',
    },

    drawer: {
      title: 'सभी शिक्षण उपकरण',
      subtitle: 'कन्नड़ सीखने के किसी भी मॉड्यूल को चुनें',
      courseDesc: 'शुरुआती लोगों के लिए कदम दर कदम कार्यक्रम',
      intentDesc: 'संदर्भ और भाव के अनुसार कन्नड़ बोलें',
      pronceDesc: 'आवाज़ रिकॉर्ड करें और सही उच्चारण सीखें',
      memoryDesc: 'फ्लैशकार्ड्स द्वारा पुनरावृत्ति',
      exploreDesc: 'बेंगलुरु, मैसूर और हुबली की बोलियां',
      ocrDesc: 'कन्नड़ साइनबोर्ड का तुरंत अनुवाद करें',
      phrasebookDesc: 'आपके सहेजे गए पसंदीदा वाक्य',
      progressDesc: 'स्ट्रीक, बैज और क्विज़ का इतिहास',
      settingsDesc: 'प्राथमिकताएं, लक्ष्य और डेटा',
    },

    home: {
      dailyImmersionBadge: 'दैनिक कन्नड़ अभ्यास',
      welcomeHeading: (name?: string) => name ? `वापसी पर स्वागत है, ${name}!` : 'ನಮಸ್ಕಾರ! आज ही कन्नड़ सीखें',
      welcomeSub: 'प्राकृतिक शैली, प्रामाणिक साइनबोर्ड अनुवाद और इंटरैक्टिव लेखन के साथ बोलचाल की कन्नड़ सीखें।',
      quickTranslatePlaceholder: "हिंदी या अंग्रेज़ी में लिखें (जैसे 'बस स्टॉप कहाँ है?')",
      translateBtn: 'कन्नड़ में अनुवाद करें',
      wordOfDayBadge: 'आज का शब्द',
      meaningLabel: 'अर्थ',
      exampleLabel: 'वाक्य में प्रयोग',
      listenPronunciation: 'उच्चारण सुनें',
      dailyRecommendationBadge: 'आज का अनुशंसित पाठ',
      modulesHeading: 'इंटरैक्टिव लर्निंग लैब्स',
      modulesSub: 'कर्नाटक के दैनिक जीवन के लिए तैयार किए गए उपयोगी उपकरण',
      survivalScenariosHeading: 'दैनिक त्वरित स्थितियां',
      survivalScenariosSub: 'दैनिक जीवन में तुरंत बोलने और सुनने के लिए एक-टैप वाक्य',
      autoFareTitle: 'ऑटो रिक्शा मीटर',
      autoFareDesc: 'ऑटो चालक से मीटर से चलने का विनम्र अनुरोध',
      coffeeTitle: 'फ़िल्टर कॉफ़ी ऑर्डर करें',
      coffeeDesc: 'होटल में स्वादिष्ट दक्षिण भारतीय फ़िल्टर कॉफ़ी मांगें',
      routeTitle: 'बस स्टॉप का रास्ता पूछें',
      routeDesc: 'नज़दीकी बस स्टॉप या मेट्रो स्टेशन का पता लगाएं',
      emergencyTitle: 'चिकित्सा सहायता',
      emergencyDesc: 'तत्काल सहायता और अस्पताल संबंधी महत्वपूर्ण वाक्य',
    },

    translator: {
      title: 'कन्नड़ प्रासंगिक अनुवादक',
      subtitle: 'दैनिक बोलचाल की हिंदी और अंग्रेज़ी का विनम्र रूपों और शब्द-दर-शब्द अर्थ के साथ प्रामाणिक कन्नड़ में अनुवाद करता है।',
      inputPlaceholder: 'यहाँ हिंदी या अंग्रेज़ी में लिखें... (या बोलने के लिए माइक पर क्लिक करें)',
      translateBtn: 'अनुवाद करें',
      translatingBtn: 'AI अनुवाद कर रहा है...',
      voiceTyping: 'बोलकर लिखें',
      quickExamples: 'दैनिक जीवन के उदाहरण:',
      standardMode: 'मानक कन्नड़',
      naturalMode: 'प्राकृतिक बोलचाल',
      politeMode: 'विनम्र / आदरणीय',
      authenticKannada: 'प्रामाणिक कन्नड़ लिपि',
      pronunciationTranslit: 'उच्चारण और लिप्यंतरण',
      meaningInLang: 'हिंदी में अर्थ',
      wordBreakdown: 'शब्द-दर-शब्द विश्लेषण',
      grammarNote: 'व्याकरण और सांस्कृतिक उपयोग सुझाव',
      politeVariant: 'आदरणीय / विनम्र रूप',
      alternativeSpoken: 'वैकल्पिक बोलचाल रूप',
      showFullscreen: 'बड़ी स्क्रीन पर किसी को दिखाएं',
    },

    tutor: {
      title: 'कन्नड़ संभाषण शिक्षक',
      subtitle: 'बेंगलुरु, मैसूर और कर्नाटक के दैनिक जीवन के वास्तविक संवादों का अभ्यास करें।',
      beginner: 'शुरुआती (संकेतों के साथ)',
      intermediate: 'मध्यम स्तर',
      immersionOn: 'पूर्ण कन्नड़ मोड: चालू',
      immersionOff: 'पूर्ण कन्नड़ मोड: बंद',
      typePlaceholder: 'कन्नड़, हिंदी या अंग्रेज़ी में उत्तर लिखें...',
      send: 'भेजें',
      showMeaning: 'अर्थ देखें',
      hideMeaning: 'अर्थ छिपाएं',
      aiThinking: 'शिक्षक सोच रहा है...',
      restartScenario: 'संवाद फिर से शुरू करें',
    },

    writing: {
      title: 'कन्नड़ लेखन प्रयोगशाला',
      subtitle: 'कैनवास पर उंगली से लिखने का अभ्यास, ऑडियो उच्चारण और स्ट्रोक गाइड के साथ कन्नड़ वर्णमाला (ಅಕ್ಷರಮಾಲೆ) सीखें।',
      tabVowels: 'स्वर (ಸ್ವರಗಳು - 15)',
      tabConsonants: 'व्यंजन (ವ್ಯಂಜನಗಳು - 34)',
      tabNumerals: 'अंक (ಅಂಕಿಗಳು - 10)',
      tabCombos: 'संयुक्त अक्षर (ಒತ್ತಕ್ಷರಗಳು)',
      clearBoard: 'बोर्ड साफ़ करें',
      strokeHint: 'स्ट्रोक संकेत दिखाएं',
      accuracyCheck: 'सटीकता जांचें',
      mastered: 'सीख लिया ✓',
      markMastered: 'सीखा हुआ चिह्नित करें',
      strokeGuide: 'स्ट्रोक दिशा निर्देश:',
      audioPronounce: 'ऑडियो उच्चारण',
    },

    survival: {
      title: 'सर्वाइवल मोड: आवश्यक कन्नड़',
      subtitle: 'आपातकाल, यात्रा, भोजन और अस्पताल के महत्वपूर्ण वाक्य - तुरंत सुनने और बड़ी स्क्रीन पर दिखाने के लिए तैयार।',
      searchPlaceholder: 'कन्नड़, हिंदी या अंग्रेज़ी में खोजें...',
      categories: {
        all: 'सभी',
        transport: 'परिवहन / ऑटो & बस',
        restaurants: 'होटल & खान-पान',
        shopping: 'खरीदारी & मोल-भाव',
        directions: 'रास्ता & दिशाएं',
        college: 'कॉलेज & छात्र',
        workplace: 'कार्यालय & कार्यस्थल',
        healthcare: 'स्वास्थ्य & अस्पताल',
        accommodation: 'आवास / कमरा',
        gov: 'सरकारी दफ्तर',
        emergencies: 'आपातकालीन सहायता',
      },
    },

    course: {
      title: '7-दिवसीय संरचित कन्नड़ कोर्स',
      subtitle: 'आपको पूरी तरह शुरुआत से दैनिक बातचीत में निपुण बनाने के लिए तैयार किया गया दैनिक पाठ्यक्रम।',
      day: (d: number) => `दिन ${d}`,
      lessonTab: 'आज का पाठ',
      quizTab: 'ज्ञान परख क्विज़',
      submitQuiz: 'उत्तर जमा करें',
      scoreTitle: 'क्विज़ पूरा हुआ!',
      tryAgain: 'फिर से क्विज़ दें',
      nextDayLesson: 'अगले दिन के पाठ पर जाएं',
    },

    intent: {
      title: 'मन की बात कहें: भाव और टोन अनुसार',
      subtitle: 'सही सांस्कृतिक लहजे के साथ बोलें - विनम्र, मित्रवत, पेशेवर या त्वरित।',
      placeholder: "आप क्या कहना चाहते हैं? (जैसे 'ऑटो वाले से कहें कि अगले स्टॉप पर रोक दीजिए')",
      contextLabel: 'संदर्भ / स्थान:',
      toneLabel: 'वांछित टोन:',
      generateBtn: 'कन्नड़ वाक्य बनाएं',
      generating: 'वाक्य तैयार हो रहा है...',
      examples: 'ये उदाहरण आज़माएं:',
    },

    memory: {
      title: 'मेमोरी कोच: स्मरण और अभ्यास',
      subtitle: 'इंटरैक्टिव फ्लैशकार्ड्स के साथ याददाश्त परखें। त्वरित पुनरावृत्ति से शब्दावली सीखें।',
      allCards: 'सभी फ्लैशकार्ड्स',
      listeningMode: 'सुनने की चुनौती',
      weakOnly: 'केवल अभ्यास वाले',
      flipCard: 'अर्थ देखने के लिए कार्ड पर टैप करें',
      forgot: 'भूल गए',
      difficult: 'कठिन',
      remembered: 'याद आया',
      easy: 'सरल',
      addCard: '+ नया कार्ड जोड़ें',
    },

    regional: {
      title: 'कर्नाटक क्षेत्रीय बोलियां',
      subtitle: 'बेंगलुरु, मैसूर, उत्तर कर्नाटक और तटीय कर्नाटक की वास्तविक स्थानीय बोलियां सीखें।',
      allRegions: 'सभी क्षेत्र',
      bengaluru: 'बेंगलुरु (ಬೆಂಗಳೂರು)',
      mysuru: 'मैसूर (ಮೈಸೂರು)',
      northKarnataka: 'उत्तर कर्नाटक (ಉತ್ತರ ಕರ್ನಾಟಕ)',
      coastal: 'तटीय कर्नाटक (ಕರಾವಳಿ)',
      contributeBtn: '+ स्थानीय बोली साझा करें',
    },

    ocr: {
      title: 'कन्नड़ कैमरा साइनबोर्ड स्कैनर',
      subtitle: 'कर्नाटक के सड़क साइनबोर्ड, बस बोर्ड और सूचनाओं को स्कैन करके तुरंत अनुवाद और ऑडियो उच्चारण प्राप्त करें।',
      uploadTab: 'फोटो अपलोड व स्कैन करें',
      typeTab: 'बोर्ड का नाम लिखें',
      exploreTab: 'प्रसिद्ध साइनबोर्ड देखें',
      uploadBoxTitle: 'साइनबोर्ड की फोटो अपलोड या कैप्चर करें',
      uploadBoxSub: 'सड़क बोर्ड, बस बोर्ड, बीबीएमपी सूचनाएं और मेट्रो बोर्ड का समर्थन करता है',
      scanBtn: 'साइनबोर्ड पढ़ें और अनुवाद करें',
      scanning: 'OCR से साइनबोर्ड पढ़ा जा रहा है...',
    },

    phrasebook: {
      title: 'मेरा कन्नड़ वाक्यांश संग्रह',
      subtitle: 'आपके सहेजे गए अनुवादों और आवश्यक वाक्यांशों का आपका व्यक्तिगत संग्रह।',
      searchPlaceholder: 'सहेजे गए वाक्यों में खोजें...',
      emptyTitle: 'अभी कोई सहेजा गया वाक्य नहीं है',
      emptySub: 'अनुवाद से या सर्वाइवल मोड से वाक्यों को सहेजें ताकि आप कभी भी दोहरा सकें।',
      launchFlashcards: 'मेमोरी कोच में अभ्यास करें',
    },

    progress: {
      title: 'आपकी सीखने की प्रगति',
      subtitle: 'अपनी दैनिक स्ट्रीक, वर्णमाला लेखन, पूर्ण किए गए पाठ और शब्दावली का विवरण देखें।',
      streakTitle: 'दैनिक स्ट्रीक',
      streakSub: 'लगातार दिन',
      alphabetTitle: 'वर्णमाला लेखन',
      alphabetSub: 'सीखे गए अक्षर',
      courseTitle: '7-दिवसीय कोर्स',
      courseSub: 'पूर्ण पाठ',
      savedTitle: 'शब्द बैंक',
      savedSub: 'सहेजे गए वाक्य',
      badgesTitle: 'प्राप्त उपलब्धियां और बैज',
    },

    settingsSec: {
      title: 'ऐप प्राथमिकताएं और सेटिंग्स',
      subtitle: 'अपने सीखने के अनुभव, दैनिक लक्ष्यों को अनुकूलित करें और खाता प्रबंधित करें।',
      langLabel: 'ऐप व्याख्या और इंटरफ़ेस भाषा',
      langDesc: 'व्याख्या, बटन और अर्थ के लिए भाषा चुनें (कन्नड़ पाठ अपरिवर्तित रहेगा)',
      levelLabel: 'आपकी कन्नड़ प्रवीणता स्तर',
      goalLabel: 'सीखने का मुख्य उद्देश्य',
      dailyTimeLabel: 'दैनिक समय का लक्ष्य',
      saveBtn: 'प्राथमिकताएं सहेजें',
      savedSuccess: 'सेटिंग्स सफलतापूर्वक सहेजी गईं!',
      resetProgress: 'सीखने की प्रगति रीसेट करें',
      exportData: 'सीखने का डेटा डाउनलोड करें',
    },
  },
};

export function getT(lang: SourceLanguage): TranslationDictionary {
  return translations[lang] || translations.en;
}
