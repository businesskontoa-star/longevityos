import { clinicMetrics } from '@/lib/mockData';
import { ArrowDown } from 'lucide-react';

export default function ClinicFunnel() {
  const funnel = clinicMetrics.funnel;

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">Journey Funnel</h1>
        <p className="text-slate-400 text-sm mt-1">Patient activation from onboarding to clinical return — drop-off and recovery opportunities.</p>
      </div>

      <div className="space-y-2">
        {funnel.map((stage, i) => {
          const drop = i > 0 ? funnel[i - 1].pct - stage.pct : 0;
          return (
            <div key={i}>
              {i > 0 && drop > 12 && (
                <div className="flex items-center gap-2 py-2 px-3">
                  <ArrowDown size={13} className="text-red-400" />
                  <span className="text-xs font-bold text-red-400">−{drop}% drop-off — recall activation opportunity</span>
                </div>
              )}
              <div className="rounded-xl border border-slate-100 bg-white shadow-sm p-4 flex items-center gap-4">
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-extrabold text-slate-400 shrink-0">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-semibold text-slate-700">{stage.stage}</span>
                    <span className="text-sm font-extrabold text-[#0F172A]">{stage.count.toLocaleString()} <span className="text-slate-400 font-normal text-xs">({stage.pct}%)</span></span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-teal-400 transition-all" style={{ width: `${stage.pct}%`, opacity: 0.4 + i * 0.1 }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-red-100 bg-red-50 shadow-sm p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Biggest Drop-Off</p>
          <p className="text-sm font-bold text-slate-700">Recommendation → Booking</p>
          <p className="text-3xl font-extrabold text-red-500 mt-1">−23%</p>
          <p className="text-xs text-slate-400 mt-2">Recall agent can recover this. Nudge → clinic booking.</p>
        </div>
        <div className="rounded-2xl border border-teal-100 bg-teal-50 shadow-sm p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recovery Opportunity</p>
          <p className="text-sm font-bold text-slate-700">Recall Agent Activation</p>
          <p className="text-3xl font-extrabold text-teal-600 mt-1">+920</p>
          <p className="text-xs text-slate-400 mt-2">Estimated bookings recoverable with automated recall nudges.</p>
        </div>
      </div>
    </div>
  );
}