import React from 'react';
import { Plus, ChevronDown } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 gap-4 sm:gap-0 border-b border-white/5 bg-[#0f1117]/50 backdrop-blur-md">
      <h1 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-white">Dashboard</h1>
      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none">
          <select className="w-full appearance-none pl-4 pr-10 py-2.5 bg-[#161b22]/80 text-sm font-medium text-slate-200 border border-white/10 rounded-xl shadow-none focus:outline-none focus:ring-2 focus:ring-cyan-500/30 cursor-pointer hover:border-white/20 transition-colors">
            <option>April 2026</option>
            <option>March 2026</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        <button className="flex items-center justify-center flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-xl shadow-[0_0_15px_rgba(8,145,178,0.2)] hover:shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:from-cyan-500 hover:to-cyan-400 transition-all border border-cyan-400/20">
          <Plus className="w-[18px] h-[18px] sm:mr-1.5" />
          <span className="hidden sm:inline">New Entry</span>
        </button>
      </div>
    </div>
  );
}
