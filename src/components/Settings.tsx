import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Palette, Type, Shield, Bell, Info, Check } from 'lucide-react';
import { useTheme, ThemeType } from '../context/ThemeContext';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { theme: currentTheme, setTheme } = useTheme();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'az', name: 'Azərbaycan dili', flag: '🇦🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  const themeOptions: { id: ThemeType; name: string; colors: string[] }[] = [
    { id: 'dark-premium', name: 'Dark Premium', colors: ['#0A1F44', '#00E5FF', '#7C3AED'] },
    { id: 'light-clinical', name: 'Light Clinical', colors: ['#F8FAFC', '#0EA5E9', '#6366F1'] },
    { id: 'midnight-blue', name: 'Midnight Blue', colors: ['#020617', '#38BDF8', '#818CF8'] },
    { id: 'neuro-purple', name: 'Neuro Purple', colors: ['#1E1B4B', '#C084FC', '#818CF8'] },
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setSelectedLang(code);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-bold font-display">{t('settings')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Language Selection */}
        <div className="glass-card p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Globe className="text-neon-cyan" size={20} />
            <h3 className="font-bold">Language / Dil</h3>
          </div>
          <div className="flex flex-col gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  selectedLang === lang.code 
                  ? 'bg-neon-cyan/10 border-neon-cyan' 
                  : 'bg-white/5 border-transparent hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className={`font-medium ${selectedLang === lang.code ? 'text-white' : 'text-gray-400'}`}>
                    {lang.name}
                  </span>
                </div>
                {selectedLang === lang.code && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="text-neon-cyan" size={20} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Selection */}
        <div className="glass-card p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Palette className="text-neuro-purple" size={20} />
            <h3 className="font-bold">Theme / Tema</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {themeOptions.map((opt) => (
              <button 
                key={opt.id}
                onClick={() => setTheme(opt.id)}
                className={`flex flex-col gap-3 p-4 rounded-xl border transition-all ${
                  currentTheme === opt.id 
                  ? 'bg-neuro-purple/10 border-neuro-purple shadow-lg' 
                  : 'bg-white/5 border-transparent hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold ${currentTheme === opt.id ? 'text-white' : 'text-gray-400'}`}>
                    {opt.name}
                  </span>
                  {currentTheme === opt.id && <Check size={14} className="text-neuro-purple" />}
                </div>
                <div className="flex gap-1.5">
                  {opt.colors.map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="glass-card p-6 flex flex-col gap-6 md:col-span-2">
          <div className="flex items-center gap-2">
            <Info className="text-blue-400" size={20} />
            <h3 className="font-bold">{t('appInfo')}</h3>
          </div>
          <div className="flex flex-col gap-4 text-sm text-gray-400">
            <div className="flex justify-between border-b border-white/5 pb-2">
                <span>{t('developers')}</span>
                <span className="text-white font-medium">Fatma Nur AYKUT, Şehmus AYKUT</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Institution / Kurum</span>
                <span className="text-white">Yozgat Bozok University, Faculty of Medicine</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Advisor / Danışman</span>
                <span className="text-white font-bold text-neon-cyan">Prof. Dr. Vugar Ali TÜRKSOY</span>
            </div>
            <div className="flex justify-between pt-2">
                <span>Version</span>
                <span className="text-white font-mono">1.0.0 (Production Master)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
