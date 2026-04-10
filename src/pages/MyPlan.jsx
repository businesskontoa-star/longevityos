import { mockPatient } from '@/lib/mockData';
import { Calendar, FlaskConical, Pill, Activity, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeConfig = {
  program: { icon: Activity, bg: 'bg-teal-50', color: 'text-teal-600', label: 'Programme' },
  supplement: { icon: Pill, bg: 'bg-amber-50', color: 'text-amber-600', label: 'Supplement' },
  diagnostic: { icon: FlaskConical, bg: 'bg-purple-50', color: 'text-purple-600', label: 'Diagnostic' },
  lab: { icon: FlaskConical, bg: 'bg-blue-50', color: 'text-blue-600', label: 'Lab' },
};

const priorityBadge = {
  high: 'bg-red-50 text-red-600',
  medium: 'bg-amber-50 text-amber-600',
  low: 'bg-slate-100 text-slate-500',
};

const statusBadge = {
  recommended: 'bg-teal-50 text-teal-600',
  due: 'bg-red-50 text-red-600',
  scheduled: 'bg-emerald-50 text-emerald-600',
};

export default function MyPlan() {
  const p = mockPatient;
  const plan = p.plan.active;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">My Plan</h1>
        <p className="text-slate-400 text-sm mt-1">Personalised next steps — ranked by longevity impact.</p>
      </div>

      {/* Hero action */}
      <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
            <Activity size={22} className="text-teal-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold">High Priority</span>
              <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 text-xs font-semibold">Clinic Recommended</span>
            </div>
            <h2 className="text-base font-bold text-[#0F172A]">{plan[0].title}</h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Clinically validated for Type 2 Diabetes management. A structured 30-minute post-meal walking programme, supported by your care team at Centrum Health. Shown to reduce HbA1c by 0.3–0.5% within 12 weeks.
            </p>
            <p className="text-sm font-bold text-teal-600 mt-3">📈 {p.nextBestAction.estimatedImpact}</p>
          </div>
        </div>
        <button className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F172A] text-white text-sm font-bold hover:bg-slate-800 transition-all">
          <Calendar size={14} />
          Schedule consultation at Centrum Health
        </button>
      </div>

      {/* All items */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">All Recommended Actions</h2>
        <div className="space-y-2">
          {plan.map(item => {
            const type = typeConfig[item.type] || typeConfig.program;
            const TypeIcon = type.icon;
            return (
              <div key={item.id} className="rounded-xl border border-slate-100 bg-white shadow-sm p-4 flex items-center gap-4 hover:border-teal-200 hover:shadow-md transition-all cursor-pointer group">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", type.bg)}>
                  <TypeIcon size={16} className={type.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", priorityBadge[item.priority])}>{item.priority} priority</span>
                    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", statusBadge[item.status])}>{item.status}</span>
                    {item.clinic && <span className="text-xs text-slate-400 font-medium">· Clinic</span>}
                  </div>
                </div>
                <ChevronRight size={15} className="text-slate-300 group-hover:text-teal-500 transition-colors shrink-0" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
        <h3 className="text-sm font-bold text-[#0F172A] mb-2">Why this plan matters</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          These aren't just clinical recommendations — they're investments in your future biological age. Completing the top 3 actions in this plan over the next 6 months is projected to move your longevity score from <strong className="text-[#0F172A]">54 to 68+</strong> and close your biological age gap by 3–5 years.
        </p>
        <p className="text-xs text-slate-400 mt-3 italic">Generated by VitaCore AI. Always consult your care team before starting new programmes or supplements.</p>
      </div>
    </div>
  );
}