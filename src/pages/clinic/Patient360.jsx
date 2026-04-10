import { mockPatient } from '@/lib/mockData';
import LabRow from '@/components/LabRow';
import LongevityScoreCard from '@/components/LongevityScoreCard';
import InsightCard from '@/components/InsightCard';
import { CheckCircle2, Clock, AlertTriangle, Calendar } from 'lucide-react';

export default function Patient360() {
  const p = mockPatient;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-border bg-card/80 p-6 flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold shrink-0">
          {p.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-foreground">{p.name}</h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 text-xs font-medium">Needs Attention</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Age {p.age} · {p.sex} · {p.clinic}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span>Last visit: {p.lastVisit}</span>
            <span>·</span>
            <span>Next: {p.nextMilestoneDate}</span>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="rounded-xl border border-border bg-secondary px-4 py-2 text-center">
            <p className="text-xs text-muted-foreground">Longevity Score</p>
            <p className="text-2xl font-bold text-foreground">{p.longevityScore}</p>
          </div>
          <div className="rounded-xl border border-border bg-secondary px-4 py-2 text-center">
            <p className="text-xs text-muted-foreground">Bio Age</p>
            <p className="text-2xl font-bold text-red-400">{p.biologicalAge}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* AI Insight */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">AI Insight</p>
            <InsightCard insight={p.todayInsight} />
          </div>

          {/* Risk flags */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Risk & Opportunity Flags</p>
            <div className="space-y-2">
              {[
                { label: 'LDL + hsCRP co-elevation', type: 'risk', severity: 'medium' },
                { label: 'Sleep deficit (avg 5.9h)', type: 'risk', severity: 'high' },
                { label: 'Vitamin D insufficiency', type: 'risk', severity: 'medium' },
                { label: 'Recovery program opportunity', type: 'opportunity', severity: 'high' },
                { label: 'Lab repeat due in 30 days', type: 'action', severity: 'medium' },
              ].map((flag, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    flag.type === 'risk' ? flag.severity === 'high' ? 'bg-red-400' : 'bg-amber-400' :
                    flag.type === 'opportunity' ? 'bg-primary' : 'bg-blue-400'
                  }`} />
                  <p className="text-sm text-foreground">{flag.label}</p>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
                    flag.type === 'risk' ? 'bg-red-400/10 text-red-400' :
                    flag.type === 'opportunity' ? 'bg-primary/10 text-primary' : 'bg-blue-400/10 text-blue-400'
                  }`}>{flag.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Labs */}
        <div className="rounded-2xl border border-border bg-card/80 overflow-hidden">
          <div className="p-5 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Latest Labs</p>
          </div>
          <div className="p-5">
            {p.labs.slice(0, 5).map(lab => <LabRow key={lab.name} lab={lab} />)}
          </div>
        </div>
      </div>

      {/* Plan adherence */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Recommended Actions & Status</p>
        <div className="space-y-3">
          {p.plan.active.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                {item.status === 'scheduled' ? (
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                ) : item.status === 'due' ? (
                  <AlertTriangle size={14} className="text-red-400 shrink-0" />
                ) : (
                  <Clock size={14} className="text-muted-foreground shrink-0" />
                )}
                <p className="text-sm text-foreground">{item.title}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                item.status === 'scheduled' ? 'bg-emerald-400/10 text-emerald-400' :
                item.status === 'due' ? 'bg-red-400/10 text-red-400' :
                'bg-secondary text-muted-foreground'
              }`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Journey milestones */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Care Journey</p>
        <div className="space-y-3">
          {p.journeyMilestones.map((m, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                m.status === 'completed' ? 'bg-emerald-400' :
                m.status === 'upcoming' ? 'bg-amber-400' : 'bg-muted-foreground'
              }`} />
              <p className="text-sm text-foreground flex-1">{m.event}</p>
              <span className="text-xs text-muted-foreground shrink-0">{m.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}