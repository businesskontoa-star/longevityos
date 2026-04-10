import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusConfig = {
  normal: { color: 'text-emerald-600', bg: 'bg-emerald-50 text-emerald-700', label: 'Normal' },
  elevated: { color: 'text-amber-600', bg: 'bg-amber-50 text-amber-700', label: 'Elevated' },
  low: { color: 'text-blue-600', bg: 'bg-blue-50 text-blue-700', label: 'Low' },
  critical: { color: 'text-red-600', bg: 'bg-red-50 text-red-700', label: 'Critical' },
};

const TrendIcon = ({ trend }) => {
  if (trend === 'up') return <TrendingUp size={13} className="text-amber-500" />;
  if (trend === 'down') return <TrendingDown size={13} className="text-blue-500" />;
  return <Minus size={13} className="text-slate-300" />;
};

export default function LabRow({ lab }) {
  const config = statusConfig[lab.status] || statusConfig.normal;
  return (
    <div className="flex items-start justify-between py-3 border-b border-slate-50 last:border-0 gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-700">{lab.name}</p>
        <p className="text-xs text-slate-400 mt-0.5">Ref: {lab.ref}</p>
        {lab.longevityNote && (
          <p className="text-xs text-slate-400 mt-1 italic leading-snug">{lab.longevityNote}</p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <TrendIcon trend={lab.trend} />
        <span className="text-sm font-bold text-slate-700 text-right min-w-[80px] text-right">{lab.value} {lab.unit}</span>
        <span className={cn("px-2 py-0.5 rounded-full text-xs font-semibold w-16 text-center", config.bg)}>
          {config.label}
        </span>
      </div>
    </div>
  );
}