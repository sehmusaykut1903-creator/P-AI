export interface UserProfile {
  userId: string;
  name: string;
  surname: string;
  email: string;
  athleteLevel: 'Amateur' | 'Professional' | 'Elite';
  age?: number;
  height?: number;
  weight?: number;
  sport?: string;
  baselineHRV?: number;
  preferredLanguage?: string;
  theme?: string;
  bio?: string;
  createdAt: string;
}

export interface MetricData {
  id?: string;
  timestamp: string;
  hrv: number;
  sleepHours: number;
  restingHR: number;
  activityLevel: number;
  moodScore: number;
  energyScore: number;
}

export interface SurveyData {
  id?: string;
  timestamp: string;
  responses: {
    mood: number;
    energy: number;
    sleepQuality: number;
    irritability: number;
    thoughtSpeed: number;
    motivation: number;
  };
}

export interface AIInsight {
  id?: string;
  timestamp: string;
  type: 'daily' | 'weekly' | 'risk_alert';
  riskScore: number;
  reportText: string;
  recommendations: string[];
}

export interface GameScore {
  id?: string;
  gameId: string;
  timestamp: string;
  score: number;
  difficulty: string;
}
