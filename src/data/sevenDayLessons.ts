import { DayLesson } from '../types';

export const SEVEN_DAY_LESSONS: DayLesson[] = [
  {
    day: 1,
    title: 'Greetings & Kannada Vowels',
    titleKannada: 'ಅಭಿವಾದನಗಳು ಮತ್ತು ಸ್ವರಗಳು',
    objective: 'Learn respectful daily greetings and master the foundational Kannada vowel sounds (Svaragaḷu).',
    lessonContent: [
      {
        heading: '1. Respectful Greetings',
        description: 'Kannada culture places high value on respectful greetings. Always greet elders and acquaintances with warmth.',
        examples: [
          { kannada: 'ನಮಸ್ಕಾರ', transliteration: 'Namaskāra', meaningEn: 'Hello / Greetings (Folded hands)', meaningHi: 'नमस्ते / प्रणाम' },
          { kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', transliteration: 'Nīvu hēgiddīri?', meaningEn: 'How are you? (Polite / Respectful)', meaningHi: 'आप कैसे हैं?' },
          { kannada: 'ನಾನು ಆರಾಮಾಗಿದ್ದೇನೆ.', transliteration: 'Nānu ārāmāgiddēne.', meaningEn: 'I am doing well / fine.', meaningHi: 'मैं ठीक हूँ / सकुशल हूँ।' },
          { kannada: 'ಶುಭ ಮುಂಜಾನೆ', transliteration: 'Shubha munjāne', meaningEn: 'Good morning', meaningHi: 'शुभ प्रभात' }
        ]
      },
      {
        heading: '2. Foundational Vowels (ಸ್ವರಗಳು)',
        description: 'The Kannada alphabet starts with 15 vowels called Svaragalu. The core sounds match Hindi and Sanskrit closely.',
        examples: [
          { kannada: 'ಅ (a) - ಅಮ್ಮ', transliteration: 'Amma', meaningEn: 'Mother', meaningHi: 'माँ' },
          { kannada: 'ಆ (ā) - ಆನೆ', transliteration: 'Aane', meaningEn: 'Elephant', meaningHi: 'हाथी' },
          { kannada: 'ಇ (i) - ಇಲಿ', transliteration: 'Ili', meaningEn: 'Mouse', meaningHi: 'चूहा' },
          { kannada: 'ಈ (ī) - ಈಜು', transliteration: 'Eeju', meaningEn: 'Swimming', meaningHi: 'तैरना' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'How do you politely ask "How are you?" in Kannada?',
        questionHi: 'कन्नड़ में आदरपूर्वक "आप कैसे हैं?" कैसे पूछते हैं?',
        options: ['ನೀವು ಹೇಗಿದ್ದೀರಿ? (Nīvu hēgiddīri?)', 'ಎಲ್ಲಿ ಹೋಗ್ತೀರಿ? (Elli hōgtīri?)', 'ಊಟ ಆಯ್ತಾ? (Oota aaythā?)', 'ಯಾರು ನೀವು? (Yāru nīvu?)'],
        correctIndex: 0,
        explanation: '"ನೀವು ಹೇಗಿದ್ದೀರಿ?" (Nīvu hēgiddīri?) is the polite standard way to ask "How are you?"',
        explanationHi: '"ನೀವು ಹೇಗಿದ್ದೀರಿ?" (नीवु हेगिद्दीरि?) आदरपूर्वक "आप कैसे हैं?" पूछने का सही वाक्य है।'
      },
      {
        id: 'q1-2',
        question: 'What does "ಶುಭ ಮುಂಜಾನೆ" (Shubha munjāne) mean?',
        questionHi: '"ಶುಭ ಮುಂಜಾನೆ" (शुभ मुंजाने) का क्या अर्थ है?',
        options: ['Good night', 'Good morning', 'Thank you', 'Goodbye'],
        correctIndex: 1,
        explanation: '"ಶುಭ ಮುಂಜಾನೆ" means Good Morning in Kannada.',
        explanationHi: '"ಶುಭ ಮುಂಜಾನೆ" का अर्थ शुभ प्रभात (Good Morning) होता है।'
      }
    ]
  },
  {
    day: 2,
    title: 'Basic Consonants & Self-Introduction',
    titleKannada: 'ವ್ಯಂಜನಗಳು ಮತ್ತು ಪರಿಚಯ',
    objective: 'Introduce yourself confidently in Kannada with your name, profession, and hometown.',
    lessonContent: [
      {
        heading: '1. Introducing Your Name & Background',
        description: 'Use simple Subject-Object-Verb sentences to tell people your identity.',
        examples: [
          { kannada: 'ನನ್ನ ಹೆಸರು ರಾಹುಲ್.', transliteration: 'Nanna hesaru Rahul.', meaningEn: 'My name is Rahul.', meaningHi: 'मेरा नाम राहुल है।' },
          { kannada: 'ನಾನು ಇಂಜಿನಿಯರ್ ಆಗಿದ್ದೇನೆ.', transliteration: 'Nānu engineer āgiddēne.', meaningEn: 'I am an engineer.', meaningHi: 'मैं एक इंजीनियर हूँ।' },
          { kannada: 'ನನ್ನ ಊರು ದೆಹಲಿ.', transliteration: 'Nanna ooru Dehli.', meaningEn: 'My native place is Delhi.', meaningHi: 'मेरा गृहनगर दिल्ली है।' },
          { kannada: 'ನಿಮ್ಮ ಹೆಸರೇನು?', transliteration: 'Nimma hesarēnu?', meaningEn: 'What is your name? (Polite)', meaningHi: 'आपका नाम क्या है?' }
        ]
      },
      {
        heading: '2. Expressing Language Ability',
        description: 'A humble way to tell people you are learning Kannada.',
        examples: [
          { kannada: 'ನನಗೆ ಕನ್ನಡ ಸ್ವಲ್ಪ ಬರುತ್ತದೆ.', transliteration: 'Nanage Kannaḍa svalpa baruttade.', meaningEn: 'I know a little bit of Kannada.', meaningHi: 'मुझे कन्नड़ थोड़ी-थोड़ी आती है।' },
          { kannada: 'ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ.', transliteration: 'Nānu Kannaḍa kaliyuttiddēne.', meaningEn: 'I am learning Kannada.', meaningHi: 'मैं कन्नड़ सीख रहा/रही हूँ।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'How do you say "My name is Priya" in Kannada?',
        questionHi: '"मेरा नाम प्रिया है" को कन्नड़ में क्या कहेंगे?',
        options: ['ನನ್ನ ಊರು ಪ್ರಿಯಾ.', 'ನನ್ನ ಹೆಸರು ಪ್ರಿಯಾ.', 'ನಾನು ಪ್ರಿಯಾ ಅಲ್ಲ.', 'ನಿಮ್ಮ ಹೆಸರು ಪ್ರಿಯಾ.'],
        correctIndex: 1,
        explanation: '"ನನ್ನ ಹೆಸರು ಪ್ರಿಯಾ" (Nanna hesaru Priya) translates to "My name is Priya". "ಹೆಸರು" (hesaru) means name.',
        explanationHi: '"ನನ್ನ ಹೆಸರು ಪ್ರಿಯಾ" (नन्ना हेसरु प्रिया) का अर्थ "मेरा नाम प्रिया है" होता है।'
      },
      {
        id: 'q2-2',
        question: 'What does "ಸ್ವಲ್ಪ" (svalpa) mean in everyday Kannada?',
        questionHi: 'रोज़मर्रा की कन्नड़ में "ಸ್ವಲ್ಪ" (स्वल्प) का क्या अर्थ है?',
        options: ['A lot / Very much', 'A little / A bit', 'Never', 'Quickly'],
        correctIndex: 1,
        explanation: '"ಸ್ವಲ್ಪ" (svalpa) means "a little bit" or "slightly". It is one of the most useful words in Karnataka!',
        explanationHi: '"ಸ್ವಲ್ಪ" (स्वल्प) का अर्थ "थोड़ा सा" (a little) होता है।'
      }
    ]
  },
  {
    day: 3,
    title: 'Numbers, Prices & Shopping',
    titleKannada: 'ಅಂಕಿಗಳು ಮತ್ತು ಖರೀದಿ',
    objective: 'Count from 1 to 10 in Kannada and bargain with shopkeepers.',
    lessonContent: [
      {
        heading: '1. Counting 1 to 5',
        description: 'Counting forms the basis of purchasing items in local markets.',
        examples: [
          { kannada: '೧ - ಒಂದು', transliteration: 'Ondu', meaningEn: '1 (One)', meaningHi: '१ (एक)' },
          { kannada: '೨ - ಎರಡು', transliteration: 'Eraḍu', meaningEn: '2 (Two)', meaningHi: '२ (दो)' },
          { kannada: '೩ - ಮೂರು', transliteration: 'Mūru', meaningEn: '3 (Three)', meaningHi: '३ (तीन)' },
          { kannada: '೪ - ನಾಲ್ಕು', transliteration: 'Nālku', meaningEn: '4 (Four)', meaningHi: '४ (चार)' },
          { kannada: '೫ - ಐದು', transliteration: 'Aidu', meaningEn: '5 (Five)', meaningHi: '५ (पाँच)' }
        ]
      },
      {
        heading: '2. Market Bargaining',
        description: 'How to ask prices and request a modest discount politely.',
        examples: [
          { kannada: 'ಇದಕ್ಕೆ ಎಷ್ಟು ಬೆಲೆ?', transliteration: 'Idakke eṣṭu bele?', meaningEn: 'How much does this cost?', meaningHi: 'इसका कितना दाम है?' },
          { kannada: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ ಅಣ್ಣ.', transliteration: 'Svalpa kaḍime māḍi aṇṇa.', meaningEn: 'Reduce the price a bit, brother.', meaningHi: 'थोड़ा कम कीजिए भैया।' },
          { kannada: 'ಇದು ತುಂಬಾ ಜಾಸ್ತಿ ಆಯ್ತು!', transliteration: 'Idu tumbā jāsti āytu!', meaningEn: 'This is too expensive / too much!', meaningHi: 'यह बहुत ज़्यादा हो गया!' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Which word means "Three" in Kannada?',
        questionHi: 'कन्नड़ में "तीन" को क्या कहते हैं?',
        options: ['ಒಂದು (Ondu)', 'ಎರಡು (Eraḍu)', 'ಮೂರು (Mūru)', 'ನಾಲ್ಕು (Nālku)'],
        correctIndex: 2,
        explanation: '"ಮೂರು" (Mūru) means 3 in Kannada.',
        explanationHi: '"ಮೂರು" (मूरु) का अर्थ तीन (3) होता है।'
      },
      {
        id: 'q3-2',
        question: 'How do you say "How much?"',
        questionHi: '"कितना?" कैसे पूछते हैं?',
        options: ['ಎಷ್ಟು? (Eṣṭu?)', 'ಎಲ್ಲಿ? (Elli?)', 'ಯಾವಾಗ? (Yāvāga?)', 'ಹೇಗೆ? (Hēge?)'],
        correctIndex: 0,
        explanation: '"ಎಷ್ಟು?" (Eṣṭu?) means "How much?".',
        explanationHi: '"ಎಷ್ಟು?" (एष्टु?) का अर्थ "कितना?" होता है।'
      }
    ]
  },
  {
    day: 4,
    title: 'Ordering Food & Dining',
    titleKannada: 'ಹೋಟೆಲ್ ಮತ್ತು ಊಟ',
    objective: 'Order breakfast, snacks, coffee and communicate dietary preferences in Karnataka restaurants.',
    lessonContent: [
      {
        heading: '1. The Iconic Karnataka Tiffin Order',
        description: 'Order your favorite dishes with proper honorifics.',
        examples: [
          { kannada: 'ಒಂದು ಮಸಾಲೆ ದೋಸೆ ಕೊಡಿ.', transliteration: 'Ondu masāle dōse koḍi.', meaningEn: 'Please give one masala dosa.', meaningHi: 'एक मसाला डोसा दीजिए।' },
          { kannada: 'ಒಂದು ಸ್ಟ್ರಾಂಗ್ ಫಿಲ್ಟರ್ ಕಾಫಿ ಬೇಕು.', transliteration: 'Ondu strong filter kāphi bēku.', meaningEn: 'I want a strong filter coffee.', meaningHi: 'एक स्ट्रॉन्ग फ़िल्टर कॉफ़ी चाहिए।' },
          { kannada: 'ಸ್ವಲ್ಪ ಚಟ್ನಿ ಹಾಕಿ.', transliteration: 'Svalpa chutney hāki.', meaningEn: 'Put a little extra chutney.', meaningHi: 'थोड़ी चटनी डालिए।' }
        ]
      },
      {
        heading: '2. Post-Meal Queries',
        description: 'Compliment the food and settle the bill.',
        examples: [
          { kannada: 'ಊಟ ಆಯ್ತಾ?', transliteration: 'Oota aaythā?', meaningEn: 'Did you have food? (Everyday caring greeting)', meaningHi: 'खाना खा लिया क्या?' },
          { kannada: 'ಬಿಲ್ಲು ಎಷ್ಟು ಆಯ್ತು?', transliteration: 'Billu eṣṭu āytu?', meaningEn: 'How much did the bill come to?', meaningHi: 'बिल कितना हुआ?' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'What is the polite word for "Give" when ordering?',
        questionHi: 'होटल में खाना मंगाते समय "दीजिए" के लिए कौन सा आदरसूचक शब्द है?',
        options: ['ಕೊಡಿ (Koḍi)', 'ಕೊಡು (Koḍu)', 'ತಗೋ (Tago)', 'ಬೇಡ (Bēḍa)'],
        correctIndex: 0,
        explanation: '"ಕೊಡಿ" (Koḍi) is the polite imperative for "Please give". "ಕೊಡು" (Koḍu) is informal.',
        explanationHi: '"ಕೊಡಿ" (कोडि) आदरपूर्वक "दीजिए" कहने के लिए उपयोग होता है।'
      }
    ]
  },
  {
    day: 5,
    title: 'Transport & Directions',
    titleKannada: 'ಸಾರಿಗೆ ಮತ್ತು ದಾರಿ',
    objective: 'Navigate autos, buses, Metro, and asking pedestrians for directions.',
    lessonContent: [
      {
        heading: '1. Talking to Auto Drivers & Conductors',
        description: 'Direct, clear communication for everyday commuting.',
        examples: [
          { kannada: 'ಇಂದಿರಾನಗರಕ್ಕೆ ಎಷ್ಟು ಆಗುತ್ತೆ?', transliteration: 'Indiranagar-kke eṣṭu āgutte?', meaningEn: 'How much will it be to Indiranagar?', meaningHi: 'इंदिरानगर का कितना होगा?' },
          { kannada: 'ಮೀಟರ್ ಹಾಕಿ ಬನ್ನಿ ಸರ್.', transliteration: 'Meter hāki banni sir.', meaningEn: 'Put on the meter and come, sir.', meaningHi: 'मीटर चालू करके चलिए सर।' },
          { kannada: 'ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.', transliteration: 'Illi nillisi.', meaningEn: 'Stop here please.', meaningHi: 'यहाँ रोकिए।' }
        ]
      },
      {
        heading: '2. Direction Terms',
        description: 'Crucial spatial terminology.',
        examples: [
          { kannada: 'ಬಲಗಡೆ (Right side)', transliteration: 'Balagaḍe', meaningEn: 'Right turn / Right side', meaningHi: 'दाईं ओर' },
          { kannada: 'ಎಡಗಡೆ (Left side)', transliteration: 'Eḍagaḍe', meaningEn: 'Left turn / Left side', meaningHi: 'बाईं ओर' },
          { kannada: 'ನೇರವಾಗಿ (Straight)', transliteration: 'Nēravāgi', meaningEn: 'Go straight ahead', meaningHi: 'सीधे' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'What does "ಬಲಗಡೆ" (Balagaḍe) mean?',
        questionHi: '"ಬಲಗಡೆ" (बलगाडे) का क्या अर्थ है?',
        options: ['Right side', 'Left side', 'Behind', 'Straight ahead'],
        correctIndex: 0,
        explanation: '"ಬಲಗಡೆ" means right side. "ಎಡಗಡೆ" means left side.',
        explanationHi: '"ಬಲಗಡೆ" का अर्थ दाईं ओर (Right side) होता है।'
      }
    ]
  },
  {
    day: 6,
    title: 'Practical Everyday Conversations',
    titleKannada: 'ದೈನಂದಿನ ಮಾತುಕತೆ',
    objective: 'Handle spontaneous daily social interactions with neighbors, colleagues, and friends.',
    lessonContent: [
      {
        heading: '1. Essential Daily Responses',
        description: 'Key conversational glue words in Kannada.',
        examples: [
          { kannada: 'ಹೌದು (Yes)', transliteration: 'Haudu', meaningEn: 'Yes, that is true', meaningHi: 'हाँ' },
          { kannada: 'ಇಲ್ಲ (No / Not there)', transliteration: 'Illa', meaningEn: 'No / It is not there', meaningHi: 'नहीं / नहीं है' },
          { kannada: 'ಗೊತ್ತಿಲ್ಲ (I do not know)', transliteration: 'Gottilla', meaningEn: 'I do not know / Not sure', meaningHi: 'मुझे नहीं पता' },
          { kannada: 'ಖಂಡಿತ (Certainly / Of course)', transliteration: 'Khaṇḍita', meaningEn: 'Certainly / Definitely', meaningHi: 'ज़रूर / बिल्कुल' }
        ]
      },
      {
        heading: '2. Expressing Needs & Gratitude',
        description: 'Asking for what you need and thanking warmly.',
        examples: [
          { kannada: 'ನನಗೆ ಸಹಾಯ ಬೇಕು.', transliteration: 'Nanage sahāya bēku.', meaningEn: 'I need help.', meaningHi: 'मुझे मदद चाहिए।' },
          { kannada: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು!', transliteration: 'Tumbā dhanyavādagaḷu!', meaningEn: 'Thank you very much!', meaningHi: 'बहुत-बहुत धन्यवाद!' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'How do you say "I do not know" in Kannada?',
        questionHi: 'कन्नड़ में "मुझे नहीं पता" कैसे कहते हैं?',
        options: ['ಗೊತ್ತಿಲ್ಲ (Gottilla)', 'ಗೊತ್ತಿದೆ (Gottide)', 'ಬೇಡ (Bēḍa)', 'ಆಯ್ತು (Aaytu)'],
        correctIndex: 0,
        explanation: '"ಗೊತ್ತಿಲ್ಲ" (Gottilla) means "I don\'t know".',
        explanationHi: '"ಗೊತ್ತಿಲ್ಲ" (गोत्तिल्ला) का अर्थ "मुझे नहीं मालूम" होता है।'
      }
    ]
  },
  {
    day: 7,
    title: 'Comprehensive Assessment & Fluency Check',
    titleKannada: 'ಪುನರಾವರ್ತನೆ ಮತ್ತು ಪರೀಕ್ಷೆ',
    objective: 'Synthesize your week of learning with a comprehensive multi-situation Kannada quiz.',
    lessonContent: [
      {
        heading: '1. Review of Core Grammar Rules',
        description: 'Remember: 1) Kannada uses Subject-Object-Verb (SOV) order. 2) End verbs with "-i" or "-ri" to be respectful. 3) People in Karnataka are delighted when newcomers try speaking Kannada!',
        examples: [
          { kannada: 'ಕನ್ನಡ ಮಾತಾಡಿ (Speak Kannada)', transliteration: 'Kannaḍa mātāḍi', meaningEn: 'Please speak in Kannada', meaningHi: 'कन्नड़ में बात कीजिए' },
          { kannada: 'ಸಿಗೋಣ (See you later)', transliteration: 'Sigōṇa', meaningEn: 'Let us meet again / See you', meaningHi: 'फिर मिलेंगे' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'Which is the polite honorific word for "You"?',
        questionHi: 'आदरपूर्वक "आप" के लिए कौन सा शब्द प्रयोग होता है?',
        options: ['ನೀವು (Nīvu)', 'ನೀನು (Nīnu)', 'ಅವನು (Avanu)', 'ಅವರು (Avaru)'],
        correctIndex: 0,
        explanation: '"ನೀವು" (Nīvu) is the polite 2nd-person pronoun (like "आप" in Hindi).',
        explanationHi: '"ನೀವು" (नीवु) आदरसूचक "आप" है।'
      },
      {
        id: 'q7-2',
        question: 'If someone asks "ಊಟ ಆಯ್ತಾ?" (Oota aaytha?), what does it mean?',
        questionHi: 'यदि कोई पूछे "ಊಟ ಆಯ್ತಾ?" तो उसका क्या भाव है?',
        options: ['Are you coming?', 'Did you have lunch/food?', 'Where is the road?', 'What is the time?'],
        correctIndex: 1,
        explanation: '"ಊಟ ಆಯ್ತಾ?" means "Did you have food?", a quintessential caring Kannada greeting.',
        explanationHi: '"ಊಟ ಆಯ್ತಾ?" का अर्थ "खाना खा लिया क्या?" है, जो कर्नाटक में अपनत्व भरा हालचाल है।'
      },
      {
        id: 'q7-3',
        question: 'How do you say "Let us meet again / See you" in Kannada?',
        questionHi: '"फिर मिलेंगे" के लिए सबसे सुंदर कन्नड़ शब्द क्या है?',
        options: ['ಸಿಗೋಣ (Sigōṇa)', 'ಹೋಗು (Hōgu)', 'ಬಾ (Bā)', 'ನೋಡು (Nōḍu)'],
        correctIndex: 0,
        explanation: '"ಸಿಗೋಣ" (Sigōṇa) translates warmly to "Let us meet again" or "See you".',
        explanationHi: '"ಸಿಗೋಣ" (सिगोणा) का अर्थ "फिर मिलेंगे" (See you) होता है।'
      }
    ]
  }
];
