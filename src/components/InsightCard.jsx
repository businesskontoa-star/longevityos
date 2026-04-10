import { AlertCircle, ChevronRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const urgencyConfig = {
  high: { color: 'text-red-400', bg: 'border-red-400/20 bg-red-400/5', icon: AlertCircle },
  moderate: { color: 'text-accent', bg: 'border-accent/20 bg-accent/5', icon: AlertCircle },
  low: { color: 'text-primary', bg: 'border-primary/20 bg-primary/5', icon: Zap },
};

export default function InsightCard({ insight, onExpand, className }) {
  const config = urgencyConfig[insight?.urgency] || urgencyConfig.low;
  const Icon = config.icon;

  return (
    <div className={cn("rounded-2xl border p-5 cursor-pointer hover:border-primary/40 transition-all group", config.bg, className)}
      onClick={onExpand}>
      <div className="flex items-start gap-3">
        <div className={cn("mt-0.5 shrink-0", config.color)}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-snug">{insight?.headline}</p>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">{insight?.detail}</p>
          {insight?.linkedLabs?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {insight.linkedLabs.map(lab => (
                <span key={lab} className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground font-medium">{lab}</span>
              ))}
            </div>
          )}
        </div>
        <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
      </div>
    </div>
  );
}