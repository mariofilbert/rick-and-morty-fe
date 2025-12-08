export function LoadingSkeleton() {
  return (
    <div className="glow-card rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--card-bg)' }}>
      <div className="relative">
        <div 
          className="aspect-square shimmer dark:bg-slate-600/50 light:bg-slate-200"
          style={{ backgroundColor: 'var(--background-secondary)' }}
        />
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="p-4 space-y-3">
        <div className="relative">
          <div 
            className="h-5 rounded w-3/4 dark:bg-slate-600/50 light:bg-slate-300"
            style={{ backgroundColor: 'var(--background-secondary)' }}
          />
          <div className="absolute inset-0 shimmer rounded" />
        </div>
        <div className="relative">
          <div 
            className="h-4 rounded w-1/2 dark:bg-slate-600/50 light:bg-slate-300"
            style={{ backgroundColor: 'var(--background-secondary)' }}
          />
          <div className="absolute inset-0 shimmer rounded" />
        </div>
        <div className="relative">
          <div 
            className="h-3 rounded w-2/3 dark:bg-slate-600/50 light:bg-slate-300"
            style={{ backgroundColor: 'var(--background-secondary)' }}
          />
          <div className="absolute inset-0 shimmer rounded" />
        </div>
      </div>
    </div>
  )
}

export function CharacterGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingSkeleton key={i} />
      ))}
    </div>
  )
}