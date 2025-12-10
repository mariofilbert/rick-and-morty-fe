import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { CharacterCard } from '../character-card'
import { Character } from '@/types/types'
import { useFavoritesStore } from '@/store/favorites-store'

// Mock the favorites store
vi.mock('@/store/favorites-store')
const mockUseFavoritesStore = vi.mocked(useFavoritesStore)

describe('CharacterCard', () => {
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
    episode: [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2'
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z'
  }

  const mockFavoritesStore = {
    favorites: [],
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(() => false),
    viewMode: 'grid' as const,
    setViewMode: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock the entire store to return our mock functions
    mockUseFavoritesStore.mockImplementation((selector: any) => {
      if (typeof selector === 'function') {
        return selector(mockFavoritesStore)
      }
      return mockFavoritesStore
    })
  })

  it('renders character information correctly', () => {
    render(<CharacterCard character={mockCharacter} />)

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Rick Sanchez' })).toBeInTheDocument()
  })

  it('displays correct status badge color for alive character', () => {
    render(<CharacterCard character={mockCharacter} />)
    const statusBadge = screen.getByText('Alive')
    expect(statusBadge).toHaveClass('bg-green-500')
  })

  it('displays correct status badge color for dead character', () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' as const }
    render(<CharacterCard character={deadCharacter} />)
    const statusBadge = screen.getByText('Dead')
    expect(statusBadge).toHaveClass('bg-red-500')
  })

  it('displays correct status badge color for unknown status', () => {
    const unknownCharacter = { ...mockCharacter, status: 'unknown' as const }
    render(<CharacterCard character={unknownCharacter} />)
    const statusBadge = screen.getByText('Unknown')
    expect(statusBadge).toHaveClass('bg-yellow-500')
  })

  it('displays character location', () => {
    render(<CharacterCard character={mockCharacter} />)
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument()
  })

  it('shows favorite button when not favorited', () => {
    render(<CharacterCard character={mockCharacter} />)
    const favoriteButton = screen.getByLabelText(/add.*favorite/i)
    expect(favoriteButton).toBeInTheDocument()
  })

  it('shows favorited button when character is favorited', () => {
    mockFavoritesStore.isFavorite.mockReturnValue(true)
    render(<CharacterCard character={mockCharacter} />)
    const favoriteButton = screen.getByLabelText(/remove.*favorite/i)
    expect(favoriteButton).toBeInTheDocument()
  })

  it('calls toggleFavorite when favorite button is clicked', () => {
    mockFavoritesStore.isFavorite.mockReturnValue(false) // Ensure it shows "Add to favorites"
    render(<CharacterCard character={mockCharacter} />)
    const favoriteButton = screen.getByRole('button', { name: /add.*favorite/i })
    
    fireEvent.click(favoriteButton)
    expect(mockFavoritesStore.toggleFavorite).toHaveBeenCalledWith(1)
  })

  it('calls toggleFavorite when unfavorite button is clicked', () => {
    mockFavoritesStore.isFavorite.mockReturnValue(true)
    render(<CharacterCard character={mockCharacter} />)
    const favoriteButton = screen.getByLabelText(/remove.*favorite/i)
    
    fireEvent.click(favoriteButton)
    expect(mockFavoritesStore.toggleFavorite).toHaveBeenCalledWith(1)
  })

  it('renders as a link to character detail page', () => {
    render(<CharacterCard character={mockCharacter} />)
    const cardLink = screen.getByRole('link')
    expect(cardLink).toHaveAttribute('href', '/character/1')
  })

  it('handles missing image gracefully', () => {
    const characterWithoutImage = { ...mockCharacter, image: '' }
    render(<CharacterCard character={characterWithoutImage} />)
    const image = screen.getByRole('img', { name: 'Rick Sanchez' })
    expect(image).toHaveAttribute('src', '')
  })

  it('handles long character names', () => {
    const characterWithLongName = {
      ...mockCharacter,
      name: 'This is a very long character name that should be handled properly'
    }
    render(<CharacterCard character={characterWithLongName} />)
    expect(screen.getByText('This is a very long character name that should be handled properly')).toBeInTheDocument()
  })


  it('applies hover effects on card interaction', () => {
    render(<CharacterCard character={mockCharacter} />)
    const cardContainer = screen.getByRole('link').querySelector('.group')
    
    fireEvent.mouseEnter(cardContainer!)
    // Test that hover styles would be applied (this tests the className structure)
    expect(cardContainer).toHaveClass('hover:scale-[1.02]')
  })
})