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
      <div className="group relative bg-slate-800 dark:bg-slate-800 light:bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl light:shadow-slate-200 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer border light:border-slate-200">
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
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-300" />
          
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge status={character.status} />
          </div>
          
          <div className="absolute top-3 left-3 z-10">
            <FavoriteButton characterId={character.id} />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white dark:text-white light:text-slate-800 mb-1 group-hover:text-emerald-400 transition-colors duration-300">
            {character.name}
          </h3>
          <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600">
            {character.species}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mt-1">
            {character.location.name}
          </p>
        </div>
      </div>
    </Link>
  )
}