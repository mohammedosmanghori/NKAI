import { SurvivalPhrase } from '../types';

export const SURVIVAL_CATEGORIES = [
  'Transport',
  'Restaurants',
  'Shopping',
  'Directions',
  'College',
  'Workplace',
  'Healthcare',
  'Accommodation',
  'Government Offices',
  'Emergencies'
] as const;

export const SURVIVAL_PHRASES: SurvivalPhrase[] = [
  // 1. Transport
  {
    id: 'tp-1',
    category: 'Transport',
    kannada: 'ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಹೋಗುತ್ತಾ?',
    transliteration: 'Majestic-ge hōguttā?',
    english: 'Does this go to Majestic?',
    hindi: 'क्या यह मैजेस्टिक जाती है?',
    contextTip: 'Crucial question when boarding Bengaluru BMTC buses or inquiring with conductors.'
  },
  {
    id: 'tp-2',
    category: 'Transport',
    kannada: 'ಮೀಟರ್ ಹಾಕಿ ಬನ್ನಿ ಸರ್.',
    transliteration: 'Meter hāki banni sir.',
    english: 'Please put the meter on and come, sir.',
    hindi: 'मीटर चालू करके चलिए सर।',
    contextTip: 'Polite but firm request for auto-rickshaw drivers across Bengaluru and Mysuru.'
  },
  {
    id: 'tp-3',
    category: 'Transport',
    kannada: 'ಮುಂದಿನ ಸ್ಟಾಪ್‌ನಲ್ಲಿ ಇಳಿಸಿ.',
    transliteration: 'Mundina stop-nalli iḷisi.',
    english: 'Please drop me at the next stop.',
    hindi: 'अगले स्टॉप पर उतार दीजिए।',
    contextTip: 'Used in autos and local private/city buses.'
  },
  {
    id: 'tp-4',
    category: 'Transport',
    kannada: 'ಒಂದು ಟಿಕೆಟ್ ಕೊಡಿ.',
    transliteration: 'Ondu ticket koḍi.',
    english: 'Give one ticket please.',
    hindi: 'एक टिकट दीजिए।',
    contextTip: 'Standard request to the bus conductor.'
  },
  {
    id: 'tp-5',
    category: 'Transport',
    kannada: 'ಮೆಟ್ರೋ ಸ್ಟೇಷನ್ ಎಲ್ಲಿ ಬರುತ್ತದೆ?',
    transliteration: 'Metro station elli baruttade?',
    english: 'Where does the Metro station come up?',
    hindi: 'मेट्रो स्टेशन कहाँ आता है?',
    contextTip: 'Asking pedestrian directions for Namma Metro.'
  },

  // 2. Restaurants
  {
    id: 'rest-1',
    category: 'Restaurants',
    kannada: 'ಒಂದು ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ಫಿಲ್ಟರ್ ಕಾಫಿ ಕೊಡಿ.',
    transliteration: 'Ondu masāle dōse mattu filter kāphi koḍi.',
    english: 'Give one masala dosa and filter coffee please.',
    hindi: 'एक मसाला डोसा और फ़िल्टर कॉफ़ी दीजिए।',
    contextTip: 'Classic order at any Darshini, Vidyarthi Bhavan or CTR in Karnataka.'
  },
  {
    id: 'rest-2',
    category: 'Restaurants',
    kannada: 'ಖಾರ ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.',
    transliteration: 'Khāra svalpa kaḍime māḍi.',
    english: 'Please make it less spicy.',
    hindi: 'तीखा थोड़ा कम रखिए।',
    contextTip: 'Useful if you prefer mild food in Karnataka messes and restaurants.'
  },
  {
    id: 'rest-3',
    category: 'Restaurants',
    kannada: 'ಬಿಲ್ಲು ಕೊಡಿ ಸರ್.',
    transliteration: 'Billu koḍi sir.',
    english: 'Please give the bill, sir.',
    hindi: 'बिल दीजिए सर।',
    contextTip: 'Universal closing request after your meal.'
  },
  {
    id: 'rest-4',
    category: 'Restaurants',
    kannada: 'ಕುಡಿಯಲು ಬಿಸಿ ನೀರು ಸಿಗುತ್ತಾ?',
    transliteration: 'Kuḍiyalu bisi nīru siguttā?',
    english: 'Can I get warm drinking water?',
    hindi: 'क्या पीने के लिए गर्म पानी मिल सकता है?',
    contextTip: 'Polite request for warm water in hotels.'
  },
  {
    id: 'rest-5',
    category: 'Restaurants',
    kannada: 'ಊಟ ತುಂಬಾ ರುಚಿಯಾಗಿತ್ತು!',
    transliteration: 'Oota tumbā ruchiyāgittu!',
    english: 'The meal was very delicious!',
    hindi: 'खाना बहुत स्वादिष्ट था!',
    contextTip: 'A heartwarming compliment to the chef or server.'
  },

  // 3. Shopping
  {
    id: 'shop-1',
    category: 'Shopping',
    kannada: 'ಇದಕ್ಕೆ ಎಷ್ಟು ಬೆಲೆ?',
    transliteration: 'Idakke eṣṭu bele?',
    english: 'How much does this cost?',
    hindi: 'इसका कितना दाम है?',
    contextTip: 'Essential inquiry at markets, vegetable stalls, and cloth shops.'
  },
  {
    id: 'shop-2',
    category: 'Shopping',
    kannada: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ ಅಣ್ಣ.',
    transliteration: 'Svalpa kaḍime māḍi aṇṇa.',
    english: 'Please reduce the price a little, brother.',
    hindi: 'थोड़ा कम कीजिए भैया।',
    contextTip: 'Friendly bargaining line in street bazaars like Gandhi Bazaar or Malleshwaram.'
  },
  {
    id: 'shop-3',
    category: 'Shopping',
    kannada: 'ಬೇರೆ ಕಲರ್ ಇದೆಯಾ?',
    transliteration: 'Bēre color ideyā?',
    english: 'Do you have another color?',
    hindi: 'क्या कोई दूसरा रंग है?',
    contextTip: 'Shopping for clothes or accessories.'
  },
  {
    id: 'shop-4',
    category: 'Shopping',
    kannada: 'ಯುಪಿಐ (UPI) ಅಥವಾ ಗೂಗಲ್ ಪೇ ಆಗುತ್ತಾ?',
    transliteration: 'UPI athavā Google Pay āguttā?',
    english: 'Does UPI or Google Pay work here?',
    hindi: 'क्या यूपीआई या गूगल पे चलेगा?',
    contextTip: 'Digital payment inquiry across Karnataka.'
  },

  // 4. Directions
  {
    id: 'dir-1',
    category: 'Directions',
    kannada: 'ಇಲ್ಲಿಂದ ಎಂ.ಜಿ. ರೋಡ್‌ಗೆ ಹೇಗೆ ಹೋಗುವುದು?',
    transliteration: 'Illinda M.G. Road-ge hēge hōguvudu?',
    english: 'How do I get to M.G. Road from here?',
    hindi: 'यहाँ से एमजी रोड कैसे जाएं?',
    contextTip: 'Standard inquiry when seeking route navigation.'
  },
  {
    id: 'dir-2',
    category: 'Directions',
    kannada: 'ನೇರವಾಗಿ ಹೋಗಿ, ಬಲಗಡೆ ತಿರುಗಿ.',
    transliteration: 'Nēravāgi hōgi, balagaḍe tirugi.',
    english: 'Go straight and turn right.',
    hindi: 'सीधे जाइए और दाईं ओर मुड़िए।',
    contextTip: 'Common direction reply you will hear: ನೇರವಾಗಿ (straight), ಬಲಗಡೆ (right).'
  },
  {
    id: 'dir-3',
    category: 'Directions',
    kannada: 'ಎಡಗಡೆ ಇದೆಯಾ ಅಥವಾ ಬಲಗಡೆನಾ?',
    transliteration: 'Eḍagaḍe ideyā athavā balagaḍenā?',
    english: 'Is it on the left or on the right?',
    hindi: 'क्या यह बाईं ओर है या दाईं ओर?',
    contextTip: 'Clarifying turns: ಎಡಗಡೆ (left), ಬಲಗಡೆ (right).'
  },
  {
    id: 'dir-4',
    category: 'Directions',
    kannada: 'ಇದು ಎಷ್ಟು ದೂರ ಇದೆ?',
    transliteration: 'Idu eṣṭu dūra ide?',
    english: 'How far is this?',
    hindi: 'यह कितनी दूर है?',
    contextTip: 'Checking walking or driving distance.'
  },

  // 5. College
  {
    id: 'clg-1',
    category: 'College',
    kannada: 'ಲೈಬ್ರರಿ ಎಲ್ಲಿ ಬರುತ್ತದೆ?',
    transliteration: 'Library elli baruttade?',
    english: 'Where is the library located?',
    hindi: 'पुस्तकालय (लाइब्रेरी) कहाँ है?',
    contextTip: 'Campus navigation.'
  },
  {
    id: 'clg-2',
    category: 'College',
    kannada: 'ಇವತ್ತು ಕ್ಲಾಸ್ ಇದೆಯಾ?',
    transliteration: 'Ivattu class ideyā?',
    english: 'Is there class today?',
    hindi: 'क्या आज क्लास है?',
    contextTip: 'Asking classmates about schedule.'
  },
  {
    id: 'clg-3',
    category: 'College',
    kannada: 'ನೋಟ್ಸ್ ಸ್ವಲ್ಪ ಶೇರ್ ಮಾಡುತ್ತೀರಾ?',
    transliteration: 'Notes svalpa share māḍuttīrā?',
    english: 'Could you please share the notes?',
    hindi: 'क्या आप नोट्स थोड़ा शेयर करेंगे?',
    contextTip: 'Polite peer study request.'
  },

  // 6. Workplace
  {
    id: 'work-1',
    category: 'Workplace',
    kannada: 'ಮೀಟಿಂಗ್ ಯಾವಾಗ ಶುರುವಾಗುತ್ತದೆ?',
    transliteration: 'Meeting yāvāga shuruvāguttade?',
    english: 'When does the meeting start?',
    hindi: 'मीटिंग कब शुरू होगी?',
    contextTip: 'Office coordination with colleagues.'
  },
  {
    id: 'work-2',
    category: 'Workplace',
    kannada: 'ನಾನು ಇವತ್ತು ಮನೆಯಿಂದಲೇ ಕೆಲಸ ಮಾಡುತ್ತೇನೆ.',
    transliteration: 'Nānu ivattu maneyindalē kelasa māḍuttēne.',
    english: 'I will be working from home today.',
    hindi: 'मैं आज घर से काम करूँगा / करूँगी।',
    contextTip: 'Work from home (WFH) communication.'
  },
  {
    id: 'work-3',
    category: 'Workplace',
    kannada: 'ಇದನ್ನು ಮೇಲ್‌ನಲ್ಲಿ ಕಳುಹಿಸಿ.',
    transliteration: 'Idannu mail-nalli kaḷuhisi.',
    english: 'Please send this over email.',
    hindi: 'इसे ईमेल पर भेज दीजिए।',
    contextTip: 'Standard business workflow request.'
  },

  // 7. Healthcare
  {
    id: 'health-1',
    category: 'Healthcare',
    kannada: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?',
    transliteration: 'Hattirada āspatre ellide?',
    english: 'Where is the nearest hospital?',
    hindi: 'निकटतम अस्पताल कहाँ है?',
    contextTip: 'Important medical inquiry in unfamiliar areas.'
  },
  {
    id: 'health-2',
    category: 'Healthcare',
    kannada: 'ನನಗೆ ತಲೆನೋವು ಮತ್ತು ಜ್ವರ ಇದೆ.',
    transliteration: 'Nanage talenōvu mattu jvara ide.',
    english: 'I have a headache and fever.',
    hindi: 'मुझे सिरदर्द और बुखार है।',
    contextTip: 'Describing common symptoms to a clinic doctor or pharmacist.'
  },
  {
    id: 'health-3',
    category: 'Healthcare',
    kannada: 'ಡಾಕ್ಟರ್ ಯಾವಾಗ ಸಿಗುತ್ತಾರೆ?',
    transliteration: 'Doctor yāvāga siguttāre?',
    english: 'When will the doctor be available?',
    hindi: 'डॉक्टर कब मिलेंगे?',
    contextTip: 'Clinic reception inquiry.'
  },

  // 8. Accommodation
  {
    id: 'acc-1',
    category: 'Accommodation',
    kannada: 'ಬಾಡಿಗೆ ಮನೆ ಅಥವಾ ಪಿ.ಜಿ. ಇದೆಯಾ?',
    transliteration: 'Bāḍige mane athavā P.G. ideyā?',
    english: 'Is there a house for rent or a PG available?',
    hindi: 'क्या किराये का मकान या पीजी उपलब्ध है?',
    contextTip: 'Flat hunting in residential localities.'
  },
  {
    id: 'acc-2',
    category: 'Accommodation',
    kannada: 'ತಿಂಗಳ ಬಾಡಿಗೆ ಎಷ್ಟು?',
    transliteration: 'Tingaḷa bāḍige eṣṭu?',
    english: 'What is the monthly rent?',
    hindi: 'महीने का किराया कितना है?',
    contextTip: 'Essential inquiry with landlords.'
  },
  {
    id: 'acc-3',
    category: 'Accommodation',
    kannada: 'ನೀರು ಮತ್ತು ಕರೆಂಟ್ ಸಮಸ್ಯೆ ಇದೆಯಾ?',
    transliteration: 'Nīru mattu current samasye ideyā?',
    english: 'Is there any water or power problem?',
    hindi: 'क्या पानी या बिजली की कोई समस्या है?',
    contextTip: 'Checking civic amenities before renting.'
  },

  // 9. Government Offices
  {
    id: 'gov-1',
    category: 'Government Offices',
    kannada: 'ಈ ಅರ್ಜಿ ಎಲ್ಲಿ ಕೊಡಬೇಕು?',
    transliteration: 'Ee arji elli koḍabēku?',
    english: 'Where should I submit this application?',
    hindi: 'यह आवेदन कहाँ जमा करना है?',
    contextTip: 'Inquiry at BBMP, RTO, or Taluk offices.'
  },
  {
    id: 'gov-2',
    category: 'Government Offices',
    kannada: 'ಯಾವ ಕೌಂಟರ್‌ಗೆ ಹೋಗಬೇಕು?',
    transliteration: 'Yāva counter-ge hōgabēku?',
    english: 'Which counter should I go to?',
    hindi: 'किस काउंटर पर जाना चाहिए?',
    contextTip: 'Navigating government administrative offices.'
  },

  // 10. Emergencies
  {
    id: 'em-1',
    category: 'Emergencies',
    kannada: 'ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ!',
    transliteration: 'Dayaviṭṭu sahāya māḍi!',
    english: 'Please help me!',
    hindi: 'कृपया मदद कीजिए!',
    isEmergency: true,
    contextTip: 'Universal urgent plea for help.'
  },
  {
    id: 'em-2',
    category: 'Emergencies',
    kannada: 'ಪೊಲೀಸ್ ಸ್ಟೇಷನ್ ಎಲ್ಲಿದೆ?',
    transliteration: 'Police station ellide?',
    english: 'Where is the police station?',
    hindi: 'पुलिस स्टेशन कहाँ है?',
    isEmergency: true,
    contextTip: 'Urgent security inquiry. Dial 112 for emergency services in Karnataka.'
  },
  {
    id: 'em-3',
    category: 'Emergencies',
    kannada: 'ಆಂಬ್ಯುಲೆನ್ಸ್ ಬೇಗ ಕರೆಯಿರಿ!',
    transliteration: 'Ambulance bēga kareyiri!',
    english: 'Call an ambulance quickly!',
    hindi: 'जल्दी से एम्बुलेंस बुलाइए!',
    isEmergency: true,
    contextTip: 'Medical emergency. Dial 108 for ambulance in Karnataka.'
  },
  {
    id: 'em-4',
    category: 'Emergencies',
    kannada: 'ನನ್ನ ಮೊಬೈಲ್ ಮತ್ತು ಪರ್ಸ್ ಕಳೆದುಹೋಗಿದೆ.',
    transliteration: 'Nanna mobile mattu purse kaḷeduhōgide.',
    english: 'I lost my mobile and purse.',
    hindi: 'मेरा मोबाइल और पर्स खो गया है।',
    isEmergency: true,
    contextTip: 'Reporting loss or theft to authorities.'
  }
];
