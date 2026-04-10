import { cn } from '@/lib/utils';

export default function LongevityScoreCard({ score, biologicalAge, chronologicalAge, className }) {
  const diff = biologicalAge - chronologicalAge;
  const color = diff > 3 ? '#f87171' : diff > 0 ? '#f59e0b' : '#22d3b0';
  const pct = score / 100;

  const circumference = 2 * Math.PI * 54;
  const strokeDash = circumference * pct;

  return (
    <div className={cn("relative flex flex-col items-center justify-center p-8", className)}>
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(222 35% 16%)" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke="hsl(175 70% 42%)" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${circumference}`}
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-foreground font-serif">{score}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm font-medium text-foreground">Longevity Score</p>
        <div className="mt-2 flex items-center gap-2 justify-center">
          <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${color}20`, color }}>
            Bio Age: {biologicalAge}
          </div>
          <span className="text-xs text-muted-foreground">vs {chronologicalAge} actual</span>
        </div>
        {diff > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            {diff} years older than chronological — improvable
          </p>
        )}
      </div>
    </div>
  );
}