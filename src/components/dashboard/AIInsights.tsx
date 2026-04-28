import { motion } from 'motion/react';
import { Sparkles, ArrowRight, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AIInsights() {
  const { t } = useTranslation();

  const insights = [
    {
      title: t('ai_insights_list.optimized_recovery'),
      description: t('ai_insights_list.optimized_recovery_desc'),
      type: "performance"
    },
    {
      title: t('ai_insights_list.circadian_warning'),
      description: t('ai_insights_list.circadian_warning_desc'),
      type: "risk"
    }
  ];

  return (
    <div className="glass-card p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="text-neon-cyan" size={20} />
          <h3 className="text-lg font-bold">{t('aiInsights')}</h3>
        </div>
        <button className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
          {t('viewAll')} <ArrowRight size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`p-4 rounded-xl border ${
              insight.type === 'risk' ? 'border-orange-500/20 bg-orange-500/5' : 'border-neon-cyan/20 bg-neon-cyan/5'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`mt-1 p-2 rounded-lg ${insight.type === 'risk' ? 'bg-orange-500/20 text-orange-400' : 'bg-neon-cyan/20 text-neon-cyan'}`}>
                <MessageSquare size={16} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-white/90">{insight.title}</h4>
                <p className="text-xs leading-relaxed text-gray-400">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-2 p-4 rounded-xl bg-gradient-to-r from-neuro-purple/20 to-neon-cyan/20 border border-white/10 flex items-center justify-between cursor-pointer group">
        <div className="flex flex-col">
            <span className="text-xs font-bold">{t('psychCoach')}</span>
            <span className="text-[10px] text-gray-400">{t('askCoach')}</span>
        </div>
        <motion.div
            whileHover={{ x: 5 }}
            className="p-2 bg-white/10 rounded-full text-white"
        >
            <ArrowRight size={16} />
        </motion.div>
      </div>
    </div>
  );
}
