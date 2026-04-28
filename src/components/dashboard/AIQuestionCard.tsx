import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Sparkles, MessageSquare, ArrowRight, Brain } from 'lucide-react';

export default function AIQuestionCard() {
  const { t } = useTranslation();
  const [step, setStep] = useState<'question' | 'feedback'>('question');
  const [answer, setAnswer] = useState<string | null>(null);

  const options = [
    { label: t('ai_question.option_yes'), impact: "caution" },
    { label: t('ai_question.option_no'), impact: "stable" },
    { label: t('ai_question.option_restless'), impact: "warning" }
  ];

  const handleAnswer = (impact: string) => {
    setAnswer(impact);
    setStep('feedback');
  };

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-neuro-purple/10 to-neon-cyan/5 border-neon-cyan/20 overflow-hidden relative">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-neon-cyan/10 rounded-full blur-2xl" />
      
      <AnimatePresence mode="wait">
        {step === 'question' ? (
          <motion.div 
            key="q"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4 relative z-10"
          >
            <div className="flex items-center gap-2 text-neon-cyan">
                <Sparkles size={16} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{t('ai_question.title')}</span>
            </div>
            <p className="text-sm font-medium leading-relaxed">
              {t('ai_question.question')}
            </p>
            <div className="flex flex-col gap-2 mt-2">
                {options.map((opt) => (
                    <button 
                        key={opt.label}
                        onClick={() => handleAnswer(opt.impact)}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-xs text-left flex items-center justify-between group"
                    >
                        {opt.label}
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="f"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-green-400">
                <Brain size={16} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{t('ai_question.analysis_updated')}</span>
            </div>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-xs leading-relaxed italic text-gray-300">
                    {answer === 'caution' ? 
                        t('ai_question.feedback_caution') :
                        t('ai_question.feedback_stable')
                    }
                </p>
            </div>
            <button 
                onClick={() => setStep('question')} 
                className="text-[10px] text-gray-500 hover:text-white transition-colors self-center"
            >
                {t('ai_question.view_next')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
