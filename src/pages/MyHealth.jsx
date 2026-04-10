import { useState } from 'react';
import { mockPatient } from '@/lib/mockData';
import LabRow from '@/components/LabRow';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { FlaskConical, Watch, Pill, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'labs', label: 'Lab Results', icon: FlaskConical },
  { id: 'wearable', label: 'Wearable', icon: Watch },
  { id: 'diagnoses', label: 'Diagnoses', icon: Stethoscope },
  { id: 'medications', label: 'Medications', icon: Pill },
];

const metricMap = {
  steps: { key: 'steps', label: 'Daily Steps', color: '#14B8A6' },
  sleep: { key: 'sleep', label: 'Sleep Hours', color: '#1D4ED8' },
  hrv: { key: 'hrv', label: 'HRV (ms)', color: '#F59E0B' },
};

export default function MyHealth() {
  const p = mockPatient;
  const [activeTab, setActiveTab] = useState('labs');
  const [wearableMetric, setWearableMetric] = useState('steps');
  const m = metricMap[wearableMetric];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">My Health</h1>
        <p className="text-slate-400 text-sm mt-1">All your health data, translated into clarity.</p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-slate-100 w-fit flex-wrap">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all",
              activeTab === id ? "bg-white text-[#0F172A] shadow-sm" : "text-slate-400 hover:text-slate-700")}>
            <Icon size={13} />{label}
          </button>
        ))}
      </div>

      {activeTab === 'labs' && (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 bg-slate-50/50">
            <h2 className="text-sm font-bold text-[#0F172A]">Latest Lab Panel — {p.labs[0].date}</h2>
            <p className="text-xs text-slate-400 mt-0.5">ICD: E11 (Type 2 Diabetes) · E78.5 (Dyslipidaemia)</p>
          </div>
          <div className="p-5">{p.labs.map(lab => <LabRow key={lab.name} lab={lab} />)}</div>
          <div className="p-5 border-t border-slate-50 bg-teal-50/50">
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-bold text-teal-600">VitaCore Note:</span> Your HbA1c and LDL are both above target for a Type 2 diabetic patient. These are closely linked — uncontrolled glucose accelerates LDL oxidation and vascular ageing. This pattern is modifiable with the right interventions. Speak with your care team.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'wearable' && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {Object.entries(metricMap).map(([key, { label }]) => (
              <button key={key} onClick={() => setWearableMetric(key)}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  wearableMetric === key ? "bg-teal-50 border-teal-200 text-teal-700" : "border-slate-200 text-slate-400 hover:text-slate-700 bg-white")}>
                {label}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
            <p className="text-sm font-bold text-[#0F172A] mb-4">{m.label} — Last 7 Days</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={p.wearable.weeklyTrend}>
                <defs>
                  <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={m.color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={m.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 12 }} />
                <Area type="monotone" dataKey={m.key} stroke={m.color} fill="url(#metricGrad)" strokeWidth={2.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Avg Sleep', value: `${p.wearable.avgSleep}h`, warn: p.wearable.avgSleep < 7 },
              { label: 'Sleep Quality', value: `${p.wearable.sleepQuality}/100`, warn: p.wearable.sleepQuality < 65 },
              { label: 'Avg HRV', value: `${p.wearable.avgHRV} ms`, warn: p.wearable.avgHRV < 30 },
              { label: 'Resting HR', value: `${p.wearable.avgRestingHR} bpm`, warn: p.wearable.avgRestingHR > 80 },
              { label: 'Recovery Score', value: `${p.wearable.recoveryScore}/100`, warn: p.wearable.recoveryScore < 50 },
              { label: 'Daily Steps', value: p.wearable.avgSteps.toLocaleString(), warn: p.wearable.avgSteps < 7500 },
            ].map(({ label, value, warn }) => (
              <div key={label} className="rounded-xl border border-slate-100 bg-white shadow-sm p-4">
                <p className="text-xs text-slate-400 font-medium">{label}</p>
                <p className={cn("text-lg font-extrabold mt-1", warn ? 'text-amber-500' : 'text-[#0F172A]')}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'diagnoses' && (
        <div className="space-y-3">
          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
            <h3 className="text-sm font-bold text-[#0F172A] mb-4">Active Diagnoses</h3>
            {p.diagnoses.map((d, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
                <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <p className="text-sm text-slate-700">{d}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
            <h3 className="text-sm font-bold text-[#0F172A] mb-3">Visit History</h3>
            {p.visits.map((v, i) => (
              <div key={i} className="flex gap-3 py-3 border-b border-slate-50 last:border-0">
                <div className="text-xs text-slate-400 w-24 shrink-0 pt-0.5 font-medium">{v.date}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{v.type}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{v.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'medications' && (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
          <h3 className="text-sm font-bold text-[#0F172A] mb-4">Current Medications</h3>
          {p.medications.map((med, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Pill size={14} className="text-blue-500" />
              </div>
              <p className="text-sm font-medium text-slate-700">{med}</p>
            </div>
          ))}
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-400 leading-relaxed">
              Medication data is imported from your clinic record at Centrum Health. Report any changes at your next appointment.
            </p>
          </div>
        </div>
      )}

      {/* Lifestyle data */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
        <p className="text-sm font-bold text-[#0F172A] mb-4">Lifestyle Survey · {p.lifestyle.surveyDate}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Diet Quality', value: `${p.lifestyle.dietQualityScore}/10`, warn: p.lifestyle.dietQualityScore < 6 },
            { label: 'Exercise / week', value: `${p.lifestyle.exerciseSessionsWeekly}×`, warn: p.lifestyle.exerciseSessionsWeekly < 3 },
            { label: 'Sedentary hrs/day', value: `${p.lifestyle.sedentaryHrsDay}h`, warn: p.lifestyle.sedentaryHrsDay > 8 },
            { label: 'Wellbeing (WHO-5)', value: `${p.lifestyle.mentalWellbeingWho5}/25`, warn: p.lifestyle.mentalWellbeingWho5 < 13 },
          ].map(({ label, value, warn }) => (
            <div key={label} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-400 font-medium">{label}</p>
              <p className={cn("text-lg font-extrabold mt-1", warn ? 'text-amber-500' : 'text-[#0F172A]')}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}