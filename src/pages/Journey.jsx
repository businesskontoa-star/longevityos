import { mockPatient } from '@/lib/mockData';
import { CheckCircle2, Clock, Calendar, FlaskConical, Star, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const milestoneConfig = {
  completed: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', label: 'Completed' },
  upcoming: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', label: 'Upcoming' },
  planned: { icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', label: 'Planned' },
};

export default function Journey() {
  const p = mockPatient;
  const today = new Date();
  const daysSinceVisit = Math.floor((today - new Date(p.lastVisit)) / 86400000);
  const daysToNext = Math.max(0, Math.ceil((new Date(p.nextMilestoneDate) - today) / 86400000));

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">My Journey</h1>
        <p className="text-slate-400 text-sm mt-1">Your continuity of care — every visit, every milestone.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm p-5 text-center">
          <p className="text-4xl font-extrabold text-[#0F172A]">{daysSinceVisit}</p>
          <p className="text-xs text-slate-400 mt-1 font-medium">days since last visit</p>
          {daysSinceVisit > 200 && (
            <div className="mt-2 flex items-center justify-center gap-1 text-amber-500 text-xs font-semibold">
              <AlertCircle size={12} /> Follow-up overdue
            </div>
          )}
        </div>
        <div className="rounded-xl border border-teal-100 bg-teal-50 shadow-sm p-5 text-center">
          <p className="text-4xl font-extrabold text-teal-600">{daysToNext}</p>
          <p className="text-xs text-teal-500 mt-1 font-medium">days to next milestone</p>
          <p className="text-xs text-teal-400 mt-1">{p.nextMilestone}</p>
        </div>
      </div>

      {daysSinceVisit > 200 && (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-slate-700">It's been {daysSinceVisit} days since your last visit</p>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Your HbA1c and LDL require regular monitoring in a diabetic patient. Your care team at Centrum Health recommends scheduling your HbA1c recheck and LDL management review.
              </p>
              <button className="mt-3 px-4 py-2 rounded-lg bg-amber-400 text-white text-sm font-bold hover:bg-amber-500 transition-all">
                Book follow-up at Centrum Health
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Care Timeline</h2>
        <div className="relative">
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-slate-100" />
          <div className="space-y-5">
            {p.journeyMilestones.map((m, i) => {
              const config = milestoneConfig[m.status];
              const Icon = config.icon;
              return (
                <div key={i} className="flex gap-4">
                  <div className={cn("w-9 h-9 rounded-full border flex items-center justify-center shrink-0 z-10 bg-white", config.bg, config.border)}>
                    <Icon size={15} className={config.color} />
                  </div>
                  <div className={cn("flex-1 rounded-xl border p-4 bg-white shadow-sm transition-all", config.border,
                    m.status === 'completed' && 'opacity-70')}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{m.event}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{m.date}</p>
                      </div>
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full shrink-0", config.bg, config.color)}>
                        {config.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}