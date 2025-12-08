import { Character, ApiResponse, SearchFilters } from '@/types/types'

const BASE_URL = 'https://rickandmortyapi.com/api'

export class CharacterApiService {
  static async getCharacters(filters: SearchFilters = {}): Promise<ApiResponse<Character>> {
    const params = new URLSearchParams()
    
    if (filters.name) params.append('name', filters.name)
    if (filters.status) params.append('status', filters.status)
    if (filters.species) params.append('species', filters.species)
    if (filters.gender) params.append('gender', filters.gender)
    if (filters.page) params.append('page', filters.page.toString())
    
    const url = `${BASE_URL}/character?${params.toString()}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      if (response.status === 404) {
        return {
          info: { count: 0, pages: 0, next: null, prev: null },
          results: []
        }
      }
      throw new Error(`API Error: ${response.status} - ${response.statusText}`)
    }
    
    return response.json()
  }
  
  static async getCharacter(id: number): Promise<Character> {
    const response = await fetch(`${BASE_URL}/character/${id}`)
    
    if (!response.ok) {
      throw new Error(`Character not found: ${id}`)
    }
    
    return response.json()
  }
  
  static async getMultipleCharacters(ids: number[]): Promise<Character[]> {
    if (ids.length === 0) return []
    
    const response = await fetch(`${BASE_URL}/character/${ids.join(',')}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch characters')
    }
    
    const data = await response.json()
    return Array.isArray(data) ? data : [data]
  }
}