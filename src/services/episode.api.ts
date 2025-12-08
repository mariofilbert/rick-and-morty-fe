import { Episode, ApiResponse } from '@/types/types'

const BASE_URL = 'https://rickandmortyapi.com/api'

export interface EpisodeFilters {
  name?: string
  episode?: string // For filtering by season (S01, S02, etc.)
  page?: number
}

export class EpisodeApiService {
  static async getEpisodes(filters: EpisodeFilters = {}): Promise<ApiResponse<Episode>> {
    const params = new URLSearchParams()
    
    if (filters.name) params.append('name', filters.name)
    if (filters.episode) params.append('episode', filters.episode)
    if (filters.page) params.append('page', filters.page.toString())
    
    const url = `${BASE_URL}/episode?${params.toString()}`
    
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
  
  static async getEpisode(id: number): Promise<Episode> {
    const response = await fetch(`${BASE_URL}/episode/${id}`)
    
    if (!response.ok) {
      throw new Error(`Episode not found: ${id}`)
    }
    
    return response.json()
  }
  
  static async getMultipleEpisodes(ids: number[]): Promise<Episode[]> {
    if (ids.length === 0) return []
    
    const response = await fetch(`${BASE_URL}/episode/${ids.join(',')}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch episodes')
    }
    
    const data = await response.json()
    return Array.isArray(data) ? data : [data]
  }
}