import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Send, Sparkles, AlertCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function WordGame({ onBack }: Props) {
  const { t } = useTranslation();
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'showing' | 'input' | 'result'>('idle');
  const [level, setLevel] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const words = ['MIND', 'LOGIC', 'FOCUS', 'MEMORY', 'PSYCHE', 'NEURON', 'REFLEX', 'STABILITY', 'ATHLETE', 'INSIGHT', 'CLARITY', 'VELOCITY', 'RESILIENCE', 'COGNITION', 'EQUILIBRIUM'];

  const startNext = () => {
    const word = words[Math.min(level - 1, words.length - 1)];
    setCurrentWord(word);
    setUserInput('');
    setGameState('showing');
    
    setTimeout(() => {
      setGameState('input');
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 1500);
  };

  const handleSubmit = (e?: any) => {
    e?.preventDefault();
    if (userInput.toUpperCase() === currentWord) {
      setScore(s => s + (currentWord.length * 10));
      setLevel(l => l + 1);
      startNext();
    } else {
      setGameState('result');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold font-display">{t('games.word')}</h2>
      </div>

      <div className="max-w-2xl mx-auto w-full glass-card p-12 flex flex-col items-center justify-center gap-12 min-h-[400px]">
        <AnimatePresence mode="wait">
          {gameState === 'idle' && (
            <motion.div key="idle" className="flex flex-col items-center gap-6">
              <Sparkles size={48} className="text-green-400" />
              <div className="text-center">
                <h3 className="text-2xl font-bold">{t('games.word')}</h3>
                <p className="text-gray-400 text-sm mt-2">{t('game_labels.wait')}</p>
              </div>
              <button 
                onClick={() => { setLevel(1); startNext(); }}
                className="px-12 py-4 bg-green-500 rounded-xl font-bold transition-all hover:scale-105"
              >
                {t('game_labels.start')}
              </button>
            </motion.div>
          )}

          {gameState === 'showing' && (
            <motion.div 
               key="showing"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1.2 }}
               exit={{ opacity: 0, scale: 1.5 }}
               className="text-6xl font-black font-display tracking-widest text-green-400"
            >
              {currentWord}
            </motion.div>
          )}

          {gameState === 'input' && (
            <motion.form 
               key="input"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               onSubmit={handleSubmit}
               className="flex flex-col items-center gap-8 w-full max-w-sm"
            >
              <div className="flex flex-col items-center gap-2">
                 <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{t('game_labels.wait')}</span>
                 <input
                   ref={inputRef}
                   type="text"
                   value={userInput}
                   onChange={(e) => setUserInput(e.target.value)}
                   className="w-full bg-white/5 border-2 border-white/10 p-6 rounded-2xl text-4xl text-center font-bold tracking-widest outline-none focus:border-green-500 transition-all uppercase"
                   autoFocus
                 />
              </div>
              <button type="submit" className="w-full py-4 bg-green-500 rounded-xl font-bold flex items-center justify-center gap-2">
                {t('viewAll')} <Send size={18} />
              </button>
            </motion.form>
          )}

          {gameState === 'result' && (
            <motion.div key="result" className="flex flex-col items-center gap-6 text-center">
               <AlertCircle size={60} className="text-red-400" />
               <div>
                  <h3 className="text-3xl font-bold">{t('risk')}</h3>
               </div>
               <div className="flex flex-col gap-1 items-center">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">{t('game_labels.score')}</span>
                  <span className="text-5xl font-bold text-green-400">{score}</span>
               </div>
               <button 
                  onClick={() => { setLevel(1); setScore(0); startNext(); }}
                  className="px-12 py-3 bg-white text-primary-dark rounded-xl font-bold mt-4"
               >
                  {t('game_labels.try_again')}
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-12">
          <div className="flex flex-col items-center">
             <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{t('game_labels.accuracy')}</span>
             <span className="text-xl font-bold">98.2%</span>
          </div>
          <div className="flex flex-col items-center">
             <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{t('game_labels.words')}</span>
             <span className="text-xl font-bold">{level - 1}</span>
          </div>
          <div className="flex flex-col items-center">
             <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{t('game_labels.cognitive_load')}</span>
             <span className="text-xl font-bold text-green-400">{t('mild')}</span>
          </div>
      </div>
    </div>
  );
}
