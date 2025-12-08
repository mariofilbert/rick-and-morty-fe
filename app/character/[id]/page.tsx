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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-white">Loading character...</p>
        </div>
      </div>
    )
  }

  if (error || !currentCharacter) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Character not found</h2>
          <p className="text-slate-300 mb-6">{error || 'The character you are looking for does not exist.'}</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
          >
            Back to Characters
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Characters
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Character Image */}
          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={currentCharacter.image}
                alt={currentCharacter.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <FavoriteButton characterId={currentCharacter.id} />
                <StatusBadge status={currentCharacter.status} className="text-sm px-3 py-1" />
              </div>
            </div>
          </div>

          {/* Character Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {currentCharacter.name}
              </h1>
              <p className="text-xl text-emerald-400 font-medium">
                {currentCharacter.species}
              </p>
              {currentCharacter.type && (
                <p className="text-lg text-slate-300">
                  {currentCharacter.type}
                </p>
              )}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gender */}
              <div className="bg-slate-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-1">
                  Gender
                </h3>
                <p className="text-white font-medium">{currentCharacter.gender}</p>
              </div>

              {/* Status */}
              <div className="bg-slate-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-1">
                  Status
                </h3>
                <StatusBadge status={currentCharacter.status} />
              </div>

              {/* Origin */}
              <div className="bg-slate-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Origin
                </h3>
                <p className="text-white font-medium">{currentCharacter.origin.name}</p>
              </div>

              {/* Location */}
              <div className="bg-slate-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Last Location
                </h3>
                <p className="text-white font-medium">{currentCharacter.location.name}</p>
              </div>
            </div>

            {/* Episodes */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-400" />
                Episodes
                <span className="bg-emerald-600 text-white text-sm px-2 py-1 rounded-full">
                  {currentCharacter.episode.length}
                </span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {currentCharacter.episode.slice(0, 12).map((episodeUrl) => {
                  const episodeNumber = episodeUrl.split('/').pop()
                  return (
                    <div
                      key={episodeUrl}
                      className="bg-slate-700 rounded px-3 py-2 text-center text-white text-sm font-medium"
                    >
                      EP {episodeNumber}
                    </div>
                  )
                })}
                {currentCharacter.episode.length > 12 && (
                  <div className="bg-slate-700 rounded px-3 py-2 text-center text-slate-400 text-sm">
                    +{currentCharacter.episode.length - 12} more
                  </div>
                )}
              </div>
            </div>

            {/* Created Date */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Created
              </h3>
              <p className="text-white font-medium">
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