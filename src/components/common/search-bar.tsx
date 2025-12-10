import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounceMs?: number
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search characters...",
  debounceMs = 300 
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue)
    }, debounceMs)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, debounceMs])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const clearSearch = () => {
    setInputValue('')
    onChange('')
  }

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-slate-400" />
      </div>
      
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="
          block w-full pl-9 pr-9 py-2
          rounded-lg border
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
          transition-all duration-300 text-sm
          dark:bg-slate-700 dark:border-slate-500 dark:text-white dark:placeholder-slate-400
          dark:focus:ring-emerald-400 dark:focus:ring-opacity-50 dark:focus:shadow-lg dark:focus:shadow-emerald-500/25
          light:bg-white light:border-slate-300 light:text-slate-900 light:placeholder-slate-500
          light:focus:ring-emerald-600 light:shadow-sm light:focus:shadow-md
        "
        style={{ 
          backgroundColor: 'var(--card-bg)', 
          borderColor: 'var(--card-border)',
          color: 'var(--foreground)'
        }}
      />
      
      {inputValue && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}