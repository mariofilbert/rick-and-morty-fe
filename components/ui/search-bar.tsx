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
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="
          block w-full pl-10 pr-10 py-2.5 
          bg-slate-700 dark:bg-slate-700 light:bg-white 
          border border-slate-600 dark:border-slate-600 light:border-slate-300
          rounded-lg text-white dark:text-white light:text-slate-800 
          placeholder-slate-400 dark:placeholder-slate-400 light:placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
          transition-all duration-200
        "
      />
      
      {inputValue && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}