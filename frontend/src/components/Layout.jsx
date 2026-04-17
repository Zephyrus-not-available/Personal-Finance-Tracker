import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, Tags, PiggyBank, CalendarClock, PieChart, Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#09090b] text-slate-50 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Mobile Header & Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-4">
        <h1 className="text-xl font-bold tracking-tight text-slate-50">Finance</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-400 hover:text-slate-200 transition-colors">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed flex flex-col inset-0 z-40 bg-[#09090b]/95 backdrop-blur-md pt-20 pb-6 px-4">
          <ul className="flex flex-col space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-xl transition-all duration-200',
                      isActive
                        ? 'bg-white/10 text-slate-50 shadow-[0_0_12px_rgba(255,255,255,0.03)] border border-white/5'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    )}
                  >
                    <Icon className={cn(
                      "w-[20px] h-[20px] transition-colors duration-200",
                      isActive ? "text-cyan-400" : "text-slate-500"
                    )} />
                    <span className="ms-4 text-base font-medium">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto px-4 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-semibold text-slate-300">
                U
              </div>
              <div className="text-base font-medium text-slate-300">User Setup</div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#020617]/50 backdrop-blur-xl border-r border-white/5 sticky top-0 h-screen z-10 flex-col py-8 px-4">
        <div className="px-2 mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-slate-50">Finance</h1>
        </div>
        <ul className="space-y-1.5 font-medium flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center px-3 py-2.5 rounded-xl group transition-all duration-200',
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
          <div className="flex items-center gap-3 relative z-20">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-sm font-semibold text-slate-300">
              U
            </div>
            <div className="text-sm font-medium text-slate-300">User Setup</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col pt-16 lg:pt-0 min-h-screen overflow-x-hidden relative">
        <div className="flex-1 px-4 sm:px-8 py-8 w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
