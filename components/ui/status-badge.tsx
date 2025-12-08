import { Character } from '@/lib/types'

interface StatusBadgeProps {
  status: Character['status']
  className?: string
}

const STATUS_STYLES = {
  'Alive': {
    dark: 'bg-green-500 text-white shadow-lg shadow-green-500/50 border border-green-400/50',
    light: 'bg-green-500 text-white shadow-md shadow-green-500/30 border border-green-600'
  },
  'Dead': {
    dark: 'bg-red-500 text-white shadow-lg shadow-red-500/50 border border-red-400/50',
    light: 'bg-red-500 text-white shadow-md shadow-red-500/30 border border-red-600'
  },
  'unknown': {
    dark: 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/50 border border-yellow-400/50',
    light: 'bg-yellow-500 text-slate-900 shadow-md shadow-yellow-500/30 border border-yellow-600'
  }
} as const

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const darkStyles = STATUS_STYLES[status].dark
  const lightStyles = STATUS_STYLES[status].light

  return (
    <span 
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
        transition-all duration-300 backdrop-blur-sm
        dark:${darkStyles}
        light:${lightStyles}
        ${className}
      `}
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
      }}
    >
      {status}
    </span>
  )
}