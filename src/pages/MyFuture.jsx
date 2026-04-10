import { mockPatient } from '@/lib/mockData';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowRight, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyFuture() {
  const p = mockPatient;
  const proj = p.futureProjection;

  const trajectoryData = [
    { age: 66, current: 71, optimized: 71 },
    { age: 68, current: 74.5, optimized: 72 },
    { age: 70, current: 78, optimized: 73.5 },
    { age: 72, current: 80.5, optimized: 74.5 },
    { age: 75, current: proj.currentTrajectory.biologicalAgeAt75, optimized: proj.optimizedTrajectory.biologicalAgeAt75 },
  ];

  const gap = proj.currentTrajectory.biologicalAgeAt75 - proj.optimizedTrajectory.biologicalAgeAt75;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">My Future</h1>
        <p className="text-slate-400 text-sm mt-1">Your biological trajectory — and how to reshape it.</p>
      </div>

      {/* Bio age trio */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Chronological Age</p>
          <p className="text-5xl font-extrabold text-[#0F172A]">{p.age}</p>
          <p className="text-xs text-slate-400 mt-2">Your actual age today</p>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 shadow-sm p-6 text-center">
          <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">Biological Age</p>
          <p className="text-5xl font-extrabold text-red-500">{p.biologicalAge}</p>
          <p className="text-xs text-red-400 mt-2">+{p.biologicalAge - p.age} years ahead — reversible</p>
        </div>
        <div className="rounded-2xl border border-teal-100 bg-teal-50 shadow-sm p-6 text-center">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-3">Potential Bio Age</p>
          <p className="text-5xl font-extrabold text-teal-600">63</p>
          <p className="text-xs text-teal-500 mt-2">Achievable with your plan</p>
        </div>
      </div>

      {/* Trajectory */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Biological Age Trajectory</h2>
            <p className="text-sm text-slate-400 mt-0.5">Projected to age 75 · Two possible futures</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-extrabold text-teal-600">−{gap} yrs</p>
            <p className="text-xs text-slate-400">potential gap at age 75</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={trajectoryData}>
            <defs>
              <linearGradient id="curGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="optGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="age" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `Age ${v}`} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} domain={[65, 90]} />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 12 }}
              formatter={(v, n) => [`${v} bio years`, n === 'current' ? 'Current path' : 'Optimised path']} />
            <Area type="monotone" dataKey="current" stroke="#f87171" fill="url(#curGrad)" strokeWidth={2} strokeDasharray="6 3" dot={false} name="current" />
            <Area type="monotone" dataKey="optimized" stroke="#14B8A6" fill="url(#optGrad)" strokeWidth={2.5} dot={false} name="optimized" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-3 justify-center text-xs text-slate-400">
          <span className="flex items-center gap-2"><span className="inline-block w-6 border-t-2 border-dashed border-red-300" />Current trajectory</span>
          <span className="flex items-center gap-2"><span className="inline-block w-6 border-t-2 border-teal-400" />Optimised trajectory</span>
        </div>
      </div>

      {/* Interventions */}
      <div>
        <h2 className="text-base font-bold text-[#0F172A] mb-4">What Can Move Your Trajectory</h2>
        <div className="space-y-3">
          {proj.interventions.map((iv, i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-white shadow-sm p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 text-xs font-bold shrink-0">{i + 1}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{iv.action}</p>
                  <p className="text-xs text-slate-400">Timeline: {iv.timeframe}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <TrendingDown size={13} className="text-teal-500" />
                <span className="text-sm font-bold text-teal-600">{iv.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-[#0F172A]/10 bg-[#0F172A] p-6 text-white">
        <h3 className="text-lg font-extrabold mb-2">Ready to change your trajectory?</h3>
        <p className="text-sm text-white/70 mb-4 leading-relaxed">Every action in your plan is chosen to close the gap between your biological and chronological age. Acting on even 2 of these in the next 90 days could shift your trajectory significantly.</p>
        <Link to="/my-plan"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal text-[#0F172A] text-sm font-bold hover:opacity-90 transition-all" style={{background:'#14B8A6'}}>
          View My Plan <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}