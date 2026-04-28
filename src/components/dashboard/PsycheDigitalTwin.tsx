import { motion } from 'motion/react';
import { User, Activity, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PsycheDigitalTwin() {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-6 h-full relative overflow-hidden flex flex-col gap-6">
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-neuro-purple/20">
            <Zap className="text-neuro-purple" size={20} />
          </div>
          <h3 className="text-lg font-bold">{t('digitalTwin')}</h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Baseline Match</span>
          <span className="text-sm font-bold text-neon-cyan">98.4%</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-8 relative">
        {/* Pulsating Neural Center */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-40 h-40 bg-neon-cyan/20 rounded-full blur-3xl"
        />
        
        <div className="relative z-10 flex flex-col items-center">
            {/* Minimalist Brain Shape */}
            <div className="relative w-32 h-40 flex items-center justify-center">
                <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-32 bg-white/5 border border-white/10 rounded-full relative"
                >
                    <div className="absolute top-4 left-4 right-4 h-px bg-neon-cyan/30 blur-[1px]" />
                    <div className="absolute top-12 left-6 right-6 h-px bg-neuro-purple/30 blur-[1px]" />
                    <div className="absolute top-20 left-4 right-4 h-px bg-neon-cyan/30 blur-[1px]" />
                </motion.div>
                
                {/* Synaptic Hits */}
                <motion.div
                    animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute top-10 left-6 w-2 h-2 bg-neon-cyan rounded-full shadow-neon-glow"
                />
                <motion.div
                    animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                    className="absolute bottom-16 right-8 w-1.5 h-1.5 bg-neuro-purple rounded-full shadow-neuro-purple/50"
                />
            </div>
            <span className="mt-4 text-xs font-medium text-gray-400">NEURAL REPLICA ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 z-10">
        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-[10px] text-gray-500 block mb-1 uppercase tracking-tighter">Focus State</span>
            <span className="text-sm font-semibold">Flow State</span>
        </div>
        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-[10px] text-gray-500 block mb-1 uppercase tracking-tighter">Stress Response</span>
            <span className="text-sm font-semibold">High Recovery</span>
        </div>
      </div>
    </div>
  );
}
