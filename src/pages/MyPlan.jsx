import { mockPatient } from '@/lib/mockData';
import { Calendar, FlaskConical, Pill, Dumbbell, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeConfig = {
  program: { icon: Dumbbell, color: 'text-primary', bg: 'bg-primary/10', label: 'Program' },
  supplement: { icon: Pill, color: 'text-amber-400', bg: 'bg-amber-400/10', label: 'Supplement' },
  diagnostic: { icon: FlaskConical, color: 'text-purple-400', bg: 'bg-purple-400/10', label: 'Diagnostic' },
  lab: { icon: FlaskConical, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Lab' },
};

const priorityConfig = {
  high: { color: 'text-red-400', bg: 'bg-red-400/10', label: 'High priority' },
  medium: { color: 'text-amber-400', bg: 'bg-amber-400/10', label: 'Recommended' },
  low: { color: 'text-muted-foreground', bg: 'bg-secondary', label: 'When ready' },
};

const statusConfig = {
  recommended: { color: 'text-primary', label: 'Recommended' },
  due: { color: 'text-red-400', label: 'Due now' },
  scheduled: { color: 'text-emerald-400', label: 'Scheduled' },
  active: { color: 'text-amber-400', label: 'Active' },
};

export default function MyPlan() {
  const p = mockPatient;
  const plan = p.plan.active;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>My Plan</h1>
        <p className="text-muted-foreground text-sm mt-1">Your personalized next steps — ranked by impact on your longevity.</p>
      </div>

      {/* Primary action hero */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Dumbbell size={22} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-red-400/10 text-red-400 text-xs font-medium">High Priority</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Clinic Recommended</span>
            </div>
            <h2 className="text-base font-semibold text-foreground mt-1">{plan[0].title}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              A structured 6-week sleep protocol with your care team at Centrum Health. Clinically shown to reduce hsCRP and improve cardiovascular markers in patients with your profile.
            </p>
            <p className="text-sm font-medium text-primary mt-3">📈 Estimated impact: +8 longevity score points in 90 days</p>
          </div>
        </div>
        <button className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all">
          <Calendar size={14} />
          Schedule consultation at Centrum Health
        </button>
      </div>

      {/* All plan items */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">All Recommended Actions</h2>
        <div className="space-y-3">
          {plan.map((item, i) => {
            const type = typeConfig[item.type] || typeConfig.program;
            const TypeIcon = type.icon;
            const priority = priorityConfig[item.priority] || priorityConfig.medium;
            const status = statusConfig[item.status] || statusConfig.recommended;

            return (
              <div key={item.id} className="rounded-xl border border-border bg-card/80 p-4 flex items-center gap-4 hover:border-primary/20 transition-all cursor-pointer group">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", type.bg)}>
                  <TypeIcon size={16} className={type.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    {item.clinic && (
                      <span className="px-1.5 py-0.5 rounded bg-secondary text-xs text-muted-foreground">Clinic</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn("text-xs font-medium", priority.color)}>{priority.label}</span>
                    <span className="text-muted-foreground text-xs">·</span>
                    <span className={cn("text-xs font-medium", status.color)}>{status.label}</span>
                  </div>
                </div>
                <ChevronRight size={15} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Longevity framing */}
      <div className="rounded-2xl border border-border bg-card/80 p-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">Why this plan matters for your future</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These aren't just clinical recommendations — they're investments in your future self. Each action in your plan is chosen because it addresses a modifiable risk in your current profile. Completing even 2 of these items in the next 90 days could shift your biological age by 3–5 years.
        </p>
        <p className="text-xs text-muted-foreground mt-3 italic">
          This plan was generated by your LongevityOS AI. Always consult your care team before starting a new program or supplement.
        </p>
      </div>
    </div>
  );
}