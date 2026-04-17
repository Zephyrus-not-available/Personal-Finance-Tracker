import { RotateCw } from 'lucide-react';

function TransactionRow({ transaction, getCategoryColor }) {
  const amountClass = transaction.type === 'Income' ? 'text-emerald-400' : 'text-slate-100';
  const amountPrefix = transaction.type === 'Income' ? '+' : '-';

  return (
    <tr className='border-b border-white/5 transition hover:bg-white/5 group/row animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both'>
      <td className='hidden md:table-cell whitespace-nowrap px-4 py-4 text-sm text-slate-500 transition-colors md:px-6 lg:py-5'>{transaction.dateLabel}</td>
      <td className='px-4 py-4 transition-colors md:px-6 lg:py-5'>
        <div className='flex items-center gap-3'>
          <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffffff08] text-sm group-hover/row:bg-white/10 transition-colors'>
            {transaction.icon}
          </span>
          <div className='flex flex-col'>
             <span className='text-sm font-medium text-slate-100 group-hover/row:text-white transition-colors'>{transaction.description}</span>
             <span className='md:hidden text-xs text-slate-500 mt-0.5'>{transaction.dateLabel} • {transaction.category}</span>
          </div>
        </div>
      </td>
      <td className='hidden sm:table-cell px-4 py-4 transition-colors md:px-6 lg:py-5'>
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getCategoryColor(transaction.category)}`}>
          {transaction.category}
        </span>
      </td>
      <td className={`whitespace-nowrap px-4 py-4 text-right text-sm font-semibold tabular-nums transition-colors md:px-6 lg:py-5 ${amountClass}`}>
        <span className='inline-block w-3 text-left'>{amountPrefix}</span>${Math.abs(transaction.amount).toLocaleString()}
      </td>
      <td className='hidden lg:table-cell px-4 py-4 text-right transition-colors md:px-6 lg:py-5'>
        {transaction.isRecurring ? (
          <span className='inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300'>
            <RotateCw className='h-3 w-3' />
            <span className="hidden xl:inline">Recurring</span>
          </span>
        ) : (
          <span className='text-xs text-slate-500'>-</span>
        )}
      </td>
    </tr>
  );
}

export default TransactionRow;
