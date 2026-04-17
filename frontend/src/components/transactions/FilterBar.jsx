import { Search, ChevronDown, Download } from 'lucide-react';

const DATE_RANGES = ['Last 30 Days', 'This Month', 'Custom'];
const TYPE_OPTIONS = ['All', 'Income', 'Expense'];

function FilterBar({
  filters,
  categoryOptions,
  onSearchChange,
  onDateRangeChange,
  onCategoryToggle,
  onTypeChange,
  onExportCsv,
}) {
  return (
    <div className='rounded-2xl border border-white/10 bg-[#0f1115] p-4'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
        <div className='grid flex-1 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4'>
          <label className='relative flex items-center'>
            <Search className='pointer-events-none absolute left-3 h-4 w-4 text-slate-500' />
            <input
              type='text'
              value={filters.search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder='Search transactions'
              className='w-full rounded-xl border border-white/5 bg-[#09090b] py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-white/10 focus:outline-none'
            />
          </label>

          <label className='relative flex items-center'>
            <select
              value={filters.dateRange}
              onChange={(event) => onDateRangeChange(event.target.value)}
              className='w-full appearance-none rounded-xl border border-white/5 bg-[#09090b] px-3 py-2.5 text-sm text-slate-100 focus:border-white/10 focus:outline-none'
            >
              {DATE_RANGES.map((option) => (
                <option key={option} value={option} className='bg-[#0f1115]'>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute right-3 h-4 w-4 text-slate-500' />
          </label>

          <label className='relative flex items-center'>
            <select
              value=''
              onChange={(event) => {
                if (event.target.value) onCategoryToggle(event.target.value);
                event.target.value = '';
              }}
              className='w-full appearance-none rounded-xl border border-white/5 bg-[#09090b] px-3 py-2.5 text-sm text-slate-100 focus:border-white/10 focus:outline-none'
            >
              <option value='' className='bg-[#0f1115]'>
                {filters.categories.length ? `Categories (${filters.categories.length})` : 'Select categories'}
              </option>
              {categoryOptions.map((category) => (
                <option key={category} value={category} className='bg-[#0f1115]'>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute right-3 h-4 w-4 text-slate-500' />
          </label>

          <div className='relative inline-flex rounded-xl border border-white/5 bg-[#09090b] p-1'>
            <span
              className={`pointer-events-none absolute top-1 bottom-1 rounded-lg bg-slate-200/10 transition-all duration-200 ${
                filters.type === 'All' ? 'left-1 w-[calc(33.333%-0.25rem)]' : ''
              } ${filters.type === 'Income' ? 'left-1/3 ml-0.5 w-[calc(33.333%-0.5rem)]' : ''} ${
                filters.type === 'Expense' ? 'left-2/3 ml-0.5 w-[calc(33.333%-0.5rem)]' : ''
              }`}
            />
            {TYPE_OPTIONS.map((type) => {
              const isActive = filters.type === type;
              return (
                <button
                  key={type}
                  type='button'
                  onClick={() => onTypeChange(type)}
                  className={`relative z-10 flex-1 rounded-lg px-3 py-1.5 text-sm transition ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type='button'
          onClick={onExportCsv}
          className='inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5'
        >
          <Download className='h-4 w-4' />
          Download CSV
        </button>
      </div>

      {filters.categories.length > 0 && (
        <div className='mt-3 flex flex-wrap gap-2'>
          {filters.categories.map((category) => (
            <button
              key={category}
              type='button'
              onClick={() => onCategoryToggle(category)}
              className='rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:bg-white/10'
              title='Remove category filter'
            >
              {category} x
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterBar;

