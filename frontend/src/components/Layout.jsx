import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, Tags, PiggyBank, CalendarClock, PieChart } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: Receipt },
  { path: '/categories', label: 'Categories', icon: Tags },
  { path: '/budgets', label: 'Budgets', icon: PiggyBank },
  { path: '/recurring', label: 'Recurring', icon: CalendarClock },
  { path: '/reports', label: 'Reports', icon: PieChart },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#09090b] text-slate-50 font-sans selection:bg-cyan-500/30">
      <aside className="w-60 bg-[#020617]/50 backdrop-blur-xl border-r border-white/5 sticky top-0 h-screen z-10">
        <div className="flex flex-col h-full px-4 py-8">
          <div className="px-2 mb-8">
            <h1 className="text-xl font-bold tracking-tight text-slate-50">Finance</h1>
          </div>
          <ul className="space-y-1 font-medium flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center px-3 py-2 rounded-xl group transition-all duration-200',
                      isActive
                        ? 'bg-white/10 text-slate-50 shadow-[0_0_12px_rgba(255,255,255,0.03)] backdrop-blur-md border border-white/5'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    )}
                  >
                    <Icon className={cn(
                      "w-[18px] h-[18px] transition-colors duration-200",
                      isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
                    )} />
                    <span className="ms-3 text-[15px]">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto px-2 pt-8 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-sm font-semibold text-slate-300">
                U
              </div>
              <div className="text-sm font-medium text-slate-300">User Setup</div>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 px-10 py-10 overflow-y-auto max-w-[1400px]">
        <Outlet />
      </main>
    </div>
  );
}

