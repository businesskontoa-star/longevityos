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

export default function Layout({ children }) {
  const location = useLocation();
  const isClinic = location.pathname.startsWith('/clinic');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/50 backdrop-blur-sm fixed h-full z-40">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">L</span>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm tracking-wide">LongevityOS</p>
              <p className="text-muted-foreground text-xs">AI Health Platform</p>
            </div>
          </div>
        </div>

        {!isClinic && (
          <nav className="flex-1 p-4 space-y-1">
            {patientNav.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  location.pathname === path
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </nav>
        )}

        {isClinic && (
          <nav className="flex-1 p-4 space-y-1">
            {[
              { path: '/clinic', label: 'Executive Overview' },
              { path: '/clinic/segments', label: 'Patient Segments' },
              { path: '/clinic/funnel', label: 'Journey Funnel' },
              { path: '/clinic/opportunities', label: 'Opportunity Engine' },
              { path: '/clinic/patient/p-001', label: 'Patient 360' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  location.pathname === path
                    ? "bg-accent/15 text-accent border border-accent/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        <div className="p-4 border-t border-border space-y-2">
          <Link
            to={isClinic ? '/' : '/clinic'}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <BarChart3 size={14} />
            {isClinic ? 'Switch to Patient App' : 'Clinic Dashboard'}
          </Link>
          <div className="px-3 py-2 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-semibold">SM</div>
            <div>
              <p className="text-xs font-medium text-foreground">Sofia Martinez</p>
              <p className="text-xs text-muted-foreground">Patient</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">L</span>
          </div>
          <span className="font-semibold text-sm text-foreground">LongevityOS</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-muted-foreground p-1">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-14">
          <nav className="p-4 space-y-1">
            {patientNav.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  location.pathname === path ? "bg-primary/15 text-primary" : "text-muted-foreground"
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
            <Link
              to="/clinic"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground mt-4 border-t border-border pt-4"
            >
              <BarChart3 size={18} />
              Clinic Dashboard
            </Link>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64 pt-14 md:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}