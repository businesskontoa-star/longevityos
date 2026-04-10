import { clinicMetrics } from '@/lib/mockData';
import { ArrowDown } from 'lucide-react';

export default function ClinicFunnel() {
  const funnel = clinicMetrics.funnel;

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>Journey Funnel</h1>
        <p className="text-muted-foreground text-sm mt-1">Patient activation from onboarding to clinical return — where they drop and where to act.</p>
      </div>

      <div className="space-y-2">
        {funnel.map((stage, i) => {
          const dropOff = i > 0 ? funnel[i - 1].pct - stage.pct : 0;
          const width = stage.pct;

          return (
            <div key={i}>
              {i > 0 && dropOff > 10 && (
                <div className="flex items-center gap-2 py-2 px-4">
                  <ArrowDown size={14} className="text-red-400" />
                  <span className="text-xs text-red-400 font-medium">-{dropOff}% drop-off here</span>
                </div>
              )}
              <div className="rounded-xl border border-border bg-card/80 p-4 flex items-center gap-4">
                <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{stage.stage}</span>
                    <span className="text-sm font-bold text-foreground">{stage.count.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${width}%`, opacity: 1 - (i * 0.1) }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{stage.pct}% of total</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Biggest Drop-Off</p>
          <p className="text-base font-semibold text-foreground">Recommendation → Booking</p>
          <p className="text-2xl font-bold text-red-400 mt-1">-21%</p>
          <p className="text-xs text-muted-foreground mt-2">This is where recall activation can recover the most value.</p>
        </div>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Recovery Opportunity</p>
          <p className="text-base font-semibold text-foreground">Recall Agent Activation</p>
          <p className="text-2xl font-bold text-primary mt-1">+840</p>
          <p className="text-xs text-muted-foreground mt-2">Estimated bookings recoverable with automated recall nudges.</p>
        </div>
      </div>
    </div>
  );
}