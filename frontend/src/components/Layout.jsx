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
                <div className="flex flex-col min-h-screen w-full bg-[#09090b] text-white font-sans selection:bg-cyan-500/30 no-scrollbar">
                        {/* Top Navbar */}
                        <header className="sticky top-0 z-[100] h-16 w-full bg-[#09090b]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8">
                                <div className="flex items-center gap-8">
                                        <h1 className="text-xl font-bold tracking-tight text-white">Finance</h1>
                                        
                                        {/* Desktop Nav */}
                                        <nav className="hidden md:flex items-center space-x-1">
                                                {navItems.map((item) => {
                                                        const Icon = item.icon;
                                                        const isActive = location.pathname.startsWith(item.path);
                                                        return (
                                                                <Link
                                                                        key={item.path}
                                                                        to={item.path}
                                                                        className={cn(
                                                                                'flex items-center px-4 py-2 rounded-xl transition-all duration-200',
                                                                                isActive
                                                                                        ? 'bg-white/10 text-white'
                                                                                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                                                        )}
                                                                >
                                                                        <Icon className={cn(
                                                                                "w-[18px] h-[18px] mr-2 transition-colors duration-200",
                                                                                isActive ? "text-cyan-400" : "text-slate-500"
                                                                        )} />
                                                                        <span className="text-[15px] font-medium">{item.label}</span>
                                                                </Link>
                                                        );
                                                })}
                                        </nav>
                                </div>

                                <div className="flex items-center gap-4">
                                        {/* User Avatar */}
                                        <div className="hidden md:flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-semibold text-slate-300">
                                                        U
                                                </div>
                                        </div>
                                        
                                        {/* Mobile Menu Toggle */}
                                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-400 hover:text-slate-200 transition-colors">
                                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                        </button>
                                </div>
                        </header>

                        {/* Mobile Drawer */}
                        {mobileMenuOpen && (
                                <div className="md:hidden fixed flex flex-col inset-0 z-[110] bg-[#09090b]/95 backdrop-blur-md pt-20 pb-6 px-4">
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
                                                                                                ? 'bg-white/10 text-white shadow-[0_0_12px_rgba(255,255,255,0.03)] border border-white/5'
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

                        {/* Main Content Area */}
                        <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8">
                                <div className="py-6 flex flex-col flex-1 h-full">
                                        <Outlet />
                                </div>
                        </main>
                </div>
        );
}
