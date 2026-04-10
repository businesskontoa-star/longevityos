import { AlertCircle, ChevronRight, Zap, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const urgencyConfig = {
  high: { color: '#f87171', bg: 'bg-red-50 border-red-100', textColor: 'text-red-500', icon: AlertCircle },
  moderate: { color: '#F59E0B', bg: 'bg-amber-50 border-amber-100', textColor: 'text-amber-500', icon: AlertTriangle },
  low: { color: '#14B8A6', bg: 'bg-teal-50 border-teal-100', textColor: 'text-teal-500', icon: Zap },
};

export default function InsightCard({ insight, onExpand, className }) {
  const config = urgencyConfig[insight?.urgency] || urgencyConfig.low;
  const Icon = config.icon;

  return (
    <div className={cn("rounded-2xl border p-5 cursor-pointer hover:shadow-md transition-all group", config.bg, className)}
      onClick={onExpand}>
      <div className="flex items-start gap-3">
        <div className={cn("mt-0.5 shrink-0", config.textColor)}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">{insight?.headline}</p>
          <p className="mt-1.5 text-sm text-slate-500 leading-relaxed line-clamp-3">{insight?.detail}</p>
          {insight?.linkedLabs?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {insight.linkedLabs.map(lab => (
                <span key={lab} className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600 font-medium">{lab}</span>
              ))}
            </div>
          )}
        </div>
        <ChevronRight size={16} className="text-slate-300 group-hover:text-teal transition-colors shrink-0 mt-0.5" />
      </div>
    </div>
  );
}