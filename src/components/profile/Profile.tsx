import { motion } from 'motion/react';
import { User, Activity, ShieldCheck, Trophy, BookOpen, Edit2, Save, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useScoring } from '../../hooks/useScoring';

export default function Profile() {
  const { t } = useTranslation();
  const { profile, user } = useAuth();
  const { readinessScore } = useScoring();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(profile?.bio || "");

  const handleSaveBio = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), { bio });
      setIsEditing(false);
    } catch (error) {
      console.error("Save BIO error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-6">
      {/* Hero Header */}
      <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[80px] -mr-32 -mt-32" />
        
        <div className="relative">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-neuro-purple to-neon-cyan p-1 shadow-2xl shadow-neon-cyan/20">
            <div className="w-full h-full bg-primary-dark rounded-[22px] flex items-center justify-center overflow-hidden">
                <div className="text-4xl font-bold font-display">{profile?.name?.[0]}{profile?.surname?.[0]}</div>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 p-2 bg-neon-cyan rounded-xl text-primary-dark shadow-lg">
            <ShieldCheck size={20} />
          </div>
        </div>

        <div className="flex flex-col gap-2 text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold font-display">{profile?.name} {profile?.surname}</h2>
            <span className="px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan text-[10px] font-bold uppercase tracking-widest border border-neon-cyan/20 w-fit self-center">
                {profile?.athleteLevel || 'Amateur'}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
             <span>{profile?.sport || 'Elite Performance'}</span>
             <span className="w-1 h-1 rounded-full bg-white/20" />
             <span>{profile?.age || 24} Years Old</span>
             <span className="w-1 h-1 rounded-full bg-white/20" />
             <span> {profile?.height || 184}cm / {profile?.weight || 78}kg</span>
          </div>
          <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Stability Avg</span>
                <span className="text-lg font-bold text-green-400">88.2%</span>
             </div>
             <div className="w-px h-8 bg-white/10" />
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Focus Hours</span>
                <span className="text-lg font-bold text-neon-cyan">124h</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* BIO SECTION */}
        <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="glass-card p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BookOpen className="text-neon-cyan" size={20} />
                        <h3 className="font-bold">{t('profile.bio')}</h3>
                    </div>
                    <button 
                        onClick={() => isEditing ? handleSaveBio() : setIsEditing(true)}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
                    >
                        {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
                    </button>
                </div>
                {isEditing ? (
                    <textarea 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm min-h-[120px] outline-none focus:border-neon-cyan transition-all"
                        placeholder="Share your athletic goals or mindset..."
                    />
                ) : (
                    <p className="text-sm text-gray-400 leading-relaxed italic">
                        {profile?.bio || "No bio added yet. Tell us about your journey."}
                    </p>
                )}
            </div>

            <div className="glass-card p-6 flex flex-col gap-6">
                <div className="flex items-center gap-2">
                    <Trophy className="text-orange-400" size={20} />
                    <h3 className="font-bold">{t('profile.goals')}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Peak Performance', 'Iron Mind', 'Sleep Mastery'].map((goal) => (
                        <div key={goal} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <span className="text-sm font-medium">{goal}</span>
                            <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* MENTAL BASELINE */}
        <div className="flex flex-col gap-8">
            <div className="glass-card p-6 flex flex-col gap-6">
                <div className="flex items-center gap-2">
                    <Activity className="text-neuro-purple" size={20} />
                    <h3 className="font-bold">{t('profile.mentalProfile')}</h3>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">{t('profile.stabilityAvg')}</span>
                            <span className="text-white">88%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="w-[88%] h-full bg-green-400" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">{t('profile.stressBaseline')}</span>
                            <span className="text-white">Low</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="w-[20%] h-full bg-neon-cyan" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Cognitive Readiness</span>
                            <span className="text-white">{readinessScore}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400" style={{ width: `${readinessScore}%` }} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">{t('profile.sleepPattern')}</span>
                            <span className="text-white">Healthy</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="w-[92%] h-full bg-neuro-purple" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
