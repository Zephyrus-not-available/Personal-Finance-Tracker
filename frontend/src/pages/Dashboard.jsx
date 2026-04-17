import React from 'react';
import { transactions, categories, budgets } from '../mockData';
import { ArrowDownRight, ArrowUpRight, Plus, RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const currentMonth = '2026-04-01'; // Mock current month

  const currentMonthTransactions = transactions.filter(t => t.date.startsWith('2026-04'));
  const totalIncome = currentMonthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = currentMonthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const net = totalIncome - totalExpenses;

  // Recent 10 transactions
  const recentActivity = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 bg-white border rounded-md shadow-sm">
            <option>April 2026</option>
            <option>March 2026</option>
          </select>
          <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 font-medium">Total Income</h3>
            <ArrowUpRight className="text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 font-medium">Total Expenses</h3>
            <ArrowDownRight className="text-red-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 font-medium">Net</h3>
          </div>
          <p className={`mt-2 text-3xl font-bold ${net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${net.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Budget Progress */}
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Budget Progress</h2>
          <div className="space-y-6">
            {budgets.map(budget => {
              const category = categories.find(c => c.id === budget.category_id);
              if (!category) return null;

              const spent = currentMonthTransactions
                .filter(t => t.category_id === category.id && t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);
              const percentage = (spent / budget.amount) * 100;

              let color = 'bg-green-500';
              if (percentage > 90) color = 'bg-red-500';
              else if (percentage > 70) color = 'bg-yellow-500';

              return (
                <div key={budget.id}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium flex items-center">
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </span>
                    <span className="text-gray-500">
                      ${spent.toLocaleString()} / ${budget.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`${color} h-2.5 rounded-full`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {recentActivity.map(t => {
                const category = categories.find(c => c.id === t.category_id);
                return (
                  <li key={t.id} className="py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        {category ? category.icon : (t.type === 'income' ? '💵' : '💸')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 flex items-center">
                          {t.description}
                          {t.auto_generated && <RefreshCw className="w-3 h-3 ml-2 text-gray-400" title="Recurring" />}
                        </p>
                        <p className="text-sm text-gray-500">{t.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                      {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

