import Image from 'next/image'
import Link from 'next/link'
import { Character } from '@/lib/types'
import { StatusBadge } from './status-badge'
import { FavoriteButton } from './favorite-button'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/character/${character.id}`}>
      <div className="group relative glow-card rounded-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 cursor-pointer" style={{ backgroundColor: 'var(--card-bg)' }}>
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
          <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-400/10 dark:group-hover:bg-emerald-400/20 light:group-hover:bg-emerald-600/5 transition-colors duration-300" />
          
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge status={character.status} />
          </div>
          
          <div className="absolute top-3 left-3 z-10">
            <FavoriteButton characterId={character.id} />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white dark:text-white light:text-slate-900 mb-1 group-hover:text-primary dark:text-glow transition-colors duration-300" style={{ color: 'var(--foreground)' }}>
            {character.name}
          </h3>
          <p className="text-sm transition-colors duration-300" style={{ color: 'var(--foreground-muted)' }}>
            {character.species}
          </p>
          <p className="text-xs mt-1 transition-colors duration-300" style={{ color: 'var(--foreground-subtle)' }}>
            {character.location.name}
          </p>
        </div>
      </div>
    </Link>
  )
}