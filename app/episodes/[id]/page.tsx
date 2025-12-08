'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Users, Tv } from 'lucide-react'
import { Episode, Character } from '@/types/types'
import { EpisodeApiService, CharacterApiService } from '@/services'
import { CharacterCard } from '@/components/character/character-card'
import { ThemeToggle } from '@/components/layout/theme-toggle'

export default function EpisodeDetail() {
  const params = useParams()
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const episodeId = parseInt(params.id as string)

  const fetchEpisode = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Fetch episode details
      const episodeData = await EpisodeApiService.getEpisode(episodeId)
      setEpisode(episodeData)

      // Fetch characters in this episode
      if (episodeData.characters.length > 0) {
        // Extract character IDs from URLs
        const characterIds = episodeData.characters
          .map(url => {
            const id = url.split('/').pop()
            return id ? parseInt(id) : null
          })
          .filter((id): id is number => id !== null && !isNaN(id))

        if (characterIds.length > 0) {
          const charactersData = await CharacterApiService.getMultipleCharacters(characterIds)
          setCharacters(charactersData)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [episodeId])

  useEffect(() => {
    if (episodeId) {
      fetchEpisode()
    }
  }, [episodeId, fetchEpisode])

  const getSeasonFromEpisode = (episodeCode: string): number => {
    const match = episodeCode.match(/S(\d+)/)
    return match ? parseInt(match[1]) : 1
  }

  const getEpisodeNumber = (episodeCode: string): string => {
    const match = episodeCode.match(/E(\d+)/)
    return match ? match[1] : '1'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center glow-card rounded-lg p-8" style={{ backgroundColor: 'var(--card-bg)' }}>
          <div 
            className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" 
            style={{ borderColor: 'var(--primary)' }}
          />
          <p style={{ color: 'var(--foreground)' }}>Loading episode...</p>
        </div>
      </div>
    )
  }

  if (error || !episode) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center glow-card rounded-lg p-8" style={{ backgroundColor: 'var(--card-bg)' }}>
          <h2 className="text-2xl font-bold mb-4 dark:text-red-400 light:text-red-700">Episode not found</h2>
          <p className="mb-6" style={{ color: 'var(--foreground-muted)' }}>{error || 'The episode you are looking for does not exist.'}</p>
          <Link
            href="/episodes"
            className="inline-block px-6 py-3 text-white rounded-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Back to Episodes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <Link 
            href="/episodes"
            className="flex items-center gap-2 transition-all duration-300 hover:scale-105 dark:hover:text-glow"
            style={{ color: 'var(--foreground-muted)' }}
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Episodes
          </Link>
          <ThemeToggle />
        </div>

        {/* Episode Header */}
        <div className="glow-card rounded-2xl p-8 mb-8" style={{ backgroundColor: 'var(--card-bg)' }}>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span 
                  className="text-sm font-bold px-3 py-1 rounded-full"
                  style={{ 
                    backgroundColor: 'var(--primary)', 
                    color: 'white' 
                  }}
                >
                  S{getSeasonFromEpisode(episode.episode)}E{getEpisodeNumber(episode.episode)}
                </span>
                <span className="text-sm" style={{ color: 'var(--foreground-subtle)' }}>
                  Episode {episode.id}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-glow" style={{ color: 'var(--foreground)' }}>
                {episode.name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                  <div>
                    <p className="text-sm" style={{ color: 'var(--foreground-subtle)' }}>Air Date</p>
                    <p className="font-semibold" style={{ color: 'var(--foreground)' }}>{episode.air_date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                  <div>
                    <p className="text-sm" style={{ color: 'var(--foreground-subtle)' }}>Characters</p>
                    <p className="font-semibold" style={{ color: 'var(--foreground)' }}>{episode.characters.length} total</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Tv className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                  <div>
                    <p className="text-sm" style={{ color: 'var(--foreground-subtle)' }}>Episode Code</p>
                    <p className="font-semibold" style={{ color: 'var(--foreground)' }}>{episode.episode}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                  <div>
                    <p className="text-sm" style={{ color: 'var(--foreground-subtle)' }}>Created</p>
                    <p className="font-semibold" style={{ color: 'var(--foreground)' }}>
                      {new Date(episode.created).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Characters in this Episode */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 dark:text-glow flex items-center gap-3" style={{ color: 'var(--foreground)' }}>
            <Users className="h-8 w-8" style={{ color: 'var(--primary)' }} />
            Characters in this Episode
            <span 
              className="text-lg font-normal px-3 py-1 rounded-full"
              style={{ 
                backgroundColor: 'var(--primary)', 
                color: 'white' 
              }}
            >
              {characters.length}
            </span>
          </h2>

          {characters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="glow-card rounded-lg p-6 max-w-md mx-auto" style={{ backgroundColor: 'var(--card-bg)' }}>
                <p style={{ color: 'var(--foreground-muted)' }}>
                  No character details available for this episode.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Episode Navigation */}
        <div className="flex justify-between items-center gap-4">
          {episodeId > 1 && (
            <Link
              href={`/episodes/${episodeId - 1}`}
              className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                borderColor: 'var(--card-border)',
                color: 'var(--foreground-muted)'
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Episode
            </Link>
          )}
          
          <div className="flex-1"></div>
          
          <Link
            href={`/episodes/${episodeId + 1}`}
            className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: 'var(--card-bg)', 
              borderColor: 'var(--card-border)',
              color: 'var(--foreground-muted)'
            }}
          >
            Next Episode
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  )
}