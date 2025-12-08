import { Character } from '@/types/types'

interface FilterButtonsProps {
  activeFilter: string
  onFilterChange: (status: string) => void
}

const FILTERS: Array<{ value: string; label: string; count?: number }> = [
  { value: '', label: 'All' },
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
]

export function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
            ${activeFilter === filter.value
              ? `
                transform scale-105 text-white font-semibold
                dark:shadow-lg dark:shadow-emerald-500/50 dark:text-glow
                light:shadow-md light:shadow-emerald-600/30
                hover:scale-110
              `
              : `
                transform hover:scale-102
                dark:hover:shadow-lg dark:hover:shadow-emerald-500/25 dark:hover:text-glow
                light:hover:shadow-md light:hover:shadow-slate-200
                dark:border-slate-600 light:border-slate-300
                dark:text-slate-300 light:text-slate-600
                dark:hover:border-emerald-400 light:hover:border-emerald-500
                dark:hover:text-emerald-300 light:hover:text-emerald-700
              `
            }
          `}
          style={{
            backgroundColor: activeFilter === filter.value ? 'var(--primary)' : 'var(--card-bg)',
            borderColor: activeFilter === filter.value ? 'var(--primary)' : 'var(--card-border)'
          }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}