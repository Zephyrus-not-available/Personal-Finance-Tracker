export const categories = [
  { id: '1', name: 'Housing', color: '#10b981', icon: '🏠', archived_at: null },
  { id: '2', name: 'Food', color: '#3b82f6', icon: '🍔', archived_at: null },
  { id: '3', name: 'Transport', color: '#f59e0b', icon: '🚗', archived_at: null },
  { id: '4', name: 'Entertainment', color: '#8b5cf6', icon: '🎉', archived_at: null },
];

export const budgets = [
  { id: '1', category_id: '1', month: '2026-04-01', amount: 1500 },
  { id: '2', category_id: '2', month: '2026-04-01', amount: 500 },
  { id: '3', category_id: '3', month: '2026-04-01', amount: 200 },
  { id: '4', category_id: '4', month: '2026-04-01', amount: 300 },
];

export const transactions = [
  { id: '1', amount: 1500, type: 'expense', category_id: '1', description: 'Rent', date: '2026-04-01', recurring_id: '1', auto_generated: true },
  { id: '2', amount: 150, type: 'expense', category_id: '2', description: 'Groceries', date: '2026-04-03', recurring_id: null, auto_generated: false },
  { id: '3', amount: 40, type: 'expense', category_id: '3', description: 'Gas', date: '2026-04-05', recurring_id: null, auto_generated: false },
  { id: '4', amount: 5000, type: 'income', category_id: null, description: 'Salary', date: '2026-04-01', recurring_id: null, auto_generated: false },
  { id: '5', amount: 120, type: 'expense', category_id: '4', description: 'Concert Tickets', date: '2026-04-10', recurring_id: null, auto_generated: false },
];

export const recurringRules = [
  { id: '1', name: 'Monthly Rent', amount: 1500, type: 'expense', category_id: '1', frequency: 'monthly', start_date: '2026-01-01', end_date: null, day_of_month: 1, active: true },
];

