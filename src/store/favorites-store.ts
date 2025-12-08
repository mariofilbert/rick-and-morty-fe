import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favorites: number[]
  viewMode: 'grid' | 'list'
  
  toggleFavorite: (characterId: number) => void
  setViewMode: (mode: 'grid' | 'list') => void
  isFavorite: (characterId: number) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      viewMode: 'grid',
      
      toggleFavorite: (characterId) => set((state) => ({
        favorites: state.favorites.includes(characterId)
          ? state.favorites.filter(id => id !== characterId)
          : [...state.favorites, characterId]
      })),
      
      setViewMode: (viewMode) => set({ viewMode }),
      
      isFavorite: (characterId) => get().favorites.includes(characterId),
    }),
    {
      name: 'rick-morty-favorites-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        viewMode: state.viewMode
      })
    }
  )
)