import { useFavoritesStore } from '../favorites-store'
import { renderHook, act } from '@testing-library/react'

// Mock localStorage for testing
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// Mock Zustand persist to capture localStorage calls
vi.mock('zustand/middleware', () => ({
  persist: (fn: any) => (set: any, get: any) => {
    const store = fn(set, get)
    // Wrap toggleFavorite to trigger localStorage mock
    const originalToggleFavorite = store.toggleFavorite
    store.toggleFavorite = (characterId: number) => {
      const result = originalToggleFavorite(characterId)
      // Simulate persistence behavior
      localStorageMock.setItem('rick-morty-favorites-storage', JSON.stringify({
        state: { favorites: get().favorites, viewMode: get().viewMode },
        version: 0
      }))
      return result
    }
    return store
  }
}))

describe('Favorites Store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReset()
    localStorageMock.setItem.mockReset()
    // Clear the store state between tests
    useFavoritesStore.setState({ favorites: [], viewMode: 'grid' })
  })

  it('initializes with empty favorites array', () => {
    const { result } = renderHook(() => useFavoritesStore())
    expect(result.current.favorites).toEqual([])
  })

  it('adds a favorite character', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.toggleFavorite(1)
    })

    expect(result.current.favorites).toContain(1)
    expect(result.current.favorites).toHaveLength(1)
  })

  it('removes a favorite character', () => {
    const { result } = renderHook(() => useFavoritesStore())

    // First add a favorite
    act(() => {
      result.current.toggleFavorite(1)
    })

    expect(result.current.favorites).toContain(1)

    // Then remove it
    act(() => {
      result.current.toggleFavorite(1)
    })

    expect(result.current.favorites).not.toContain(1)
    expect(result.current.favorites).toHaveLength(0)
  })

  it('correctly identifies if character is favorite', () => {
    const { result } = renderHook(() => useFavoritesStore())

    expect(result.current.isFavorite(1)).toBe(false)

    act(() => {
      result.current.toggleFavorite(1)
    })

    expect(result.current.isFavorite(1)).toBe(true)
  })

  it('toggles favorite correctly', () => {
    const { result } = renderHook(() => useFavoritesStore())

    // Add favorite
    act(() => {
      result.current.toggleFavorite(1)
    })
    expect(result.current.favorites).toEqual([1])

    // Toggle again should remove it
    act(() => {
      result.current.toggleFavorite(1)
    })
    expect(result.current.favorites).toEqual([])
  })

  it('handles multiple favorites correctly', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.toggleFavorite(1)
      result.current.toggleFavorite(2)
      result.current.toggleFavorite(3)
    })

    expect(result.current.favorites).toEqual([1, 2, 3])
    expect(result.current.favorites).toHaveLength(3)
  })

  it('removes only specified favorite from multiple', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.toggleFavorite(1)
      result.current.toggleFavorite(2)
      result.current.toggleFavorite(3)
    })

    act(() => {
      result.current.toggleFavorite(2)
    })

    expect(result.current.favorites).toEqual([1, 3])
    expect(result.current.favorites).toHaveLength(2)
  })

  it('handles toggling non-existent favorite', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.toggleFavorite(1)
    })

    // Toggle a non-existent favorite should add it
    act(() => {
      result.current.toggleFavorite(999)
    })

    expect(result.current.favorites).toEqual([1, 999])
    expect(result.current.favorites).toHaveLength(2)
  })

  it('persists favorites to localStorage when toggled', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.toggleFavorite(1)
    })

    // Check that localStorage was called with the persisted data
    expect(localStorageMock.setItem).toHaveBeenCalled()
  })

  it('persists favorites to localStorage when toggled multiple times', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.toggleFavorite(1)
      result.current.toggleFavorite(1)
    })

    // Should have been called twice - once for add, once for remove
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2)
  })

  it('handles edge case of toggling with valid character IDs only', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.toggleFavorite(0)
      result.current.toggleFavorite(-1)
    })

    expect(result.current.favorites).toEqual([0, -1])
  })

  it('maintains favorites order', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.toggleFavorite(5)
      result.current.toggleFavorite(1)
      result.current.toggleFavorite(3)
    })

    expect(result.current.favorites).toEqual([5, 1, 3])
  })

  it('correctly checks favorite status for multiple characters', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.toggleFavorite(1)
      result.current.toggleFavorite(3)
    })

    expect(result.current.isFavorite(1)).toBe(true)
    expect(result.current.isFavorite(2)).toBe(false)
    expect(result.current.isFavorite(3)).toBe(true)
    expect(result.current.isFavorite(4)).toBe(false)
  })
})