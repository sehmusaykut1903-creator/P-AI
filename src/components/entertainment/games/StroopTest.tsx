import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Timer, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const COLORS = [
  { name: 'Red', hex: '#EF4444' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Green', hex: '#22C55E' },
  { name: 'Yellow', hex: '#EAB308' },
];

export default function StroopTest({ onBack }: Props) {
  const { t } = useTranslation();
  const [currentChallenge, setCurrentChallenge] = useState({ word: '', color: '' });
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');

  const generateChallenge = () => {
    const wordIdx = Math.floor(Math.random() * COLORS.length);
    const colorIdx = Math.floor(Math.random() * COLORS.length);
    
    setCurrentChallenge({
      word: COLORS[wordIdx].name,
      color: COLORS[colorIdx].hex
    });

    setOptions(COLORS.map(c => c.name).sort(() => Math.random() - 0.5));
  };

  const startLevel = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState('playing');
    generateChallenge();
  };

  const handleAnswer = (name: string) => {
    const correctColor = COLORS.find(c => c.hex === currentChallenge.color)?.name;
    if (name === correctColor) {
      setScore(s => s + 10);
    } else {
      setScore(s => Math.max(0, s - 5));
    }
    generateChallenge();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setGameState('result');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold font-display">{t('games.stroop')}</h2>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                <Timer size={14} className="text-neon-cyan" />
                <span className="font-mono font-bold">{timeLeft}s</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{t('game_labels.score')}</span>
                <span className="text-xl font-bold text-neon-cyan">{score}</span>
            </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full glass-card min-h-[400px] flex flex-col items-center justify-center p-12 gap-12">
        <AnimatePresence mode="wait">
          {gameState === 'idle' && (
            <motion.div key="idle" className="flex flex-col items-center gap-6 text-center">
               <ShieldAlert size={48} className="text-amber-400" />
               <div>
                  <h3 className="text-2xl font-bold">{t('game_labels.cognitive_load')}</h3>
                  <p className="text-gray-400 text-sm mt-2 max-w-xs">{t('game_labels.wait')}</p>
               </div>
               <button onClick={startLevel} className="px-12 py-4 bg-amber-500 rounded-xl font-bold transition-all hover:scale-105">
                 {t('game_labels.start')}
               </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div key="playing" className="flex flex-col items-center gap-12 w-full">
               <motion.div 
                 key={currentChallenge.word + currentChallenge.color}
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="text-7xl font-black font-display tracking-tighter"
                 style={{ color: currentChallenge.color }}
               >
                 {currentChallenge.word}
               </motion.div>

               <div className="grid grid-cols-2 gap-4 w-full">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all font-bold text-lg"
                    >
                      {opt}
                    </button>
                  ))}
               </div>
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div key="result" className="flex flex-col items-center gap-6 text-center">
               <CheckCircle2 size={60} className="text-neon-cyan" />
               <h3 className="text-3xl font-bold">{t('game_labels.session_complete')}</h3>
               <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">{t('game_labels.score')}</span>
                  <span className="text-6xl font-bold text-neon-cyan">{score}</span>
               </div>
               <button 
                  onClick={startLevel}
                  className="px-12 py-3 bg-white text-primary-dark rounded-xl font-bold mt-4"
               >
                  {t('game_labels.try_again')}
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
