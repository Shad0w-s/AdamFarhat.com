import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from '@/components/common/ThemeToggle'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorageMock.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renders theme toggle button', () => {
    render(<ThemeToggle />)
    const button = screen.getByLabelText(/toggle theme/i)
    expect(button).toBeInTheDocument()
  })

  it('toggles theme on click', () => {
    render(<ThemeToggle />)
    const button = screen.getByLabelText(/switch to dark mode/i)
    
    fireEvent.click(button)
    
    expect(localStorageMock.getItem('theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('persists theme preference to localStorage', () => {
    render(<ThemeToggle />)
    const button = screen.getByLabelText(/switch to dark mode/i)
    
    fireEvent.click(button)
    
    expect(localStorageMock.getItem('theme')).toBe('dark')
  })

  it('handles localStorage errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage quota exceeded')
    })

    render(<ThemeToggle />)
    const button = screen.getByLabelText(/switch to dark mode/i)
    
    fireEvent.click(button)
    
    expect(consoleSpy).toHaveBeenCalled()
    
    consoleSpy.mockRestore()
    setItemSpy.mockRestore()
  })
})

