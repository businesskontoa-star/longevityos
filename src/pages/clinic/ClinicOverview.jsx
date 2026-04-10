import { clinicMetrics } from '@/lib/mockData';
import KPICard from '@/components/KPICard';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, AlertTriangle } from 'lucide-react';

export default function ClinicOverview() {
  const m = clinicMetrics;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Centrum Health & Diagnostics</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>Executive Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">AI-Influenced Patient Metrics · April 2026</p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
          Live Dashboard
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KPICard label="Active Patients" value={m.overview.activePatients.toLocaleString()} change={m.overview.activePatientsChange} />
        <KPICard label="Retention Rate" value={m.overview.retentionRate} unit="%" change={m.overview.retentionChange} />
        <KPICard label="Recall Recovery" value={m.overview.recallRecoveryRate} unit="%" change={m.overview.recallChange} />
        <KPICard label="Preventive Conv." value={m.overview.preventiveConversionRate} unit="%" change={m.overview.preventiveConversionChange} />
        <KPICard label="AI Revenue" value={`€${(m.overview.aiInfluencedRevenue / 1000).toFixed(0)}K`} change={m.overview.aiInfluencedRevenueChange} />
      </div>

      {/* Revenue Chart + Funnel */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card/80 p-5">
          <p className="text-sm font-semibold text-foreground mb-1">AI-Influenced Revenue</p>
          <p className="text-xs text-muted-foreground mb-4">Monthly baseline vs. AI-augmented</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={m.monthlyRevenue}>
              <defs>
                <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(175 70% 42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(175 70% 42%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(215 20% 50%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(215 20% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: 'hsl(215 20% 50%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: 'hsl(222 40% 10%)', border: '1px solid hsl(222 30% 16%)', borderRadius: 8, fontSize: 12 }}
                formatter={(v) => [`€${(v / 1000).toFixed(0)}K`]}
              />
              <Area type="monotone" dataKey="baseline" stroke="hsl(215 20% 50%)" fill="url(#baseGrad)" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="Baseline" />
              <Area type="monotone" dataKey="aiInfluenced" stroke="hsl(175 70% 42%)" fill="url(#aiGrad)" strokeWidth={2} dot={false} name="AI-Influenced" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-4 h-px bg-muted-foreground inline-block opacity-50" style={{borderTop:'2px dashed'}} /> Baseline</span>
            <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-primary inline-block" /> AI-Influenced</span>
          </div>
        </div>

        {/* Funnel */}
        <div className="rounded-2xl border border-border bg-card/80 p-5">
          <p className="text-sm font-semibold text-foreground mb-1">Patient Journey Funnel</p>
          <p className="text-xs text-muted-foreground mb-4">From onboarding to clinical return</p>
          <div className="space-y-2">
            {m.funnel.map((stage, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{stage.stage}</span>
                  <span className="text-foreground font-medium">{stage.count.toLocaleString()} <span className="text-muted-foreground">({stage.pct}%)</span></span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${stage.pct}%`, opacity: 0.4 + (i * 0.1) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High-risk patient table */}
      <div className="rounded-2xl border border-border bg-card/80 overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-400" />
            <p className="text-sm font-semibold text-foreground">Priority Patients</p>
          </div>
          <Link to="/clinic/patient/p-001" className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowRight size={11} /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['Patient', 'Age', 'Score', 'Risk Factor', 'Last Visit', 'Recommended Action', 'Urgency'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.highRiskPatients.map(pat => (
                <tr key={pat.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer">
                  <td className="px-5 py-3 font-medium text-foreground">{pat.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{pat.age}</td>
                  <td className="px-5 py-3">
                    <span className={`font-semibold ${pat.score < 55 ? 'text-red-400' : pat.score < 65 ? 'text-amber-400' : 'text-emerald-400'}`}>{pat.score}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">{pat.risk}</td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">{pat.lastVisit}</td>
                  <td className="px-5 py-3 text-xs text-foreground">{pat.action}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      pat.urgency === 'critical' ? 'bg-red-400/10 text-red-400' :
                      pat.urgency === 'high' ? 'bg-amber-400/10 text-amber-400' :
                      'bg-emerald-400/10 text-emerald-400'
                    }`}>{pat.urgency}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Big positioning line */}
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center">
        <p className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
          "Without us, AI stays a feature. With us, AI becomes a clinic growth engine."
        </p>
        <p className="text-sm text-muted-foreground mt-2">LongevityOS · AI Operating System for Preventive Clinics</p>
      </div>
    </div>
  );
}