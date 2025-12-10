import { CharacterApiService } from '../character.api'
import { Character, ApiResponse } from '@/types/types'

// Mock fetch globally
global.fetch = vi.fn()

const mockFetch = global.fetch as any

describe('CharacterApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCharacters', () => {
    it('fetches characters successfully', async () => {
      const mockResponse: ApiResponse<Character> = {
        info: {
          count: 826,
          pages: 42,
          next: 'https://rickandmortyapi.com/api/character?page=2',
          prev: null
        },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
              name: 'Earth (C-137)',
              url: 'https://rickandmortyapi.com/api/location/1'
            },
            location: {
              name: 'Citadel of Ricks',
              url: 'https://rickandmortyapi.com/api/location/3'
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [
              'https://rickandmortyapi.com/api/episode/1',
              'https://rickandmortyapi.com/api/episode/2'
            ],
            url: 'https://rickandmortyapi.com/api/character/1',
            created: '2017-11-04T18:48:46.250Z'
          }
        ]
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await CharacterApiService.getCharacters()

      expect(mockFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character?')
      expect(result).toEqual(mockResponse)
    })

    it('fetches characters with search parameters', async () => {
      const mockResponse: ApiResponse<Character> = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: []
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await CharacterApiService.getCharacters({
        page: 2,
        name: 'Rick',
        status: 'Alive',
        species: 'Human',
        gender: 'Male'
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character?name=Rick&status=Alive&species=Human&gender=Male&page=2'
      )
    })

    it('handles 404 errors by returning empty results', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      const result = await CharacterApiService.getCharacters()
      expect(result).toEqual({
        info: { count: 0, pages: 0, next: null, prev: null },
        results: []
      })
    })

    it('handles network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(CharacterApiService.getCharacters()).rejects.toThrow('Network error')
    })

    it('filters out empty parameters', async () => {
      const mockResponse: ApiResponse<Character> = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: []
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await CharacterApiService.getCharacters({
        page: 1,
        name: '',
        status: 'Alive',
        species: '',
        gender: 'Male'
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character?status=Alive&gender=Male&page=1'
      )
    })
  })

  describe('getCharacter', () => {
    it('fetches single character successfully', async () => {
      const mockCharacter: Character = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (C-137)',
          url: 'https://rickandmortyapi.com/api/location/1'
        },
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3'
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/1'],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z'
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharacter,
      })

      const result = await CharacterApiService.getCharacter(1)

      expect(mockFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1')
      expect(result).toEqual(mockCharacter)
    })

    it('handles character not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      await expect(CharacterApiService.getCharacter(999)).rejects.toThrow('Character not found:')
    })
  })

  describe('getMultipleCharacters', () => {
    it('fetches multiple characters successfully', async () => {
      const mockCharacters: Character[] = [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1'
          },
          location: {
            name: 'Citadel of Ricks',
            url: 'https://rickandmortyapi.com/api/location/3'
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z'
        },
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1'
          },
          location: {
            name: 'Earth (Replacement Dimension)',
            url: 'https://rickandmortyapi.com/api/location/20'
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          url: 'https://rickandmortyapi.com/api/character/2',
          created: '2017-11-04T18:48:46.250Z'
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharacters,
      })

      const result = await CharacterApiService.getMultipleCharacters([1, 2])

      expect(mockFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1,2')
      expect(result).toEqual(mockCharacters)
    })

    it('handles single character in array', async () => {
      const mockCharacter: Character = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (C-137)',
          url: 'https://rickandmortyapi.com/api/location/1'
        },
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3'
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/1'],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z'
      }

      // API returns single character as object for single ID
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharacter,
      })

      const result = await CharacterApiService.getMultipleCharacters([1])

      expect(mockFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1')
      expect(result).toEqual([mockCharacter])
    })

    it('returns empty array for empty input', async () => {
      const result = await CharacterApiService.getMultipleCharacters([])
      
      expect(result).toEqual([])
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('handles API errors for multiple characters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      await expect(CharacterApiService.getMultipleCharacters([1, 2])).rejects.toThrow('Failed to fetch characters')
    })
  })
})