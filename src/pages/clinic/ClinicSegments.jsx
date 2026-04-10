import { clinicMetrics } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

export default function ClinicSegments() {
  const segments = clinicMetrics.segments;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>Patient Segments</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-identified opportunity clusters across your patient population.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {segments.map((seg, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card/80 p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="w-3 h-3 rounded-full mb-2" style={{ background: seg.color }} />
                <h3 className="text-sm font-semibold text-foreground">{seg.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{seg.count.toLocaleString()} patients</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">{seg.opportunity}</p>
                <p className="text-xs text-muted-foreground">revenue opportunity</p>
                <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  seg.priority === 'critical' ? 'bg-red-400/10 text-red-400' :
                  seg.priority === 'high' ? 'bg-amber-400/10 text-amber-400' :
                  'bg-blue-400/10 text-blue-400'
                }`}>{seg.priority}</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(seg.count / 4000) * 100}%`, background: seg.color, opacity: 0.8 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <p className="text-sm font-semibold text-foreground mb-4">Patient Count by Segment</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={segments} margin={{ left: 0 }}>
            <XAxis dataKey="name" tick={{ fill: 'hsl(215 20% 50%)', fontSize: 10 }} axisLine={false} tickLine={false}
              tickFormatter={v => v.split('/')[0].trim()} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: 'hsl(222 40% 10%)', border: '1px solid hsl(222 30% 16%)', borderRadius: 8, fontSize: 12 }}
              formatter={(v) => [v.toLocaleString(), 'Patients']}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {segments.map((seg, i) => <Cell key={i} fill={seg.color} fillOpacity={0.8} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}