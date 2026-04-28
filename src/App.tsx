import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useTranslation } from 'react-i18next';
import AuthScreens from './components/auth/AuthScreens';
import Navigation from './components/layout/Navigation';
import VitalsCard from './components/dashboard/VitalsCard';
import RiskEngine from './components/dashboard/RiskEngine';
import PsycheDigitalTwin from './components/dashboard/PsycheDigitalTwin';
import AIInsights from './components/dashboard/AIInsights';
import HistoryChart from './components/dashboard/HistoryChart';
import MoodSelector from './components/dashboard/MoodSelector';
import AIQuestionCard from './components/dashboard/AIQuestionCard';
import GameGrid from './components/mindlab/GameGrid';
import Entertainment from './components/entertainment/Entertainment';
import Profile from './components/profile/Profile';
import Settings from './components/Settings';
import Footer from './components/layout/Footer';
import './i18n/index';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function App() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full" 
        />
      </div>
    );
  }

  if (!user) {
    return <AuthScreens />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="md:col-span-2 lg:col-span-4">
                <VitalsCard />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
              <HistoryChart />
            </div>
            <div className="lg:col-span-1">
              <RiskEngine />
            </div>
            <div className="lg:col-span-1">
              <MoodSelector />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <AIQuestionCard />
            </div>
            <div className="md:col-span-2">
              <AIInsights />
            </div>
            <div className="md:col-span-2">
              <PsycheDigitalTwin />
            </div>
          </div>
        );
      case 'digital-twin':
        return <PsycheDigitalTwin />;
      case 'profile':
        return <Profile />;
      case 'entertainment':
        return <Entertainment />;
      case 'mind-lab':
        return <GameGrid />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-32">
      <header className="px-6 py-8 container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neuro-purple to-neon-cyan flex items-center justify-center font-bold font-display shadow-lg shadow-neon-cyan/20">
            P
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold font-display tracking-tight leading-none">P-AI</h1>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Psyche Athlete Intelligence</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">{t('mindLab')}</span>
                <span className="text-xs font-bold text-neon-cyan">14:00</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-white/10 bg-white/5 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => setActiveTab('profile')}>
                <div className="w-full h-full bg-gradient-to-tr from-neuro-purple/50 to-neon-cyan/50" />
            </div>
        </div>
      </header>

      <main className="container mx-auto px-6 max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
        <Footer />
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-50 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-cyan/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neuro-purple/20 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
