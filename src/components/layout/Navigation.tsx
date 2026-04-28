import { motion } from 'motion/react';
import { Home, Brain, LayoutGrid, Settings, User as UserIcon, LogOut, Gamepad2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { auth } from '../../lib/firebase';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: Props) {
  const { t } = useTranslation();

  const tabs = [
    { id: 'dashboard', icon: Home, label: t('dashboard') },
    { id: 'profile', icon: UserIcon, label: t('profile.title') },
    { id: 'entertainment', icon: Gamepad2, label: t('entertainment') },
    { id: 'mind-lab', icon: Brain, label: t('mindLab') },
    { id: 'settings', icon: Settings, label: t('settings') },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 md:px-6 py-3 md:py-4 glass-card flex items-center gap-4 md:gap-8 border-white/20 shadow-neon-cyan/20 w-[90%] max-w-lg md:w-auto">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 transition-colors flex-1 md:flex-none ${
            activeTab === tab.id ? 'text-neon-cyan' : 'text-gray-400 hover:text-white'
          }`}
        >
          <tab.icon size={20} className="md:w-6 md:h-6" />
          <span className="text-[8px] md:text-[10px] font-medium uppercase tracking-wider hidden xs:block">{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div
              layoutId="nav-pill"
              className="absolute -bottom-1 w-1 h-1 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.8)]"
            />
          )}
        </motion.button>
      ))}
      <div className="w-px h-8 bg-white/10 mx-2" />
      <button 
        onClick={() => auth.signOut()}
        className="text-gray-400 hover:text-red-400 transition-colors"
      >
        <LogOut size={22} />
      </button>
    </nav>
  );
}
