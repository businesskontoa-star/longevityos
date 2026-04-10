import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, TrendingUp, Map, MessageCircle, Clock, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const patientNav = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/my-health', icon: Activity, label: 'My Health' },
  { path: '/my-future', icon: TrendingUp, label: 'My Future' },
  { path: '/my-plan', icon: Map, label: 'My Plan' },
  { path: '/coach', icon: MessageCircle, label: 'Coach' },
  { path: '/journey', icon: Clock, label: 'Journey' },
];

const clinicNav = [
  { path: '/clinic', label: 'Executive Overview' },
  { path: '/clinic/segments', label: 'Patient Segments' },
  { path: '/clinic/funnel', label: 'Journey Funnel' },
  { path: '/clinic/opportunities', label: 'Opportunity Engine' },
  { path: '/clinic/patient/PT0001', label: 'Patient 360' },
];

export default function Layout({ children }) {
  const location = useLocation();
  const isClinic = location.pathname.startsWith('/clinic');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed h-full z-40 bg-[#0F172A] text-white">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-[#0d9488] flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(20,184,166,0.45)]">
              <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                {/* Heart with pulse */}
                <path d="M16 26s-9-5.5-9-12a6 6 0 0 1 9-5.2A6 6 0 0 1 25 14c0 6.5-9 12-9 12z" fill="white" opacity="0.15"/>
                <path d="M16 26s-9-5.5-9-12a6 6 0 0 1 9-5.2A6 6 0 0 1 25 14c0 6.5-9 12-9 12z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <polyline points="8,16 11,16 13,12 16,20 19,14 21,16 24,16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div>
              <p className="font-extrabold text-white text-base tracking-tight">VitaCore</p>
              <p className="text-white/40 text-xs">From data to action.</p>
            </div>
          </div>
        </div>

        {/* Nav section label */}
        <div className="px-4 pt-5 pb-2">
          <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-2">
            {isClinic ? 'Clinic Dashboard' : 'Patient App'}
          </p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {(isClinic ? clinicNav : patientNav.map(n => ({ ...n }))).map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                location.pathname === path
                  ? "bg-teal/20 text-teal border border-teal/30"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              )}
            >
              {Icon && <Icon size={15} className="shrink-0" />}
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            to={isClinic ? '/' : '/clinic'}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-white/40 hover:text-white hover:bg-white/8 transition-all"
          >
            <BarChart3 size={13} />
            {isClinic ? 'Switch to Patient App' : 'Clinic Dashboard'}
          </Link>
          <div className="px-3 py-2 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-teal/20 flex items-center justify-center text-teal text-xs font-bold shrink-0">JD</div>
            <div>
              <p className="text-xs font-semibold text-white">Jean-Michel Dupont</p>
              <p className="text-[10px] text-white/40">PT0001 · France</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0F172A] border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-[#0d9488] flex items-center justify-center shadow-[0_0_10px_rgba(20,184,166,0.4)]">
            <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
              <path d="M16 26s-9-5.5-9-12a6 6 0 0 1 9-5.2A6 6 0 0 1 25 14c0 6.5-9 12-9 12z" fill="white" opacity="0.15"/>
              <path d="M16 26s-9-5.5-9-12a6 6 0 0 1 9-5.2A6 6 0 0 1 25 14c0 6.5-9 12-9 12z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <polyline points="8,16 11,16 13,12 16,20 19,14 21,16 24,16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <span className="font-extrabold text-white text-sm">VitaCore</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/60 p-1">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#0F172A] pt-14">
          <nav className="p-4 space-y-1">
            {patientNav.map(({ path, icon: Icon, label }) => (
              <Link key={path} to={path} onClick={() => setMobileOpen(false)}
                className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                  location.pathname === path ? "bg-teal/20 text-teal" : "text-white/60")}>
                <Icon size={16} />{label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 md:ml-64 pt-14 md:pt-0 min-h-screen bg-[#F8FAFC]">
        {children}
      </main>
    </div>
  );
}