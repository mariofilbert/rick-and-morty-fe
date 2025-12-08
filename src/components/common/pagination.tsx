import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  onPrevious: () => void
  onNext: () => void
  onFirst?: () => void
  onLast?: () => void
  loading?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  loading = false
}: PaginationProps) {
  const canGoPrevious = currentPage > 1
  
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* First Page Button */}
      {onFirst && currentPage > 2 && (
        <button
          onClick={onFirst}
          disabled={loading}
          className="
            flex items-center gap-1 px-2 py-2 rounded-lg border text-sm
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:scale-105 transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-emerald-500
          "
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
            color: 'var(--foreground)'
          }}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.borderColor = 'var(--primary)'
              e.currentTarget.style.color = 'var(--primary)'
            }
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.borderColor = 'var(--card-border)'
              e.currentTarget.style.color = 'var(--foreground)'
            }
          }}
          title="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
          <span className="hidden sm:inline">First</span>
        </button>
      )}

      <button
        onClick={onPrevious}
        disabled={!canGoPrevious || loading}
        className="
          flex items-center gap-2 px-4 py-2 rounded-lg border font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:scale-105 transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-emerald-500
        "
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-border)',
          color: 'var(--foreground)'
        }}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.borderColor = 'var(--primary)'
            e.currentTarget.style.color = 'var(--primary)'
          }
        }}
        onMouseLeave={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.borderColor = 'var(--card-border)'
            e.currentTarget.style.color = 'var(--foreground)'
          }
        }}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>
      
      <span className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
        <span className="font-medium" style={{ color: 'var(--foreground)' }}>Page {currentPage}</span>
        <span>of</span>
        <span className="font-medium" style={{ color: 'var(--foreground)' }}>{totalPages}</span>
      </span>
      
      <button
        onClick={onNext}
        disabled={!hasNextPage || loading}
        className="
          flex items-center gap-2 px-4 py-2 rounded-lg border font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:scale-105 transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-emerald-500
        "
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-border)',
          color: 'var(--foreground)'
        }}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.borderColor = 'var(--primary)'
            e.currentTarget.style.color = 'var(--primary)'
          }
        }}
        onMouseLeave={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.borderColor = 'var(--card-border)'
            e.currentTarget.style.color = 'var(--foreground)'
          }
        }}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Last Page Button */}
      {onLast && currentPage < totalPages - 1 && (
        <button
          onClick={onLast}
          disabled={loading}
          className="
            flex items-center gap-1 px-2 py-2 rounded-lg border text-sm
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:scale-105 transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-emerald-500
          "
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
            color: 'var(--foreground)'
          }}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.borderColor = 'var(--primary)'
              e.currentTarget.style.color = 'var(--primary)'
            }
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.borderColor = 'var(--card-border)'
              e.currentTarget.style.color = 'var(--foreground)'
            }
          }}
          title="Last page"
        >
          <span className="hidden sm:inline">Last</span>
          <ChevronsRight className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}