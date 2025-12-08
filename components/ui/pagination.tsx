import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  onPrevious: () => void
  onNext: () => void
  loading?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  onPrevious,
  onNext,
  loading = false
}: PaginationProps) {
  const canGoPrevious = currentPage > 1
  
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious || loading}
        className="
          flex items-center gap-2 px-4 py-2 rounded-lg
          bg-slate-700 text-white font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-slate-600 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-emerald-500
        "
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>
      
      <span className="flex items-center gap-2 text-slate-300">
        <span className="text-white font-medium">Page {currentPage}</span>
        <span>of</span>
        <span className="text-white font-medium">{totalPages}</span>
      </span>
      
      <button
        onClick={onNext}
        disabled={!hasNextPage || loading}
        className="
          flex items-center gap-2 px-4 py-2 rounded-lg
          bg-slate-700 text-white font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-slate-600 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-emerald-500
        "
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}