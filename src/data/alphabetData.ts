import { AlphabetCharacter } from '../types';

export const KANNADA_VOWELS: AlphabetCharacter[] = [
  {
    id: 'vowel-1',
    category: 'vowel',
    kannada: 'ಅ',
    transliteration: 'a',
    englishPhonetic: 'Short "u" like in "cup" or "about"',
    hindiEquivalent: 'अ',
    audioText: 'ಅ',
    exampleWord: {
      kannada: 'ಅಮ್ಮ',
      transliteration: 'Amma',
      meaningEn: 'Mother',
      meaningHi: 'माँ'
    },
    strokeHint: 'Start with the top hook loop, curve down smoothly, and complete the horizontal anchor stroke.'
  },
  {
    id: 'vowel-2',
    category: 'vowel',
    kannada: 'ಆ',
    transliteration: 'ā',
    englishPhonetic: 'Long "aa" like in "father" or "car"',
    hindiEquivalent: 'आ',
    audioText: 'ಆ',
    exampleWord: {
      kannada: 'ಆನೆ',
      transliteration: 'Aane',
      meaningEn: 'Elephant',
      meaningHi: 'हाथी'
    },
    strokeHint: 'Trace "ಅ", then extend the flowing upward hook loop to the right.'
  },
  {
    id: 'vowel-3',
    category: 'vowel',
    kannada: 'ಇ',
    transliteration: 'i',
    englishPhonetic: 'Short "i" like in "pin" or "it"',
    hindiEquivalent: 'इ',
    audioText: 'ಇ',
    exampleWord: {
      kannada: 'ಇಲಿ',
      transliteration: 'Ili',
      meaningEn: 'Mouse / Rat',
      meaningHi: 'चूहा'
    },
    strokeHint: 'Draw the top loop, flow down with a gentle curve, and complete the inner arc.'
  },
  {
    id: 'vowel-4',
    category: 'vowel',
    kannada: 'ಈ',
    transliteration: 'ī',
    englishPhonetic: 'Long "ee" like in "see" or "beet"',
    hindiEquivalent: 'ई',
    audioText: 'ಈ',
    exampleWord: {
      kannada: 'ಈಜು',
      transliteration: 'Eeju',
      meaningEn: 'Swimming',
      meaningHi: 'तैरना'
    },
    strokeHint: 'Round circular body with a prominent upper decorative loop crest.'
  },
  {
    id: 'vowel-5',
    category: 'vowel',
    kannada: 'ಉ',
    transliteration: 'u',
    englishPhonetic: 'Short "u" like in "put" or "foot"',
    hindiEquivalent: 'उ',
    audioText: 'ಉ',
    exampleWord: {
      kannada: 'ಉಡುಪು',
      transliteration: 'Uḍupu',
      meaningEn: 'Dress / Garment',
      meaningHi: 'वस्त्र / पोशाक'
    },
    strokeHint: 'Resembles an elegant open curve flowing down into a rightward horizontal base.'
  },
  {
    id: 'vowel-6',
    category: 'vowel',
    kannada: 'ಊ',
    transliteration: 'ū',
    englishPhonetic: 'Long "oo" like in "moon" or "cool"',
    hindiEquivalent: 'ऊ',
    audioText: 'ಊ',
    exampleWord: {
      kannada: 'ಊಟ',
      transliteration: 'Oota',
      meaningEn: 'Meal / Lunch',
      meaningHi: 'भोजन'
    },
    strokeHint: 'Trace "ಉ" and add the distinctive top wave flourish across the crest.'
  },
  {
    id: 'vowel-7',
    category: 'vowel',
    kannada: 'ಋ',
    transliteration: 'ru / r̥',
    englishPhonetic: 'Like "ri" in "rigor" or Sanskrit "ṛ"',
    hindiEquivalent: 'ऋ',
    audioText: 'ಋ',
    exampleWord: {
      kannada: 'ಋಷಿ',
      transliteration: 'Rushi',
      meaningEn: 'Sage / Seer',
      meaningHi: 'ऋषि'
    },
    strokeHint: 'Triple-lobed traditional Sanskrit-Kannada vocalic consonant design.'
  },
  {
    id: 'vowel-8',
    category: 'vowel',
    kannada: 'ಎ',
    transliteration: 'e',
    englishPhonetic: 'Short "e" like in "bed" or "pet"',
    hindiEquivalent: 'ए (ह्रस्व)',
    audioText: 'ಎ',
    exampleWord: {
      kannada: 'ಎಲೆ',
      transliteration: 'Ele',
      meaningEn: 'Leaf',
      meaningHi: 'पत्ता'
    },
    strokeHint: 'Simple smooth teardrop curved letter starting from left hook.'
  },
  {
    id: 'vowel-9',
    category: 'vowel',
    kannada: 'ಏ',
    transliteration: 'ē',
    englishPhonetic: 'Long "ay" like in "say" or "plane"',
    hindiEquivalent: 'ए (दीर्घ)',
    audioText: 'ಏ',
    exampleWord: {
      kannada: 'ಏಣಿ',
      transliteration: 'Ēṇi',
      meaningEn: 'Ladder',
      meaningHi: 'सीढ़ी'
    },
    strokeHint: 'Similar to "ಎ" with a rising upper diagonal tick on top.'
  },
  {
    id: 'vowel-10',
    category: 'vowel',
    kannada: 'ಐ',
    transliteration: 'ai',
    englishPhonetic: 'Diphthong "ai" like in "my" or "eye"',
    hindiEquivalent: 'ऐ',
    audioText: 'ಐ',
    exampleWord: {
      kannada: 'ಐದು',
      transliteration: 'Aidu',
      meaningEn: 'Five (5)',
      meaningHi: 'पाँच'
    },
    strokeHint: 'Double curved flow with a distinctive bottom right return stroke.'
  },
  {
    id: 'vowel-11',
    category: 'vowel',
    kannada: 'ಒ',
    transliteration: 'o',
    englishPhonetic: 'Short "o" like in "omit" or "boat" (short)',
    hindiEquivalent: 'ओ (ह्रस्व)',
    audioText: 'ಒ',
    exampleWord: {
      kannada: 'ಒಂದು',
      transliteration: 'Ondu',
      meaningEn: 'One (1)',
      meaningHi: 'एक'
    },
    strokeHint: 'Looping figure-eight-like gentle curves on top with an open right side.'
  },
  {
    id: 'vowel-12',
    category: 'vowel',
    kannada: 'ಓ',
    transliteration: 'ō',
    englishPhonetic: 'Long "oh" like in "go" or "home"',
    hindiEquivalent: 'ओ (दीर्घ)',
    audioText: 'ಓ',
    exampleWord: {
      kannada: 'ಓದು',
      transliteration: 'Ōdu',
      meaningEn: 'Read / Study',
      meaningHi: 'पढ़ना'
    },
    strokeHint: 'Trace "ಒ" with a high upward extending antenna stroke.'
  },
  {
    id: 'vowel-13',
    category: 'vowel',
    kannada: 'ಔ',
    transliteration: 'au',
    englishPhonetic: 'Diphthong "ow" like in "cow" or "now"',
    hindiEquivalent: 'औ',
    audioText: 'ಔ',
    exampleWord: {
      kannada: 'ಔಷಧಿ',
      transliteration: 'Auṣadhi',
      meaningEn: 'Medicine',
      meaningHi: 'दवा / औषधि'
    },
    strokeHint: 'Compound vowel character with side-by-side balanced loops.'
  },
  {
    id: 'vowel-14',
    category: 'vowel',
    subType: 'yogavahaka',
    kannada: 'ಅಂ',
    transliteration: 'am',
    englishPhonetic: 'Anusvāra nasal "am" like in "sum"',
    hindiEquivalent: 'अं (अनुस्वार)',
    audioText: 'ಅಂ',
    exampleWord: {
      kannada: 'ಅಂಗಡಿ',
      transliteration: 'Angaḍi',
      meaningEn: 'Shop / Store',
      meaningHi: 'दुकान'
    },
    strokeHint: 'Standard "ಅ" body with the small circular Anusvāra dot (೦) to the right.'
  },
  {
    id: 'vowel-15',
    category: 'vowel',
    subType: 'yogavahaka',
    kannada: 'ಅಃ',
    transliteration: 'aha',
    englishPhonetic: 'Visarga breath "aha" like in "aha!"',
    hindiEquivalent: 'अः (विसर्ग)',
    audioText: 'ಅಃ',
    exampleWord: {
      kannada: 'ನಮಃ',
      transliteration: 'Namaha',
      meaningEn: 'Salutations / Respect',
      meaningHi: 'नमन / नमस्कार'
    },
    strokeHint: 'Standard "ಅ" followed by two vertical Visarga dots (ಃ) on the right.'
  }
];

export const KANNADA_CONSONANTS: AlphabetCharacter[] = [
  // --- ಕ-ವರ್ಗ (Velar / ಕಂಠ್ಯ) ---
  {
    id: 'cons-ka',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಕ-ವರ್ಗ (Velar)',
    kannada: 'ಕ',
    transliteration: 'ka',
    englishPhonetic: 'Soft "k" like in "kite"',
    hindiEquivalent: 'क',
    audioText: 'ಕ',
    exampleWord: {
      kannada: 'ಕನ್ನಡ',
      transliteration: 'Kannaḍa',
      meaningEn: 'Kannada language',
      meaningHi: 'कन्नड़ भाषा'
    },
    strokeHint: 'Center horizontal arc curving downward with an anchor loop.'
  },
  {
    id: 'cons-kha',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಕ-ವರ್ಗ (Velar)',
    kannada: 'ಖ',
    transliteration: 'kha',
    englishPhonetic: 'Aspirated "kh" like in "khaki"',
    hindiEquivalent: 'ख',
    audioText: 'ಖ',
    exampleWord: {
      kannada: 'ಖಡ್ಗ',
      transliteration: 'Khaḍga',
      meaningEn: 'Sword',
      meaningHi: 'तलवार'
    },
    strokeHint: 'Curved loop with downward stroke and sharp aspiration notch beneath.'
  },
  {
    id: 'cons-ga',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಕ-ವರ್ಗ (Velar)',
    kannada: 'ಗ',
    transliteration: 'ga',
    englishPhonetic: 'Voiced "g" like in "go"',
    hindiEquivalent: 'ग',
    audioText: 'ಗ',
    exampleWord: {
      kannada: 'ಗಂಟೆ',
      transliteration: 'Gaṇṭe',
      meaningEn: 'Bell / Hour',
      meaningHi: 'घंटी / घंटा'
    },
    strokeHint: 'Smooth horseshoe arch with an open base.'
  },
  {
    id: 'cons-gha',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಕ-ವರ್ಗ (Velar)',
    kannada: 'ಘ',
    transliteration: 'gha',
    englishPhonetic: 'Breathy "gh" like in "ghost"',
    hindiEquivalent: 'घ',
    audioText: 'ಘ',
    exampleWord: {
      kannada: 'ಘಟ',
      transliteration: 'Ghaṭa',
      meaningEn: 'Earthen Pot',
      meaningHi: 'घड़ा'
    },
    strokeHint: 'Resembles "ಗ" with a center vertical aspiration slash line in middle.'
  },
  {
    id: 'cons-nga',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಕ-ವರ್ಗ (Velar)',
    kannada: 'ಙ',
    transliteration: 'ṅa',
    englishPhonetic: 'Velar nasal "ng" like in "song"',
    hindiEquivalent: 'ङ',
    audioText: 'ಙ',
    exampleWord: {
      kannada: 'ವಾಙ್ಮಯ',
      transliteration: 'Vāṅmaya',
      meaningEn: 'Literature / Lore',
      meaningHi: 'साहित्य'
    },
    strokeHint: 'Gentle wavy curve with lower curl and top talakattu mark.'
  },

  // --- ಚ-ವರ್ಗ (Palatal / ತಾಲವ್ಯ) ---
  {
    id: 'cons-cha',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಚ-ವರ್ಗ (Palatal)',
    kannada: 'ಚ',
    transliteration: 'cha',
    englishPhonetic: 'Soft "ch" like in "chair"',
    hindiEquivalent: 'च',
    audioText: 'ಚ',
    exampleWord: {
      kannada: 'ಚಮಚ',
      transliteration: 'Chamacha',
      meaningEn: 'Spoon',
      meaningHi: 'चम्मच'
    },
    strokeHint: 'Gentle wavy curve with upper decorative talakattu crest.'
  },
  {
    id: 'cons-chha',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಚ-ವರ್ಗ (Palatal)',
    kannada: 'ಛ',
    transliteration: 'chha',
    englishPhonetic: 'Aspirated "chh" like in "match-house"',
    hindiEquivalent: 'छ',
    audioText: 'ಛ',
    exampleWord: {
      kannada: 'ಛತ್ರಿ',
      transliteration: 'Chatri',
      meaningEn: 'Umbrella',
      meaningHi: 'छाता'
    },
    strokeHint: 'Like "ಚ" with a downward aspiration vertical stroke underneath.'
  },
  {
    id: 'cons-ja',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಚ-ವರ್ಗ (Palatal)',
    kannada: 'ಜ',
    transliteration: 'ja',
    englishPhonetic: 'Voiced "j" like in "jar"',
    hindiEquivalent: 'ज',
    audioText: 'ಜ',
    exampleWord: {
      kannada: 'ಜನ',
      transliteration: 'Jana',
      meaningEn: 'People',
      meaningHi: 'लोग / जन'
    },
    strokeHint: 'Double arch with top right tail and upper loop.'
  },
  {
    id: 'cons-jha',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಚ-ವರ್ಗ (Palatal)',
    kannada: 'ಝ',
    transliteration: 'jha',
    englishPhonetic: 'Breathy "jh" like in "hedge-hop"',
    hindiEquivalent: 'झ',
    audioText: 'ಝ',
    exampleWord: {
      kannada: 'ಝರಿ',
      transliteration: 'Jhari',
      meaningEn: 'Spring / Waterfall',
      meaningHi: 'झरना'
    },
    strokeHint: 'Triple-curved body with aspiration indicator at bottom.'
  },
  {
    id: 'cons-nya',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಚ-ವರ್ಗ (Palatal)',
    kannada: 'ಞ',
    transliteration: 'ña',
    englishPhonetic: 'Palatal nasal like Spanish "ñ" in "señor"',
    hindiEquivalent: 'ञ',
    audioText: 'ಞ',
    exampleWord: {
      kannada: 'ಜ್ಞಾನ',
      transliteration: 'Jñāna',
      meaningEn: 'Knowledge / Wisdom',
      meaningHi: 'ज्ञान'
    },
    strokeHint: 'Distinctive hooked curve with side anchor loop.'
  },

  // --- ಟ-ವರ್ಗ (Retroflex / ಮೂರ್ಧನ್ಯ) ---
  {
    id: 'cons-tta',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಟ-ವರ್ಗ (Retroflex)',
    kannada: 'ಟ',
    transliteration: 'ṭa',
    englishPhonetic: 'Retroflex "t" (tongue curled to roof of mouth)',
    hindiEquivalent: 'ट',
    audioText: 'ಟ',
    exampleWord: {
      kannada: 'ಟೊಮೆಟೊ',
      transliteration: 'Ṭomeṭo',
      meaningEn: 'Tomato',
      meaningHi: 'टमाटर'
    },
    strokeHint: 'Circular body with a distinctive open mouth on the right.'
  },
  {
    id: 'cons-ttha',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಟ-ವರ್ಗ (Retroflex)',
    kannada: 'ಠ',
    transliteration: 'ṭha',
    englishPhonetic: 'Aspirated retroflex "ṭh"',
    hindiEquivalent: 'ठ',
    audioText: 'ಠ',
    exampleWord: {
      kannada: 'ಠಸ್ಸೆ',
      transliteration: 'Ṭhasse',
      meaningEn: 'Stamp / Seal',
      meaningHi: 'ठप्पा / मुहर'
    },
    strokeHint: 'Round circle with a center dot and top decorative mark.'
  },
  {
    id: 'cons-dda',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಟ-ವರ್ಗ (Retroflex)',
    kannada: 'ಡ',
    transliteration: 'ḍa',
    englishPhonetic: 'Retroflex "d" like in "drum"',
    hindiEquivalent: 'ड',
    audioText: 'ಡ',
    exampleWord: {
      kannada: 'ಡಬ್ಬಿ',
      transliteration: 'Ḍabbi',
      meaningEn: 'Small box / tin',
      meaningHi: 'डिब्बा'
    },
    strokeHint: 'Graceful S-curve retroflex shape with top talakattu.'
  },
  {
    id: 'cons-ddha',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಟ-ವರ್ಗ (Retroflex)',
    kannada: 'ಢ',
    transliteration: 'ḍha',
    englishPhonetic: 'Aspirated retroflex "ḍh"',
    hindiEquivalent: 'ढ',
    audioText: 'ಢ',
    exampleWord: {
      kannada: 'ಢೋಲು',
      transliteration: 'Ḍhōlu',
      meaningEn: 'Large Drum',
      meaningHi: 'ढोल'
    },
    strokeHint: 'Like "ಡ" with an aspiration vertical stroke below.'
  },
  {
    id: 'cons-nna',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಟ-ವರ್ಗ (Retroflex)',
    kannada: 'ಣ',
    transliteration: 'ṇa',
    englishPhonetic: 'Retroflex "n" (tongue curled back)',
    hindiEquivalent: 'ण',
    audioText: 'ಣ',
    exampleWord: {
      kannada: 'ಬಾಣ',
      transliteration: 'Bāṇa',
      meaningEn: 'Arrow',
      meaningHi: 'बाण / तीर'
    },
    strokeHint: 'Triple-looped open curve flowing horizontally.'
  },

  // --- ತ-ವರ್ಗ (Dental / ದಂತ್ಯ) ---
  {
    id: 'cons-ta',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ತ-ವರ್ಗ (Dental)',
    kannada: 'ತ',
    transliteration: 'ta',
    englishPhonetic: 'Dental "t" with tongue touching upper teeth',
    hindiEquivalent: 'त',
    audioText: 'ತ',
    exampleWord: {
      kannada: 'ತಲೆ',
      transliteration: 'Tale',
      meaningEn: 'Head',
      meaningHi: 'सिर'
    },
    strokeHint: 'Upper loop curving down into a gentle rightward tail.'
  },
  {
    id: 'cons-tha',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ತ-ವರ್ಗ (Dental)',
    kannada: 'ಥ',
    transliteration: 'tha',
    englishPhonetic: 'Aspirated dental "th" like in "thin"',
    hindiEquivalent: 'थ',
    audioText: 'ಥ',
    exampleWord: {
      kannada: 'ರಥ',
      transliteration: 'Ratha',
      meaningEn: 'Chariot',
      meaningHi: 'रथ'
    },
    strokeHint: 'Like "ತ" with center loop dot and lower aspiration stroke.'
  },
  {
    id: 'cons-da',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ತ-ವರ್ಗ (Dental)',
    kannada: 'ದ',
    transliteration: 'da',
    englishPhonetic: 'Dental "d" like in "the" or Hindi "द"',
    hindiEquivalent: 'द',
    audioText: 'ದ',
    exampleWord: {
      kannada: 'ದೋಸೆ',
      transliteration: 'Dōse',
      meaningEn: 'Dosa (crisp crepe)',
      meaningHi: 'डोसा'
    },
    strokeHint: 'Rounded hook arch resembling an open bowl.'
  },
  {
    id: 'cons-dha',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ತ-ವರ್ಗ (Dental)',
    kannada: 'ಧ',
    transliteration: 'dha',
    englishPhonetic: 'Aspirated dental "dh"',
    hindiEquivalent: 'ध',
    audioText: 'ಧ',
    exampleWord: {
      kannada: 'ಧನುಸ್ಸು',
      transliteration: 'Dhanussu',
      meaningEn: 'Bow (archery)',
      meaningHi: 'धनुष'
    },
    strokeHint: 'Like "ದ" with center dividing dot and lower vertical stroke.'
  },
  {
    id: 'cons-na',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ತ-ವರ್ಗ (Dental)',
    kannada: 'ನ',
    transliteration: 'na',
    englishPhonetic: 'Dental "n" like in "nut"',
    hindiEquivalent: 'न',
    audioText: 'ನ',
    exampleWord: {
      kannada: 'ನೀರು',
      transliteration: 'Neeru',
      meaningEn: 'Water',
      meaningHi: 'पानी'
    },
    strokeHint: 'Resembles an inverted heart arc with right foot.'
  },

  // --- ಪ-ವರ್ಗ (Labial / ಓಷ್ಠ್ಯ) ---
  {
    id: 'cons-pa',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಪ-ವರ್ಗ (Labial)',
    kannada: 'ಪ',
    transliteration: 'pa',
    englishPhonetic: 'Soft "p" with lips pressed',
    hindiEquivalent: 'प',
    audioText: 'ಪ',
    exampleWord: {
      kannada: 'ಪಾರಿವಾಳ',
      transliteration: 'Pārivāḷa',
      meaningEn: 'Pigeon',
      meaningHi: 'कबूतर'
    },
    strokeHint: 'U-shape curve with top tick mark.'
  },
  {
    id: 'cons-pha',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಪ-ವರ್ಗ (Labial)',
    kannada: 'ಫ',
    transliteration: 'pha',
    englishPhonetic: 'Aspirated "ph" like in "photo"',
    hindiEquivalent: 'फ',
    audioText: 'ಫ',
    exampleWord: {
      kannada: 'ಫಲ',
      transliteration: 'Phala',
      meaningEn: 'Fruit / Result',
      meaningHi: 'फल'
    },
    strokeHint: 'Like "ಪ" with center dividing stroke or aspiration tick.'
  },
  {
    id: 'cons-ba',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಪ-ವರ್ಗ (Labial)',
    kannada: 'ಬ',
    transliteration: 'ba',
    englishPhonetic: 'Voiced "b" like in "bus"',
    hindiEquivalent: 'ब',
    audioText: 'ಬ',
    exampleWord: {
      kannada: 'ಬಸ್ಸು',
      transliteration: 'Bassu',
      meaningEn: 'Bus',
      meaningHi: 'बस'
    },
    strokeHint: 'Circular loop with top flag crest.'
  },
  {
    id: 'cons-bha',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಪ-ವರ್ಗ (Labial)',
    kannada: 'ಭ',
    transliteration: 'bha',
    englishPhonetic: 'Breathy "bh" like in "Bharat"',
    hindiEquivalent: 'भ',
    audioText: 'ಭ',
    exampleWord: {
      kannada: 'ಭಾರತ',
      transliteration: 'Bhārata',
      meaningEn: 'India',
      meaningHi: 'भारत'
    },
    strokeHint: 'Like "ಬ" with a lower vertical aspiration stroke.'
  },
  {
    id: 'cons-ma',
    category: 'consonant',
    subType: 'vargiya',
    varga: 'ಪ-ವರ್ಗ (Labial)',
    kannada: 'ಮ',
    transliteration: 'ma',
    englishPhonetic: 'Voiced "m" like in "mother"',
    hindiEquivalent: 'म',
    audioText: 'ಮ',
    exampleWord: {
      kannada: 'ಮನೆ',
      transliteration: 'Mane',
      meaningEn: 'House / Home',
      meaningHi: 'घर'
    },
    strokeHint: 'Small center loop flowing downward to lower open bowl.'
  },

  // --- ಅವರ್ಗೀಯ ವ್ಯಂಜನಗಳು (Avargiya Consonants - Semivowels, Sibilants, Aspirates) ---
  {
    id: 'cons-ya',
    category: 'consonant',
    subType: 'avargiya',
    varga: 'ಅವರ್ಗೀಯ (Avargiya)',
    kannada: 'ಯ',
    transliteration: 'ya',
    englishPhonetic: 'Palatal semivowel "y" like in "yes"',
    hindiEquivalent: 'य',
    audioText: 'ಯ',
    exampleWord: {
      kannada: 'ಯಜ್ಞ',
      transliteration: 'Yajña',
      meaningEn: 'Sacred Ritual',
      meaningHi: 'यज्ञ'
    },
    strokeHint: 'Broad base bowl with large center circle inside.'
  },
  {
    id: 'cons-ra',
    category: 'consonant',
    subType: 'avargiya',
    varga: 'ಅವರ್ಗೀಯ (Avargiya)',
    kannada: 'ರ',
    transliteration: 'ra',
    englishPhonetic: 'Tapped "r" like in Spanish "pero"',
    hindiEquivalent: 'र',
    audioText: 'ರ',
    exampleWord: {
      kannada: 'ರಸ್ತೆ',
      transliteration: 'Raste',
      meaningEn: 'Road / Street',
      meaningHi: 'सड़क'
    },
    strokeHint: 'Clean circle with top headmark tick.'
  },
  {
    id: 'cons-la',
    category: 'consonant',
    subType: 'avargiya',
    varga: 'ಅವರ್ಗೀಯ (Avargiya)',
    kannada: 'ಲ',
    transliteration: 'la',
    englishPhonetic: 'Clear "l" like in "love"',
    hindiEquivalent: 'ल',
    audioText: 'ಲ',
    exampleWord: {
      kannada: 'ಲಡ್ಡು',
      transliteration: 'Laḍḍu',
      meaningEn: 'Laddu (sweet dessert)',
      meaningHi: 'लड्डू'
    },
    strokeHint: 'Double arch base flowing smoothly upward.'
  },
  {
    id: 'cons-va',
    category: 'consonant',
    subType: 'avargiya',
    varga: 'ಅವರ್ಗೀಯ (Avargiya)',
    kannada: 'ವ',
    transliteration: 'va',
    englishPhonetic: 'Labiodental "v/w" like in "vine"',
    hindiEquivalent: 'व',
    audioText: 'ವ',
    exampleWord: {
      kannada: 'ವನ',
      transliteration: 'Vana',
      meaningEn: 'Forest / Woods',
      meaningHi: 'वन / जंगल'
    },
    strokeHint: 'Round circular body with top headmark crest.'
  },
  {
    id: 'cons-sha',
    category: 'consonant',
    subType: 'avargiya',
    varga: 'ಅವರ್ಗೀಯ (Avargiya)',
    kannada: 'ಶ',
    transliteration: 'śa',
    englishPhonetic: 'Palatal "sh" like in "sugar"',
    hindiEquivalent: 'श',
    audioText: 'ಶ',
    exampleWord: {
      kannada: 'ಶಂಖ',
      transliteration: 'Śaṅkha',
      meaningEn: 'Conch shell',
      meaningHi: 'शंख'
    },
    strokeHint: 'Graceful curve with inner knot loop on left.'
  },
  {
    id: 'cons-ssha',
    category: 'consonant',
    subType: 'avargiya',
    varga: 'ಅವರ್ಗೀಯ (Avargiya)',
    kannada: 'ಷ',
    transliteration: 'ṣa',
    englishPhonetic: 'Retroflex "sh" with tongue curled back',
    hindiEquivalent: 'ष',
    audioText: 'ಷ',
    exampleWord: {
      kannada: 'ಷಟ್ಕೋನ',
      transliteration: 'Ṣaṭkōna',
      meaningEn: 'Hexagon',
      meaningHi: 'षट्कोण'
    },
    strokeHint: 'Similar to "ಪ" with a diagonal inner cross stroke.'
  },
  {
    id: 'cons-sa',
    category: 'consonant',
    subType: 'avargiya',
    varga: 'ಅವರ್ಗೀಯ (Avargiya)',
    kannada: 'ಸ',
    transliteration: 'sa',
    englishPhonetic: 'Dental "s" like in "sun"',
    hindiEquivalent: 'स',
    audioText: 'ಸ',
    exampleWord: {
      kannada: 'ಸೂರ್ಯ',
      transliteration: 'Sūrya',
      meaningEn: 'Sun',
      meaningHi: 'सूर्य'
    },
    strokeHint: 'Circular base flowing into an upward arch.'
  },
  {
    id: 'cons-ha',
    category: 'consonant',
    subType: 'avargiya',
    varga: 'ಅವರ್ಗೀಯ (Avargiya)',
    kannada: 'ಹ',
    transliteration: 'ha',
    englishPhonetic: 'Voiced "h" like in "hat"',
    hindiEquivalent: 'ह',
    audioText: 'ಹ',
    exampleWord: {
      kannada: 'ಹಣ',
      transliteration: 'Haṇa',
      meaningEn: 'Money',
      meaningHi: 'पैसे / धन'
    },
    strokeHint: 'Broad looping crest with right base arc.'
  },
  {
    id: 'cons-lla',
    category: 'consonant',
    subType: 'avargiya',
    varga: 'ಅವರ್ಗೀಯ (Avargiya)',
    kannada: 'ಳ',
    transliteration: 'ḷa',
    englishPhonetic: 'Retroflex "l" (distinctive South Indian curled tongue "L")',
    hindiEquivalent: 'ळ / ऴ',
    audioText: 'ಳ',
    exampleWord: {
      kannada: 'ಬಾಳೆಹಣ್ಣು',
      transliteration: 'Bāḷehaṇṇu',
      meaningEn: 'Banana',
      meaningHi: 'केला'
    },
    strokeHint: 'Double curved arch with high flourishing right loop.'
  }
];

export const KANNADA_ALL_LETTERS: AlphabetCharacter[] = [
  ...KANNADA_VOWELS,
  ...KANNADA_CONSONANTS
];

export const KANNADA_NUMERALS: AlphabetCharacter[] = [
  {
    id: 'num-0',
    category: 'numeral',
    kannada: '೦',
    transliteration: 'sonne (0)',
    englishPhonetic: 'Zero',
    hindiEquivalent: '० (शून्य)',
    audioText: 'ಸೊನ್ನೆ',
    numeralValue: 0,
    exampleWord: {
      kannada: 'ಸೊನ್ನೆ',
      transliteration: 'Sonne',
      meaningEn: 'Zero',
      meaningHi: 'शून्य'
    },
    strokeHint: 'Small clean circle representing zero.'
  },
  {
    id: 'num-1',
    category: 'numeral',
    kannada: '೧',
    transliteration: 'ondu (1)',
    englishPhonetic: 'One',
    hindiEquivalent: '१ (एक)',
    audioText: 'ಒಂದು',
    numeralValue: 1,
    exampleWord: {
      kannada: 'ಒಂದು ರೂಪಾಯಿ',
      transliteration: 'Ondu rūpāyi',
      meaningEn: 'One Rupee',
      meaningHi: 'एक रुपया'
    },
    strokeHint: 'Starts as a clockwise spiral hook ending downward.'
  },
  {
    id: 'num-2',
    category: 'numeral',
    kannada: '೨',
    transliteration: 'eraḍu (2)',
    englishPhonetic: 'Two',
    hindiEquivalent: '२ (दो)',
    audioText: 'ಎರಡು',
    numeralValue: 2,
    exampleWord: {
      kannada: 'ಎರಡು ಇಡ್ಲಿ',
      transliteration: 'Eraḍu iḍli',
      meaningEn: 'Two idlis',
      meaningHi: 'दो इडली'
    },
    strokeHint: 'Double upper curve tapering down to base.'
  },
  {
    id: 'num-3',
    category: 'numeral',
    kannada: '೩',
    transliteration: 'mūru (3)',
    englishPhonetic: 'Three',
    hindiEquivalent: '३ (तीन)',
    audioText: 'ಮೂರು',
    numeralValue: 3,
    exampleWord: {
      kannada: 'ಮೂರು ಗಂಟೆ',
      transliteration: 'Mūru gaṇṭe',
      meaningEn: '3 o\'clock',
      meaningHi: 'तीन बजे'
    },
    strokeHint: 'Two stacked curved lobes flowing downward.'
  },
  {
    id: 'num-4',
    category: 'numeral',
    kannada: '೪',
    transliteration: 'nālku (4)',
    englishPhonetic: 'Four',
    hindiEquivalent: '४ (चार)',
    audioText: 'ನಾಲ್ಕು',
    numeralValue: 4,
    exampleWord: {
      kannada: 'ನಾಲ್ಕು ಜನ',
      transliteration: 'Nālku jana',
      meaningEn: 'Four people',
      meaningHi: 'चार लोग'
    },
    strokeHint: 'Resembles a graceful continuous loop.'
  },
  {
    id: 'num-5',
    category: 'numeral',
    kannada: '೫',
    transliteration: 'aidu (5)',
    englishPhonetic: 'Five',
    hindiEquivalent: '५ (पाँच)',
    audioText: 'ಐದು',
    numeralValue: 5,
    exampleWord: {
      kannada: 'ಐದು ನಿಮಿಷ',
      transliteration: 'Aidu nimiṣa',
      meaningEn: 'Five minutes',
      meaningHi: 'पाँच मिनट'
    },
    strokeHint: 'Looping bottom bowl with high top crest.'
  },
  {
    id: 'num-6',
    category: 'numeral',
    kannada: '೬',
    transliteration: 'āru (6)',
    englishPhonetic: 'Six',
    hindiEquivalent: '६ (छह)',
    audioText: 'ಆರು',
    numeralValue: 6,
    exampleWord: {
      kannada: 'ಆರು ಕಿಲೋಮೀಟರ್',
      transliteration: 'Aaru kilometer',
      meaningEn: 'Six kilometers',
      meaningHi: 'छह किलोमीटर'
    },
    strokeHint: 'Resembles the letter "ಇ" in form.'
  },
  {
    id: 'num-7',
    category: 'numeral',
    kannada: '೭',
    transliteration: 'ēḷu (7)',
    englishPhonetic: 'Seven',
    hindiEquivalent: '७ (सात)',
    audioText: 'ಏಳು',
    numeralValue: 7,
    exampleWord: {
      kannada: 'ಏಳು ದಿನ',
      transliteration: 'Ēḷu dina',
      meaningEn: 'Seven days (one week)',
      meaningHi: 'सात दिन'
    },
    strokeHint: 'Flowing right loop with upper horizontal bar.'
  },
  {
    id: 'num-8',
    category: 'numeral',
    kannada: '೮',
    transliteration: 'eṇṭu (8)',
    englishPhonetic: 'Eight',
    hindiEquivalent: '८ (आठ)',
    audioText: 'ಎಂಟು',
    numeralValue: 8,
    exampleWord: {
      kannada: 'ಎಂಟು ರೂಪಾಯಿ',
      transliteration: 'Eṇṭu rūpāyi',
      meaningEn: 'Eight rupees',
      meaningHi: 'आठ रुपये'
    },
    strokeHint: 'Resembles a bowl with a vertical division stroke.'
  },
  {
    id: 'num-9',
    category: 'numeral',
    kannada: '೯',
    transliteration: 'ombattu (9)',
    englishPhonetic: 'Nine',
    hindiEquivalent: '९ (नौ)',
    audioText: 'ಒಂಬತ್ತು',
    numeralValue: 9,
    exampleWord: {
      kannada: 'ಒಂಬತ್ತು ಗಂಟೆ',
      transliteration: 'Ombattu gaṇṭe',
      meaningEn: '9 o\'clock',
      meaningHi: 'नौ बजे'
    },
    strokeHint: 'Upward curved flourish.'
  },
  {
    id: 'num-10',
    category: 'numeral',
    kannada: '೧೦',
    transliteration: 'hattu (10)',
    englishPhonetic: 'Ten',
    hindiEquivalent: '१० (दस)',
    audioText: 'ಹತ್ತು',
    numeralValue: 10,
    exampleWord: {
      kannada: 'ಹತ್ತು ರೂಪಾಯಿ',
      transliteration: 'Hattu rūpāyi',
      meaningEn: 'Ten Rupees',
      meaningHi: 'दस रुपये'
    },
    strokeHint: 'One (೧) placed next to zero (೦).'
  }
];

export const KANNADA_COMBINATIONS: AlphabetCharacter[] = [
  {
    id: 'comb-1',
    category: 'combination',
    kannada: 'ಕಾ',
    transliteration: 'kā',
    englishPhonetic: 'Consonant ಕ + vowel ಆ',
    hindiEquivalent: 'का',
    audioText: 'ಕಾ',
    exampleWord: {
      kannada: 'ಕಾಫಿ',
      transliteration: 'Kāphi',
      meaningEn: 'Coffee',
      meaningHi: 'कॉफ़ी'
    },
    strokeHint: 'Base "ಕ" with an extended right curve flourish.'
  },
  {
    id: 'comb-2',
    category: 'combination',
    kannada: 'ಕಿ',
    transliteration: 'ki',
    englishPhonetic: 'Consonant ಕ + vowel ಇ',
    hindiEquivalent: 'कि',
    audioText: 'ಕಿ',
    exampleWord: {
      kannada: 'ಕಿಟಕಿ',
      transliteration: 'Kiṭaki',
      meaningEn: 'Window',
      meaningHi: 'खिड़की'
    },
    strokeHint: 'Base "ಕ" with a top rounded arch loop.'
  },
  {
    id: 'comb-3',
    category: 'combination',
    kannada: 'ಕೀ',
    transliteration: 'kī',
    englishPhonetic: 'Consonant ಕ + vowel ಈ',
    hindiEquivalent: 'की',
    audioText: 'ಕೀ',
    exampleWord: {
      kannada: 'ಕೀಲಿ',
      transliteration: 'Kīli',
      meaningEn: 'Key',
      meaningHi: 'चाबी'
    },
    strokeHint: 'Base "ಕ" with an elongated swirl on the crest.'
  },
  {
    id: 'comb-4',
    category: 'combination',
    kannada: 'ಕು',
    transliteration: 'ku',
    englishPhonetic: 'Consonant ಕ + vowel ಉ',
    hindiEquivalent: 'कु',
    audioText: 'ಕು',
    exampleWord: {
      kannada: 'ಕುರ್ಚಿ',
      transliteration: 'Kurchi',
      meaningEn: 'Chair',
      meaningHi: 'कुर्सी'
    },
    strokeHint: 'Base "ಕ" with bottom right hook extension.'
  }
];
