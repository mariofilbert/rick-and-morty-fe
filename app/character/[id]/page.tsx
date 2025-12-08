'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react'
import { useCharacterStore } from '@/store/character-store'
import { StatusBadge } from '@/components/character/status-badge'
import { FavoriteButton } from '@/components/common/favorite-button'
import { PageTransition } from '@/components/common/page-transition'

export default function CharacterDetail() {
  const params = useParams()
  const router = useRouter()
  const { currentCharacter, loading, error, fetchCharacter } = useCharacterStore()
  const [showAllEpisodes, setShowAllEpisodes] = useState(false)
  
  const characterId = parseInt(params.id as string)

  useEffect(() => {
    if (characterId) {
      fetchCharacter(characterId)
    }
    // Scroll to top when navigating to character detail
    window.scrollTo(0, 0)
  }, [characterId, fetchCharacter])

  const handleBack = () => {
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center glow-card rounded-lg p-8" style={{ backgroundColor: 'var(--card-bg)' }}>
          <div 
            className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4 dark:border-emerald-500 dark:shadow-lg dark:shadow-emerald-500/50 light:border-emerald-600" 
            style={{ borderColor: 'var(--primary)' }}
          />
          <p className="dark:text-glow" style={{ color: 'var(--foreground)' }}>Loading character...</p>
        </div>
      </div>
    )
  }

  if (error || !currentCharacter) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center glow-card rounded-lg p-8" style={{ backgroundColor: 'var(--card-bg)' }}>
          <h2 className="text-2xl font-bold mb-4 dark:text-red-400 dark:text-glow light:text-red-700">Character not found</h2>
          <p className="mb-6" style={{ color: 'var(--foreground-muted)' }}>{error || 'The character you are looking for does not exist.'}</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 text-white rounded-lg transition-all duration-300 hover:scale-105 dark:shadow-lg dark:shadow-emerald-500/50 light:shadow-md"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Back to Characters
          </button>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 mb-6 hover:scale-105 glow-card"
          style={{ 
            backgroundColor: 'var(--card-bg)', 
            color: 'var(--foreground)',
            border: '1px solid var(--border-color)'
          }}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Characters
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Character Image */}
          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden glow-card">
              <Image
                src={currentCharacter.image}
                alt={currentCharacter.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
              <div className="absolute top-4 right-4">
                <FavoriteButton characterId={currentCharacter.id} />
              </div>
            </div>
          </div>

          {/* Character Info */}
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col">
                  <h1 className="text-3xl md:text-4xl font-bold dark:text-glow mb-2" style={{ color: 'var(--foreground)' }}>
                    {currentCharacter.name}
                  </h1>
                  <p className="text-lg font-medium dark:text-glow" style={{ color: 'var(--primary)' }}>
                    {currentCharacter.species}
                  </p>
                </div>
                <div className="flex items-center">
                  <StatusBadge status={currentCharacter.status} className="!text-base px-5 py-2 font-semibold" />
                </div>
              </div>
              {currentCharacter.type && (
                <p className="text-base" style={{ color: 'var(--foreground-muted)' }}>
                  {currentCharacter.type}
                </p>
              )}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gender */}
              <div className="rounded-lg p-5 glow-card min-h-[80px] flex flex-col justify-between" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--foreground-subtle)' }}>
                  Gender
                </h3>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>{currentCharacter.gender}</p>
              </div>

              {/* Created */}
              <div className="rounded-lg p-5 glow-card min-h-[80px] flex flex-col justify-between" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 flex items-center gap-2" style={{ color: 'var(--foreground-subtle)' }}>
                  <Calendar className="h-4 w-4" />
                  Created
                </h3>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>
                  {new Date(currentCharacter.created).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Origin */}
              <div className="rounded-lg p-5 glow-card min-h-[80px] flex flex-col justify-between" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 flex items-center gap-2" style={{ color: 'var(--foreground-subtle)' }}>
                  <MapPin className="h-4 w-4" />
                  Origin
                </h3>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>{currentCharacter.origin.name}</p>
              </div>

              {/* Location */}
              <div className="rounded-lg p-5 glow-card min-h-[80px] flex flex-col justify-between" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 flex items-center gap-2" style={{ color: 'var(--foreground-subtle)' }}>
                  <MapPin className="h-4 w-4" />
                  Last Location
                </h3>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>{currentCharacter.location.name}</p>
              </div>
            </div>

            {/* Episodes */}
            <div className="rounded-lg p-5 glow-card mt-8" style={{ backgroundColor: 'var(--card-bg)' }}>
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 flex items-center gap-2" style={{ color: 'var(--foreground-subtle)' }}>
                <Users className="h-4 w-4" />
                Episodes
                <span 
                  className="text-white text-xs px-2 py-1 rounded-full dark:shadow-lg dark:shadow-emerald-500/50 light:shadow-md" 
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  {currentCharacter.episode.length}
                </span>
              </h3>
              
              <div className={showAllEpisodes ? "max-h-40 overflow-y-auto pr-2" : ""}>
                <div className="grid grid-cols-4 gap-2">
                  {(showAllEpisodes 
                    ? currentCharacter.episode 
                    : currentCharacter.episode.slice(0, 8)
                  ).map((episodeUrl) => {
                    const episodeNumber = episodeUrl.split('/').pop()
                    return (
                      <Link
                        key={episodeUrl}
                        href={`/episodes/${episodeNumber}`}
                        className="rounded px-3 py-2 text-center text-xs font-medium transition-all duration-300 hover:scale-105 glow-card cursor-pointer block"
                        style={{ backgroundColor: 'var(--background-secondary)', color: 'var(--foreground)' }}
                      >
                        EP {episodeNumber}
                      </Link>
                    )
                  })}
                  
                  {/* Show More / Show Less Button */}
                  {currentCharacter.episode.length > 8 && (
                    <button
                      onClick={() => setShowAllEpisodes(!showAllEpisodes)}
                      className="rounded px-3 py-2 text-center text-xs font-medium transition-all duration-300 cursor-pointer"
                      style={{ 
                        backgroundColor: 'var(--background-secondary)', 
                        color: 'var(--primary)',
                        border: `1px dashed ${showAllEpisodes ? 'var(--primary)' : 'var(--foreground-subtle)'}`
                      }}
                    >
                      {showAllEpisodes 
                        ? 'Show less' 
                        : `+${currentCharacter.episode.length - 8} more`
                      }
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </PageTransition>
  )
}