import { clinicMetrics } from '@/lib/mockData';
import { TrendingUp } from 'lucide-react';

export default function ClinicOpportunities() {
  const ops = clinicMetrics.opportunities;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>Opportunity Engine</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-identified preventive revenue opportunities, ranked by estimated yield.</p>
      </div>

      <div className="space-y-4">
        {ops.map((op, i) => {
          const maxPatients = Math.max(...ops.map(o => o.potentialPatients));
          const pct = (op.potentialPatients / maxPatients) * 100;

          return (
            <div key={i} className="rounded-2xl border border-border bg-card/80 p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-muted-foreground">#{i + 1}</span>
                    <h3 className="text-base font-semibold text-foreground">{op.category}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{op.potentialPatients.toLocaleString()} eligible patients</span>
                    <span>·</span>
                    <span>{op.conversionEst} estimated conversions</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-primary">{op.revenueEst}</p>
                  <p className="text-xs text-muted-foreground">potential revenue</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%`, opacity: 0.7 }} />
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>Conversion rate: {((op.conversionEst / op.potentialPatients) * 100).toFixed(0)}%</span>
                <div className="flex items-center gap-1 text-primary">
                  <TrendingUp size={11} />
                  <span>High opportunity</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <p className="text-sm font-semibold text-foreground mb-2">Total Addressable Preventive Revenue</p>
        <p className="text-4xl font-bold text-primary" style={{ fontFamily: 'var(--font-serif)' }}>
          €{ops.reduce((s, o) => s + parseInt(o.revenueEst.replace('€', '').replace('K', '000')), 0).toLocaleString()}+
        </p>
        <p className="text-xs text-muted-foreground mt-2">Estimated annual preventive revenue across all opportunity segments</p>
      </div>
    </div>
  );
}