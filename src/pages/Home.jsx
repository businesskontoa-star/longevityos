import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockPatient } from '@/lib/mockData';
import { runTranslationAgent, runPreventionAgent, runRecallAgent } from '@/lib/agents';
import LongevityScoreCard from '@/components/LongevityScoreCard';
import InsightCard from '@/components/InsightCard';
import { ArrowRight, MessageCircle, Moon, Heart, Activity, Zap } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export default function Home() {
  const p = mockPatient;
  const [insight, setInsight] = useState(null);
  const [prevention, setPrevention] = useState(null);
  const [recall, setRecall] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([runTranslationAgent(p), runPreventionAgent(p), runRecallAgent(p)])
      .then(([t, prev, rec]) => { setInsight(t); setPrevention(prev); setRecall(rec); setLoading(false); });
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const radarData = p.longevityDimensions.map(d => ({ subject: d.name.split(' ')[0], score: d.score }));

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{greeting}</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mt-1">{p.firstName}</h1>
          <p className="text-sm text-slate-400 mt-1">{new Date().toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <Link to="/coach"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F172A] text-white text-sm font-semibold hover:bg-[#1e293b] transition-all shadow-sm">
          <MessageCircle size={14} />
          Ask Coach
        </Link>
      </div>

      {/* Hero grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Score card */}
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-center">
          <LongevityScoreCard score={p.longevityScore} biologicalAge={p.biologicalAge} chronologicalAge={p.age} />
        </div>

        {/* Insight + recall */}
        <div className="space-y-3">
          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Insight</p>
            </div>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-slate-100 rounded animate-pulse" />
                <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4" />
              </div>
            ) : <InsightCard insight={insight} />}
          </div>

          {recall && (
            <div className={`rounded-2xl border p-4 flex items-start gap-3 ${recall.needsReactivation ? 'bg-amber-50 border-amber-100' : 'bg-teal-50 border-teal-100'}`}>
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${recall.needsReactivation ? 'bg-amber-400' : 'bg-teal-400'}`} />
              <p className="text-sm text-slate-600 leading-snug">{recall.message}</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Avg Sleep", value: `${p.wearable.avgSleep}h`, icon: Moon, warn: p.wearable.avgSleep < 7 },
          { label: "Resting HR", value: `${p.wearable.avgRestingHR}`, unit: "bpm", icon: Heart, warn: p.wearable.avgRestingHR > 80 },
          { label: "Daily Steps", value: p.wearable.avgSteps.toLocaleString(), icon: Activity, warn: p.wearable.avgSteps < 7500 },
          { label: "Recovery", value: `${p.wearable.recoveryScore}`, unit: "/100", icon: Zap, warn: p.wearable.recoveryScore < 50 },
        ].map(({ label, value, unit, icon: Icon, warn }) => (
          <div key={label} className="rounded-xl border border-slate-100 bg-white shadow-sm p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Icon size={13} className={warn ? 'text-amber-500' : 'text-teal-500'} />
              <p className="text-xs font-medium text-slate-400">{label}</p>
            </div>
            <p className="text-xl font-extrabold text-[#0F172A]">{value}<span className="text-xs text-slate-400 font-medium ml-1">{unit}</span></p>
            {warn && <p className="text-[10px] text-amber-500 mt-1 font-medium">Below target</p>}
          </div>
        ))}
      </div>

      {/* Radar + Next Action */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
          <p className="text-sm font-bold text-[#0F172A] mb-4">Longevity Dimensions</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Radar dataKey="score" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-5 flex flex-col justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">Primary Next Step</p>
            {prevention ? (
              <>
                <h3 className="text-base font-bold text-[#0F172A]">{prevention.primaryAction.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{prevention.primaryAction.description}</p>
                <p className="mt-3 text-sm font-semibold text-teal-600">📈 {prevention.primaryAction.estimatedImpact}</p>
              </>
            ) : (
              <div className="space-y-2 mt-2">
                <div className="h-4 bg-slate-100 rounded animate-pulse" />
                <div className="h-4 bg-slate-100 rounded animate-pulse w-2/3" />
              </div>
            )}
          </div>
          <Link to="/my-plan"
            className="mt-5 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F172A] text-white text-sm font-bold hover:bg-[#1e293b] transition-all">
            {prevention?.primaryAction.cta || 'View My Plan'}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { to: '/my-health', label: 'My Health Data', desc: 'Labs, wearables, history', color: '#14B8A6' },
          { to: '/my-future', label: 'My Future', desc: 'Biological age & trajectory', color: '#1D4ED8' },
          { to: '/journey', label: 'My Journey', desc: 'Milestones & continuity', color: '#F59E0B' },
        ].map(({ to, label, desc, color }) => (
          <Link key={to} to={to}
            className="rounded-xl border border-slate-100 bg-white shadow-sm p-4 hover:border-teal-200 hover:shadow-md transition-all group">
            <div className="w-2.5 h-2.5 rounded-full mb-2" style={{ background: color }} />
            <p className="text-sm font-bold text-[#0F172A] group-hover:text-teal-600 transition-colors">{label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}