import { mockPatient } from '@/lib/mockData';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowRight, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyFuture() {
  const p = mockPatient;
  const proj = p.futureProjection;

  const trajectoryData = [
    { age: 38, current: 41, optimized: 41 },
    { age: 40, current: 43.5, optimized: 42 },
    { age: 45, current: 49, optimized: 45.5 },
    { age: 50, current: proj.currentTrajectory.biologicalAgeAt50, optimized: proj.optimizedTrajectory.biologicalAgeAt50 },
    { age: 55, current: 63, optimized: 53.5 },
  ];

  const gapAt50 = proj.currentTrajectory.biologicalAgeAt50 - proj.optimizedTrajectory.biologicalAgeAt50;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>My Future</h1>
        <p className="text-muted-foreground text-sm mt-1">Your biological trajectory — and how to shape it.</p>
      </div>

      {/* Biological age comparison */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-card/80 p-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Chronological Age</p>
          <p className="text-5xl font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>{p.age}</p>
        </div>
        <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Biological Age</p>
          <p className="text-5xl font-bold text-red-400" style={{ fontFamily: 'var(--font-serif)' }}>{p.biologicalAge}</p>
          <p className="text-xs text-muted-foreground mt-2">+{p.biologicalAge - p.age} years ahead</p>
        </div>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Potential Bio Age</p>
          <p className="text-5xl font-bold text-primary" style={{ fontFamily: 'var(--font-serif)' }}>36</p>
          <p className="text-xs text-muted-foreground mt-2">With optimal interventions</p>
        </div>
      </div>

      {/* Trajectory chart */}
      <div className="rounded-2xl border border-border bg-card/80 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-base font-semibold text-foreground">Biological Age Trajectory</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Projected to age 55 · Two paths</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">-{gapAt50} yrs</p>
            <p className="text-xs text-muted-foreground">potential gap at age 50</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={trajectoryData}>
            <defs>
              <linearGradient id="currentGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="optGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3b0" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3b0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="age" tick={{ fill: 'hsl(215 20% 50%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `Age ${v}`} />
            <YAxis tick={{ fill: 'hsl(215 20% 50%)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[38, 66]} />
            <Tooltip contentStyle={{ background: 'hsl(222 40% 10%)', border: '1px solid hsl(222 30% 16%)', borderRadius: 8, fontSize: 12 }} formatter={(v, n) => [`${v} bio years`, n === 'current' ? 'Current path' : 'Optimized path']} />
            <Area type="monotone" dataKey="current" stroke="#f87171" fill="url(#currentGrad)" strokeWidth={2} dot={false} name="current" strokeDasharray="6 3" />
            <Area type="monotone" dataKey="optimized" stroke="#22d3b0" fill="url(#optGrad)" strokeWidth={2} dot={false} name="optimized" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-2 justify-center">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-6 h-0.5 bg-red-400 opacity-60" style={{ borderTop: '2px dashed #f87171' }} />
            Current trajectory
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-6 h-0.5 bg-primary" />
            Optimized trajectory
          </div>
        </div>
      </div>

      {/* Interventions */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-4">What Can Move Your Trajectory</h2>
        <div className="space-y-3">
          {proj.interventions.map((iv, i) => (
            <div key={i} className="rounded-xl border border-border bg-card/80 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{iv.action}</p>
                  <p className="text-xs text-muted-foreground">Timeline: {iv.timeframe}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <TrendingDown size={13} className="text-primary" />
                <span className="text-sm font-semibold text-primary">{iv.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
        <h3 className="text-base font-semibold text-foreground mb-2">Ready to change your trajectory?</h3>
        <p className="text-sm text-muted-foreground mb-4">Your personalized plan is waiting. Every action in your plan is chosen to move your biological age closer to your chronological age — and beyond.</p>
        <Link to="/my-plan"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-all">
          View My Plan <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}