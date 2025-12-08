import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Character, ApiResponse, SearchFilters } from '@/types/types'
import { CharacterApiService } from '@/services'
import { useFavoritesStore } from './favorites-store'

interface Filters {
  name: string
  status: string
  species: string
  gender: string
  favoritesOnly: boolean
  page: number
}

interface CharacterState {
  characters: Character[]
  currentCharacter: Character | null
  loading: boolean
  error: string | null
  filters: Filters
  totalPages: number
  hasNextPage: boolean
  initialized: boolean
  
  setCharacters: (response: ApiResponse<Character>) => void
  setCurrentCharacter: (character: Character | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilters: (newFilters: Partial<Filters>) => void
  setInitialized: (initialized: boolean) => void
  
  fetchCharacters: () => Promise<void>
  fetchCharacter: (id: number) => Promise<void>
}

export const useCharacterStore = create<CharacterState>()((set, get) => ({
  characters: [],
  currentCharacter: null,
  loading: false,
  error: null,
  filters: {
    name: '',
    status: '',
    species: '',
    gender: '',
    favoritesOnly: false,
    page: 1
  },
  totalPages: 1,
  hasNextPage: false,
  initialized: false,

  setCharacters: (response) => set({
    characters: response.results,
    totalPages: response.info.pages,
    hasNextPage: response.info.next !== null
  }),

  setCurrentCharacter: (character) => set({ currentCharacter: character }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  setInitialized: (initialized) => set({ initialized }),

  fetchCharacters: async () => {
    const { filters } = get()
    set({ loading: true, error: null })
    
    try {
      // Handle favorites filter separately - fetch all favorites by ID
      if (filters.favoritesOnly) {
        const favoritesState = useFavoritesStore.getState()
        
        if (favoritesState.favorites.length === 0) {
          set({
            characters: [],
            totalPages: 0,
            hasNextPage: false,
            loading: false
          })
          return
        }
        
        // Fetch all favorite characters by their IDs
        const favoriteCharacters = await CharacterApiService.getMultipleCharacters(favoritesState.favorites)
        
        // Apply other filters to favorites if needed
        let filteredFavorites = favoriteCharacters
        if (filters.name) {
          filteredFavorites = filteredFavorites.filter(char => 
            char.name.toLowerCase().includes(filters.name.toLowerCase())
          )
        }
        if (filters.status) {
          filteredFavorites = filteredFavorites.filter(char => 
            char.status.toLowerCase() === filters.status.toLowerCase()
          )
        }
        if (filters.species) {
          filteredFavorites = filteredFavorites.filter(char => 
            char.species.toLowerCase() === filters.species.toLowerCase()
          )
        }
        if (filters.gender) {
          filteredFavorites = filteredFavorites.filter(char => 
            char.gender.toLowerCase() === filters.gender.toLowerCase()
          )
        }
        
        set({
          characters: filteredFavorites,
          totalPages: filteredFavorites.length > 0 ? 1 : 0,
          hasNextPage: false,
          loading: false
        })
        return
      }
      
      // Normal API call for non-favorites
      const searchFilters: SearchFilters = {
        page: filters.page,
        ...(filters.name && { name: filters.name }),
        ...(filters.status && { status: filters.status }),
        ...(filters.species && { species: filters.species }),
        ...(filters.gender && { gender: filters.gender })
      }
      const response = await CharacterApiService.getCharacters(searchFilters)
      
      set({
        characters: response.results,
        totalPages: response.info.pages,
        hasNextPage: response.info.next !== null,
        loading: false
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch characters',
        characters: [],
        totalPages: 1,
        hasNextPage: false,
        loading: false
      })
    }
  },

  fetchCharacter: async (id) => {
    set({ loading: true, error: null })

    try {
      const character = await CharacterApiService.getCharacter(id)
      set({ currentCharacter: character })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch character',
        currentCharacter: null
      })
    } finally {
      set({ loading: false })
    }
  }
}))