import React, { useState } from 'react';
import { 
  MapPin, 
  Volume2, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Check, 
  Info,
  Send
} from 'lucide-react';
import { RegionalExpressionItem, SourceLanguage } from '../types';
import { REGIONAL_EXPRESSIONS } from '../data/regionalData';
import { playKannadaSpeech } from '../utils/audio';

interface RegionalExplorerProps {
  sourceLanguage: SourceLanguage;
}

export const RegionalExplorer: React.FC<RegionalExplorerProps> = ({ sourceLanguage }) => {
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'bengaluru' | 'mysuru' | 'north_karnataka' | 'coastal'>('all');
  const [expressions, setExpressions] = useState<RegionalExpressionItem[]>(REGIONAL_EXPRESSIONS);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitRegion, setSubmitRegion] = useState('bengaluru');
  const [submitExpr, setSubmitExpr] = useState('');
  const [submitMeaning, setSubmitMeaning] = useState('');
  const [submitContext, setSubmitContext] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const filteredExpressions = expressions.filter(e => 
    selectedRegion === 'all' ? true : e.region === selectedRegion
  );

  const handleSubmitExpression = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitExpr.trim() || !submitMeaning.trim()) return;

    const newItem: RegionalExpressionItem = {
      id: `comm-${Date.now()}`,
      region: submitRegion as any,
      regionName: submitRegion === 'bengaluru' ? 'Bengaluru (ಬೆಂಗಳೂರು)' :
                  submitRegion === 'mysuru' ? 'Mysuru (ಮೈಸೂರು)' :
                  submitRegion === 'north_karnataka' ? 'North Karnataka (ಉತ್ತರ ಕರ್ನಾಟಕ)' : 'Coastal Karnataka (ಕರಾವಳಿ)',
      expression: submitExpr.trim(),
      transliteration: submitExpr.trim(),
      meaningEn: submitMeaning.trim(),
      meaningHi: submitMeaning.trim(),
      contextOfUse: submitContext.trim() || 'Community contributed expression',
      isVerified: false, // Explicitly marked unreviewed community contribution
      usageNote: 'Community submission currently pending linguistic moderator review.'
    };

    setExpressions([newItem, ...expressions]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowSubmitModal(false);
      setSubmitExpr('');
      setSubmitMeaning('');
      setSubmitContext('');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Dialect Diversity Across Karnataka</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          Regional Kannada Explorer
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto">
          Explore colloquial slang and regional dialect expressions from Bengaluru, Mysuru, Hubballi-Dharwad, and the Coastal Karavali coast.
        </p>
      </div>

      {/* Region Selector Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFFDF9] border border-[#E8E2D6] p-3 rounded-2xl shadow-xs">
        <div className="flex flex-wrap gap-1.5 text-xs font-bold">
          {[
            { id: 'all', label: 'All Regions' },
            { id: 'bengaluru', label: '🏙️ Bengaluru' },
            { id: 'mysuru', label: '👑 Mysuru' },
            { id: 'north_karnataka', label: '🌾 North Karnataka' },
            { id: 'coastal', label: '🌊 Coastal / Udupi' }
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id as any)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedRegion === r.id
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-white border border-[#E2DBD0] text-[#64748B] hover:bg-[#FAF7F2]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-3.5 py-1.5 rounded-xl bg-white border border-[#CBD5E1] text-xs font-bold text-[#0F172A] hover:bg-[#FAF7F2] flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-600" />
          <span>Submit Expression</span>
        </button>
      </div>

      {/* Expressions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExpressions.map(item => (
          <div
            key={item.id}
            className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                  {item.regionName}
                </span>

                {item.isVerified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Community Review
                  </span>
                )}
              </div>

              <h3 className="font-kannada text-2xl font-bold text-[#0F172A] leading-relaxed">
                {item.expression}
              </h3>
              <p className="text-xs font-mono font-bold text-[#D97706] mt-0.5">
                {item.transliteration}
              </p>
              <p className="text-xs font-semibold text-[#0F172A] mt-1.5">
                {sourceLanguage === 'hi' ? item.meaningHi : item.meaningEn}
              </p>

              <div className="mt-3 p-3 bg-white rounded-2xl border border-[#E8E2D6] text-xs space-y-1">
                <p className="text-[#475569]">
                  <strong>Context:</strong> {item.contextOfUse}
                </p>
                <p className="text-[#64748B] text-[11px] italic">
                  💡 {item.usageNote}
                </p>
                {item.alternativeVerified && (
                  <p className="text-[#0F172A] text-[11px] pt-1">
                    <strong>Standard Equivalent:</strong> <span className="font-kannada">{item.alternativeVerified}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E2D6]/70 flex justify-end">
              <button
                onClick={() => playKannadaSpeech(item.expression)}
                className="px-3 py-1.5 rounded-xl bg-[#FFF1F2] text-[#E11D48] hover:bg-[#FFE4E6] text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Audio</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Community Submit Expression Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDF9] border border-[#E8E2D6] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6]">
              <h3 className="font-bold text-base text-[#0F172A]">Propose a Regional Expression</h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1 rounded-lg hover:bg-[#EAE4D8] text-[#64748B]"
              >
                ✕
              </button>
            </div>

            {submittedSuccess ? (
              <div className="p-6 text-center space-y-2 text-emerald-700">
                <Check className="w-10 h-10 mx-auto text-emerald-600" />
                <h4 className="font-bold text-sm">Expression Submitted!</h4>
                <p className="text-xs">It has been added and flagged for community moderation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitExpression} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#64748B] mb-1">Region:</label>
                  <select
                    value={submitRegion}
                    onChange={e => setSubmitRegion(e.target.value)}
                    className="w-full bg-white border border-[#E2DBD0] rounded-xl px-3 py-2 text-xs font-semibold text-[#0F172A]"
                  >
                    <option value="bengaluru">Bengaluru</option>
                    <option value="mysuru">Mysuru</option>
                    <option value="north_karnataka">North Karnataka (Hubballi / Belagavi)</option>
                    <option value="coastal">Coastal Karnataka (Mangaluru / Udupi)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64748B] mb-1">Regional Expression (ಕನ್ನಡ):</label>
                  <input
                    type="text"
                    required
                    value={submitExpr}
                    onChange={e => setSubmitExpr(e.target.value)}
                    placeholder="e.g. ಏನ್ಪಾ ಆರಾಮ ಅದೀರಿ?"
                    className="w-full bg-white border border-[#E2DBD0] rounded-xl px-3 py-2 text-sm text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64748B] mb-1">Meaning (English or Hindi):</label>
                  <input
                    type="text"
                    required
                    value={submitMeaning}
                    onChange={e => setSubmitMeaning(e.target.value)}
                    placeholder="What does it mean?"
                    className="w-full bg-white border border-[#E2DBD0] rounded-xl px-3 py-2 text-sm text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64748B] mb-1">When / Where is it used?</label>
                  <input
                    type="text"
                    value={submitContext}
                    onChange={e => setSubmitContext(e.target.value)}
                    placeholder="e.g. Friends meeting after work"
                    className="w-full bg-white border border-[#E2DBD0] rounded-xl px-3 py-2 text-sm text-[#0F172A]"
                  />
                </div>

                <div className="pt-4 border-t border-[#E8E2D6] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#64748B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit for Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
