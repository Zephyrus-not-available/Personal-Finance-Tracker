import { useMemo, useState, useEffect } from 'react';
import { Banknote, Coffee, Home, SearchX, ShoppingBag, Wifi, Loader2 } from 'lucide-react';
import FilterBar from './FilterBar';
import TransactionRow from './TransactionRow';

const PAGE_SIZE = 50;

const TRANSACTIONS = [
	{
		id: 1,
		date: '2026-04-17',
		dateLabel: 'Apr 17, 2026',
		description: 'Mercury Payroll',
		category: 'Salary',
		amount: 8400,
		type: 'Income',
		isRecurring: true,
		icon: <Banknote className='h-4 w-4 text-emerald-300' />,
	},
	{
		id: 2,
		date: '2026-04-16',
		dateLabel: 'Apr 16, 2026',
		description: 'Blue Bottle Coffee',
		category: 'Food',
		amount: -18,
		type: 'Expense',
		isRecurring: false,
		icon: <Coffee className='h-4 w-4 text-orange-300' />,
	},
	{
		id: 3,
		date: '2026-04-14',
		dateLabel: 'Apr 14, 2026',
		description: 'Apartment Rent',
		category: 'Housing',
		amount: -2400,
		type: 'Expense',
		isRecurring: true,
		icon: <Home className='h-4 w-4 text-cyan-300' />,
	},
	{
		id: 4,
		date: '2026-04-12',
		dateLabel: 'Apr 12, 2026',
		description: 'Freelance Payout',
		category: 'Business',
		amount: 2250,
		type: 'Income',
		isRecurring: false,
		icon: <Banknote className='h-4 w-4 text-emerald-300' />,
	},
	{
		id: 5,
		date: '2026-04-11',
		dateLabel: 'Apr 11, 2026',
		description: 'Whole Foods',
		category: 'Groceries',
		amount: -163,
		type: 'Expense',
		isRecurring: false,
		icon: <ShoppingBag className='h-4 w-4 text-amber-300' />,
	},
	{
		id: 6,
		date: '2026-04-09',
		dateLabel: 'Apr 09, 2026',
		description: 'Fiber Internet',
		category: 'Utilities',
		amount: -95,
		type: 'Expense',
		isRecurring: true,
		icon: <Wifi className='h-4 w-4 text-indigo-300' />,
	},
];

function getCategoryColor(category) {
	const categoryColorMap = {
		Salary: 'bg-emerald-500/10 text-emerald-300',
		Business: 'bg-teal-500/10 text-teal-300',
		Food: 'bg-orange-500/10 text-orange-300',
		Groceries: 'bg-amber-500/10 text-amber-300',
		Housing: 'bg-cyan-500/10 text-cyan-300',
		Utilities: 'bg-indigo-500/10 text-indigo-300',
	};

	return categoryColorMap[category] || 'bg-slate-500/10 text-slate-300';
}

function csvFromTransactions(records) {
	const header = ['date', 'description', 'category', 'type', 'amount', 'isRecurring'];
	const rows = records.map((record) => [
		record.date,
		record.description,
		record.category,
		record.type,
		record.amount,
		record.isRecurring,
	]);
	return [header, ...rows]
		.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
		.join('\n');
}

function TransactionsPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [filters, setFilters] = useState({
		search: '',
		dateRange: 'Last 30 Days',
		categories: [],
		type: 'All',
	});
	const [page, setPage] = useState(1);

	const categoryOptions = useMemo(() => {
		const set = new Set(TRANSACTIONS.map((item) => item.category));
		return [...set];
	}, []);

	const filteredTransactions = useMemo(() => {
		const now = new Date('2026-04-17T00:00:00Z');
		const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

		return TRANSACTIONS.filter((transaction) => {
			const query = filters.search.trim().toLowerCase();
			const matchesSearch =
				!query ||
				transaction.description.toLowerCase().includes(query) ||
				transaction.category.toLowerCase().includes(query);

			const matchesCategory =
				filters.categories.length === 0 || filters.categories.includes(transaction.category);

			const matchesType = filters.type === 'All' || transaction.type === filters.type;

			const txDate = new Date(`${transaction.date}T00:00:00Z`);
			let matchesDate = true;
			if (filters.dateRange === 'Last 30 Days') {
				const thirtyDaysAgo = new Date(now);
				thirtyDaysAgo.setUTCDate(now.getUTCDate() - 30);
				matchesDate = txDate >= thirtyDaysAgo && txDate <= now;
			}
			if (filters.dateRange === 'This Month') {
				matchesDate = txDate >= startOfMonth && txDate <= now;
			}

			return matchesSearch && matchesCategory && matchesType && matchesDate;
		});
	}, [filters]);

	const totalResults = filteredTransactions.length;
	const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const pageStart = (currentPage - 1) * PAGE_SIZE;
	const paginatedTransactions = filteredTransactions.slice(pageStart, pageStart + PAGE_SIZE);
	const showingFrom = totalResults === 0 ? 0 : pageStart + 1;
	const showingTo = Math.min(pageStart + PAGE_SIZE, totalResults);

	useEffect(() => {
		// Simulate network loading state
		setIsLoading(true);
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 800);
		return () => clearTimeout(timer);
	}, [filters, page]); // Re-trigger load on filter or page changes

	function updateFilter(partial) {
		setPage(1);
		setFilters((prev) => ({ ...prev, ...partial }));
	}

	function toggleCategory(category) {
		setPage(1);
		setFilters((prev) => {
			const exists = prev.categories.includes(category);
			const categories = exists
				? prev.categories.filter((value) => value !== category)
				: [...prev.categories, category];
			return { ...prev, categories };
		});
	}

	function clearFilters() {
		setPage(1);
		setFilters({ search: '', dateRange: 'Last 30 Days', categories: [], type: 'All' });
	}

	function exportCsv() {
		const csv = csvFromTransactions(filteredTransactions);
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `transactions-${new Date().toISOString().slice(0, 10)}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}

	return (
		<section className='flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700'>
			<div className='sticky top-16 z-[90] bg-[#09090b] pt-2 pb-6 border-b border-transparent transition-all duration-300'>
				<div className='mb-6 max-sm:mb-4'>
					<h1 className='text-2xl font-semibold text-white animate-in slide-in-from-left-2 fade-in duration-500'>Transactions</h1>
					<p className='text-sm text-slate-400 animate-in slide-in-from-left-2 fade-in delay-75 duration-500'>Enterprise ledger view with filters, status tags, and export.</p>
				</div>

				<div className='animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150'>
					<FilterBar
						filters={filters}
						categoryOptions={categoryOptions}
						onSearchChange={(search) => updateFilter({ search })}
						onDateRangeChange={(dateRange) => updateFilter({ dateRange })}
						onCategoryToggle={toggleCategory}
						onTypeChange={(type) => updateFilter({ type })}
						onExportCsv={exportCsv}
					/>
				</div>
			</div>

			<div className='overflow-hidden rounded-2xl border border-white/10 bg-[#0f1115] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative mt-2 group animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200'>
				<div className='overflow-x-auto no-scrollbar'>
					<table className='w-full border-collapse'>
						<thead className='bg-[#0f1115]/80 backdrop-blur-md border-b border-white/10 transition-colors'>
							<tr className='text-left text-sm uppercase tracking-wide text-slate-400 group-hover:text-slate-300'>
								<th className='hidden md:table-cell px-4 py-3 font-medium transition-all duration-300 md:px-6 lg:py-5 hover:text-white cursor-default'>Date</th>
								<th className='px-4 py-3 font-medium transition-all duration-300 md:px-6 lg:py-5 hover:text-white cursor-default'>Entity / Description</th>
								<th className='hidden sm:table-cell px-4 py-3 font-medium transition-all duration-300 md:px-6 lg:py-5 hover:text-white cursor-default'>Category</th>
								<th className='px-4 py-3 text-right font-medium transition-all duration-300 md:px-6 lg:py-5 hover:text-white cursor-default'>Amount</th>
								<th className='hidden lg:table-cell px-4 py-3 text-right font-medium transition-all duration-300 md:px-6 lg:py-5 hover:text-white cursor-default'>Status</th>
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								<tr>
									<td colSpan='5' className='px-6 py-14 text-center'>
										<div className='flex flex-col items-center justify-center gap-3'>
											<Loader2 className='h-8 w-8 text-cyan-500 animate-spin' />
											<h3 className='text-sm font-medium text-slate-300'>Loading transactions...</h3>
										</div>
									</td>
								</tr>
							) : (
								paginatedTransactions.map((transaction) => (
									<TransactionRow
										key={transaction.id}
										transaction={transaction}
										getCategoryColor={getCategoryColor}
									/>
								))
							)}
						</tbody>
					</table>

					{!isLoading && totalResults === 0 && (
						<div className='flex flex-col items-center justify-center gap-3 px-6 py-14 text-center'>
							<span className='rounded-full border border-white/10 bg-white/5 p-3'>
								<SearchX className='h-6 w-6 text-slate-400' />
							</span>
							<h3 className='text-base font-medium text-white'>No transactions found</h3>
							<p className='max-w-sm text-sm text-slate-400'>
								We couldn&apos;t match any records with your current filters.
							</p>
							<button
								type='button'
								onClick={clearFilters}
								className='rounded-xl border border-white/15 px-3 py-2 text-sm text-slate-100 hover:bg-white/5'
							>
								Clear Filters
							</button>
						</div>
					)}
				</div>

				<div className='flex items-center justify-between border-t border-white/10 px-4 py-3 text-sm'>
					<p className='text-slate-400'>
						Showing {showingFrom}-{showingTo} of {totalResults} results
					</p>
					<div className='flex items-center gap-2'>
						<button
							type='button'
							disabled={currentPage <= 1}
							onClick={() => setPage((prev) => Math.max(1, prev - 1))}
							className='rounded-lg border border-white/10 px-3 py-1.5 text-slate-200 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/5'
						>
							Previous
						</button>
						<button
							type='button'
							disabled={currentPage >= totalPages || totalResults === 0}
							onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
							className='rounded-lg border border-white/10 px-3 py-1.5 text-slate-200 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/5'
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default TransactionsPage;

