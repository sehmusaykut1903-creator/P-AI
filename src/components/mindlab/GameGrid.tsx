import { motion } from 'motion/react';
import { Target, Search, Clock, BrainCircuit, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function GameGrid() {
  const { t } = useTranslation();

  const games = [
    { id: 'chess', title: t('games.chess'), icon: Target, category: 'Strategy', color: 'text-orange-400' },
    { id: 'memory', title: t('games.memory'), icon: Search, category: 'Cognitive', color: 'text-neon-cyan' },
    { id: 'reaction', title: t('games.reaction'), icon: Clock, category: 'Neuromotor', color: 'text-purple-400' },
    { id: 'pattern', title: 'Pattern Match', icon: BrainCircuit, category: 'Fluid Intelligence', color: 'text-green-400' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold font-display">{t('mindLab')}</h2>
        <p className="text-gray-400 text-sm max-w-md">
          Train your neural pathways under pressure. Elite performance starts in the Mind Lab.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card p-6 flex flex-col gap-4 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/20 transition-all ${game.color.replace('text-', 'bg-')}/10`}>
                <game.icon className={game.color} size={28} />
              </div>
              <Shield className="text-gray-600 group-hover:text-neon-cyan transition-colors" size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{game.category}</span>
              <h4 className="text-lg font-bold group-hover:text-neon-cyan transition-colors">{game.title}</h4>
            </div>
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                <span className="text-xs text-gray-500">Best: <span className="text-white">--</span></span>
                <button className="text-[10px] font-bold uppercase tracking-wider text-neon-cyan hover:underline">Start Exercise</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
