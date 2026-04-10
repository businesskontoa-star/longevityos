import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusConfig = {
  normal: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Normal' },
  elevated: { color: 'text-amber-400', bg: 'bg-amber-400/10', label: 'Elevated' },
  low: { color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Low' },
  critical: { color: 'text-red-400', bg: 'bg-red-400/10', label: 'Critical' },
};

const TrendIcon = ({ trend }) => {
  if (trend === 'up') return <TrendingUp size={13} className="text-amber-400" />;
  if (trend === 'down') return <TrendingDown size={13} className="text-blue-400" />;
  return <Minus size={13} className="text-muted-foreground" />;
};

export default function LabRow({ lab }) {
  const config = statusConfig[lab.status] || statusConfig.normal;
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{lab.name}</p>
        <p className="text-xs text-muted-foreground">Ref: {lab.ref}</p>
      </div>
      <div className="flex items-center gap-3">
        <TrendIcon trend={lab.trend} />
        <span className="text-sm font-semibold text-foreground w-20 text-right">{lab.value} {lab.unit}</span>
        <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium w-16 text-center", config.color, config.bg)}>
          {config.label}
        </span>
      </div>
    </div>
  );
}