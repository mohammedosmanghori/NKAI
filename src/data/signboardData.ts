export interface SignboardItem {
  id: string;
  category: 'traffic' | 'bus' | 'metro' | 'civic' | 'shop' | 'government';
  categoryLabel: string;
  title: string;
  kannada: string;
  transliteration: string;
  english: string;
  hindi: string;
  signType: string;
  signTheme: 'red-regulatory' | 'blue-bus' | 'green-highway' | 'purple-metro' | 'yellow-caution' | 'amber-food';
  badge?: string;
  bilingualText?: string;
  words: Array<{ kannada: string; transliteration: string; meaning: string }>;
  contextNote: string;
  keywords: string[];
}

export const KARNATAKA_SIGNBOARDS: SignboardItem[] = [
  // 1. Traffic & Road Signs
  {
    id: 'traffic-no-parking',
    category: 'traffic',
    categoryLabel: 'Traffic & Road Signs',
    title: 'No Parking Signboard',
    kannada: 'ವಾಹನ ನಿಲುಗಡೆ ನಿಷೇಧಿಸಲಾಗಿದೆ',
    transliteration: 'Vāhana nilugaḍe niṣēdhisalāgide',
    english: 'Vehicle parking is strictly prohibited (No Parking)',
    hindi: 'वाहन खड़ा करना सख्त मना है (नो पार्किंग)',
    signType: 'Regulatory Traffic Sign',
    signTheme: 'red-regulatory',
    badge: 'Towing Zone / ದಂಡ ₹1,000',
    bilingualText: 'NO PARKING / ವಾಹನ ನಿಲುಗಡೆ ನಿಷೇಧಿಸಲಾಗಿದೆ',
    words: [
      { kannada: 'ವಾಹನ', transliteration: 'vāhana', meaning: 'vehicle' },
      { kannada: 'ನಿಲುಗಡೆ', transliteration: 'nilugaḍe', meaning: 'parking / stopping' },
      { kannada: 'ನಿಷೇಧಿಸಲಾಗಿದೆ', transliteration: 'niṣēdhisalāgide', meaning: 'is prohibited / forbidden' }
    ],
    contextNote: 'Seen across Bengaluru arterial roads and market zones. Vehicles parked here are subject to traffic police wheel-locking and towing fines.',
    keywords: ['no parking', 'parking', 'nilugade', 'nishedhisalagide', 'vehicle', 'park', 'car', 'bike', 'वाहन खड़ा करना मना है']
  },
  {
    id: 'traffic-parking-area',
    category: 'traffic',
    categoryLabel: 'Traffic & Road Signs',
    title: 'Designated Parking Area',
    kannada: 'ವಾಹನ ನಿಲುಗಡೆ ಸ್ಥಳ',
    transliteration: 'Vāhana nilugaḍe sthaḷa',
    english: 'Designated Vehicle Parking Area (Parking P)',
    hindi: 'वाहन पार्किंग स्थल',
    signType: 'Permissive Traffic Sign',
    signTheme: 'blue-bus',
    badge: 'Authorized Parking (P)',
    bilingualText: 'PARKING / ವಾಹನ ನಿಲುಗಡೆ ಸ್ಥಳ',
    words: [
      { kannada: 'ವಾಹನ', transliteration: 'vāhana', meaning: 'vehicle' },
      { kannada: 'ನಿಲುಗಡೆ', transliteration: 'nilugaḍe', meaning: 'parking' },
      { kannada: 'ಸ್ಥಳ', transliteration: 'sthaḷa', meaning: 'place / area' }
    ],
    contextNote: 'Indicates legitimate parking bays, commercial basements, or BBMP pay-and-park facilities.',
    keywords: ['parking area', 'parking space', 'sthaḷa', 'sthana', 'park here', 'parking']
  },
  {
    id: 'traffic-no-entry',
    category: 'traffic',
    categoryLabel: 'Traffic & Road Signs',
    title: 'No Entry Signboard',
    kannada: 'ಪ್ರವೇಶವಿಲ್ಲ / ನೋ ಎಂಟ್ರಿ',
    transliteration: 'Pravēśavilla / No Entry',
    english: 'No Entry / Entry Strictly Prohibited',
    hindi: 'प्रवेश निषेध / अंदर जाना मना है',
    signType: 'Prohibitory Road Sign',
    signTheme: 'red-regulatory',
    badge: 'Strict Penalty',
    bilingualText: 'NO ENTRY / ಪ್ರವೇಶವಿಲ್ಲ',
    words: [
      { kannada: 'ಪ್ರವೇಶ', transliteration: 'pravēśa', meaning: 'entry / admission' },
      { kannada: 'ಇಲ್ಲ (ವಿಲ್ಲ)', transliteration: 'illa (villa)', meaning: 'no / not allowed' }
    ],
    contextNote: 'Mounted at exits of one-way lanes, flyover down-ramps, and restricted roads across Karnataka.',
    keywords: ['no entry', 'entry forbidden', 'praveshavilla', 'pravesha', 'don\'t enter', 'no admission']
  },
  {
    id: 'traffic-one-way',
    category: 'traffic',
    categoryLabel: 'Traffic & Road Signs',
    title: 'One Way Traffic Board',
    kannada: 'ಏಕಮುಖ ಸಂಚಾರ (ಒನ್ ವೇ)',
    transliteration: 'Ēkamukha sañcāra (One Way)',
    english: 'One Way Traffic (Movement in one direction only)',
    hindi: 'एकतरफ़ा रास्ता (वन वे)',
    signType: 'Mandatory Road Sign',
    signTheme: 'blue-bus',
    badge: 'Directional Restriction',
    bilingualText: 'ONE WAY / ಏಕಮುಖ ಸಂಚಾರ',
    words: [
      { kannada: 'ಏಕಮುಖ', transliteration: 'ēkamukha', meaning: 'single direction / one way' },
      { kannada: 'ಸಂಚಾರ', transliteration: 'sañcāra', meaning: 'traffic / vehicular movement' }
    ],
    contextNote: 'Common on narrow roads in central Bengaluru (Chickpet, Malleshwaram, Gandhi Bazaar). Never drive against this sign.',
    keywords: ['one way', 'ekamukha sanchara', 'sanchara', 'single direction', 'one-way']
  },
  {
    id: 'traffic-speed-limit-40',
    category: 'traffic',
    categoryLabel: 'Traffic & Road Signs',
    title: 'Speed Limit 40 km/h Sign',
    kannada: 'ವೇಗ ಮಿತಿ ೪೦ ಕಿ.ಮೀ / ಗಂಟೆಗೆ',
    transliteration: 'Vēga miti 40 ki.mī / gaṇṭege',
    english: 'Speed Limit: 40 km/h',
    hindi: 'गति सीमा: 40 किमी/घंटा',
    signType: 'Mandatory Speed Limit',
    signTheme: 'red-regulatory',
    badge: 'Radar Checked 📷',
    bilingualText: 'SPEED LIMIT 40 / ವೇಗ ಮಿತಿ ೪೦',
    words: [
      { kannada: 'ವೇಗ', transliteration: 'vēga', meaning: 'speed' },
      { kannada: 'ಮಿತಿ', transliteration: 'miti', meaning: 'limit / maximum' },
      { kannada: 'ಕಿ.ಮೀ', transliteration: 'ki.mī', meaning: 'km (kilometer)' },
      { kannada: 'ಗಂಟೆಗೆ', transliteration: 'gaṇṭege', meaning: 'per hour' }
    ],
    contextNote: 'Speed cameras are installed along ring roads and flyovers. ೪೦ is Kannada numeral for 40.',
    keywords: ['speed limit', 'speed', 'vega miti', '40 km', 'drive slow', 'गति सीमा']
  },
  {
    id: 'traffic-school-zone',
    category: 'traffic',
    categoryLabel: 'Traffic & Road Signs',
    title: 'School Zone Caution Board',
    kannada: 'ಎಚ್ಚರಿಕೆ: ಶಾಲಾ ವಲಯ - ನಿಧಾನವಾಗಿ ಚಲಿಸಿ',
    transliteration: 'Eccarike: Śālā valaya - Nidhānavāgi calisi',
    english: 'Caution: School Zone Ahead - Drive Slowly',
    hindi: 'सावधान: आगे स्कूल है - कृपया धीरे चलें',
    signType: 'Cautionary Hazard Sign',
    signTheme: 'yellow-caution',
    badge: 'Children Crossing',
    bilingualText: 'CAUTION SCHOOL ZONE / ಶಾಲಾ ವಲಯ',
    words: [
      { kannada: 'ಎಚ್ಚರಿಕೆ', transliteration: 'eccarike', meaning: 'caution / warning' },
      { kannada: 'ಶಾಲಾ', transliteration: 'śālā', meaning: 'school' },
      { kannada: 'ವಲಯ', transliteration: 'valaya', meaning: 'zone / sector' },
      { kannada: 'ನಿಧಾನವಾಗಿ', transliteration: 'nidhānavāgi', meaning: 'slowly / gently' },
      { kannada: 'ಚಲಿಸಿ', transliteration: 'calisi', meaning: 'proceed / drive' }
    ],
    contextNote: 'Placed within 200m of educational institutions. Honking is restricted and speed must be kept below 25-30 km/h.',
    keywords: ['school zone', 'school', 'eccarike', 'shala valaya', 'drive slowly', 'caution children', 'slow']
  },
  {
    id: 'traffic-hospital-ahead',
    category: 'traffic',
    categoryLabel: 'Traffic & Road Signs',
    title: 'Hospital Silence Zone',
    kannada: 'ಮುಂದೆ ಆಸ್ಪತ್ರೆ - ಹಾರ್ನ್ ಮಾಡಬೇಡಿ (ಶಾಂತಿ ವಲಯ)',
    transliteration: 'Munde āspatre - Horn māḍabēḍi (Śānti valaya)',
    english: 'Hospital Ahead - Do Not Honk (Silence Zone)',
    hindi: 'आगे अस्पताल है - हॉर्न न बजाएँ (शांत क्षेत्र)',
    signType: 'Silence Zone Board',
    signTheme: 'blue-bus',
    badge: 'Silence Zone 🔇',
    bilingualText: 'HOSPITAL SILENCE ZONE / ಮುಂದೆ ಆಸ್ಪತ್ರೆ',
    words: [
      { kannada: 'ಮುಂದೆ', transliteration: 'munde', meaning: 'ahead / in front' },
      { kannada: 'ಆಸ್ಪತ್ರೆ', transliteration: 'āspatre', meaning: 'hospital' },
      { kannada: 'ಮಾಡಬೇಡಿ', transliteration: 'māḍabēḍi', meaning: 'do not do' },
      { kannada: 'ಶಾಂತಿ', transliteration: 'śānti', meaning: 'silence / peace' }
    ],
    contextNote: 'Found outside NIMHANS, Victoria Hospital, Manipal Hospital, etc. Honking in silence zones attracts traffic fines.',
    keywords: ['hospital', 'aspatre', 'silence zone', 'no honking', 'horn', 'horn madabedi', 'do not honk']
  },
  {
    id: 'traffic-turn-left-right',
    category: 'traffic',
    categoryLabel: 'Traffic & Road Signs',
    title: 'Directional Road Guide',
    kannada: 'ಎಡಕ್ಕೆ ತಿರುಗಿ / ಬಲಕ್ಕೆ ತಿರುಗಿ',
    transliteration: 'Eḍakke tirugi / Balakke tirugi',
    english: 'Turn Left / Turn Right',
    hindi: 'बाएँ मुड़िए / दाएँ मुड़िए',
    signType: 'Direction Sign',
    signTheme: 'green-highway',
    badge: 'Navigation Sign',
    bilingualText: 'TURN LEFT / RIGHT - ಎಡಕ್ಕೆ / ಬಲಕ್ಕೆ ತಿರುಗಿ',
    words: [
      { kannada: 'ಎಡಕ್ಕೆ', transliteration: 'eḍakke', meaning: 'to the left' },
      { kannada: 'ಬಲಕ್ಕೆ', transliteration: 'balakke', meaning: 'to the right' },
      { kannada: 'ತಿರುಗಿ', transliteration: 'tirugi', meaning: 'turn' }
    ],
    contextNote: 'Direction markers on city roads and junctions guiding vehicles into appropriate lanes.',
    keywords: ['turn left', 'turn right', 'edakke tirugi', 'balakke tirugi', 'left turn', 'right turn']
  },
  {
    id: 'traffic-pedestrian-crossing',
    category: 'traffic',
    categoryLabel: 'Traffic & Road Signs',
    title: 'Pedestrian Zebra Crossing',
    kannada: 'ಪಾದಚಾರಿ ದಾಟು ದಾರಿ (ಜೀಬ್ರಾ ಕ್ರಾಸಿಂಗ್)',
    transliteration: 'Pādacāri dāṭu dāri (Zebra Crossing)',
    english: 'Pedestrian Crossing (Zebra Crossing)',
    hindi: 'पैदल यात्री पार पथ (ज़ेबरा क्रॉसिंग)',
    signType: 'Pedestrian Guide',
    signTheme: 'blue-bus',
    badge: 'Yield to Walkers',
    bilingualText: 'PEDESTRIAN CROSSING / ಪಾದಚಾರಿ ದಾಟು ದಾರಿ',
    words: [
      { kannada: 'ಪಾದಚಾರಿ', transliteration: 'pādacāri', meaning: 'pedestrian / walker' },
      { kannada: 'ದಾಟು', transliteration: 'dāṭu', meaning: 'crossing' },
      { kannada: 'ದಾರಿ', transliteration: 'dāri', meaning: 'path / way' }
    ],
    contextNote: 'Drivers must yield to pedestrians stepping on the road.',
    keywords: ['pedestrian crossing', 'zebra crossing', 'padachari', 'crossing', 'walkers']
  },
  {
    id: 'traffic-road-work',
    category: 'traffic',
    categoryLabel: 'Traffic & Road Signs',
    title: 'Road Work in Progress Board',
    kannada: 'ರಸ್ತೆ ಕಾಮಗಾರಿ ಪ್ರಗತಿಯಲ್ಲಿದೆ - ನಿಧಾನವಾಗಿ ಚಲಿಸಿ',
    transliteration: 'Raste kāmagāri pragatiyallide - Nidhānavāgi calisi',
    english: 'Road Work in Progress - Drive Carefully',
    hindi: 'सड़क निर्माण कार्य प्रगति पर है - सावधानी से चलें',
    signType: 'Workzone Caution Sign',
    signTheme: 'yellow-caution',
    badge: 'Men at Work 🚧',
    bilingualText: 'MEN AT WORK / ರಸ್ತೆ ಕಾಮಗಾರಿ ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    words: [
      { kannada: 'ರಸ್ತೆ', transliteration: 'raste', meaning: 'road' },
      { kannada: 'ಕಾಮಗಾರಿ', transliteration: 'kāmagāri', meaning: 'construction / work' },
      { kannada: 'ಪ್ರಗತಿಯಲ್ಲಿದೆ', transliteration: 'pragatiyallide', meaning: 'is in progress' }
    ],
    contextNote: 'Common along metro construction corridors (Outer Ring Road, Bannerghatta Road) and flyover repairs.',
    keywords: ['road work', 'men at work', 'raste kamagari', 'construction', 'work in progress']
  },

  // 2. BMTC & KSRTC Bus Destination Boards
  {
    id: 'bus-majestic-kempegowda',
    category: 'bus',
    categoryLabel: 'BMTC & KSRTC Bus Boards',
    title: 'Majestic / Kempegowda Bus Station',
    kannada: 'ಕೆಂಪೇಗೌಡ ಬಸ್ ನಿಲ್ದಾಣ (ಮೆಜೆಸ್ಟಿಕ್)',
    transliteration: 'Kempēgowḍa Bus Nildāṇa (Majestic)',
    english: 'Kempegowda Bus Station (Majestic)',
    hindi: 'केम्पेगौड़ा बस स्टेशन (मैजेस्टिक)',
    signType: 'BMTC Central Depot Board',
    signTheme: 'blue-bus',
    badge: 'Central Bus Terminal',
    bilingualText: 'KEMPEGOWDA BUS STATION - MAJESTIC',
    words: [
      { kannada: 'ಕೆಂಪೇಗೌಡ', transliteration: 'kempēgowḍa', meaning: 'Kempegowda (Founder of Bengaluru)' },
      { kannada: 'ಬಸ್', transliteration: 'bus', meaning: 'bus' },
      { kannada: 'ನಿಲ್ದಾಣ', transliteration: 'nildāṇa', meaning: 'station / terminal / stop' }
    ],
    contextNote: 'The principal bus terminal of Bengaluru city where hundreds of BMTC and KSRTC routes originate and terminate.',
    keywords: ['majestic', 'kempegowda', 'bus station', 'kempegowda bus station', 'majestic bus stand', 'kempēgowḍa']
  },
  {
    id: 'bus-route-shivajinagar',
    category: 'bus',
    categoryLabel: 'BMTC & KSRTC Bus Boards',
    title: 'BMTC Bus: Towards Shivajinagar',
    kannada: 'ಮಾರ್ಗ: ಶಿವಾಜಿನಗರ ಬಸ್ ನಿಲ್ದಾಣ ಕಡೆಗೆ',
    transliteration: 'Mārga: Śivājinagara Bus Nildāṇa kaḍege',
    english: 'Route: Towards Shivajinagar Bus Station',
    hindi: 'मार्ग: शिवाजीनगर बस स्टेशन की ओर',
    signType: 'BMTC Route Board',
    signTheme: 'blue-bus',
    badge: 'Depot Route 138/201',
    bilingualText: 'ROUTE TO SHIVAJINAGAR BUS STATION',
    words: [
      { kannada: 'ಮಾರ್ಗ', transliteration: 'mārga', meaning: 'route / path' },
      { kannada: 'ಶಿವಾಜಿನಗರ', transliteration: 'śivājinagara', meaning: 'Shivajinagar' },
      { kannada: 'ಕಡೆಗೆ', transliteration: 'kaḍege', meaning: 'towards / heading to' }
    ],
    contextNote: 'The word "ಕಡೆಗೆ" (kadege) on a bus board tells passengers the destination the bus is heading towards.',
    keywords: ['shivajinagar', 'kadege', 'marga', 'shivajinagara', 'towards shivajinagar', 'bus route']
  },
  {
    id: 'bus-route-electronic-city',
    category: 'bus',
    categoryLabel: 'BMTC & KSRTC Bus Boards',
    title: 'BMTC Vajra: Electronic City Express',
    kannada: 'ವಜ್ರ ಎಸಿ: ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ ಕಡೆಗೆ (ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಮಾರ್ಗ)',
    transliteration: 'Vajra AC: Electronic City kaḍege (Silk Board mārga)',
    english: 'Vajra AC: Towards Electronic City (via Silk Board)',
    hindi: 'वज्र एसी: इलेक्ट्रॉनिक सिटी की ओर (सिल्क बोर्ड मार्ग)',
    signType: 'BMTC AC Express Board',
    signTheme: 'blue-bus',
    badge: 'IT Corridor Express',
    bilingualText: 'VAJRA AC - ELECTRONIC CITY VIA SILK BOARD',
    words: [
      { kannada: 'ವಜ್ರ', transliteration: 'vajra', meaning: 'Vajra (BMTC AC Volvo brand name)' },
      { kannada: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ', transliteration: 'electronic city', meaning: 'Electronic City tech hub' },
      { kannada: 'ಸಿಲ್ಕ್ ಬೋರ್ಡ್', transliteration: 'silk board', meaning: 'Central Silk Board junction' }
    ],
    contextNote: 'Standard Volvo route connecting Bengaluru North/Central to Phase 1 & 2 Electronic City IT campuses.',
    keywords: ['electronic city', 'vajra', 'silk board', 'volvo', 'bmtc ac', 'electronic city bus']
  },
  {
    id: 'bus-route-whitefield-itpl',
    category: 'bus',
    categoryLabel: 'BMTC & KSRTC Bus Boards',
    title: 'BMTC Bus: Whitefield / ITPL Route',
    kannada: 'ವೈಟ್‌ಫೀಲ್ಡ್ - ಐಟಿಪಿಎಲ್ ಕಡೆಗೆ',
    transliteration: 'Whitefield - ITPL kaḍege',
    english: 'Towards Whitefield - International Tech Park (ITPL)',
    hindi: 'व्हाइटफ़ील्ड - आईटीपीएल की ओर',
    signType: 'BMTC Destination Board',
    signTheme: 'blue-bus',
    badge: 'Route 335E / 500D',
    bilingualText: 'TO WHITEFIELD / ITPL',
    words: [
      { kannada: 'ವೈಟ್‌ಫೀಲ್ಡ್', transliteration: 'whitefield', meaning: 'Whitefield' },
      { kannada: 'ಐಟಿಪಿಎಲ್', transliteration: 'ITPL', meaning: 'International Tech Park' },
      { kannada: 'ಕಡೆಗೆ', transliteration: 'kaḍege', meaning: 'towards' }
    ],
    contextNote: 'Serves Eastern Bengaluru tech corridors through Marathahalli and Hoodi.',
    keywords: ['whitefield', 'itpl', '335e', 'whitefield bus', 'hoodi', 'marathahalli']
  },
  {
    id: 'bus-airport-vayu-vajra',
    category: 'bus',
    categoryLabel: 'BMTC & KSRTC Bus Boards',
    title: 'Vayu Vajra Airport Bus Board',
    kannada: 'ವಾಯು ವಜ್ರ: ಕೆಂಪೇಗೌಡ ಅಂತರರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ',
    transliteration: 'Vāyu Vajra: Kempēgowḍa Antararāṣṭrīya Vimāna Nildāṇa',
    english: 'Vayu Vajra: Kempegowda International Airport (KIA)',
    hindi: 'वायु वज्र: केम्पेगौड़ा अंतर्राष्ट्रीय हवाई अड्डा',
    signType: 'Airport Express Bus',
    signTheme: 'blue-bus',
    badge: 'KIA Express ✈️',
    bilingualText: 'VAYU VAJRA - BENGALURU AIRPORT EXPRESS',
    words: [
      { kannada: 'ವಾಯು', transliteration: 'vāyu', meaning: 'air / wind' },
      { kannada: 'ವಿಮಾನ', transliteration: 'vimāna', meaning: 'airplane / flight' },
      { kannada: 'ಅಂತರರಾಷ್ಟ್ರೀಯ', transliteration: 'antararāṣṭrīya', meaning: 'international' },
      { kannada: 'ನಿಲ್ದಾಣ', transliteration: 'nildāṇa', meaning: 'station / airport terminal' }
    ],
    contextNote: '24x7 premium airport shuttle services across Bengaluru.',
    keywords: ['airport', 'vayu vajra', 'airport bus', 'vimana nildana', 'kia', 'kia-9', 'flight bus']
  },
  {
    id: 'bus-rajahamsa-ksrtc',
    category: 'bus',
    categoryLabel: 'BMTC & KSRTC Bus Boards',
    title: 'KSRTC Intercity Bus Board',
    kannada: 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ರಸ್ತೆ ಸಾರಿಗೆ ನಿಗಮ - ಮೈಸೂರು ಎಕ್ಸ್‌ಪ್ರೆಸ್',
    transliteration: 'Karṇāṭaka Rājya Raste Sārige Nigama - Mysuru Express',
    english: 'Karnataka State Road Transport Corp (KSRTC) - Mysuru Express',
    hindi: 'कर्नाटक राज्य सड़क परिवहन निगम - मैसूर एक्सप्रेस',
    signType: 'Intercity Highway Bus',
    signTheme: 'red-regulatory',
    badge: 'KSRTC Express',
    bilingualText: 'KSRTC - MYSURU NON-STOP EXPRESS',
    words: [
      { kannada: 'ಕರ್ನಾಟಕ', transliteration: 'karṇāṭaka', meaning: 'Karnataka' },
      { kannada: 'ರಾಜ್ಯ', transliteration: 'rājya', meaning: 'state' },
      { kannada: 'ರಸ್ತೆ', transliteration: 'raste', meaning: 'road' },
      { kannada: 'ಸಾರಿಗೆ', transliteration: 'sārige', meaning: 'transport' },
      { kannada: 'ನಿಗಮ', transliteration: 'nigama', meaning: 'corporation' }
    ],
    contextNote: 'Major intercity coach connecting Bengaluru to Mysuru, Mangaluru, Hubballi, and Belagavi.',
    keywords: ['ksrtc', 'sarige', 'mysuru', 'rajahamsa', 'intercity bus', 'karnataka transport']
  },

  // 3. Namma Metro Station Boards
  {
    id: 'metro-station-interchange',
    category: 'metro',
    categoryLabel: 'Namma Metro Signs',
    title: 'Metro Interchange Station Sign',
    kannada: 'ನಾಡಪ್ರಭು ಕೆಂಪೇಗೌಡ ಮೆಟ್ರೋ ನಿಲ್ದಾಣ - ಮೆಜೆಸ್ಟಿಕ್',
    transliteration: 'Nāḍaprabhu Kempēgowḍa Metro Nildāṇa - Majestic',
    english: 'Nadaprabhu Kempegowda Metro Station - Majestic Interchange',
    hindi: 'नाडप्रभु केम्पेगौड़ा मेट्रो स्टेशन - मैजेस्टिक',
    signType: 'Metro Interchange Signboard',
    signTheme: 'purple-metro',
    badge: 'Purple & Green Lines Interchange',
    bilingualText: 'NADAPRABHU KEMPEGOWDA STATION - MAJESTIC',
    words: [
      { kannada: 'ನಾಡಪ್ರಭು', transliteration: 'nāḍaprabhu', meaning: 'Leader / Lord of the land' },
      { kannada: 'ಮೆಟ್ರೋ', transliteration: 'metro', meaning: 'Metro Rail' },
      { kannada: 'ನಿಲ್ದಾಣ', transliteration: 'nildāṇa', meaning: 'Station' }
    ],
    contextNote: 'BMRCL primary underground interchange station connecting Green Line (Nagasandra-Silk Institute) and Purple Line (Challaghatta-Whitefield).',
    keywords: ['metro', 'namma metro', 'nadaprabhu', 'majestic metro', 'purple line', 'green line']
  },
  {
    id: 'metro-entry-exit',
    category: 'metro',
    categoryLabel: 'Namma Metro Signs',
    title: 'Metro Entry & Exit Wayfinding',
    kannada: 'ಪ್ರವೇಶ ದ್ವಾರ A / ನಿರ್ಗಮನ ದ್ವಾರ B',
    transliteration: 'Pravēśa dvāra A / Nirgamana dvāra B',
    english: 'Entry Gate A / Exit Gate B',
    hindi: 'प्रवेश द्वार A / निकास द्वार B',
    signType: 'Wayfinding Direction Sign',
    signTheme: 'purple-metro',
    badge: 'Station Gate',
    bilingualText: 'ENTRY GATE A / EXIT GATE B',
    words: [
      { kannada: 'ಪ್ರವೇಶ', transliteration: 'pravēśa', meaning: 'entry / entrance' },
      { kannada: 'ದ್ವಾರ', transliteration: 'dvāra', meaning: 'gate / doorway' },
      { kannada: 'ನಿರ್ಗಮನ', transliteration: 'nirgamana', meaning: 'exit / egress' }
    ],
    contextNote: 'Direction signs guiding commuters to specific street access points at metro stations.',
    keywords: ['entry gate', 'exit gate', 'pravesha dvara', 'nirgamana', 'metro gate', 'gate a', 'gate b']
  },
  {
    id: 'metro-platform-direction',
    category: 'metro',
    categoryLabel: 'Namma Metro Signs',
    title: 'Metro Platform Direction Board',
    kannada: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ೧: ವೈಟ್‌ಫೀಲ್ಡ್ ಕಡೆಗೆ (ನೇರಳೆ ಮಾರ್ಗ)',
    transliteration: 'Platform 1: Whitefield kaḍege (Nēraḷe mārga)',
    english: 'Platform 1: Towards Whitefield (Purple Line)',
    hindi: 'प्लेटफ़ॉर्म 1: व्हाइटफ़ील्ड की ओर (बैंगनी लाइन)',
    signType: 'Platform Indicator',
    signTheme: 'purple-metro',
    badge: 'Purple Line Platform',
    bilingualText: 'PLATFORM 1: TOWARDS WHITEFIELD',
    words: [
      { kannada: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್', transliteration: 'platform', meaning: 'Platform' },
      { kannada: 'ನೇರಳೆ', transliteration: 'nēraḷe', meaning: 'purple (color of the line)' },
      { kannada: 'ಮಾರ್ಗ', transliteration: 'mārga', meaning: 'line / route' }
    ],
    contextNote: 'Overhead overhead platform indicators mounted on station concourses.',
    keywords: ['platform 1', 'platform', 'nerale marga', 'purple line', 'metro platform']
  },
  {
    id: 'metro-track-danger',
    category: 'metro',
    categoryLabel: 'Namma Metro Signs',
    title: 'Metro Safety Warning Board',
    kannada: 'ಎಚ್ಚರಿಕೆ: ಹಳಿಗಳ ಮೇಲೆ ಇಳಿಯಬೇಡಿ - ಅಧಿಕ ವಿದ್ಯುತ್ ಪ್ರವಾಹ (೭೫೦V)',
    transliteration: 'Eccarike: Haḷigaḷa mēle iḷiyabēḍi - Adhika vidyut pravāha (750V)',
    english: 'Danger: Do not step onto tracks - High Voltage Third Rail (750V)',
    hindi: 'खतरा: पटरियों पर न उतरें - उच्च विद्युत प्रवाह (750V)',
    signType: 'Safety Hazard Board',
    signTheme: 'yellow-caution',
    badge: 'High Voltage ⚡',
    bilingualText: 'DANGER: DO NOT STEP ONTO TRACKS',
    words: [
      { kannada: 'ಹಳಿಗಳ', transliteration: 'haḷigaḷa', meaning: 'tracks / railway rails' },
      { kannada: 'ಮೇಲೆ', transliteration: 'mēle', meaning: 'upon / on top of' },
      { kannada: 'ಇಳಿಯಬೇಡಿ', transliteration: 'iḷiyabēḍi', meaning: 'do not step down / alight' },
      { kannada: 'ವಿದ್ಯುತ್', transliteration: 'vidyut', meaning: 'electricity / voltage' }
    ],
    contextNote: 'Essential safety notice located along platform screen gates and platform edges.',
    keywords: ['tracks', 'danger', 'vidyut', 'haligala mele', 'high voltage', 'do not step on tracks']
  },

  // 4. Civic & Public Warning Notices
  {
    id: 'civic-no-smoking',
    category: 'civic',
    categoryLabel: 'Civic & Warning Notices',
    title: 'No Smoking Notice Board',
    kannada: 'ಧೂಮಪಾನ ನಿಷೇಧಿಸಲಾಗಿದೆ - ಉಲ್ಲಂಘಿಸಿದರೆ ದಂಡ ₹೨೦೦',
    transliteration: 'Dhūmapāna niṣēdhisalāgide - Ullaṅghisidare daṇḍa ₹200',
    english: 'Smoking is strictly prohibited - Violators will be fined ₹200',
    hindi: 'धूम्रपान निषेध है - उल्लंघन करने पर ₹200 जुर्माना',
    signType: 'Statutory Prohibition Sign',
    signTheme: 'red-regulatory',
    badge: 'Statutory Warning 🚭',
    bilingualText: 'NO SMOKING / ಧೂಮಪಾನ ನಿಷೇಧಿಸಲಾಗಿದೆ',
    words: [
      { kannada: 'ಧೂಮಪಾನ', transliteration: 'dhūmapāna', meaning: 'smoking / tobacco smoke' },
      { kannada: 'ನಿಷೇಧಿಸಲಾಗಿದೆ', transliteration: 'niṣēdhisalāgide', meaning: 'is prohibited' },
      { kannada: 'ಉಲ್ಲಂಘಿಸಿದರೆ', transliteration: 'ullaṅghisidare', meaning: 'if violated / broken' },
      { kannada: 'ದಂಡ', transliteration: 'daṇḍa', meaning: 'fine / penalty' }
    ],
    contextNote: 'Mandatory statutory board present in all public premises, restaurants, bus stations, and offices under COTPA law.',
    keywords: ['no smoking', 'smoking prohibited', 'dhumapana', 'danda', 'smoking', 'cigarette', 'ಧೂಮಪಾನ']
  },
  {
    id: 'civic-no-littering',
    category: 'civic',
    categoryLabel: 'Civic & Warning Notices',
    title: 'BBMP Anti-Littering Signboard',
    kannada: 'ಇಲ್ಲಿ ಕಸ ಹಾಕಬೇಡಿ / ಕಸ ಎಸೆದರೆ ₹೫೦೦ ದಂಡ (ಸ್ವಚ್ಛ ಬೆಂಗಳೂರು)',
    transliteration: 'Illi kasa hākabēḍi / Kasa esedare ₹500 daṇḍa (Swaccha Beṅgaḷūru)',
    english: 'Do not dump garbage here - Fine ₹500 for littering (Clean Bengaluru)',
    hindi: 'यहाँ कचरा न फेंकें / कचरा फेंकने पर ₹500 जुर्माना (स्वच्छ बेंगलुरु)',
    signType: 'Civic Sanitation Board',
    signTheme: 'yellow-caution',
    badge: 'BBMP Swaccha Bharat 🧹',
    bilingualText: 'DO NOT DUMP GARBAGE / ಇಲ್ಲಿ ಕಸ ಹಾಕಬೇಡಿ',
    words: [
      { kannada: 'ಇಲ್ಲಿ', transliteration: 'illi', meaning: 'here' },
      { kannada: 'ಕಸ', transliteration: 'kasa', meaning: 'garbage / trash / waste' },
      { kannada: 'ಹಾಕಬೇಡಿ', transliteration: 'hākabēḍi', meaning: 'do not put / throw' },
      { kannada: 'ಸ್ವಚ್ಛ', transliteration: 'swaccha', meaning: 'clean / pure' }
    ],
    contextNote: 'Mounted by BBMP marshals at street corners to discourage unauthorized dumping of garbage.',
    keywords: ['garbage', 'littering', 'kasa hakabedi', 'do not litter', 'swaccha', 'dumping', 'waste']
  },
  {
    id: 'civic-restroom-toilets',
    category: 'civic',
    categoryLabel: 'Civic & Warning Notices',
    title: 'Public Restroom / Toilet Sign',
    kannada: 'ಸಾರ್ವಜನಿಕ ಶೌಚಾಲಯ (ಪುರುಷರು / ಮಹಿಳೆಯರು)',
    transliteration: 'Sārvajanika śaucālaya (Puruṣaru / Mahiḷeyaru)',
    english: 'Public Restroom / Toilet (Men / Women)',
    hindi: 'सार्वजनिक शौचालय (पुरुष / महिला)',
    signType: 'Public Amenity Sign',
    signTheme: 'blue-bus',
    badge: 'Public Amenity 🚻',
    bilingualText: 'PUBLIC TOILET - MEN / WOMEN',
    words: [
      { kannada: 'ಸಾರ್ವಜನಿಕ', transliteration: 'sārvajanika', meaning: 'public' },
      { kannada: 'ಶೌಚಾಲಯ', transliteration: 'śaucālaya', meaning: 'restroom / toilet / lavatory' },
      { kannada: 'ಪುರುಷರು', transliteration: 'puruṣaru', meaning: 'men / male' },
      { kannada: 'ಮಹಿಳೆಯರು', transliteration: 'mahiḷeyaru', meaning: 'women / female' }
    ],
    contextNote: 'Found in bus depots, metro stations, parks (Cubbon Park, Lalbagh), and commercial zones.',
    keywords: ['toilet', 'restroom', 'shauchalaya', 'purusharu', 'mahileyaru', 'washroom', 'bathroom']
  },
  {
    id: 'civic-drinking-water',
    category: 'civic',
    categoryLabel: 'Civic & Warning Notices',
    title: 'Drinking Water Facility',
    kannada: 'ಶುದ್ಧ ಕುಡಿಯುವ ನೀರು',
    transliteration: 'Śuddha kuḍiyuva nīru',
    english: 'Pure Drinking Water (Potable Water)',
    hindi: 'शुद्ध पीने का पानी',
    signType: 'Public Facility Board',
    signTheme: 'blue-bus',
    badge: 'Free Potable Water 🚰',
    bilingualText: 'DRINKING WATER / ಕುಡಿಯುವ ನೀರು',
    words: [
      { kannada: 'ಶುದ್ಧ', transliteration: 'śuddha', meaning: 'pure / filtered' },
      { kannada: 'ಕುಡಿಯುವ', transliteration: 'kuḍiyuva', meaning: 'drinking' },
      { kannada: 'ನೀರು', transliteration: 'nīru', meaning: 'water' }
    ],
    contextNote: 'Indicates RO water kiosks, temple water points, and railway station tap points.',
    keywords: ['drinking water', 'kudiyuva neeru', 'neeru', 'water', 'shuddha', 'water tap']
  },
  {
    id: 'civic-cctv-surveillance',
    category: 'civic',
    categoryLabel: 'Civic & Warning Notices',
    title: 'CCTV Surveillance Notice',
    kannada: 'ನೀವು ಸಿಸಿಟಿವಿ ಕ್ಯಾಮೆರಾ ಕಣ್ಗಾವಲಿನಲ್ಲಿದ್ದೀರಿ',
    transliteration: 'Nīvu CCTV camera kaṇgāvalinalliddīri',
    english: 'You are under 24/7 CCTV Camera Surveillance',
    hindi: 'आप सीसीटीवी कैमरे की निगरानी में हैं',
    signType: 'Security Notice',
    signTheme: 'yellow-caution',
    badge: 'Security Monitored 📹',
    bilingualText: 'UNDER CCTV SURVEILLANCE',
    words: [
      { kannada: 'ನೀವು', transliteration: 'nīvu', meaning: 'you (respectful)' },
      { kannada: 'ಕಣ್ಗಾವಲು', transliteration: 'kaṇgāvalu', meaning: 'surveillance / watchful eye' },
      { kannada: 'ಇದ್ದೀರಿ', transliteration: 'iddīri', meaning: 'are currently' }
    ],
    contextNote: 'Standard security warning on storefronts, apartment gates, ATMs, and public transit nodes.',
    keywords: ['cctv', 'surveillance', 'kangavalu', 'camera', 'under cctv', 'security notice']
  },
  {
    id: 'civic-remove-footwear',
    category: 'civic',
    categoryLabel: 'Civic & Warning Notices',
    title: 'Remove Footwear Outside Notice',
    kannada: 'ದಯವಿಟ್ಟು ಪಾದರಕ್ಷೆಗಳನ್ನು ಇಲ್ಲಿಯೇ ಬಿಡಿ',
    transliteration: 'Dayaviṭṭu pālarakṣegaḷannu illiyē biḍi',
    english: 'Please remove / leave your footwear here',
    hindi: 'कृपया जूते-चप्पल यहीं उतारें',
    signType: 'Cultural Courtesy Notice',
    signTheme: 'blue-bus',
    badge: 'Sacred / Clean Space 👟',
    bilingualText: 'PLEASE REMOVE FOOTWEAR HERE',
    words: [
      { kannada: 'ದಯವಿಟ್ಟು', transliteration: 'dayaviṭṭu', meaning: 'please / kindly' },
      { kannada: 'ಪಾದರಕ್ಷೆ', transliteration: 'pādarakṣe', meaning: 'footwear (chappals / shoes)' },
      { kannada: 'ಬಿಡಿ', transliteration: 'biḍi', meaning: 'leave / remove' }
    ],
    contextNote: 'Posted at temple entrances, yoga centers, meditation halls, and traditional homes.',
    keywords: ['footwear', 'remove shoes', 'padarakshe', 'shoes outside', 'chappals', 'temple shoes']
  },

  // 5. Shops, Darshini Menus & Eateries
  {
    id: 'shop-pure-veg-darshini',
    category: 'shop',
    categoryLabel: 'Darshini & Shop Boards',
    title: 'Pure Vegetarian Darshini Signboard',
    kannada: 'ಶ್ರೀ ಸಾಯಿ ಉಪಾಹಾರ ಗೃಹ - ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ (ಸೆಲ್ಫ್ ಸರ್ವಿಸ್)',
    transliteration: 'Śrī Sāyi Upāhāra Gr̥ha - Śuddha Sasyāhāri (Self Service)',
    english: 'Shri Sai Refreshment Home - Pure Vegetarian (Self Service)',
    hindi: 'श्री साई उपहार गृह - शुद्ध शाकाहारी (सेल्फ सर्विस)',
    signType: 'Restaurant Entrance Board',
    signTheme: 'amber-food',
    badge: 'Darshini Eatery ☕',
    bilingualText: 'PURE VEGETARIAN FAST FOOD / ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ',
    words: [
      { kannada: 'ಉಪಾಹಾರ', transliteration: 'upāhāra', meaning: 'breakfast / light meal' },
      { kannada: 'ಗೃಹ', transliteration: 'gr̥ha', meaning: 'home / eatery' },
      { kannada: 'ಶುದ್ಧ', transliteration: 'śuddha', meaning: 'pure' },
      { kannada: 'ಸಸ್ಯಾಹಾರಿ', transliteration: 'sasyāhāri', meaning: 'vegetarian (plant-eating)' }
    ],
    contextNote: 'Ubiquitous iconic Bengaluru Darshini breakfast fast-food establishment.',
    keywords: ['pure veg', 'upahara', 'sasyahari', 'darshini', 'hotel', 'restaurant', 'breakfast', 'pure vegetarian']
  },
  {
    id: 'shop-menu-board',
    category: 'shop',
    categoryLabel: 'Darshini & Shop Boards',
    title: 'Darshini Breakfast Price Menu Board',
    kannada: 'ತಟ್ಟೆ ಇಡ್ಲಿ ವಡೆ - ಮಸಾಲೆ ದೋಸೆ - ಫಿಲ್ಟರ್ ಕಾಫಿ',
    transliteration: 'Thaṭṭe Iḍli Vaḍe - Masāle Dōse - Filter Kāphi',
    english: 'Plate Idli Vada - Masala Dosa - Filter Coffee',
    hindi: 'थट्टे इडली वड़ा - मसाला डोसा - फ़िल्टर कॉफ़ी',
    signType: 'Eatery Menu Board',
    signTheme: 'amber-food',
    badge: 'Daily Breakfast Menu',
    bilingualText: 'THATTE IDLI VADA & FILTER COFFEE',
    words: [
      { kannada: 'ತಟ್ಟೆ ಇಡ್ಲಿ', transliteration: 'thaṭṭe iḍli', meaning: 'Bidadi-style flat plate steamed idli' },
      { kannada: 'ವಡೆ', transliteration: 'vaḍe', meaning: 'crispy lentil medu vada' },
      { kannada: 'ಮಸಾಲೆ ದೋಸೆ', transliteration: 'masāle dōse', meaning: 'crispy spiced potato crepe' },
      { kannada: 'ಫಿಲ್ಟರ್ ಕಾಫಿ', transliteration: 'filter kāphi', meaning: 'South Indian chicory drip coffee' }
    ],
    contextNote: 'Classic items hanging on painted boards above cash counters across Karnataka.',
    keywords: ['idli', 'dosa', 'vada', 'coffee', 'thatte idli', 'masale dose', 'menu', 'darshini menu']
  },
  {
    id: 'shop-nandini-milk',
    category: 'shop',
    categoryLabel: 'Darshini & Shop Boards',
    title: 'Nandini Milk & Dairy Parlour',
    kannada: 'ನಂದಿನಿ ಹಾಲಿನ ಮಳಿಗೆ (ಕರ್ನಾಟಕ ಹಾಲು ಮಹಾಮಂಡಳಿ - ಕೆಎಂಎಫ್)',
    transliteration: 'Nandini Hālina Maḷige (KMF)',
    english: 'Nandini Milk Booth / Dairy Outlet (Karnataka Milk Federation)',
    hindi: 'नंदिनी दूध की दुकान (कर्नाटक दुग्ध महासंघ - केएमएफ़)',
    signType: 'Dairy Store Signboard',
    signTheme: 'blue-bus',
    badge: 'KMF Official Outlet 🥛',
    bilingualText: 'NANDINI MILK PARLOUR - KMF',
    words: [
      { kannada: 'ಹಾಲು', transliteration: 'hālu', meaning: 'milk' },
      { kannada: 'ಮಳಿಗೆ', transliteration: 'maḷige', meaning: 'parlour / outlet / shop' },
      { kannada: 'ಮಹಾಮಂಡಳಿ', transliteration: 'mahāmaṇḍaḷi', meaning: 'federation / apex body' }
    ],
    contextNote: 'Over 5,000 Nandini outlets provide fresh milk, curd, peda, and ghee at government-regulated prices.',
    keywords: ['nandini', 'kmf', 'milk', 'halu', 'halina malige', 'dairy', 'curd', 'ghee']
  },
  {
    id: 'shop-medical-pharmacy',
    category: 'shop',
    categoryLabel: 'Darshini & Shop Boards',
    title: '24/7 Pharmacy & Medical Store',
    kannada: 'ಔಷಧಿ ಅಂಗಡಿ (ಮೆಡಿಕಲ್ಸ್) - ೨೪ ಗಂಟೆ ಸೇವೆ ಲಭ್ಯ',
    transliteration: 'Auṣadhi Aṅgaḍi (Medicals) - 24 gaṇṭe sēve labhya',
    english: 'Pharmacy / Medical Store - 24 Hours Service Available',
    hindi: 'दवाइयों की दुकान (मेडिकल्स) - 24 घंटे सेवा उपलब्ध',
    signType: 'Pharmacy Signboard',
    signTheme: 'green-highway',
    badge: '24/7 Emergency 💊',
    bilingualText: 'PHARMACY & MEDICALS - OPEN 24 HOURS',
    words: [
      { kannada: 'ಔಷಧಿ', transliteration: 'auṣadhi', meaning: 'medicine / pharmaceutical' },
      { kannada: 'ಅಂಗಡಿ', transliteration: 'aṅgaḍi', meaning: 'shop / store' },
      { kannada: 'ಲಭ್ಯ', transliteration: 'labhya', meaning: 'available' }
    ],
    contextNote: 'Essential landmark for travelers and residents needing prescription medications anytime.',
    keywords: ['medical', 'pharmacy', 'aushadhi', 'chemist', 'medicine', '24 hours', 'doctor']
  },

  // 6. Government & BBMP Civic Offices
  {
    id: 'govt-bbmp-office',
    category: 'government',
    categoryLabel: 'Government & BBMP Offices',
    title: 'BBMP Mahanagara Palike Office',
    kannada: 'ಬೃಹತ್ ಬೆಂಗಳೂರು ಮಹಾನಗರ ಪಾಲಿಕೆ (ಬಿಬಿಎಂಪಿ) - ವಾರ್ಡ್ ಕಚೇರಿ',
    transliteration: 'Br̥hat Beṅgaḷūru Mahānagara Pālike (BBMP) - Ward Kaceri',
    english: 'Greater Bengaluru Municipal Corporation (BBMP) - Ward Office',
    hindi: 'बृहत बेंगलुरु महानगर पालिका (बीबीएमपी) - वार्ड कार्यालय',
    signType: 'Civic Administration Board',
    signTheme: 'blue-bus',
    badge: 'BBMP Ward Office 🏛️',
    bilingualText: 'BRUHAT BENGALURU MAHANAGARA PALIKE - BBMP',
    words: [
      { kannada: 'ಬೃಹತ್', transliteration: 'br̥hat', meaning: 'greater / mega' },
      { kannada: 'ಮಹಾನಗರ', transliteration: 'mahānagara', meaning: 'metropolis' },
      { kannada: 'ಪಾಲಿಕೆ', transliteration: 'pālike', meaning: 'corporation / governing body' },
      { kannada: 'ಕಚೇರಿ', transliteration: 'kacēri', meaning: 'office' }
    ],
    contextNote: 'Headquarters and ward centers handling property taxes (Khata), trade licenses, and city governance.',
    keywords: ['bbmp', 'mahanagara palike', 'bengaluru', 'kacheri', 'ward office', 'corporation']
  },
  {
    id: 'govt-police-station',
    category: 'government',
    categoryLabel: 'Government & BBMP Offices',
    title: 'Police Station Signboard',
    kannada: 'ಕರ್ನಾಟಕ ಪೊಲೀಸ್ - ಕಾನೂನು ಮತ್ತು ಸುವ್ಯವಸ್ಥೆ ಪೊಲೀಸ್ ಠಾಣೆ',
    transliteration: 'Karṇāṭaka Police - Kānūnu mattu Suvyavasthe Police Ṭhāṇe',
    english: 'Karnataka Police - Law & Order Police Station',
    hindi: 'कर्नाटक पुलिस - कानून एवं व्यवस्था पुलिस स्टेशन',
    signType: 'Police Station Sign',
    signTheme: 'blue-bus',
    badge: 'Emergency 112 🚓',
    bilingualText: 'KARNATAKA POLICE STATION',
    words: [
      { kannada: 'ಕಾನೂನು', transliteration: 'kānūnu', meaning: 'law' },
      { kannada: 'ಸುವ್ಯವಸ್ಥೆ', transliteration: 'suvyavasthe', meaning: 'order / good governance' },
      { kannada: 'ಠಾಣೆ', transliteration: 'ṭhāṇe', meaning: 'station / post' }
    ],
    contextNote: 'Jurisdictional police stations across Karnataka for reporting emergencies or seeking assistance.',
    keywords: ['police', 'police station', 'thane', 'police thane', 'kanunu', 'emergency', 'cop']
  }
];

export function findSignboardMatch(query: string): SignboardItem | null {
  if (!query || typeof query !== 'string') return null;
  const q = query.trim().toLowerCase();

  // 1. Direct ID match
  const byId = KARNATAKA_SIGNBOARDS.find(s => s.id === q);
  if (byId) return byId;

  // 2. Exact Kannada text match
  const byExactKannada = KARNATAKA_SIGNBOARDS.find(s => s.kannada.toLowerCase() === q);
  if (byExactKannada) return byExactKannada;

  // 3. Keyword matches
  for (const s of KARNATAKA_SIGNBOARDS) {
    if (s.keywords.some(k => q.includes(k) || k.includes(q))) {
      return s;
    }
  }

  // 4. Substring in title or transliteration or english
  for (const s of KARNATAKA_SIGNBOARDS) {
    if (
      s.title.toLowerCase().includes(q) ||
      s.transliteration.toLowerCase().includes(q) ||
      s.english.toLowerCase().includes(q) ||
      s.hindi.includes(q) ||
      s.kannada.includes(q)
    ) {
      return s;
    }
  }

  return null;
}
