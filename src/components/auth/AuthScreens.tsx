import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, AtSign, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../../lib/firebase';
import Footer from '../layout/Footer';

export default function AuthScreens() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const profilePath = `users/${userCredential.user.uid}`;
        try {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            userId: userCredential.user.uid,
            name: name,
            email: email,
            athleteLevel: 'Amateur',
            createdAt: new Date().toISOString()
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, profilePath);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      const profilePath = `users/${userCredential.user.uid}`;
      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          userId: userCredential.user.uid,
          name: userCredential.user.displayName || 'Athlete',
          email: userCredential.user.email,
          athleteLevel: 'Amateur',
          createdAt: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, profilePath);
      }
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-1/4 -left-1/4 w-full h-full bg-neuro-purple/20 rounded-full blur-[120px]" 
        />
        <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-neon-cyan/20 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 relative z-10"
      >
        <div className="flex flex-col items-center gap-2 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neuro-purple to-neon-cyan flex items-center justify-center shadow-xl shadow-neon-cyan/20 mb-4">
            <span className="text-3xl font-bold font-display">P-AI</span>
          </div>
          <h1 className="text-2xl font-bold text-center">
            {isLogin ? t('auth_labels.welcome_back') : t('auth_labels.join_elite')}
          </h1>
          <p className="text-gray-400 text-sm text-center">
            {isLogin ? t('auth_labels.predict_perform') : t('auth_labels.start_journey')}
          </p>
        </div>

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder={t('auth_labels.full_name')}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-neon-cyan transition-all outline-none"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="email"
              placeholder={t('auth_labels.email_address')}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-neon-cyan transition-all outline-none"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="password"
              placeholder={t('auth_labels.password')}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-neon-cyan transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-neuro-purple to-neon-cyan rounded-xl py-4 font-bold text-white shadow-lg shadow-neon-cyan/25 flex items-center justify-center gap-2 mt-4 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? t('auth_labels.processing') : (isLogin ? t('auth_labels.sign_in') : t('auth_labels.create_account'))}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">{t('auth_labels.or')}</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 font-bold text-white flex items-center justify-center gap-3 hover:bg-white/10 transition-all disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="" />
          {t('auth_labels.continue_google')}
        </button>

        <div className="mt-8 text-center text-sm text-gray-400">
          {isLogin ? t('auth_labels.no_account') : t('auth_labels.have_account')}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-neon-cyan font-bold hover:underline"
          >
            {isLogin ? t('auth_labels.register_now') : t('auth_labels.sign_in')}
          </button>
        </div>
      </motion.div>
      <div className="fixed bottom-0 left-0 w-full z-10">
        <Footer />
      </div>
    </div>
  );
}
