import { Character } from '@/types/types'

interface StatusBadgeProps {
  status: Character['status']
  className?: string
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Alive':
        return 'bg-green-500 text-white border-green-400/50 shadow-green-500/50'
      case 'Dead':
        return 'bg-red-500 text-white border-red-400/50 shadow-red-500/50'
      case 'unknown':
        return 'bg-yellow-500 text-black border-yellow-400/50 shadow-yellow-500/50 dark:bg-orange-500 dark:text-white dark:border-orange-400/50 dark:shadow-orange-500/50'
      default:
        return 'bg-gray-500 text-white border-gray-400/50 shadow-gray-500/50'
    }
  }

  return (
    <span 
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
        transition-all duration-300 backdrop-blur-sm border
        dark:shadow-lg light:shadow-md
        ${getStatusStyles()}
        ${className}
      `}
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
      }}
    >
{status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}