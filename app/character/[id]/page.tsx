'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { StatusBadge } from '@/components/ui/status-badge'
import { FavoriteButton } from '@/components/ui/favorite-button'

export default function CharacterDetail() {
  const params = useParams()
  const router = useRouter()
  const { currentCharacter, loading, error, fetchCharacter } = useAppStore()
  
  const characterId = parseInt(params.id as string)

  useEffect(() => {
    if (characterId) {
      fetchCharacter(characterId)
    }
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
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 transition-all duration-300 mb-8 hover:scale-105 dark:hover:text-glow"
          style={{ color: 'var(--foreground-muted)' }}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Characters
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Character Image */}
          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden glow-card">
              <Image
                src={currentCharacter.image}
                alt={currentCharacter.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
              <div className="absolute top-4 right-4 flex gap-2">
                <FavoriteButton characterId={currentCharacter.id} />
                <StatusBadge status={currentCharacter.status} className="text-sm px-3 py-1" />
              </div>
            </div>
          </div>

          {/* Character Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 dark:text-glow" style={{ color: 'var(--foreground)' }}>
                {currentCharacter.name}
              </h1>
              <p className="text-xl font-medium dark:text-glow" style={{ color: 'var(--primary)' }}>
                {currentCharacter.species}
              </p>
              {currentCharacter.type && (
                <p className="text-lg" style={{ color: 'var(--foreground-muted)' }}>
                  {currentCharacter.type}
                </p>
              )}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gender */}
              <div className="rounded-lg p-4 glow-card" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--foreground-subtle)' }}>
                  Gender
                </h3>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>{currentCharacter.gender}</p>
              </div>

              {/* Status */}
              <div className="rounded-lg p-4 glow-card" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--foreground-subtle)' }}>
                  Status
                </h3>
                <StatusBadge status={currentCharacter.status} />
              </div>

              {/* Origin */}
              <div className="rounded-lg p-4 glow-card" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-1 flex items-center gap-2" style={{ color: 'var(--foreground-subtle)' }}>
                  <MapPin className="h-4 w-4" />
                  Origin
                </h3>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>{currentCharacter.origin.name}</p>
              </div>

              {/* Location */}
              <div className="rounded-lg p-4 glow-card" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-1 flex items-center gap-2" style={{ color: 'var(--foreground-subtle)' }}>
                  <MapPin className="h-4 w-4" />
                  Last Location
                </h3>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>{currentCharacter.location.name}</p>
              </div>
            </div>

            {/* Episodes */}
            <div className="rounded-lg p-6 glow-card" style={{ backgroundColor: 'var(--card-bg)' }}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-glow" style={{ color: 'var(--foreground)' }}>
                <Users className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                Episodes
                <span 
                  className="text-white text-sm px-2 py-1 rounded-full dark:shadow-lg dark:shadow-emerald-500/50 light:shadow-md" 
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  {currentCharacter.episode.length}
                </span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {currentCharacter.episode.slice(0, 12).map((episodeUrl) => {
                  const episodeNumber = episodeUrl.split('/').pop()
                  return (
                    <div
                      key={episodeUrl}
                      className="rounded px-3 py-2 text-center text-sm font-medium transition-all duration-300 hover:scale-105 glow-card"
                      style={{ backgroundColor: 'var(--background-secondary)', color: 'var(--foreground)' }}
                    >
                      EP {episodeNumber}
                    </div>
                  )
                })}
                {currentCharacter.episode.length > 12 && (
                  <div className="rounded px-3 py-2 text-center text-sm" style={{ backgroundColor: 'var(--background-secondary)', color: 'var(--foreground-subtle)' }}>
                    +{currentCharacter.episode.length - 12} more
                  </div>
                )}
              </div>
            </div>

            {/* Created Date */}
            <div className="rounded-lg p-4 glow-card" style={{ backgroundColor: 'var(--card-bg)' }}>
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-1 flex items-center gap-2" style={{ color: 'var(--foreground-subtle)' }}>
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
          </div>
        </div>
      </div>
    </div>
  )
}