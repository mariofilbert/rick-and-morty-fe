import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../search-bar'

describe('SearchBar', () => {
  const mockOnChange = vi.fn()
  const defaultProps = {
    value: '',
    onChange: mockOnChange,
    placeholder: 'Search characters...'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with correct placeholder', () => {
    render(<SearchBar {...defaultProps} />)
    expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument()
  })

  it('displays the current value', () => {
    render(<SearchBar {...defaultProps} value="Rick" />)
    const input = screen.getByDisplayValue('Rick')
    expect(input).toBeInTheDocument()
  })

  it('calls onChange when typing', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} />)
    
    const input = screen.getByPlaceholderText('Search characters...')
    await user.type(input, 'Rick')

    // Due to debouncing, we need to wait for the callback
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('Rick')
    }, { timeout: 1000 })
  })

  it('shows clear button when there is text', () => {
    render(<SearchBar {...defaultProps} value="Rick" />)
    expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument()
  })

  it('hides clear button when text is empty', () => {
    render(<SearchBar {...defaultProps} value="" />)
    expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument()
  })

  it('clears search when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} value="Rick" />)
    
    const clearButton = screen.getByLabelText(/clear search/i)
    await user.click(clearButton)
    
    expect(mockOnChange).toHaveBeenCalledWith('')
  })

  it('shows search icon', () => {
    render(<SearchBar {...defaultProps} />)
    // The Search icon should be present (from lucide-react)
    expect(screen.getByRole('textbox').parentElement).toContainHTML('svg')
  })

  it('handles empty search gracefully', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} />)
    
    const input = screen.getByPlaceholderText('Search characters...')
    await user.type(input, 'Rick')
    await user.clear(input)

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('')
    }, { timeout: 1000 })
  })

  it('debounces search input correctly', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} debounceMs={100} />)
    
    const input = screen.getByPlaceholderText('Search characters...')
    
    // Type quickly
    await user.type(input, 'Rick')

    // Should only call onChange once after debounce delay
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1)
      expect(mockOnChange).toHaveBeenCalledWith('Rick')
    }, { timeout: 500 })
  })

  it('updates internal state when value prop changes', () => {
    const { rerender } = render(<SearchBar {...defaultProps} value="" />)
    
    rerender(<SearchBar {...defaultProps} value="Morty" />)
    
    expect(screen.getByDisplayValue('Morty')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<SearchBar {...defaultProps} />)
    const searchContainer = screen.getByRole('textbox').parentElement
    
    // Should have relative positioning for icon placement
    expect(searchContainer).toHaveClass('relative')
  })

  it('handles special characters in search', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} debounceMs={100} />)
    
    const input = screen.getByPlaceholderText('Search characters...')
    const specialText = 'Rick & Morty!'
    
    await user.type(input, specialText)

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(specialText)
    }, { timeout: 500 })
  })

  it('handles custom debounce timing', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} debounceMs={50} />)
    
    const input = screen.getByPlaceholderText('Search characters...')
    
    await user.type(input, 'Test')

    // With shorter debounce, should be faster
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('Test')
    }, { timeout: 200 })
  })
})