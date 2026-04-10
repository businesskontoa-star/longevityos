import { clinicMetrics } from '@/lib/mockData';
import KPICard from '@/components/KPICard';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export default function ClinicOverview() {
  const m = clinicMetrics;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Centrum Health & Diagnostics</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">Executive Overview</h1>
          <p className="text-slate-400 text-sm mt-1">AI-Influenced Patient Metrics · 1,000-patient cohort · Q1 2024</p>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold shrink-0">Live</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KPICard label="Active Patients" value={m.overview.activePatients.toLocaleString()} change={m.overview.activePatientsChange} />
        <KPICard label="Retention Rate" value={m.overview.retentionRate} unit="%" change={m.overview.retentionChange} />
        <KPICard label="Recall Recovery" value={m.overview.recallRecoveryRate} unit="%" change={m.overview.recallChange} />
        <KPICard label="Preventive Conv." value={m.overview.preventiveConversionRate} unit="%" change={m.overview.preventiveConversionChange} />
        <KPICard label="AI Revenue" value={`€${(m.overview.aiInfluencedRevenue / 1000).toFixed(0)}K`} change={m.overview.aiInfluencedRevenueChange} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Revenue chart */}
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
          <p className="text-sm font-bold text-[#0F172A] mb-1">AI-Influenced Revenue</p>
          <p className="text-xs text-slate-400 mb-4">Monthly baseline vs. AI-augmented</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={m.monthlyRevenue}>
              <defs>
                <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 12 }}
                formatter={v => [`€${(v / 1000).toFixed(0)}K`]} />
              <Area type="monotone" dataKey="baseline" stroke="#cbd5e1" fill="url(#baseGrad)" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="Baseline" />
              <Area type="monotone" dataKey="aiInfluenced" stroke="#14B8A6" fill="url(#aiGrad)" strokeWidth={2.5} dot={false} name="AI-Influenced" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Funnel */}
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
          <p className="text-sm font-bold text-[#0F172A] mb-1">Patient Journey Funnel</p>
          <p className="text-xs text-slate-400 mb-4">Onboarding → Clinical return</p>
          <div className="space-y-2.5">
            {m.funnel.map((stage, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 font-medium">{stage.stage}</span>
                  <span className="text-[#0F172A] font-bold">{stage.count.toLocaleString()} <span className="text-slate-400 font-normal">({stage.pct}%)</span></span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-teal-400 transition-all" style={{ width: `${stage.pct}%`, opacity: 0.5 + i * 0.08 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority patients */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} className="text-amber-500" />
            <p className="text-sm font-bold text-[#0F172A]">Priority Patients — Action Required</p>
          </div>
          <Link to="/clinic/patient/PT0001" className="text-xs font-semibold text-teal-600 hover:underline flex items-center gap-1">
            Patient 360 <ArrowRight size={11} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50/50">
                {['Patient', 'Age', 'Score', 'Risk Factor', 'Last Visit', 'Recommended Action', 'Urgency'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.highRiskPatients.map(pat => (
                <tr key={pat.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5 font-semibold text-[#0F172A]">{pat.name}</td>
                  <td className="px-5 py-3.5 text-slate-400">{pat.age}</td>
                  <td className="px-5 py-3.5">
                    <span className={`font-extrabold text-base ${pat.score < 55 ? 'text-red-500' : pat.score < 65 ? 'text-amber-500' : 'text-emerald-500'}`}>{pat.score}</span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs max-w-[160px]">{pat.risk}</td>
                  <td className="px-5 py-3.5 text-slate-400 text-xs">{pat.lastVisit}</td>
                  <td className="px-5 py-3.5 text-slate-600 text-xs max-w-[180px]">{pat.action}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${pat.urgency === 'critical' ? 'bg-red-50 text-red-600' : pat.urgency === 'high' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {pat.urgency}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Positioning line */}
      <div className="rounded-2xl border border-[#0F172A]/10 bg-[#0F172A] p-6 text-center">
        <p className="text-lg font-extrabold text-white">"Without us, AI stays a feature. With us, AI becomes a clinic growth engine."</p>
        <p className="text-sm text-white/40 mt-2">VitaCore · AI Operating System for Preventive Clinics · From data to action.</p>
      </div>
    </div>
  );
}