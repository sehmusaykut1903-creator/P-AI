import { motion } from 'motion/react';
import { ShieldAlert, TrendingUp, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function RiskEngine() {
  const { t } = useTranslation();
  
  // Dummy score calculation logic based on prompt
  const score = 84;
  const status = score > 80 ? 'stable' : score > 60 ? 'mild' : score > 40 ? 'warning' : 'critical';
  
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const COLORS = ['#00E5FF', 'rgba(255, 255, 255, 0.05)'];

  return (
    <div className="glass-card p-6 h-full flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-neon-cyan/20">
          <ShieldAlert className="text-neon-cyan" size={20} />
        </div>
        <h3 className="text-lg font-bold">{t('mentalStabilityIndex')}</h3>
      </div>

      <div className="flex flex-1 items-center justify-center relative">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={450}
              >
                <Cell fill={COLORS[0]} />
                <Cell fill={COLORS[1]} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold font-display">{score}</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest">{t(status)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs px-2">
          <span className="text-gray-400">{t('episodePrediction')}</span>
          <span className="text-green-400 font-medium">{t('lowRisk')}</span>
        </div>
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '15%' }}
            className="h-full bg-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.5)]"
          />
        </div>
        <p className="text-[11px] text-gray-500 italic mt-2 text-center">
          "HRV stability and sleep duration are positively correlated this week."
        </p>
      </div>
    </div>
  );
}
