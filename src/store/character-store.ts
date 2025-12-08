import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Character, ApiResponse, SearchFilters } from '@/types/types'
import { CharacterApiService } from '@/services'

interface Filters {
  name: string
  status: string
  species: string
  gender: string
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