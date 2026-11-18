import { RegionalExpressionItem } from '../types';

export const REGIONAL_EXPRESSIONS: RegionalExpressionItem[] = [
  // 1. Bengaluru (Urban, Tech & Street blend)
  {
    id: 'bgl-1',
    region: 'bengaluru',
    regionName: 'Bengaluru (ಬೆಂಗಳೂರು)',
    expression: 'ಸ್ವಲ್ಪ ಅಡ್ಜಸ್ಟ್ ಮಾಡಿ ಕಣ್ರೀ!',
    transliteration: 'Svalpa adjust māḍi kaṇrī!',
    meaningEn: 'Please adjust a little, friend!',
    meaningHi: 'थोड़ा एडजस्ट कर लीजिए न!',
    contextOfUse: 'Universal Bengaluru phrase used in packed BMTC buses, shared autos, and crowded tech corridors.',
    alternativeVerified: 'ಸ್ವಲ್ಪ ಹೊಂದಾಣಿಕೆ ಮಾಡಿಕೊಳ್ಳಿ (Standard literary form)',
    isVerified: true,
    usageNote: 'Blend of English "adjust" with Kannada honorific emphasis "-kaṇrī". Warm and persuasive.'
  },
  {
    id: 'bgl-2',
    region: 'bengaluru',
    regionName: 'Bengaluru (ಬೆಂಗಳೂರು)',
    expression: 'ಮೀಟರ್ ಹಾಕಿ ಬಾಸ್!',
    transliteration: 'Meter hāki boss!',
    meaningEn: 'Turn on the meter boss!',
    meaningHi: 'मीटर चालू करो बॉस!',
    contextOfUse: 'Street-smart phrase for catching autos in Koramangala, Indiranagar, and Majestic.',
    alternativeVerified: 'ಮೀಟರ್ ಹಾಕಿ ಬನ್ನಿ ಸರ್ (Polite variant)',
    isVerified: true,
    usageNote: 'Calling someone "Boss" or "Guru" is ubiquitous among youth and auto drivers in Bengaluru.'
  },
  {
    id: 'bgl-3',
    region: 'bengaluru',
    regionName: 'Bengaluru (ಬೆಂಗಳೂರು)',
    expression: 'ಸೀನ್ ಇಲ್ಲವೇ ಇಲ್ಲ ಮಚ್ಚಾ!',
    transliteration: 'Scene illavē illa machā!',
    meaningEn: 'No problem at all, bro! / Totally sorted!',
    meaningHi: 'कोई चक्कर ही नहीं है भाई!',
    contextOfUse: 'Friendly assurance among college students and young professionals.',
    alternativeVerified: 'ಯಾವ ತೊಂದರೆಯೂ ಇಲ್ಲ (Literary)',
    isVerified: true,
    usageNote: '"Macha" is friendly Bengaluru slang for bro or close friend.'
  },

  // 2. Mysuru (Heritage, Royal, Courteous)
  {
    id: 'mys-1',
    region: 'mysuru',
    regionName: 'Mysuru (ಮೈಸೂರು)',
    expression: 'ನಮಸ್ಕಾರ, ಬನ್ನಿ ಕ್ಷೇಮವಾಗಿ ಇದ್ದೀರಾ?',
    transliteration: 'Namaskāra, banni kṣēmavāgi iddīrā?',
    meaningEn: 'Greetings, welcome! Are you in good health and peace?',
    meaningHi: 'नमस्कार, आइए! क्या आप सकुशल हैं?',
    contextOfUse: 'Refined, respectful greeting reflecting Mysuru\'s royal courtly etiquette.',
    alternativeVerified: 'ಹೇಗಿದ್ದೀರಿ? (Everyday standard)',
    isVerified: true,
    usageNote: 'Mysuru Kannada is famous for gentle cadence, polite diction, and elongation of vowels.'
  },
  {
    id: 'mys-2',
    region: 'mysuru',
    regionName: 'Mysuru (ಮೈಸೂರು)',
    expression: 'ಊಟ-ತಿಂಡಿ ಎಲ್ಲ ಚೆನ್ನಾಗಿ ಆಯಿತಾ?',
    transliteration: 'Oota-tiṇḍi ella chennāgi āyitā?',
    meaningEn: 'Did you have your meals and snacks well?',
    meaningHi: 'खाना-नाश्ता सब बढ़िया से हो गया?',
    contextOfUse: 'Traditional host hospitality inquiry.',
    isVerified: true,
    usageNote: 'In Mysuru, hospitality is deeply intertwined with linguistic etiquette.'
  },

  // 3. North Karnataka (Dharwad, Hubballi, Belagavi)
  {
    id: 'nk-1',
    region: 'north_karnataka',
    regionName: 'North Karnataka (ಉತ್ತರ ಕರ್ನಾಟಕ)',
    expression: 'ಏನ್ಪಾ ಆರಾಮ ಅದೀರಿ?',
    transliteration: 'Yēnpā ārāma adīri?',
    meaningEn: 'Hey there, are you doing fine and at ease?',
    meaningHi: 'क्या भाई, सब आराम से है ना?',
    contextOfUse: 'Affectionate everyday greeting across Hubballi-Dharwad, Belagavi, and Vijayapura.',
    alternativeVerified: 'ನೀವು ಹೇಗಿದ್ದೀರಿ? (Standard)',
    isVerified: true,
    usageNote: 'North Karnataka uses "ಅದೀರಿ" (adīri) instead of "ಇದ್ದೀರಿ" (iddīri) and ends greetings with rhythmic "ಏನ್ಪಾ" (yēnpā).'
  },
  {
    id: 'nk-2',
    region: 'north_karnataka',
    regionName: 'North Karnataka (ಉತ್ತರ ಕರ್ನಾಟಕ)',
    expression: 'ಹೌದ್ರೀ, ಖರೇ ಹೇಳಕತ್ತೀನಿ!',
    transliteration: 'Haudrī, kharē hēḷakattīni!',
    meaningEn: 'Yes indeed, I am telling you the absolute truth!',
    meaningHi: 'हाँ जी, सच कह रहा हूँ!',
    contextOfUse: 'Passionate and warm North Karnataka conversation emphasizing honesty.',
    alternativeVerified: 'ಹೌದು, ನಿಜ ಹೇಳುತ್ತಿದ್ದೇನೆ (Standard)',
    isVerified: true,
    usageNote: '"ಖರೇ" (kharē) means truth/genuine, while adding "-ರೀ" (-rī) denotes respectful warmth.'
  },
  {
    id: 'nk-3',
    region: 'north_karnataka',
    regionName: 'North Karnataka (ಉತ್ತರ ಕರ್ನಾಟಕ)',
    expression: 'ಬರೀ, ನಮ್ದು ರೊಟ್ಟಿ-ಪಲ್ಯ ಉಣ್ಣೋನ್ರಿ!',
    transliteration: 'Barī, namdu roṭṭi-palya uṇṇōnri!',
    meaningEn: 'Come, let us share our Jolada rotti and curry!',
    meaningHi: 'आइए, हमारी ज्वार की रोटी और सब्ज़ी खाते हैं!',
    contextOfUse: 'Hearty culinary invitation celebrating North Karnataka\'s iconic Jolada Rotti.',
    isVerified: true,
    usageNote: '"ಉಣ್ಣುವುದು" (uṇṇuvudu) is the native Dravidian term for taking a meal.'
  },

  // 4. Coastal Karnataka (Mangaluru & Udupi)
  {
    id: 'cst-1',
    region: 'coastal',
    regionName: 'Coastal Karnataka (ಕರಾವಳಿ)',
    expression: 'ನಮ್ಮೂರಿಗೆ ಬನ್ನಿ, ಮೀನ್ ಊಟ ಮಾಡೋಣ!',
    transliteration: 'Nammūrige banni, meen oota māḍōṇa!',
    meaningEn: 'Come to our town, let us enjoy fresh coastal meals!',
    meaningHi: 'हमारे गाँव आइए, साथ में स्वादिष्ट भोजन करेंगे!',
    contextOfUse: 'Warm coastal greeting by local residents welcoming visitors to Udupi or Mangaluru.',
    isVerified: true,
    usageNote: 'Coastal Kannada carries a gentle melodic intonation influenced by Tulu and Konkani cadences.'
  },
  {
    id: 'cst-2',
    region: 'coastal',
    regionName: 'Coastal Karnataka (ಕರಾವಳಿ)',
    expression: 'ಎಂಚ ಉಲ್ಲರ್? (Tulu/Coastal Kannada blend)',
    transliteration: 'Encha ullar?',
    meaningEn: 'How are you? (Polite Tulu greeting widely understood in Coastal Kannada)',
    meaningHi: 'आप कैसे हैं?',
    contextOfUse: 'Friendly greeting across Dakshina Kannada and Udupi districts.',
    alternativeVerified: 'ಹೇಗಿದ್ದೀರಿ?',
    isVerified: true,
    usageNote: 'In Mangaluru and Udupi, Kannada speakers seamlessly weave beloved Tulu phrases into daily speech.'
  }
];
