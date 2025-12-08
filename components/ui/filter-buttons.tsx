import { Character } from '@/lib/types'

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
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${activeFilter === filter.value
              ? 'bg-emerald-500 text-white shadow-lg transform scale-105'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}