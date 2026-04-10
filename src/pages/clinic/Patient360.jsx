import { mockPatient } from '@/lib/mockData';
import LabRow from '@/components/LabRow';
import InsightCard from '@/components/InsightCard';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function Patient360() {
  const p = mockPatient;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 flex flex-col md:flex-row md:items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-[#0F172A] flex items-center justify-center text-white text-xl font-extrabold shrink-0">
          {p.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-extrabold text-[#0F172A]">{p.name}</h1>
            <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-bold">Action Required</span>
          </div>
          <p className="text-sm text-slate-400 mt-1">Age {p.age} · {p.sex} · {p.country} · {p.clinic}</p>
          <p className="text-xs text-slate-400 mt-1">Diagnoses: {p.diagnoses.join(' · ')}</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-center shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Longevity</p>
            <p className="text-3xl font-extrabold text-[#0F172A]">{p.longevityScore}</p>
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center shadow-sm">
            <p className="text-xs font-bold text-red-400 uppercase">Bio Age</p>
            <p className="text-3xl font-extrabold text-red-500">{p.biologicalAge}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">AI Insight</p>
            <InsightCard insight={p.todayInsight} />
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Risk & Opportunity Flags</p>
            <div className="space-y-2.5">
              {[
                { label: 'HbA1c 7.6% — above diabetic target', type: 'risk', severity: 'high' },
                { label: 'LDL 4.44 mmol/L — 70% above target', type: 'risk', severity: 'high' },
                { label: 'Low daily activity (5,240 steps/day)', type: 'risk', severity: 'medium' },
                { label: 'HRV 24.2ms — recovery under pressure', type: 'risk', severity: 'medium' },
                { label: 'Metabolic programme opportunity', type: 'opportunity', severity: 'high' },
                { label: 'Statin dose review overdue', type: 'action', severity: 'high' },
              ].map((flag, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${flag.type === 'risk' ? flag.severity === 'high' ? 'bg-red-500' : 'bg-amber-400' : flag.type === 'opportunity' ? 'bg-teal-500' : 'bg-blue-500'}`} />
                  <p className="text-sm text-slate-600 flex-1">{flag.label}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${flag.type === 'risk' ? 'bg-red-50 text-red-600' : flag.type === 'opportunity' ? 'bg-teal-50 text-teal-600' : 'bg-blue-50 text-blue-600'}`}>
                    {flag.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 bg-slate-50/50">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Latest Labs</p>
          </div>
          <div className="p-5">{p.labs.map(lab => <LabRow key={lab.name} lab={lab} />)}</div>
        </div>
      </div>

      {/* Plan */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Recommended Actions & Status</p>
        <div className="space-y-3">
          {p.plan.active.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-2 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-3">
                {item.status === 'scheduled' ? <CheckCircle2 size={14} className="text-emerald-500 shrink-0" /> :
                 item.status === 'due' ? <AlertTriangle size={14} className="text-red-500 shrink-0" /> :
                 <Clock size={14} className="text-slate-300 shrink-0" />}
                <p className="text-sm text-slate-600">{item.title}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${item.status === 'scheduled' ? 'bg-emerald-50 text-emerald-600' : item.status === 'due' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-400'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}