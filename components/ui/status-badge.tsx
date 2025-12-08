import { Character } from '@/lib/types'

interface StatusBadgeProps {
  status: Character['status']
  className?: string
}

const STATUS_STYLES = {
  'Alive': 'bg-green-500 text-white',
  'Dead': 'bg-red-500 text-white',
  'unknown': 'bg-yellow-500 text-black'
} as const

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span 
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${STATUS_STYLES[status]}
        ${className}
      `}
    >
      {status}
    </span>
  )
}