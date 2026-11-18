import React, { useState } from 'react';
import { 
  Home, 
  Languages, 
  MessageSquare, 
  PenTool, 
  ShieldAlert, 
  MoreHorizontal, 
  BookOpen, 
  BrainCircuit, 
  MapPin, 
  Camera, 
  Mic, 
  Sparkles, 
  Bookmark, 
  BarChart3, 
  Settings, 
  X 
} from 'lucide-react';
import { SourceLanguage } from '../types';
import { getT } from '../utils/i18n';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  sourceLanguage: SourceLanguage;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab, sourceLanguage }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const t = getT(sourceLanguage);

  const mainTabs = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'translate', label: t.nav.translate, icon: Languages },
    { id: 'speak', label: t.nav.speak, icon: MessageSquare },
    { id: 'write', label: t.nav.write, icon: PenTool },
    { id: 'survival', label: t.nav.survival, icon: ShieldAlert },
  ];

  const moreTabs = [
    { id: 'course', label: t.nav.course, desc: t.drawer.courseDesc, icon: BookOpen, color: 'text-amber-600 bg-amber-50' },
    { id: 'say-what-you-mean', label: sourceLanguage === 'hi' ? 'मन की बात कहें' : 'Say What You Mean', desc: t.drawer.intentDesc, icon: Sparkles, color: 'text-rose-600 bg-rose-50' },
    { id: 'pronunciation', label: sourceLanguage === 'hi' ? 'उच्चारण अभ्यास' : 'Pronunciation Lab', desc: t.drawer.pronceDesc, icon: Mic, color: 'text-blue-600 bg-blue-50' },
    { id: 'revision', label: t.nav.revision, desc: t.drawer.memoryDesc, icon: BrainCircuit, color: 'text-purple-600 bg-purple-50' },
    { id: 'explore', label: t.nav.explore, desc: t.drawer.exploreDesc, icon: MapPin, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'ocr', label: t.nav.ocr, desc: t.drawer.ocrDesc, icon: Camera, color: 'text-cyan-600 bg-cyan-50' },
    { id: 'phrasebook', label: t.nav.phrasebook, desc: t.drawer.phrasebookDesc, icon: Bookmark, color: 'text-orange-600 bg-orange-50' },
    { id: 'progress', label: t.nav.progress, desc: t.drawer.progressDesc, icon: BarChart3, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'settings', label: t.nav.settings, desc: t.drawer.settingsDesc, icon: Settings, color: 'text-slate-600 bg-slate-50' },
  ];

  const handleSelect = (tabId: string) => {
    onSelectTab(tabId);
    setIsMoreOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E8E2D6] px-2 py-1.5 shadow-lg">
        <div className="flex items-center justify-around">
          {mainTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelect(tab.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#E11D48] font-bold'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-[#FFE4E6]' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">{tab.label}</span>
              </button>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
              isMoreOpen || !mainTabs.some(t => t.id === currentTab)
                ? 'text-[#D97706] font-bold'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <div className={`p-1 rounded-lg ${!mainTabs.some(t => t.id === currentTab) ? 'bg-[#FEF3C7]' : ''}`}>
              <MoreHorizontal className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5">{t.nav.more}</span>
          </button>
        </div>
      </div>

      {/* More Drawer Modal */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div 
            className="absolute inset-0"
            onClick={() => setIsMoreOpen(false)}
          />
          <div className="relative bg-[#FAF7F2] rounded-t-3xl border-t border-[#E8E2D6] p-5 max-h-[85vh] overflow-y-auto shadow-2xl z-10">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6]">
              <div>
                <h3 className="font-bold text-base text-[#0F172A]">{t.drawer.title}</h3>
                <p className="text-xs text-[#64748B]">{t.drawer.subtitle}</p>
              </div>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#EAE4D8] text-[#64748B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 pb-8">
              {moreTabs.map(item => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                      isActive 
                        ? 'bg-white border-[#E11D48] ring-1 ring-[#E11D48] shadow-sm' 
                        : 'bg-white/80 border-[#E8E2D6] hover:bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0F172A]">{item.label}</h4>
                      <p className="text-[11px] text-[#64748B]">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

