import { motion } from 'motion/react';
import { Activity, Moon, Heart, Smile, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScoring } from '../../hooks/useScoring';

interface MetricProps {
  icon: any;
  label: string;
  value: string | number;
  unit?: string;
  color: string;
}

function Metric({ icon: Icon, label, value, unit, color }: MetricProps) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
          <Icon className={color.replace('bg-', 'text-')} size={18} />
        </div>
        <span className="text-xs font-medium text-gray-400">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white">{value}</span>
        {unit && <span className="text-[10px] uppercase text-gray-500">{unit}</span>}
      </div>
    </div>
  );
}

export default function VitalsCard() {
  const { t } = useTranslation();
  const { readinessScore } = useScoring();

  const metrics = [
    { icon: Activity, label: 'HRV', value: 72, unit: 'ms', color: 'bg-green-400' },
    { icon: Moon, label: t('sleep'), value: '7.5', unit: 'hrs', color: 'bg-blue-400' },
    { icon: Zap, label: 'Cognitive', value: readinessScore, unit: '%', color: 'bg-amber-400' },
    { icon: Smile, label: t('mood'), value: 8.5, unit: '/10', color: 'bg-neon-cyan' },
  ];

  return (
    <div className="glass-card p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{t('vitals')}</h3>
        <span className="text-xs text-neon-cyan font-mono px-2 py-1 bg-neon-cyan/10 rounded-full">LIVE</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Metric {...m} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
