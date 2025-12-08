export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-slate-700 rounded-lg overflow-hidden">
        <div className="aspect-square bg-slate-600" />
        <div className="p-4 space-y-2">
          <div className="h-5 bg-slate-600 rounded w-3/4" />
          <div className="h-4 bg-slate-600 rounded w-1/2" />
          <div className="h-3 bg-slate-600 rounded w-2/3" />
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