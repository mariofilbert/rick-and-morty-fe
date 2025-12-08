'use client'

import { useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { CharacterCard } from '@/components/ui/character-card'
import { SearchBar } from '@/components/ui/search-bar'
import { FilterButtons } from '@/components/ui/filter-buttons'
import { Pagination } from '@/components/ui/pagination'
import { CharacterGridSkeleton } from '@/components/ui/loading-skeleton'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function Home() {
  const characters = useAppStore((state) => state.characters)
  const loading = useAppStore((state) => state.loading)
  const error = useAppStore((state) => state.error)
  const searchQuery = useAppStore((state) => state.searchQuery)
  const statusFilter = useAppStore((state) => state.statusFilter)
  const currentPage = useAppStore((state) => state.currentPage)
  const totalPages = useAppStore((state) => state.totalPages)
  const hasNextPage = useAppStore((state) => state.hasNextPage)
  const fetchCharacters = useAppStore((state) => state.fetchCharacters)
  const searchCharacters = useAppStore((state) => state.searchCharacters)
  const filterByStatus = useAppStore((state) => state.filterByStatus)
  const nextPage = useAppStore((state) => state.nextPage)
  const prevPage = useAppStore((state) => state.prevPage)
  const resetFilters = useAppStore((state) => state.resetFilters)

  useEffect(() => {
    fetchCharacters()
  }, [])

  const handleSearch = useCallback((query: string) => {
    searchCharacters(query)
  }, [searchCharacters])

  const handleFilter = useCallback((status: string) => {
    filterByStatus(status)
  }, [filterByStatus])

  return (
    <div className="min-h-screen transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold transition-colors duration-300" style={{ color: 'var(--foreground)' }}>
                Rick & Morty
                <span className="block text-2xl md:text-3xl font-light text-primary dark:text-glow" style={{ color: 'var(--primary)' }}>
                  Character Explorer
                </span>
              </h1>
              <div className="flex gap-4 mt-4">
                <Link 
                  href="/episodes"
                  className="px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 dark:hover:text-glow"
                  style={{
                    borderColor: 'var(--card-border)',
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--foreground-muted)'
                  }}
                >
                  Browse Episodes
                </Link>
              </div>
            </div>
            <ThemeToggle />
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-8">
            <SearchBar
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search characters..."
            />
            <FilterButtons
              activeFilter={statusFilter}
              onFilterChange={handleFilter}
            />
            {(searchQuery || statusFilter) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm rounded-lg border transition-all duration-300 hover:scale-105 dark:hover:text-glow light:hover:shadow-md"
                style={{
                  color: 'var(--foreground-muted)',
                  borderColor: 'var(--card-border)',
                  backgroundColor: 'var(--card-bg)'
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        </header>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="rounded-lg p-6 max-w-md mx-auto glow-card dark:bg-red-900/20 dark:border-red-500/50 light:bg-red-50 light:border-red-200">
              <h3 className="text-xl font-semibold mb-2 dark:text-red-400 dark:text-glow light:text-red-700">
                Oops! Something went wrong
              </h3>
              <p className="mb-4 dark:text-red-300 light:text-red-600">{error}</p>
              <button
                onClick={fetchCharacters}
                className="px-4 py-2 text-white rounded-lg transition-all duration-300 hover:scale-105 dark:bg-red-600 dark:hover:bg-red-500 dark:shadow-lg dark:shadow-red-500/50 light:bg-red-600 light:hover:bg-red-500 light:shadow-md"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-8">
            <CharacterGridSkeleton />
          </div>
        )}

        {/* Characters Grid */}
        {!loading && !error && characters.length > 0 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              onPrevious={prevPage}
              onNext={nextPage}
              loading={loading}
            />
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && characters.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto glow-card rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
              <h3 className="text-xl font-semibold mb-2 dark:text-glow" style={{ color: 'var(--foreground)' }}>
                No characters found
              </h3>
              <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-white rounded-lg transition-all duration-300 hover:scale-105 dark:shadow-lg dark:shadow-emerald-500/50 light:shadow-md"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Reset filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
