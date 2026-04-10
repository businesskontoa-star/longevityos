import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function KPICard({ label, value, unit, change, changeLabel, className }) {
  const isPositive = change > 0;

  return (
    <div className={cn("rounded-2xl border border-slate-100 bg-white shadow-sm p-5 flex flex-col gap-3", className)}>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <div className="flex items-end gap-1">
        <span className="text-3xl font-extrabold text-[#0F172A]">{value}</span>
        {unit && <span className="text-sm text-slate-400 mb-1 font-medium">{unit}</span>}
      </div>
      {change !== undefined && (
        <div className={cn("flex items-center gap-1 text-xs font-semibold", isPositive ? "text-emerald-500" : "text-red-400")}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? '+' : ''}{change}% {changeLabel || 'vs last quarter'}
        </div>
      )}
    </div>
  );
}