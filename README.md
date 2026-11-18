<div align="center">

# 🌿 Namma Kannada AI 🌿

### AI-Assisted Interactive Kannada Learning & Practical Survival Companion for Karnataka
*Bridge the linguistic gap for non-native speakers, migrants, tourists, and students in Karnataka.*

[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-3.8_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[Live Demo](#-installation--setup) • [Core Features](#-core-features) • [Architecture](#-architecture) • [API Reference](#-api-endpoints) • [Hackathon Alignment](#-hackathon-judging-alignment)

</div>

---

## 🧭 The Problem It Solves

Millions of professionals, students, and travelers moving to Bengaluru, Mysuru, and Mangaluru face everyday friction due to language barriers:
- 🛺 **Auto-Rickshaw Negotiations:** Struggling to explain destinations or agree on meter fares.
- ☕ **Darshinis & Dining:** Ordering filter coffee and masala dosas smoothly.
- 🛑 **Decoding Signboards:** Missing critical traffic regulations, parking restrictions, metro routes, and bus destination boards written in Kannada script.
- 📖 **Grammar Complexity:** Grasping Dravidian **Subject-Object-Verb (SOV)** sentence order and cultural honorifics (e.g., appending `-ru` to show deep respect for elders, mentors, and teachers).

**Namma Kannada AI** solves these challenges by combining instant verified offline phrasebooks with state-of-the-art multimodal AI.

---

## ✨ Core Features

1. **Intelligent Bilingual Translation Engine (`/api/translate`)**
   - Translates seamlessly from **English** or **Hindi** into natural, spoken Kannada.
   - Outputs pristine Kannada script, intuitive Roman transliteration, word-by-word vocabulary breakdown, grammar explanations, polite formal variants, and cultural tips.
2. **Multi-Tier Resilient Translation Architecture**
   - *Tier 1:* Verified Karnataka Signboard Corpus (sub-10ms instant matching).
   - *Tier 2:* Live Google Gemini AI (`gemini-3.8-flash`) for nuanced conversational sentences.
   - *Tier 3:* Client-side offline fallback (`localTranslator.ts`) — guaranteed 100% uptime without failure.
3. **Conversational Tutor (Roleplay Simulator)**
   - 10 real-world daily scenarios (Auto Driver, Restaurant Server, Market Shopping, Asking Directions, Hospital, College, etc.).
   - AI persona responses with native audio playback and smart suggested user replies.
4. **Interactive Writing Lab**
   - HTML5 Canvas stroke tracing for Kannada vowels (*Swara*), consonants (*Vyanjana*), conjuncts (*Ottakshara*), and numbers.
   - Real-time touch/mouse support, ink customization, grid alignment, and celebration confetti on mastery.
5. **Signboard OCR & Camera Reader**
   - Instant visual inspection and translation of traffic signs, metro notices, and bus boards with practical commuter advice.
6. **7-Day Survival Course & Spaced Repetition**
   - Structured day-by-day foundational path with interactive quizzes, daily streaks, and flashcard memory coaching.
7. **Voice Input & TTS Audio Playback**
   - Web Speech API voice dictation (`en-US` / `hi-IN`) and server-streamed audio pronunciation (`/api/tts`).
8. **Bilingual Onboarding & Secure Auth**
   - Tailored onboarding wizard supporting English and Hindi UI, password authentication, and OTP login simulation backed by persistent `localStorage`.

---

## 🏛️ Architecture

```mermaid
graph TD
    A[User / Browser Client] -->|HTTP POST / GET| B[Express.js Server (server.ts)]
    B -->|1. Check Corpus Match| C[Curated Signboard / Phrase Database]
    B -->|2. Query Gemini API| D[Google Gemini 3.8 Flash SDK]
    B -->|3. Fallback Engine| E[Client Local Linguistic Fallback (localTranslator.ts)]
    C --> A
    D --> A
    E --> A
```

---

## 🛠️ Tech Stack

| Category | Technologies & Libraries |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite 8, Tailwind CSS v4, Lucide React, Canvas Confetti |
| **Typography** | Google Fonts (*Anek Kannada*, *Plus Jakarta Sans*) |
| **Backend** | Node.js, Express.js, `tsx`, `server.ts` |
| **AI / ML** | `@google/genai` TypeScript SDK, Gemini 3.8 Flash (`gemini-3.8-flash`) |
| **Speech & Audio** | Web Speech API (SpeechRecognition), Server TTS Audio Streaming (`/api/tts`) |
| **Storage & State** | `localStorage` + In-Memory Session & OTP Store |
| **API Endpoints** | `POST /api/translate`, `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/generate-otp`, `POST /api/chat`, `GET /api/tts`, `GET /api/health` |

---

## 📂 Repository Structure

```text
/
├── package.json
├── server.ts
├── vite.config.ts
├── index.html
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── types/
    │   └── index.ts
    ├── utils/
    │   ├── audio.ts
    │   ├── i18n.ts
    │   ├── storage.ts
    │   └── localTranslator.ts
    ├── data/
    │   ├── alphabetData.ts
    │   └── signboardData.ts
    └── components/
        ├── Navbar.tsx
        ├── BottomNav.tsx
        ├── HomeDashboard.tsx
        ├── TranslatorSection.tsx
        ├── ConversationalTutor.tsx
        ├── InteractiveWritingLab.tsx
        ├── SurvivalMode.tsx
        ├── RegionalExplorer.tsx
        ├── CameraReaderOCR.tsx
        ├── PhrasebookSection.tsx
        ├── AuthModal.tsx
        └── OnboardingModal.tsx
```

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/namma-kannada-ai.git
   cd namma-kannada-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   PORT=3000
   GEMINI_API_KEY=your_google_ai_studio_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

---

## 🔌 API Endpoints

### `POST /api/translate`
Translates text from English or Hindi into spoken Kannada with deep grammatical breakdown.

**Request Body:**
```json
{
  "text": "Where is the bus stop?",
  "sourceLang": "en",
  "mode": "standard"
}
```

**Response:**
```json
{
  "kannada_text": "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?",
  "transliteration": "Bus nildāṇa ellide?",
  "source_language_meaning": "Where is the bus stop?",
  "word_breakdown": [
    { "kannada": "ಬಸ್", "transliteration": "Bus", "meaning": "Bus" },
    { "kannada": "ನಿಲ್ದಾಣ", "transliteration": "nildāṇa", "meaning": "station / stop" },
    { "kannada": "ಎಲ್ಲಿದೆ", "transliteration": "ellide", "meaning": "where is (it)?" }
  ],
  "grammar_explanation": "Kannada follows Subject-Object-Verb (SOV) sentence order where question words appear at the end.",
  "usage_context": "Everyday commuting query across Karnataka.",
  "polite_variant": "ದಯವಿಟ್ಟು, ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ ಎಂದು ತಿಳಿಸುತ್ತೀರಾ?",
  "isLiveAI": false,
  "provider": "Curated Verified Kannada Knowledge Base"
}
```

---

## 🏆 Hackathon Judging Alignment

| Evaluation Criteria | How Namma Kannada AI Delivers |
| :--- | :--- |
| **Functionality** | Fully operational translator, 10-scenario conversational roleplay tutor, HTML5 writing lab canvas, and signboard OCR scanner. |
| **Technical Execution** | Robust full-stack TypeScript architecture integrating `@google/genai` (Gemini 3.8 Flash) with a multi-tier offline fallback engine. |
| **Usability** | Mobile-first responsive UI, fluid vertical scrolling, one-tap audio pronunciation, and bilingual onboarding (English/Hindi). |
| **Innovation** | Culturally authentic Dravidian grammar rules (honorific suffix `-ru`), local Bengaluru colloquialisms, and instant signboard decoding. |

---

## 🗺️ Future Roadmap

- [ ] **Offline PWA Support:** Full ServiceWorker caching for completely offline rural travel.
- [ ] **Dialect Switcher:** Explore regional variations (Mysuru Kannada, Mangalurean Tulu/Kannada blends, North Karnataka dialect).
- [ ] **Gamified Quizzes:** Daily leaderboards, XP badges, and community phrasebook contributions.
- [ ] **Voice-to-Voice Live Chat:** Real-time speech streaming with Gemini Live API.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue for bug reports and feature requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
Made with ❤️ for Karnataka and language learners worldwide.
</div>
