import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Character, ApiResponse, SearchFilters } from '@/types/types'
import { CharacterApiService } from '@/services'

interface AppState {
  characters: Character[]
  currentCharacter: Character | null
  loading: boolean
  error: string | null
  searchQuery: string
  statusFilter: string
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  favorites: number[]
  viewMode: 'grid' | 'list'
  
  setCharacters: (response: ApiResponse<Character>) => void
  setCurrentCharacter: (character: Character | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSearchQuery: (query: string) => void
  setStatusFilter: (status: string) => void
  setCurrentPage: (page: number) => void
  toggleFavorite: (characterId: number) => void
  setViewMode: (mode: 'grid' | 'list') => void
  
  fetchCharacters: () => Promise<void>
  fetchCharacter: (id: number) => Promise<void>
  searchCharacters: (query: string) => Promise<void>
  filterByStatus: (status: string) => Promise<void>
  nextPage: () => Promise<void>
  prevPage: () => Promise<void>
  resetFilters: () => void
  isFavorite: (characterId: number) => boolean
}

export const useCharacterStore = create<AppState>()(
  persist(
    (set, get) => ({
      characters: [],
      currentCharacter: null,
      loading: false,
      error: null,
      searchQuery: '',
      statusFilter: '',
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      favorites: [],
      viewMode: 'grid',

      setCharacters: (response) => set({
        characters: response.results,
        totalPages: response.info.pages,
        hasNextPage: response.info.next !== null
      }),

      setCurrentCharacter: (character) => set({ currentCharacter: character }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setStatusFilter: (statusFilter) => set({ statusFilter }),
      setCurrentPage: (currentPage) => set({ currentPage }),
      
      toggleFavorite: (characterId) => set((state) => ({
        favorites: state.favorites.includes(characterId)
          ? state.favorites.filter(id => id !== characterId)
          : [...state.favorites, characterId]
      })),
      
      setViewMode: (viewMode) => set({ viewMode }),
      
      isFavorite: (characterId) => get().favorites.includes(characterId),

      fetchCharacters: async () => {
        const { currentPage, searchQuery, statusFilter } = get()
        set({ loading: true, error: null })

        try {
          const filters: SearchFilters = {
            page: currentPage,
            ...(searchQuery && { name: searchQuery }),
            ...(statusFilter && { status: statusFilter })
          }
          
          const response = await CharacterApiService.getCharacters(filters)
          set({
            characters: response.results,
            totalPages: response.info.pages,
            hasNextPage: response.info.next !== null
          })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch characters',
            characters: [],
            totalPages: 1,
            hasNextPage: false
          })
        } finally {
          set({ loading: false })
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
      },

      searchCharacters: async (query) => {
        set({ searchQuery: query, currentPage: 1 })
        await get().fetchCharacters()
      },

      filterByStatus: async (status) => {
        set({ statusFilter: status, currentPage: 1 })
        await get().fetchCharacters()
      },

      nextPage: async () => {
        const { hasNextPage, currentPage } = get()
        if (hasNextPage) {
          set({ currentPage: currentPage + 1 })
          await get().fetchCharacters()
        }
      },

      prevPage: async () => {
        const { currentPage } = get()
        if (currentPage > 1) {
          set({ currentPage: currentPage - 1 })
          await get().fetchCharacters()
        }
      },

      resetFilters: () => {
        set({
          searchQuery: '',
          statusFilter: '',
          currentPage: 1
        })
      }
    }),
    {
      name: 'rick-morty-app-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        viewMode: state.viewMode
      })
    }
  )
)