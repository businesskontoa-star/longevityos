import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockPatient } from '@/lib/mockData';
import { runTranslationAgent, runPreventionAgent, runRecallAgent } from '@/lib/agents';
import LongevityScoreCard from '@/components/LongevityScoreCard';
import InsightCard from '@/components/InsightCard';
import { ArrowRight, Mic, Activity, TrendingUp, Zap, Moon, Heart } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

export default function Home() {
  const p = mockPatient;
  const [insight, setInsight] = useState(null);
  const [prevention, setPrevention] = useState(null);
  const [recall, setRecall] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      runTranslationAgent(p),
      runPreventionAgent(p),
      runRecallAgent(p),
    ]).then(([t, prev, rec]) => {
      setInsight(t);
      setPrevention(prev);
      setRecall(rec);
      setLoading(false);
    });
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const radarData = p.longevityDimensions.map(d => ({ subject: d.name.split(' ')[0], score: d.score }));

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{greeting}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-1" style={{ fontFamily: 'var(--font-serif)' }}>
            {p.name.split(' ')[0]}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <Link to="/coach"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-all">
          <Mic size={14} />
          Ask Coach
        </Link>
      </div>

      {/* Hero grid — score + today insight */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card/80 flex items-center justify-center">
          <LongevityScoreCard
            score={p.longevityScore}
            biologicalAge={p.biologicalAge}
            chronologicalAge={p.age}
          />
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Today's Insight</p>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-secondary rounded animate-pulse" />
                <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
              </div>
            ) : (
              <InsightCard insight={insight} onExpand={() => {}} />
            )}
          </div>

          {recall && (
            <div className="rounded-2xl border border-border bg-card/80 p-4 flex items-center gap-3">
              <div className={cn("w-2 h-2 rounded-full shrink-0", recall.needsReactivation ? "bg-amber-400" : "bg-emerald-400")} />
              <p className="text-sm text-muted-foreground leading-snug">{recall.message}</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Avg Sleep", value: `${p.wearable.avgSleep}h`, icon: Moon, status: p.wearable.avgSleep < 7 ? 'warn' : 'ok' },
          { label: "Resting HR", value: `${p.vitals.restingHeartRate}`, unit: "bpm", icon: Heart, status: 'ok' },
          { label: "Daily Steps", value: p.wearable.avgSteps.toLocaleString(), icon: Activity, status: p.wearable.avgSteps < 7500 ? 'warn' : 'ok' },
          { label: "Recovery", value: `${p.wearable.recoveryScore}`, unit: "/100", icon: Zap, status: p.wearable.recoveryScore < 50 ? 'warn' : 'ok' },
        ].map(({ label, value, unit, icon: Icon, status }) => (
          <div key={label} className="rounded-xl border border-border bg-card/80 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={14} className={status === 'warn' ? 'text-amber-400' : 'text-primary'} />
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
            <p className="text-xl font-bold text-foreground">{value}<span className="text-xs text-muted-foreground ml-1">{unit}</span></p>
          </div>
        ))}
      </div>

      {/* Radar + Next Best Action */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card/80 p-5">
          <p className="text-sm font-semibold text-foreground mb-4">Longevity Dimensions</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(222 30% 20%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(215 20% 50%)', fontSize: 11 }} />
              <Radar dataKey="score" stroke="hsl(175 70% 42%)" fill="hsl(175 70% 42%)" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Primary Next Step</p>
            {prevention ? (
              <>
                <h3 className="text-base font-semibold text-foreground">{prevention.primaryAction.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{prevention.primaryAction.description}</p>
                <div className="mt-3 px-3 py-1.5 rounded-full bg-primary/10 inline-flex">
                  <p className="text-xs font-medium text-primary">📈 {prevention.primaryAction.estimatedImpact}</p>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <div className="h-4 bg-secondary rounded animate-pulse" />
                <div className="h-4 bg-secondary rounded animate-pulse w-2/3" />
              </div>
            )}
          </div>
          <Link to="/my-plan"
            className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all">
            {prevention?.primaryAction.cta || 'View My Plan'}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Quick nav cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { to: '/my-health', label: 'My Health Data', desc: 'Labs, wearables, history', color: '#22d3b0' },
          { to: '/my-future', label: 'My Future', desc: 'Biological age & trajectory', color: '#f59e0b' },
          { to: '/journey', label: 'My Journey', desc: 'Milestones & continuity', color: '#a78bfa' },
        ].map(({ to, label, desc, color }) => (
          <Link key={to} to={to}
            className="rounded-xl border border-border bg-card/80 p-4 hover:border-primary/30 transition-all group">
            <div className="w-2 h-2 rounded-full mb-2" style={{ background: color }} />
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}