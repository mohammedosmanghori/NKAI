import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  KeyRound, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  X,
  ShieldCheck,
  Smartphone,
  RotateCcw,
  BookOpen,
  Keyboard
} from 'lucide-react';
import { UserProfile, SourceLanguage, UserLevel, LearningPurpose, DailyGoalMinutes, RegisteredUser } from '../types';
import { 
  registerUser, 
  loginWithPassword, 
  generateOtp, 
  verifyOtp 
} from '../utils/storage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess: (user: RegisteredUser) => void;
  currentProfile?: UserProfile;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess,
  currentProfile
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');

  // Register Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Other Learning Preferences
  const [sourceLang, setSourceLang] = useState<SourceLanguage>(currentProfile?.sourceLanguage || 'en');
  const [level, setLevel] = useState<UserLevel>(currentProfile?.level || 'beginner');
  const [purpose, setPurpose] = useState<LearningPurpose>(currentProfile?.purpose || 'everyday');
  const [dailyMinutes, setDailyMinutes] = useState<DailyGoalMinutes>(currentProfile?.dailyGoalMinutes || 10);
  const [showLearningPreferences, setShowLearningPreferences] = useState(false);

  // Login Fields
  const [identifier, setIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // OTP Fields
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpTargetType, setOtpTargetType] = useState<'email' | 'phone'>('phone');
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  // Feedback states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [initialMode, isOpen]);

  // Lock background scrolling when AuthModal is open to prevent page drift
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim()) return setErrorMsg('Please enter your full name.');
    if (!phone.trim()) return setErrorMsg('Please enter your mobile phone number.');
    if (!email.trim() || !email.includes('@')) return setErrorMsg('Please enter a valid email address.');
    if (!password) return setErrorMsg('Please enter a password.');
    if (password.length < 4) return setErrorMsg('Password must be at least 4 characters long.');
    if (password !== confirmPassword) return setErrorMsg('Passwords do not match. Please verify.');

    setIsLoading(true);

    setTimeout(() => {
      const res = registerUser({
        name,
        phone,
        email,
        password,
        sourceLanguage: sourceLang,
        level,
        purpose,
        dailyGoalMinutes: dailyMinutes
      });

      setIsLoading(false);

      if (!res.success) {
        setErrorMsg(res.error || 'Registration failed');
      } else if (res.user) {
        setSuccessMsg(`Welcome aboard, ${res.user.name}! Your account is ready.`);
        setTimeout(() => {
          onSuccess(res.user!);
          onClose();
        }, 800);
      }
    }, 350);
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!identifier.trim()) return setErrorMsg('Please enter your email address or mobile number.');
    if (!loginPassword) return setErrorMsg('Please enter your password.');

    setIsLoading(true);

    setTimeout(() => {
      const res = loginWithPassword(identifier, loginPassword);
      setIsLoading(false);

      if (!res.success) {
        setErrorMsg(res.error || 'Login failed');
      } else if (res.user) {
        setSuccessMsg(`Welcome back, ${res.user.name}!`);
        setTimeout(() => {
          onSuccess(res.user!);
          onClose();
        }, 700);
      }
    }, 350);
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!identifier.trim()) {
      return setErrorMsg('Please enter your registered mobile number or email address to get OTP.');
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = generateOtp(identifier);
      setIsLoading(false);

      if (!res.success) {
        setErrorMsg(res.error || 'Failed to generate OTP');
      } else {
        setGeneratedOtp(res.otp || null);
        setOtpTargetType(res.targetType || 'phone');
        setOtpSent(true);
        setOtpCountdown(45); // 45 seconds countdown
        setSuccessMsg('OTP generated successfully!');
      }
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!otpCode || otpCode.length < 4) {
      return setErrorMsg('Please enter the verification OTP code.');
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = verifyOtp(identifier, otpCode);
      setIsLoading(false);

      if (!res.success) {
        setErrorMsg(res.error || 'OTP verification failed');
      } else if (res.user) {
        setSuccessMsg(`Verified! Welcome ${res.user.name}.`);
        setTimeout(() => {
          onSuccess(res.user!);
          onClose();
        }, 700);
      }
    }, 350);
  };

  const isHi = (currentProfile?.sourceLanguage === 'hi') || (sourceLang === 'hi');

  const fillMockOtp = () => {
    if (generatedOtp) {
      setOtpCode(generatedOtp);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-3 sm:p-4 overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] animate-in fade-in duration-150"
      >
        {/* Flag Bar Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#F59E0B] shrink-0" />

        {/* Action Controls in Header: Close button */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <button
            onClick={onClose}
            className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1ECE4] rounded-xl transition-colors cursor-pointer"
            title={isHi ? 'बंद करें' : 'Close'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Header */}
        <div className="px-5 sm:px-6 pt-3.5 pb-3 border-b border-[#E8E2D6] shrink-0 text-center bg-[#FFFDF9]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-[#B45309] border border-amber-200 rounded-full text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>ನಮಸ್ಕಾರ • Namma Kannada Account</span>
          </div>
          
          <h2 className="font-black text-[#0F172A] text-xl sm:text-2xl">
            {mode === 'login' 
              ? (isHi ? 'अपने खाते में लॉगिन करें' : 'Sign In to Your Learning') 
              : (isHi ? 'मुफ्त खाता बनाएं (रजिस्टर)' : 'Create Free Account')}
          </h2>
          
          <p className="text-xs text-[#64748B] mt-1 max-w-xs mx-auto">
            {mode === 'login' 
              ? (isHi ? 'अपनी प्रगति, दैनिक स्ट्रीक और सहेजी गई शब्दावली तक पहुंचें।' : 'Access your progress, daily streaks, writing practice, and custom vocabulary.')
              : (isHi ? 'नाम, मोबाइल, ईमेल और पासवर्ड दर्ज करके अपनी सीखने की यात्रा शुरू करें।' : 'Register with name, mobile, email, and password to begin your journey.')}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 bg-[#F1ECE4] p-1 rounded-xl border border-[#E2DBD0] mt-3 w-full text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`py-2 rounded-lg transition-all text-center cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {isHi ? 'लॉगिन (साइन इन)' : 'Sign In (Login)'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`py-2 rounded-lg transition-all text-center cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {isHi ? 'रजिस्टर (नया खाता)' : 'Register (New Account)'}
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div 
          ref={formScrollRef}
          className="overflow-y-auto flex-1 px-5 sm:px-6 py-3.5 space-y-3.5 overscroll-contain"
        >
          {/* Alerts */}
          {errorMsg && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}
          {/* ================= REGISTER FORM ================= */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3 pt-1.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">
                  {isHi ? 'शिक्षार्थी का नाम / पूरा नाम *' : 'Learner Name / Full Name *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={isHi ? 'उदा: उस्मान घोरी' : 'e.g. Osman Ghori'}
                    className="w-full bg-[#FAF7F2] border border-[#E2DBD0] rounded-xl pl-9.5 pr-3 py-2.5 text-base sm:text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D97706]/30 focus:border-[#D97706]"
                  />
                </div>
              </div>

              {/* Mobile Number & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">
                    {isHi ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder={isHi ? 'उदा: 98765 43210' : 'e.g. 98765 43210'}
                      className="w-full bg-[#FAF7F2] border border-[#E2DBD0] rounded-xl pl-9.5 pr-3 py-2.5 text-base sm:text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D97706]/30 focus:border-[#D97706]"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">
                    {isHi ? 'ईमेल पता *' : 'Email Address *'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder={isHi ? 'उदा: name@gmail.com' : 'e.g. name@gmail.com'}
                      className="w-full bg-[#FAF7F2] border border-[#E2DBD0] rounded-xl pl-9.5 pr-3 py-2.5 text-base sm:text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D97706]/30 focus:border-[#D97706]"
                    />
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">
                    {isHi ? 'पासवर्ड बनाएं *' : 'Create Password *'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder={isHi ? 'न्यूनतम 4 अक्षर' : 'Min 4 characters'}
                      className="w-full bg-[#FAF7F2] border border-[#E2DBD0] rounded-xl pl-9.5 pr-10 py-2.5 text-base sm:text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D97706]/30 focus:border-[#D97706]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">
                    {isHi ? 'पासवर्ड की पुष्टि करें *' : 'Confirm Password *'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder={isHi ? 'वही पासवर्ड दोहराएं' : 'Repeat password'}
                      className="w-full bg-[#FAF7F2] border border-[#E2DBD0] rounded-xl pl-9.5 pr-10 py-2.5 text-base sm:text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D97706]/30 focus:border-[#D97706]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Other Details - Toggle */}
              <div className="pt-2 border-t border-[#E8E2D6]">
                <button
                  type="button"
                  onClick={() => setShowLearningPreferences(!showLearningPreferences)}
                  className="flex items-center justify-between w-full text-xs font-bold text-[#64748B] hover:text-[#0F172A] py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{isHi ? 'सीखने की प्राथमिकताएं और लक्ष्य (भाषा, स्तर, समय)' : 'Learning Preferences & Goals (Language, Level, Target)'}</span>
                  </span>
                  <span className="text-[11px] text-[#D97706]">
                    {showLearningPreferences ? (isHi ? 'छिपाएं ▲' : 'Hide ▲') : (isHi ? 'बदलें ▼' : 'Customize ▼')}
                  </span>
                </button>

                {showLearningPreferences && (
                  <div className="space-y-3 mt-2.5 p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E2DBD0] animate-in fade-in">
                    {/* Language Preference */}
                    <div>
                      <span className="text-[11px] font-bold text-[#0F172A] block mb-1">
                        {isHi ? 'व्याख्या और अनुवाद की भाषा:' : 'Explanation Language:'}
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setSourceLang('en')}
                          className={`p-2 rounded-xl border text-center font-bold transition-all ${
                            sourceLang === 'en'
                              ? 'bg-white border-[#E11D48] text-[#E11D48] ring-1 ring-[#E11D48]/30 shadow-xs'
                              : 'border-[#E2DBD0] text-[#64748B]'
                          }`}
                        >
                          🇬🇧 English
                        </button>
                        <button
                          type="button"
                          onClick={() => setSourceLang('hi')}
                          className={`p-2 rounded-xl border text-center font-bold transition-all ${
                            sourceLang === 'hi'
                              ? 'bg-white border-[#E11D48] text-[#E11D48] ring-1 ring-[#E11D48]/30 shadow-xs'
                              : 'border-[#E2DBD0] text-[#64748B]'
                          }`}
                        >
                          🇮🇳 हिंदी (Hindi)
                        </button>
                      </div>
                    </div>

                    {/* Kannada Level */}
                    <div>
                      <span className="text-[11px] font-bold text-[#0F172A] block mb-1">
                        {isHi ? 'वर्तमान कन्नड़ स्तर:' : 'Current Kannada Level:'}
                      </span>
                      <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                        {[
                          { id: 'beginner', label: isHi ? 'शुरुआती' : 'Beginner' },
                          { id: 'basic', label: isHi ? 'कुछ शब्द' : 'Knows Words' },
                          { id: 'intermediate', label: isHi ? 'वाक्य' : 'Sentences' }
                        ].map(lvl => (
                          <button
                            key={lvl.id}
                            type="button"
                            onClick={() => setLevel(lvl.id as any)}
                            className={`py-1.5 px-2 rounded-lg border text-center font-bold transition-all ${
                              level === lvl.id
                                ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                : 'bg-white text-[#64748B] border-[#E2DBD0]'
                            }`}
                          >
                            {lvl.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Daily Goal */}
                    <div>
                      <span className="text-[11px] font-bold text-[#0F172A] block mb-1">
                        {isHi ? 'दैनिक अभ्यास लक्ष्य:' : 'Daily Learning Commitment:'}
                      </span>
                      <div className="grid grid-cols-4 gap-1.5 text-xs">
                        {[5, 10, 15, 20].map(mins => (
                          <button
                            key={mins}
                            type="button"
                            onClick={() => setDailyMinutes(mins as any)}
                            className={`py-1.5 rounded-lg border text-center font-bold transition-all ${
                              dailyMinutes === mins
                                ? 'bg-[#D97706] text-white border-[#D97706]'
                                : 'bg-white text-[#64748B] border-[#E2DBD0]'
                            }`}
                          >
                            {mins}{isHi ? 'मि/दिन' : 'm/day'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#EA580C] to-[#D97706] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isHi ? 'खाता पंजीकृत हो रहा है...' : 'Registering Account...'}</span>
                  </>
                ) : (
                  <>
                    <span>{isHi ? 'पंजीकरण करें और सीखना शुरू करें' : 'Register & Start Learning'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ================= LOGIN FORM ================= */}
          {mode === 'login' && (
            <div className="space-y-3.5 pt-1.5">
              {/* Login Method Toggle: Password vs OTP */}
              <div className="grid grid-cols-2 gap-1.5 bg-[#F1ECE4] p-1 rounded-xl border border-[#E2DBD0] text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('password');
                    setErrorMsg(null);
                  }}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    loginMethod === 'password'
                      ? 'bg-white text-[#0F172A] shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isHi ? 'पासवर्ड से लॉगिन' : 'Password Login'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('otp');
                    setErrorMsg(null);
                  }}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    loginMethod === 'otp'
                      ? 'bg-white text-[#0F172A] shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>{isHi ? 'OTP से लॉगिन' : 'OTP Login'}</span>
                </button>
              </div>

              {/* Common Identifier Input */}
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">
                  {isHi ? 'ईमेल पता या मोबाइल नंबर *' : 'Email Address or Mobile Number *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder={isHi ? 'ईमेल या 10-अंकों का मोबाइल नंबर दर्ज करें' : 'Enter email or 10-digit number'}
                    className="w-full bg-[#FAF7F2] border border-[#E2DBD0] rounded-xl pl-9.5 pr-3 py-2.5 text-base sm:text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D97706]/30 focus:border-[#D97706]"
                  />
                </div>
              </div>

              {/* METHOD 1: PASSWORD LOGIN */}
              {loginMethod === 'password' && (
                <form onSubmit={handlePasswordLogin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">
                      {isHi ? 'पासवर्ड *' : 'Password *'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder={isHi ? 'अपना पासवर्ड दर्ज करें' : 'Enter your password'}
                        className="w-full bg-[#FAF7F2] border border-[#E2DBD0] rounded-xl pl-9.5 pr-10 py-2.5 text-base sm:text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D97706]/30 focus:border-[#D97706]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => setLoginMethod('otp')}
                      className="text-[#D97706] hover:underline font-semibold cursor-pointer"
                    >
                      {isHi ? 'पासवर्ड भूल गए? OTP का उपयोग करें' : 'Forgot password? Use OTP'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0F172A] to-[#334155] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{isHi ? 'लॉगिन हो रहा है...' : 'Signing In...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{isHi ? 'पासवर्ड से लॉगिन करें' : 'Sign In with Password'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* METHOD 2: OTP LOGIN */}
              {loginMethod === 'otp' && (
                <div className="space-y-3.5">
                  {!otpSent ? (
                    <div className="space-y-3">
                      <p className="text-xs text-[#64748B]">
                        {isHi 
                          ? 'अपने पंजीकृत मोबाइल नंबर या ईमेल पर 6-अंकों का OTP प्राप्त करने के लिए नीचे क्लिक करें।' 
                          : 'Click below to generate a 6-digit OTP sent to your registered mobile number or email.'}
                      </p>

                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={isLoading || !identifier.trim()}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D97706] to-[#B45309] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{isHi ? 'OTP भेजा जा रहा है...' : 'Sending OTP...'}</span>
                          </>
                        ) : (
                          <>
                            <KeyRound className="w-4 h-4" />
                            <span>{isHi ? '6-अंकों का OTP जनरेट करें' : 'Generate 6-Digit OTP'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-3 animate-in fade-in">
                      {/* OTP Code Simulation Toast Banner */}
                      {generatedOtp && (
                        <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl space-y-1.5 shadow-2xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                              <span>🔑 {isHi ? 'त्वरित SMS / ईमेल कोड (सिम्युलेटेड)' : 'Simulated SMS / Email Delivery'}</span>
                            </span>
                            <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                              {isHi ? '5 मिनट तक मान्य' : 'Valid for 5 mins'}
                            </span>
                          </div>
                          <p className="text-xs text-amber-950 font-medium">
                            {isHi ? 'आपका तत्काल OTP सत्यापन कोड है: ' : 'Your instant OTP verification code is: '}
                            <strong className="text-base font-mono text-[#E11D48] tracking-widest px-1.5 py-0.5 bg-white rounded border border-amber-200">
                              {generatedOtp}
                            </strong>
                          </p>
                          <button
                            type="button"
                            onClick={fillMockOtp}
                            className="text-[11px] font-bold text-[#E11D48] hover:underline flex items-center gap-1 pt-0.5"
                          >
                            <span>👉 {isHi ? `कोड "${generatedOtp}" यहाँ स्वतः भरने के लिए टैप करें` : `Tap here to auto-fill "${generatedOtp}"`}</span>
                          </button>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1">
                          {isHi ? '6-अंकों का सत्यापन कोड (OTP) दर्ज करें *' : 'Enter 6-Digit Verification Code *'}
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          value={otpCode}
                          onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 123456"
                          className="w-full bg-[#FAF7F2] border border-[#E2DBD0] rounded-xl px-4 py-2.5 text-center text-lg font-mono font-bold tracking-widest text-[#0F172A] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <button
                          type="button"
                          disabled={otpCountdown > 0}
                          onClick={handleRequestOtp}
                          className="text-[#64748B] hover:text-[#0F172A] font-semibold disabled:opacity-50 flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>{otpCountdown > 0 ? (isHi ? `${otpCountdown}s में पुनः भेजें` : `Resend in ${otpCountdown}s`) : (isHi ? 'कोड पुनः भेजें' : 'Resend Code')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpCode('');
                          }}
                          className="text-[#D97706] hover:underline font-semibold"
                        >
                          {isHi ? 'नंबर/ईमेल बदलें' : 'Change Number/Email'}
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading || otpCode.length < 4}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#D97706] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{isHi ? 'सत्यापन हो रहा है...' : 'Verifying Code...'}</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            <span>{isHi ? 'कोड सत्यापित करें और लॉगिन करें' : 'Verify Code & Log In'}</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer switch prompt */}
        <div className="px-5 sm:px-6 py-3 border-t border-[#E8E2D6] text-center text-xs text-[#64748B] shrink-0 bg-[#FAF7F2]">
          {mode === 'login' ? (
            <p>
              {isHi ? 'अभी तक खाता नहीं है? ' : "Don't have an account yet? "}
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className="font-bold text-[#E11D48] hover:underline cursor-pointer"
              >
                {isHi ? 'नया खाता बनाएं' : 'Register Now'}
              </button>
            </p>
          ) : (
            <p>
              {isHi ? 'पहले से खाता है? ' : 'Already registered? '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className="font-bold text-[#E11D48] hover:underline cursor-pointer"
              >
                {isHi ? 'यहाँ लॉगिन करें' : 'Log In Here'}
              </button>
            </p>
          )}

          <button
            type="button"
            onClick={onClose}
            className="text-[11px] text-[#94A3B8] hover:text-[#475569] mt-1.5 block mx-auto underline cursor-pointer"
          >
            {isHi ? 'अतिथि (Guest) के रूप में जारी रखें' : 'Continue as Guest (Skip for now)'}
          </button>
        </div>
      </div>
    </div>
  );
};
