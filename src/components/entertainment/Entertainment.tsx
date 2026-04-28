import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Gamepad2, Brain, Trophy, Zap, Search, ChevronRight } from 'lucide-react';
import ReactionTest from './games/ReactionTest';
import MemoryMatrix from './games/MemoryMatrix';
import WordGame from './games/WordGame';
import ChessGame from './games/ChessGame';
import StroopTest from './games/StroopTest';

export default function Entertainment() {
  const { t } = useTranslation();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    { 
        id: 'chess', 
        name: t('games.chess'), 
        icon: '♟️', 
        color: 'from-amber-500 to-orange-700',
        xp: 150,
        difficulty: t('difficulty.hard')
    },
    { 
        id: 'reaction', 
        name: t('games.reaction'), 
        icon: '⚡', 
        color: 'from-neon-cyan to-blue-600',
        xp: 50,
        difficulty: t('difficulty.easy')
    },
    { 
        id: 'memory', 
        name: t('games.memory'), 
        icon: '🧠', 
        color: 'from-neuro-purple to-pink-600',
        xp: 80,
        difficulty: t('difficulty.medium')
    },
    { 
        id: 'word', 
        name: t('games.word'), 
        icon: '📝', 
        color: 'from-green-500 to-emerald-700',
        xp: 60,
        difficulty: t('difficulty.medium')
    },
    { 
        id: 'stroop', 
        name: t('games.stroop'), 
        icon: '🎨', 
        color: 'from-pink-500 to-rose-700',
        xp: 70,
        difficulty: t('difficulty.medium')
    },
  ];

  const renderGame = () => {
    switch (selectedGame) {
      case 'reaction': return <ReactionTest onBack={() => setSelectedGame(null)} />;
      case 'memory': return <MemoryMatrix onBack={() => setSelectedGame(null)} />;
      case 'word': return <WordGame onBack={() => setSelectedGame(null)} />;
      case 'chess': return <ChessGame onBack={() => setSelectedGame(null)} />;
      case 'stroop': return <StroopTest onBack={() => setSelectedGame(null)} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence mode="wait">
        {!selectedGame ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold font-display">{t('entertainment')}</h2>
                <p className="text-gray-400 text-sm">{t('entertainment_desc')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card p-6 flex flex-col gap-4 bg-gradient-to-br from-neuro-purple/20 to-neon-cyan/20 border-white/20">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t('cognitive_readiness')}</span>
                        <Zap size={14} className="text-neon-cyan" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold font-display">84</span>
                        <span className="text-xs text-green-400 font-medium">+12%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} className="h-full bg-gradient-to-r from-neuro-purple to-neon-cyan" />
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t('earned_xp')}</span>
                        <Trophy size={14} className="text-amber-400" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold font-display">12,450</span>
                        <span className="text-[10px] text-gray-500 uppercase">{t('level')} 14</span>
                    </div>
                    <p className="text-[10px] text-gray-500 italic">Play games to increase your cognitive baseline insights.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {games.map((game) => (
                    <motion.div
                        key={game.id}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedGame(game.id)}
                        className="glass-card group cursor-pointer overflow-hidden p-0 flex flex-col h-64"
                    >
                        <div className={`h-1/2 bg-gradient-to-br ${game.color} flex items-center justify-center text-4xl relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="group-hover:scale-125 transition-transform duration-500">{game.icon}</span>
                        </div>
                        <div className="p-5 flex flex-col justify-between flex-1">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{game.difficulty}</span>
                                <h4 className="text-lg font-bold">{game.name}</h4>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-neon-cyan">+{game.xp} XP</span>
                                <div className="p-2 rounded-full bg-white/5 group-hover:bg-neon-cyan group-hover:text-primary-dark transition-all">
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="game-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-[70vh]"
          >
            {renderGame()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
