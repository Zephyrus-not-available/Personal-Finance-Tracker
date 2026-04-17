import React from 'react';
import { transactions, categories, budgets } from '../../mockData.js';
import { ArrowDownRight, ArrowUpRight, Plus, RefreshCw, ChevronDown, Activity, AlignCenter } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils.js';

export default function Dashboard() {
  const currentMonth = '2026-04-01'; // Mock current month

  const currentMonthTransactions = transactions.filter(t => t.date.startsWith('2026-04'));
  const totalIncome = currentMonthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = currentMonthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const net = totalIncome - totalExpenses;

  // Recent 10 transactions
  const recentActivity = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  // Modern Data Sparkline with Glow
  const Sparkline = ({ colorId }) => (
    <svg className="w-16 h-8 opacity-90 overflow-visible" viewBox="0 0 50 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${colorId}-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor={colorId === 'emerald' ? '#34d399' : colorId === 'rose' ? '#fb7185' : '#e2e8f0'} />
          <stop offset="100%" stopColor={colorId === 'emerald' ? '#10b981' : colorId === 'rose' ? '#f43f5e' : '#94a3b8'} />
        </linearGradient>
        <filter id={`${colorId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path
        d="M0 12C5 12 10 7 15 7C20 7 25 10 30 10C35 10 40 4 45 4C48 4 49 2 50 2"
        stroke={`url(#${colorId}-gradient)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${colorId}-glow)`}
      />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6 sm:space-y-8 relative w-full"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full sm:w-3/4 h-64 bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#09090b]/90 backdrop-blur-xl pb-4 pt-2 sm:pt-0 border-b border-white/5 sticky top-0 z-20 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-slate-50">Dashboard</h1>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <select className="w-full appearance-none pl-4 pr-10 py-2.5 bg-[#121215] text-sm font-medium text-slate-300 border border-white/10 rounded-xl shadow-none focus:outline-none focus:ring-2 focus:ring-cyan-500/30 cursor-pointer hover:border-white/20 transition-colors">
              <option>April 2026</option>
              <option>March 2026</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>
          <button className="flex items-center justify-center flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-xl shadow-[0_0_15px_rgba(8,145,178,0.3)] hover:shadow-[0_0_20px_rgba(8,145,178,0.5)] hover:from-cyan-500 hover:to-cyan-400 transition-all border border-cyan-400/20">
            <Plus className="w-[18px] h-[18px] sm:mr-1.5" />
            <span className="hidden sm:inline">New Entry</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
        {[
          { label: 'Total Income', amount: totalIncome, trend: 'up', icon: ArrowUpRight, colorId: 'emerald', text: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' },
          { label: 'Total Expenses', amount: totalExpenses, trend: 'down', icon: ArrowDownRight, colorId: 'rose', text: 'text-rose-400', bg: 'bg-rose-500/10', glow: 'drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]' },
          { label: 'Net Flow', amount: net, trend: net >= 0 ? 'up' : 'down', icon: Activity, colorId: 'cyan', text: net >= 0 ? 'text-cyan-400' : 'text-rose-400', bg: 'bg-white/5', glow: net >= 0 ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]' : 'drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]' }
        ].map((card, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            key={card.label}
            className="group relative p-6 bg-[#121215]/80 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10 hover:bg-[#121215]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-start justify-between mb-4 relative z-10">
              <h3 className="text-sm font-medium text-slate-400">{card.label}</h3>
              <div className={cn("px-2 py-1.5 rounded-lg flex items-center space-x-1 border border-white/5", card.bg)}>
                <card.icon className={cn("w-3.5 h-3.5", card.text, card.glow)} />
                <span className={cn("text-xs font-semibold", card.text)}>
                   {card.trend === 'up' ? '+14%' : '-2%'}
                </span>
              </div>
            </div>

            <div className="flex items-end justify-between relative z-10">
              <div className="flex flex-col">
                <span className={cn("text-[32px] font-semibold tracking-tighter leading-none text-slate-50", card.glow)}>
                  ${Math.abs(card.amount).toLocaleString(undefined, { minimumFractionDigits: 0 })}
                </span>
                <span className="text-xs text-slate-500 mt-2 font-medium tracking-wider uppercase">LAST 30 DAYS</span>
              </div>
              <Sparkline colorId={card.colorId} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Budget Progress (Premium Touch) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="p-7 bg-[#121215]/80 backdrop-blur-md rounded-[24px] border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h2 className="text-lg font-semibold tracking-tight text-slate-100">Active Budgets</h2>
            <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all">View All</button>
          </div>

          <div className="space-y-6 relative z-10">
            {budgets.map(budget => {
              const category = categories.find(c => c.id === budget.category_id);
              if (!category) return null;

              const spent = currentMonthTransactions
                .filter(t => t.category_id === category.id && t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);
              const percentage = (spent / budget.amount) * 100;
              const remaining = Math.max(0, budget.amount - spent);

              // Premium Obsidian gradients
              let colorClass = 'from-emerald-400 to-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.5)]';
              let textClass = 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]';
              if (percentage > 90) {
                colorClass = 'from-rose-500 to-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.5)]';
                textClass = 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]';
              } else if (percentage > 70) {
                colorClass = 'from-amber-400 to-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.5)]';
                textClass = 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]';
              }

              return (
                <div key={budget.id} className="group">
                  <div className="flex justify-between items-end mb-2.5">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-9 h-9 rounded-[10px] bg-white/5 border border-white/10 text-xl shadow-inner shadow-white/5 group-hover:bg-white/10 transition-colors">
                        {category.icon}
                      </span>
                      <div>
                        <p className="font-medium text-slate-200 text-[15px] group-hover:text-white transition-colors">{category.name}</p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">
                           ${spent.toLocaleString()} spent
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-xs font-bold leading-tight", textClass)}>
                        {percentage.toFixed(0)}%
                      </p>
                      <p className="text-[13px] font-medium text-slate-500 mt-0.5 tracking-tight">
                        <span className="text-slate-300 font-semibold">${remaining.toLocaleString()}</span> left
                      </p>
                    </div>
                  </div>

                  {/* Thin Track with modern glow inner-bar */}
                  <div className="relative w-full bg-slate-800/50 rounded-full h-[6px] overflow-hidden border border-white/5">
                    <div
                      className={cn("absolute top-0 left-0 h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out", colorClass)}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Clean Row-based Recent Activity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="p-7 bg-[#121215]/80 backdrop-blur-md rounded-[24px] border border-white/5 flex flex-col relative overflow-hidden"
        >
           <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[60px] pointer-events-none" />
           <div className="flex items-center justify-between mb-6 relative z-10">
            <h2 className="text-lg font-semibold tracking-tight text-slate-100">Recent Activity</h2>
            <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">See all</button>
          </div>

          <div className="flex-1 overflow-visible relative z-10">
            <ul className="-mx-2 space-y-1">
              {recentActivity.map(t => {
                const category = categories.find(c => c.id === t.category_id);
                // Creating a pseudo-random soft background coloring per category string logic
                const bgColor = t.type === 'income'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-white/5 text-slate-300 border border-white/5';

                return (
                  <li key={t.id} className="p-2.5 rounded-xl group hover:bg-white/[0.03] transition-colors duration-200 flex justify-between items-center cursor-default">
                    <div className="flex items-center space-x-3.5">
                      <div className={cn("w-10 h-10 flex items-center justify-center rounded-[12px] text-[18px]", bgColor)}>
                        {category ? category.icon : (t.type === 'income' ? '💵' : '💸')}
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-slate-200 flex items-center group-hover:text-white transition-colors">
                          {t.description}
                          {t.auto_generated && (
                            <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold bg-white/10 text-cyan-400 border border-white/5">
                              Auto
                            </span>
                          )}
                        </p>
                        <p className="text-[13px] font-medium text-slate-500 mt-0.5">{t.date}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "font-semibold text-sm tracking-tight",
                      t.type === 'income' ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'text-slate-300'
                    )}>
                      {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
