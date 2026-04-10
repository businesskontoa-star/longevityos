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
            <div className="w-9 h-9 rounded-xl bg-teal flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white" opacity="0.2"/>
                <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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
          <div className="w-7 h-7 rounded-lg bg-teal flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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