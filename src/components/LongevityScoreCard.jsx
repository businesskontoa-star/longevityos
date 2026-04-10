export default function LongevityScoreCard({ score, biologicalAge, chronologicalAge, className }) {
  const diff = biologicalAge - chronologicalAge;
  const color = diff > 5 ? '#f87171' : diff > 2 ? '#F59E0B' : '#14B8A6';
  const pct = score / 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDash = circumference * pct;

  return (
    <div className={`relative flex flex-col items-center justify-center p-8 ${className || ''}`}>
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#E2E8F0" strokeWidth="9" />
          <circle cx="60" cy="60" r="54" fill="none" stroke="#14B8A6" strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${circumference}`}
            style={{ transition: 'stroke-dasharray 1.2s ease' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-[#0F172A]">{score}</span>
          <span className="text-xs text-slate-400 font-medium">/ 100</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm font-semibold text-slate-700">Longevity Score</p>
        <div className="mt-2 flex items-center gap-2 justify-center flex-wrap">
          <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${color}18`, color }}>
            Bio Age: {biologicalAge}
          </div>
          <span className="text-xs text-slate-400">vs {chronologicalAge} actual</span>
        </div>
        {diff > 0 && (
          <p className="mt-1.5 text-xs text-slate-400">
            +{diff} yrs ahead biologically — actionable
          </p>
        )}
      </div>
    </div>
  );
}