'use client'

import { useState, useRef, useEffect } from 'react'

interface FilterOption {
  value: string
  label: string
}

interface DropdownFilterProps {
  label: string
  activeFilter: string
  options: FilterOption[]
  onFilterChange: (value: string) => void
  colorTheme?: 'green' | 'blue' | 'purple'
}

export function DropdownFilter({ 
  label, 
  activeFilter, 
  options, 
  onFilterChange,
  colorTheme = 'green'
}: DropdownFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getActiveLabel = () => {
    const activeOption = options.find(option => option.value === activeFilter)
    return activeOption ? activeOption.label : options[0].label
  }

  const getThemeColors = () => {
    switch (colorTheme) {
      case 'blue':
        return {
          primary: '#3B82F6',
          shadow: 'blue-500/50',
          hover: 'blue-500/25',
          border: 'blue-400',
          text: 'blue-300'
        }
      case 'purple':
        return {
          primary: '#8B5CF6',
          shadow: 'purple-500/50',
          hover: 'purple-500/25',
          border: 'purple-400',
          text: 'purple-300'
        }
      default: // green
        return {
          primary: 'var(--primary)',
          shadow: 'emerald-500/50',
          hover: 'emerald-500/25',
          border: 'emerald-400',
          text: 'emerald-300'
        }
    }
  }

  const colors = getThemeColors()

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          min-w-[120px] px-3 py-2 rounded-lg border transition-all duration-300
          flex items-center justify-between gap-2
          ${isOpen 
            ? 'transform scale-105 shadow-lg' 
            : 'hover:scale-102 hover:shadow-md'
          }
        `}
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: activeFilter ? colors.primary : 'var(--card-border)',
          color: activeFilter ? colors.primary : 'var(--foreground)'
        }}
      >
        <span className="text-xs font-medium truncate">
          {getActiveLabel()}
        </span>
        <svg 
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 w-full min-w-[180px] rounded-lg border shadow-xl z-50 max-h-48 overflow-y-auto"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onFilterChange(option.value)
                setIsOpen(false)
              }}
              className={`
                w-full px-3 py-2 text-left text-xs transition-all duration-200
                flex items-center justify-between hover:scale-[1.02]
                ${activeFilter === option.value
                  ? 'font-semibold'
                  : 'font-normal'
                }
              `}
              style={{
                backgroundColor: activeFilter === option.value ? `${colors.primary}20` : 'transparent',
                color: activeFilter === option.value ? colors.primary : 'var(--foreground)'
              }}
            >
              <span>{option.label}</span>
              {activeFilter === option.value && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}