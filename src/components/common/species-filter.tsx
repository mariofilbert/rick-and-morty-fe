interface SpeciesFilterProps {
  activeFilter: string
  onFilterChange: (species: string) => void
}

const SPECIES_FILTERS: Array<{ value: string; label: string }> = [
  { value: '', label: 'All Species' },
  { value: 'Human', label: 'Human' },
  { value: 'Alien', label: 'Alien' },
  { value: 'Humanoid', label: 'Humanoid' },
  { value: 'Robot', label: 'Robot' },
  { value: 'Animal', label: 'Animal' },
  { value: 'Cronenberg', label: 'Cronenberg' },
  { value: 'Disease', label: 'Disease' }
]

export function SpeciesFilter({ activeFilter, onFilterChange }: SpeciesFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {SPECIES_FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`
            px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border
            ${activeFilter === filter.value
              ? `
                transform scale-105 text-white font-semibold
                dark:shadow-lg dark:shadow-blue-500/50 dark:text-glow
                light:shadow-md light:shadow-blue-600/30
                hover:scale-110
              `
              : `
                transform hover:scale-102
                dark:hover:shadow-lg dark:hover:shadow-blue-500/25 dark:hover:text-glow
                light:hover:shadow-md light:hover:shadow-slate-200
                dark:border-slate-600 light:border-slate-300
                dark:text-slate-300 light:text-slate-600
                dark:hover:border-blue-400 light:hover:border-blue-500
                dark:hover:text-blue-300 light:hover:text-blue-700
              `
            }
          `}
          style={{
            backgroundColor: activeFilter === filter.value ? 'var(--secondary)' : 'var(--card-bg)',
            borderColor: activeFilter === filter.value ? 'var(--secondary)' : 'var(--card-border)'
          }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}