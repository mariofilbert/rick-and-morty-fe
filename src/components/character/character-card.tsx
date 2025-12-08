import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Character } from '@/types/types'
import { StatusBadge } from '@/components/character/status-badge'
import { FavoriteButton } from '@/components/common/favorite-button'

interface CharacterCardProps {
  character: Character
}

export const CharacterCard = React.memo(({ character }: CharacterCardProps) => {
  const cardStyle = useMemo(() => ({
    backgroundColor: 'var(--card-bg)'
  }), [])

  const titleStyle = useMemo(() => ({
    color: 'var(--foreground)'
  }), [])

  const speciesStyle = useMemo(() => ({
    color: 'var(--foreground-muted)'
  }), [])

  const locationStyle = useMemo(() => ({
    color: 'var(--foreground-subtle)'
  }), [])

  const getHoverStyles = () => {
    switch (character.status) {
      case 'Alive':
        return 'group-hover:bg-emerald-400/10 dark:group-hover:bg-emerald-400/20 light:group-hover:bg-emerald-600/5'
      case 'Dead':
        return 'group-hover:bg-red-400/10 dark:group-hover:bg-red-400/20 light:group-hover:bg-red-600/5'
      case 'unknown':
        return 'group-hover:bg-orange-400/10 dark:group-hover:bg-orange-400/20 light:group-hover:bg-orange-600/5'
      default:
        return 'group-hover:bg-emerald-400/10 dark:group-hover:bg-emerald-400/20 light:group-hover:bg-emerald-600/5'
    }
  }
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link href={`/character/${character.id}`}>
        <div className="group relative glow-card rounded-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 cursor-pointer" style={cardStyle}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={false}
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent dark:from-slate-900/90 light:from-slate-900/60" />
          <div className={`absolute inset-0 bg-transparent transition-colors duration-300 ${getHoverStyles()}`} />
          
          <div className="absolute top-3 left-3 z-10">
            <FavoriteButton characterId={character.id} />
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-semibold text-white dark:text-white light:text-slate-900 group-hover:text-primary dark:text-glow transition-colors duration-300 flex-1 mr-2 truncate" style={titleStyle} title={character.name}>
              {character.name}
            </h3>
            <StatusBadge status={character.status} />
          </div>
          <p className="text-sm transition-colors duration-300" style={speciesStyle}>
            {character.species}
          </p>
          <p className="text-xs mt-1 transition-colors duration-300" style={locationStyle}>
            {character.location.name}
          </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
})

CharacterCard.displayName = 'CharacterCard'