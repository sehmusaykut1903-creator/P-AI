import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Brain, Trophy, RotateCcw } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function MemoryMatrix({ onBack }: Props) {
  const { t } = useTranslation();
  const [gridSize, setGridSize] = useState(3);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'success' | 'fail'>('idle');
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('p-ai-memory-best');
    return saved ? parseInt(saved) : 0;
  });

  const startLevel = (nextLevel: number) => {
    setLevel(nextLevel);
    setGameState('showing');
    setPlayerSequence([]);
    
    // Calculate difficulty
    const cellsToRemember = Math.floor(nextLevel / 2) + 3;
    const newSize = Math.max(3, Math.min(6, Math.floor(nextLevel / 4) + 3));
    setGridSize(newSize);

    const totalCells = newSize * newSize;
    const newSequence: number[] = [];
    while (newSequence.length < cellsToRemember) {
      const cell = Math.floor(Math.random() * totalCells);
      if (!newSequence.includes(cell)) newSequence.push(cell);
    }
    setSequence(newSequence);

    setTimeout(() => {
      setGameState('playing');
    }, 2000 + (cellsToRemember * 200));
  };

  const handleCellClick = (index: number) => {
    if (gameState !== 'playing') return;

    if (sequence.includes(index)) {
      if (!playerSequence.includes(index)) {
        const newPlayerSeq = [...playerSequence, index];
        setPlayerSequence(newPlayerSeq);
        
        if (newPlayerSeq.length === sequence.length) {
          setGameState('success');
          if (level > highScore) {
            setHighScore(level);
            localStorage.setItem('p-ai-memory-best', level.toString());
          }
        }
      }
    } else {
      setGameState('fail');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold font-display">{t('games.memory')}</h2>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{t('level')}</span>
                <span className="text-xl font-bold text-neuro-purple">{level}</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{t('game_labels.best')}</span>
                <span className="text-xl font-bold text-amber-400">{highScore}</span>
            </div>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full aspect-square glass-card p-4 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {gameState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
               <Brain className="text-neuro-purple animate-pulse" size={60} />
               <div className="text-center">
                    <h3 className="text-xl font-bold">{t('games.memory')}</h3>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{t('level')} {level}</p>
               </div>
               <button 
                onClick={() => startLevel(1)}
                className="px-10 py-3 bg-neuro-purple rounded-xl font-bold shadow-lg shadow-neuro-purple/20 transition-all hover:scale-105"
               >
                {t('game_labels.start')}
               </button>
            </motion.div>
          )}

          {(gameState === 'showing' || gameState === 'playing' || gameState === 'fail' || gameState === 'success') && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`grid gap-2 w-full h-full`}
              style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                const isTarget = sequence.includes(i);
                const isSelected = playerSequence.includes(i);
                const isShowing = gameState === 'showing';
                const isFail = gameState === 'fail' && isTarget;
                const isSuccess = gameState === 'success' && isTarget;

                return (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCellClick(i)}
                    className={`rounded-lg transition-all duration-300 border ${
                      isShowing && isTarget ? 'bg-neuro-purple border-neuro-purple' :
                      isSuccess ? 'bg-green-500 border-green-500' :
                      isFail ? 'bg-red-500 border-red-500' :
                      isSelected ? 'bg-neuro-purple/50 border-neuro-purple' :
                      'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlays */}
        <AnimatePresence>
            {gameState === 'success' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-primary-dark/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4 rounded-2xl"
                >
                    <Trophy className="text-amber-400" size={60} />
                    <h3 className="text-2xl font-bold">{t('level')} {t('stable')}!</h3>
                    <button 
                        onClick={() => startLevel(level + 1)}
                        className="px-8 py-3 bg-white text-primary-dark rounded-xl font-bold mt-4"
                    >
                        {t('viewAll')}
                    </button>
                </motion.div>
            )}

            {gameState === 'fail' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-primary-dark/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4 rounded-2xl"
                >
                    <RotateCcw className="text-red-400" size={60} />
                    <h3 className="text-2xl font-bold">{t('risk')}</h3>
                    <button 
                        onClick={() => startLevel(1)}
                        className="px-8 py-3 bg-white text-primary-dark rounded-xl font-bold mt-4"
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
