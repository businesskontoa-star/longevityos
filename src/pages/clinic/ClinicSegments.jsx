import { clinicMetrics } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

export default function ClinicSegments() {
  const segments = clinicMetrics.segments;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">Patient Segments</h1>
        <p className="text-slate-400 text-sm mt-1">AI-identified opportunity clusters from 1,000-patient real cohort.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {segments.map((seg, i) => (
          <div key={i} className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="w-3 h-3 rounded-full mb-2" style={{ background: seg.color }} />
                <h3 className="text-sm font-bold text-[#0F172A]">{seg.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{seg.count.toLocaleString()} patients</p>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{seg.description}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-extrabold text-[#0F172A]">{seg.opportunity}</p>
                <p className="text-xs text-slate-400">revenue opportunity</p>
                <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-bold ${seg.priority === 'critical' ? 'bg-red-50 text-red-600' : seg.priority === 'high' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                  {seg.priority}
                </span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden mt-3">
              <div className="h-full rounded-full transition-all" style={{ width: `${(seg.count / 500) * 100}%`, background: seg.color, opacity: 0.7 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
        <p className="text-sm font-bold text-[#0F172A] mb-4">Population Distribution by Segment</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={segments}>
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => v.split(' ')[0]} />
            <YAxis hide />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 12 }} formatter={v => [v.toLocaleString(), 'Patients']} />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {segments.map((seg, i) => <Cell key={i} fill={seg.color} fillOpacity={0.8} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}