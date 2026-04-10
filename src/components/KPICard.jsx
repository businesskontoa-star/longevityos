import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function KPICard({ label, value, unit, change, changeLabel, accent, className }) {
  const isPositive = change > 0;
  const accentColor = accent || 'hsl(175 70% 42%)';

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5 flex flex-col gap-3", className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold text-foreground" style={{ fontFeatureSettings: '"tnum"' }}>{value}</span>
        {unit && <span className="text-sm text-muted-foreground mb-1">{unit}</span>}
      </div>
      {change !== undefined && (
        <div className={cn("flex items-center gap-1 text-xs font-medium", isPositive ? "text-emerald-400" : "text-red-400")}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? '+' : ''}{change}{typeof change === 'number' ? '%' : ''} {changeLabel || 'vs last quarter'}
        </div>
      )}
    </div>
  );
}