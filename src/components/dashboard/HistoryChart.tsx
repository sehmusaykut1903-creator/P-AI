import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { TrendingUp } from 'lucide-react';

const data = [
  { day: 'Mon', stability: 78, stress: 40 },
  { day: 'Tue', stability: 82, stress: 35 },
  { day: 'Wed', stability: 75, stress: 55 },
  { day: 'Thu', stability: 85, stress: 30 },
  { day: 'Fri', stability: 88, stress: 25 },
  { day: 'Sat', stability: 92, stress: 20 },
  { day: 'Sun', stability: 90, stress: 22 },
];

export default function HistoryChart() {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-neon-cyan" size={20} />
          <h3 className="text-lg font-bold">Stability Trend</h3>
        </div>
        <select className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] text-gray-400 outline-none">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorStability" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 10 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ background: '#0A1F44', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ fontSize: '10px' }}
            />
            <Area 
              type="monotone" 
              dataKey="stability" 
              stroke="#00E5FF" 
              fillOpacity={1} 
              fill="url(#colorStability)" 
              strokeWidth={3}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
