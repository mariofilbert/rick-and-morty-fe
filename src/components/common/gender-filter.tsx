interface GenderFilterProps {
  activeFilter: string
  onFilterChange: (gender: string) => void
}

const GENDER_FILTERS: Array<{ value: string; label: string }> = [
  { value: '', label: 'All Genders' },
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' }
]

export function GenderFilter({ activeFilter, onFilterChange }: GenderFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {GENDER_FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`
            px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border
            ${activeFilter === filter.value
              ? `
                transform scale-105 text-white font-semibold
                dark:shadow-lg dark:shadow-purple-500/50 dark:text-glow
                light:shadow-md light:shadow-purple-600/30
                hover:scale-110
              `
              : `
                transform hover:scale-102
                dark:hover:shadow-lg dark:hover:shadow-purple-500/25 dark:hover:text-glow
                light:hover:shadow-md light:hover:shadow-slate-200
                dark:border-slate-600 light:border-slate-300
                dark:text-slate-300 light:text-slate-600
                dark:hover:border-purple-400 light:hover:border-purple-500
                dark:hover:text-purple-300 light:hover:text-purple-700
              `
            }
          `}
          style={{
            backgroundColor: activeFilter === filter.value ? '#8B5CF6' : 'var(--card-bg)',
            borderColor: activeFilter === filter.value ? '#8B5CF6' : 'var(--card-border)'
          }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}