'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Users, Tv } from 'lucide-react'
import { Episode, ApiResponse } from '@/types/types'
import { EpisodeApiService } from '@/services'
import { PageHeader } from '@/components/layout/page-header'
import { PageTransition } from '@/components/common/page-transition'

export default function Episodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [seasonFilter, setSeasonFilter] = useState('')

  const fetchEpisodes = async (page = 1, name = '', episode = '') => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await EpisodeApiService.getEpisodes({
        page,
        name,
        episode
      })
      setEpisodes(data.results)
      setTotalPages(data.info.pages)
      setCurrentPage(page)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setEpisodes([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEpisodes(1, searchQuery, seasonFilter)
  }, [searchQuery, seasonFilter])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleSeasonFilter = (season: string) => {
    setSeasonFilter(season)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    fetchEpisodes(page, searchQuery, seasonFilter)
  }

  const getSeasonFromEpisode = (episode: string): number => {
    const match = episode.match(/S(\d+)/)
    return match ? parseInt(match[1]) : 1
  }

  const getEpisodeNumber = (episode: string): string => {
    const match = episode.match(/E(\d+)/)
    return match ? match[1] : '1'
  }

  const seasons = [
    { value: '', label: 'All Seasons' },
    { value: 'S01', label: 'Season 1' },
    { value: 'S02', label: 'Season 2' },
    { value: 'S03', label: 'Season 3' },
    { value: 'S04', label: 'Season 4' },
    { value: 'S05', label: 'Season 5' }
  ]

  return (
    <PageTransition>
      <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <PageHeader
            title="Episodes"
            subtitle="Complete Series Guide"
            icon={<Tv className="h-10 w-10" />}
          />
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-8">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search episodes..."
                className="block w-full px-4 py-2.5 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  color: 'var(--foreground)'
                }}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {seasons.map((season) => (
                <button
                  key={season.value}
                  onClick={() => handleSeasonFilter(season.value)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                    ${seasonFilter === season.value
                      ? 'transform scale-105 text-white font-semibold dark:shadow-lg dark:shadow-emerald-500/50 light:shadow-md'
                      : 'transform hover:scale-102 dark:hover:text-glow'
                    }
                  `}
                  style={{
                    backgroundColor: seasonFilter === season.value ? 'var(--primary)' : 'var(--card-bg)',
                    borderColor: seasonFilter === season.value ? 'var(--primary)' : 'var(--card-border)',
                    color: seasonFilter === season.value ? 'white' : 'var(--foreground-muted)'
                  }}
                >
                  {season.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glow-card rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className="animate-pulse space-y-4">
                  <div className="h-6 rounded w-3/4 shimmer" style={{ backgroundColor: 'var(--background-secondary)' }} />
                  <div className="h-4 rounded w-1/2 shimmer" style={{ backgroundColor: 'var(--background-secondary)' }} />
                  <div className="h-4 rounded w-2/3 shimmer" style={{ backgroundColor: 'var(--background-secondary)' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="rounded-lg p-6 max-w-md mx-auto glow-card dark:bg-red-900/20 light:bg-red-50">
              <h3 className="text-xl font-semibold mb-2 dark:text-red-400 light:text-red-700">
                Something went wrong
              </h3>
              <p className="mb-4 dark:text-red-300 light:text-red-600">{error}</p>
              <button
                onClick={() => fetchEpisodes(currentPage, searchQuery, seasonFilter)}
                className="px-4 py-2 text-white rounded-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Episodes Grid */}
        {!loading && !error && episodes.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {episodes.map((episode) => (
                <Link key={episode.id} href={`/episodes/${episode.id}`}>
                  <div className="glow-card rounded-lg p-6 cursor-pointer transform hover:scale-102 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span 
                            className="text-xs font-bold px-2 py-1 rounded-full"
                            style={{ 
                              backgroundColor: 'var(--primary)', 
                              color: 'white' 
                            }}
                          >
                            S{getSeasonFromEpisode(episode.episode)}E{getEpisodeNumber(episode.episode)}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--foreground-subtle)' }}>
                            Episode {episode.id}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 dark:text-glow" style={{ color: 'var(--foreground)' }}>
                          {episode.name}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                        <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                          {episode.air_date}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                        <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                          {episode.characters.length} characters
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--foreground-muted)'
                  }}
                >
                  Previous
                </button>
                
                <span style={{ color: 'var(--foreground)' }}>
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--foreground-muted)'
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && episodes.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto glow-card rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                No episodes found
              </h3>
              <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSeasonFilter('')
                }}
                className="px-4 py-2 text-white rounded-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </PageTransition>
  )
}