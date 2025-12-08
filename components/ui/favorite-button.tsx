import { Heart } from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface FavoriteButtonProps {
  characterId: number
  className?: string
}

export function FavoriteButton({ characterId, className = '' }: FavoriteButtonProps) {
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)
  const favorites = useAppStore((state) => state.favorites)
  const favorite = favorites.includes(characterId)

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
        ${favorite 
          ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg' 
          : 'bg-slate-700/80 text-slate-300 hover:bg-red-500 hover:text-white hover:shadow-lg'
        }
        ${className}
      `}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`h-4 w-4 transition-all duration-200 ${
          favorite 
            ? 'fill-current' 
            : 'group-hover/fav:fill-current'
        }`} 
      />
    </button>
  )
}