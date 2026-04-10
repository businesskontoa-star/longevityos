import { useState } from 'react';
import { mockPatient } from '@/lib/mockData';
import LabRow from '@/components/LabRow';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity, FlaskConical, Watch, Pill, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'labs', label: 'Lab Results', icon: FlaskConical },
  { id: 'wearable', label: 'Wearable', icon: Watch },
  { id: 'diagnoses', label: 'Diagnoses', icon: Stethoscope },
  { id: 'medications', label: 'Medications', icon: Pill },
];

export default function MyHealth() {
  const p = mockPatient;
  const [activeTab, setActiveTab] = useState('labs');
  const [wearableMetric, setWearableMetric] = useState('steps');

  const metricMap = {
    steps: { key: 'steps', label: 'Daily Steps', color: '#22d3b0', unit: 'steps' },
    sleep: { key: 'sleep', label: 'Sleep Hours', color: '#a78bfa', unit: 'hrs' },
    hrv: { key: 'hrv', label: 'HRV', color: '#f59e0b', unit: 'ms' },
  };

  const m = metricMap[wearableMetric];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>My Health</h1>
        <p className="text-muted-foreground text-sm mt-1">All your health data, translated into clarity.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-secondary w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              activeTab === id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {/* Labs */}
      {activeTab === 'labs' && (
        <div className="rounded-2xl border border-border bg-card/80 overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Latest Lab Panel</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Drawn: {p.labs[0].date}</p>
          </div>
          <div className="p-5 divide-y divide-border">
            {p.labs.map(lab => <LabRow key={lab.name} lab={lab} />)}
          </div>
          <div className="p-5 border-t border-border bg-primary/5">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-primary font-medium">AI Note:</span> Your LDL and hsCRP are both elevated and often reinforce each other when sleep is disrupted. These are not emergencies — they are signals worth acting on. Speak with your care team about next steps.
            </p>
          </div>
        </div>
      )}

      {/* Wearable */}
      {activeTab === 'wearable' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {Object.entries(metricMap).map(([key, { label }]) => (
              <button key={key} onClick={() => setWearableMetric(key)}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                  wearableMetric === key ? "bg-primary/10 border-primary/30 text-primary" : "border-border text-muted-foreground hover:text-foreground")}>
                {label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-foreground">{m.label} — Last 7 Days</p>
              <p className="text-xs text-muted-foreground">7-day average</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={p.wearable.weeklyTrend}>
                <defs>
                  <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={m.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={m.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: 'hsl(215 20% 50%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: 'hsl(222 40% 10%)', border: '1px solid hsl(222 30% 16%)', borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey={m.key} stroke={m.color} fill="url(#metricGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Avg Sleep', value: `${p.wearable.avgSleep}h`, status: p.wearable.avgSleep < 7 ? 'warn' : 'ok' },
              { label: 'Recovery Score', value: `${p.wearable.recoveryScore}/100`, status: p.wearable.recoveryScore < 50 ? 'warn' : 'ok' },
              { label: 'Stress Score', value: `${p.wearable.stressScore}/100`, status: p.wearable.stressScore > 60 ? 'warn' : 'ok' },
              { label: 'VO₂ Max', value: `${p.wearable.vo2max}`, status: p.wearable.vo2max < 35 ? 'warn' : 'ok' },
              { label: 'Avg Steps', value: p.wearable.avgSteps.toLocaleString(), status: p.wearable.avgSteps < 7500 ? 'warn' : 'ok' },
              { label: 'Active Min/day', value: `${p.wearable.avgActiveMinutes}`, status: p.wearable.avgActiveMinutes < 30 ? 'warn' : 'ok' },
            ].map(({ label, value, status }) => (
              <div key={label} className="rounded-xl border border-border bg-card/80 p-4">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className={cn("text-lg font-bold mt-1", status === 'warn' ? 'text-amber-400' : 'text-foreground')}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diagnoses */}
      {activeTab === 'diagnoses' && (
        <div className="space-y-3">
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Active Diagnoses</h3>
            {p.diagnoses.map((d, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <p className="text-sm text-foreground">{d}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Visit History</h3>
            {p.visits.map((v, i) => (
              <div key={i} className="flex gap-3 py-3 border-b border-border last:border-0">
                <div className="text-xs text-muted-foreground w-24 shrink-0 pt-0.5">{v.date}</div>
                <div>
                  <p className="text-sm font-medium text-foreground">{v.type}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{v.clinic} · {v.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medications */}
      {activeTab === 'medications' && (
        <div className="rounded-2xl border border-border bg-card/80 p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Current Medications</h3>
          {p.medications.map((m, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <Pill size={14} className="text-muted-foreground" />
              <p className="text-sm text-foreground">{m}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
            Medication information is imported from your clinic records. Report any changes at your next visit.
          </p>
        </div>
      )}
    </div>
  );
}