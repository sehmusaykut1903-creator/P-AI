import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Timer, Zap, Trophy, Brain } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function ReactionTest({ onBack }: Props) {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(() => {
    const saved = localStorage.getItem('p-ai-reaction-best');
    return saved ? parseInt(saved) : null;
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setGameState('waiting');
    setReactionTime(null);
    
    const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // alert('Too early! Wait for the signal.');
      setGameState('idle');
    } else if (gameState === 'ready') {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      setGameState('result');
      
      if (!bestScore || time < bestScore) {
        setBestScore(time);
        localStorage.setItem('p-ai-reaction-best', time.toString());
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold font-display">{t('games.reaction')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-card h-[500px] flex items-center justify-center relative overflow-hidden p-0">
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.button
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                onClick={startTest}
                className="w-full h-full flex flex-col items-center justify-center gap-4 hover:bg-white/5 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                    <Zap className="text-neon-cyan" size={40} />
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold">{t('game_labels.start')}</p>
                </div>
                <div className="px-8 py-3 bg-neon-cyan text-primary-dark rounded-xl font-bold uppercase tracking-wider mt-4">
                    {t('game_labels.start')}
                </div>
              </motion.button>
            )}

            {gameState === 'waiting' && (
              <motion.div
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleClick}
                className="w-full h-full bg-red-500/20 flex items-center justify-center cursor-pointer"
              >
                <p className="text-3xl font-bold animate-pulse">{t('game_labels.wait')}</p>
              </motion.div>
            )}

            {gameState === 'ready' && (
              <motion.div
                key="ready"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleClick}
                className="w-full h-full bg-green-500 flex items-center justify-center cursor-pointer"
              >
                <p className="text-5xl font-black text-white animate-bounce">{t('game_labels.tap_now')}</p>
              </motion.div>
            )}

            {gameState === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-full flex flex-col items-center justify-center gap-6"
              >
                <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{t('game_labels.your_time')}</span>
                    <span className="text-7xl font-bold text-neon-cyan">{reactionTime}ms</span>
                </div>
                
                <div className="flex gap-4">
                    <button 
                        onClick={startTest}
                        className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all"
                    >
                        {t('game_labels.try_again')}
                    </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-6">
            <div className="glass-card p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t('game_labels.best')}</span>
                    <Trophy className="text-amber-400" size={16} />
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{bestScore ? `${bestScore}ms` : '--'}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
