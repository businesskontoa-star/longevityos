import { clinicMetrics } from '@/lib/mockData';
import { TrendingUp } from 'lucide-react';

export default function ClinicOpportunities() {
  const ops = clinicMetrics.opportunities;
  const total = ops.reduce((s, o) => s + parseInt(o.revenueEst.replace('€', '').replace('K', '000')), 0);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">Opportunity Engine</h1>
        <p className="text-slate-400 text-sm mt-1">AI-identified preventive revenue opportunities, ranked by estimated yield.</p>
      </div>

      <div className="space-y-4">
        {ops.map((op, i) => {
          const maxPt = Math.max(...ops.map(o => o.potentialPatients));
          return (
            <div key={i} className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-extrabold text-slate-300">#{i + 1}</span>
                    <h3 className="text-base font-bold text-[#0F172A]">{op.category}</h3>
                  </div>
                  <p className="text-sm text-slate-400">{op.potentialPatients.toLocaleString()} eligible · {op.conversionEst} est. conversions ({((op.conversionEst / op.potentialPatients) * 100).toFixed(0)}%)</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-extrabold text-teal-600">{op.revenueEst}</p>
                  <p className="text-xs text-slate-400">potential revenue</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-teal-400 transition-all" style={{ width: `${(op.potentialPatients / maxPt) * 100}%`, opacity: 0.7 }} />
              </div>
              <div className="flex items-center justify-end mt-2">
                <div className="flex items-center gap-1 text-xs font-semibold text-teal-600">
                  <TrendingUp size={11} />High opportunity
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-teal-100 bg-teal-50 shadow-sm p-6">
        <p className="text-sm font-bold text-[#0F172A] mb-1">Total Addressable Preventive Revenue</p>
        <p className="text-4xl font-extrabold text-teal-600">€{(total / 1000).toFixed(0)}K+</p>
        <p className="text-xs text-slate-400 mt-2">Estimated annual preventive revenue across all AI-identified opportunity segments in this 1,000-patient cohort.</p>
      </div>
    </div>
  );
}