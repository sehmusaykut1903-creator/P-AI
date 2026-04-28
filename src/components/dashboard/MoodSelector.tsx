import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Smile, Frown, Meh, Zap, BatteryLow, Gauge } from 'lucide-react';

export default function MoodSelector() {
  const { t } = useTranslation();
  const [mood, setMood] = useState(8);
  const [energy, setEnergy] = useState(7);

  const moods = [
    { icon: Frown, val: 2, color: 'text-red-400' },
    { icon: Meh, val: 5, color: 'text-orange-400' },
    { icon: Smile, val: 8, color: 'text-neon-cyan' },
    { icon: Zap, val: 10, color: 'text-yellow-400' },
  ];

  return (
    <div className="glass-card p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">Subjective Check-in</h3>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Self-Reported Baseline</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Mood Selector */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">{t('mood')}</span>
            <span className="text-neon-cyan font-bold">{mood}/10</span>
          </div>
          <div className="flex justify-between gap-4">
            {moods.map((m) => (
              <motion.button
                key={m.val}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMood(m.val)}
                className={`flex-1 aspect-square rounded-xl flex items-center justify-center transition-all border ${
                  mood === m.val 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-white/5 border-transparent opacity-40 grayscale'
                }`}
              >
                <m.icon className={m.color} size={20} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Energy Slider */}
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">{t('energy')}</span>
                <span className="text-neuro-purple font-bold">{energy}/10</span>
            </div>
            <input 
                type="range" 
                min="1" 
                max="10" 
                value={energy}
                onChange={(e) => setEnergy(parseInt(e.target.value))}
                className="w-full accent-neuro-purple h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
            />
        </div>

        <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
          Log Performance Data
        </button>
      </div>
    </div>
  );
}
