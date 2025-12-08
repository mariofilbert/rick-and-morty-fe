import { Heart } from 'lucide-react'
import { useFavoritesStore } from '@/store/favorites-store'

interface FavoriteButtonProps {
  characterId: number
  className?: string
}

export function FavoriteButton({ characterId, className = '' }: FavoriteButtonProps) {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const isFavorite = useFavoritesStore((state) => state.isFavorite(characterId))

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(characterId)
  }

  return (
    <button
      onClick={handleClick}
      className={`
        p-2 rounded-full transition-all duration-200 group/fav hover:scale-110
        ${isFavorite 
          ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg' 
          : 'bg-slate-700/80 text-slate-300 hover:bg-red-500 hover:text-white hover:shadow-lg'
        }
        ${className}
      `}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`h-4 w-4 transition-all duration-200 ${
          isFavorite 
            ? 'fill-current' 
            : 'group-hover/fav:fill-current'
        }`} 
      />
    </button>
  )
}