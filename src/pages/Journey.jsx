import { mockPatient } from '@/lib/mockData';
import { CheckCircle2, Clock, Calendar, FlaskConical, Star, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const milestoneConfig = {
  completed: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', label: 'Completed' },
  upcoming: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', label: 'Upcoming' },
  planned: { icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', label: 'Planned' },
};

const typeIcon = { visit: Calendar, insight: Star, lab: FlaskConical, milestone: Star };

export default function Journey() {
  const p = mockPatient;
  const today = new Date();

  const daysSinceVisit = Math.floor((today - new Date(p.lastVisit)) / 86400000);
  const daysToNext = Math.ceil((new Date(p.nextMilestoneDate) - today) / 86400000);

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>My Journey</h1>
        <p className="text-muted-foreground text-sm mt-1">Your continuity of care — every step, every milestone.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-card/80 p-4 text-center">
          <p className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>{daysSinceVisit}</p>
          <p className="text-xs text-muted-foreground mt-1">days since last visit</p>
          {daysSinceVisit > 60 && (
            <div className="mt-2 flex items-center justify-center gap-1 text-amber-400 text-xs">
              <AlertCircle size={12} />
              Follow-up recommended
            </div>
          )}
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
          <p className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-serif)' }}>{daysToNext}</p>
          <p className="text-xs text-muted-foreground mt-1">days to next milestone</p>
          <p className="text-xs text-primary mt-1">{p.nextMilestone}</p>
        </div>
      </div>

      {/* Recall nudge */}
      {daysSinceVisit > 45 && (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">It's been {daysSinceVisit} days</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Based on your current hsCRP and sleep trends, your care team at Centrum Health recommends scheduling a follow-up. Your next milestone is coming up — let's make sure you're on track.
              </p>
              <button className="mt-3 px-4 py-2 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-medium hover:bg-amber-400/20 transition-all">
                Book follow-up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Care Timeline</h2>
        <div className="relative">
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-6">
            {p.journeyMilestones.map((m, i) => {
              const config = milestoneConfig[m.status];
              const Icon = config.icon;
              const TIcon = typeIcon[m.type] || Calendar;

              return (
                <div key={i} className="flex gap-4">
                  <div className={cn("w-9 h-9 rounded-full border flex items-center justify-center shrink-0 z-10 bg-card", config.bg, config.border)}>
                    <Icon size={15} className={config.color} />
                  </div>
                  <div className={cn("flex-1 rounded-xl border p-4 transition-all", config.border,
                    m.status === 'completed' ? 'bg-card/50 opacity-80' : 'bg-card/80')}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{m.event}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{m.date}</p>
                      </div>
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full shrink-0", config.bg, config.color)}>
                        {config.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completed actions */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Completed Visits ({p.visits.length})</h3>
        {p.visits.map((v, i) => (
          <div key={i} className="flex gap-3 py-3 border-b border-border last:border-0">
            <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">{v.type}</p>
              <p className="text-xs text-muted-foreground">{v.date} · {v.clinic}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{v.notes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}